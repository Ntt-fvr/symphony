/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {CSVFileExportKeyQuery} from './__generated__/CSVFileExportKeyQuery.graphql';
import type {
  CSVFileExportQuery,
  ExportStatus,
} from './__generated__/CSVFileExportQuery.graphql';
import type {FiltersQuery} from './comparison_view/ComparisonViewTypes';
import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithStyles} from '@material-ui/core';

import AppContext from '@fbcnms/ui/context/AppContext';
import Button from '@symphony/design-system/components/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useState} from 'react';
import RelayEnvironment from '../common/RelayEnvironment';
import axios from 'axios';
import classNames from 'classnames';
import withAlert from '@fbcnms/ui/components/Alert/withAlert';
import {DocumentAPIUrls} from '../common/DocumentAPI';
import {DownloadIcon} from '@symphony/design-system/icons';
import {fetchQuery, graphql} from 'relay-runtime';
import {useContext} from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  exportButton: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  exportButtonContainer: {
    display: 'flex',
  },
  exportButtonContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& $hiddenContent': {
      maxHeight: '0px',
      overflowY: 'hidden',
    },
  },
  hiddenContent: {},
};

const csvFileExportQuery = graphql`
  query CSVFileExportQuery($taskId: ID!) {
    task: node(id: $taskId) {
      ... on ExportTask {
        id
        status
        progress
      }
    }
  }
`;

const csvFileExportKeyQuery = graphql`
  query CSVFileExportKeyQuery($taskId: ID!) {
    task: node(id: $taskId) {
      ... on ExportTask {
        storeKey
      }
    }
  }
`;

const PATH_PREFIX = '/graph/export';
const PATH_EQUIPMENTS = '/equipment';
const PATH_LOCATIONS = '/locations';
const EXPORT_TASK_REFRESH_INTERVAL_MS = 3000;
type Props = {
  exportPath: string,
  title: string,
  filters: ?FiltersQuery,
} & WithStyles<typeof styles> &
  WithAlert;

const CSVFileExport = (props: Props) => {
  const {classes, title, exportPath} = props;
  const [isDownloading, setIsDownloading] = useState(false);
  const [asyncTaskStatus, setAsyncTaskStatus] = useState<?ExportStatus>(null);
  const [asyncStoreKey, setAsyncStoreKey] = useState(null);
  const [asyncTaskId, setAsyncTaskId] = useState(null);
  const isAsyncExportEnabled = useContext(AppContext).isFeatureEnabled(
    'async_export',
  );

  const filters = props.filters?.map(f => {
    if (f.name == 'property') {
      const property = f.propertyValue;
      f.propertyValue = property;
    }
    return f;
  });

  const getFileName = () => {
    const date = new Date();
    const localDate = date.toLocaleDateString();
    const localTime = new Date().toLocaleTimeString();
    return `${localDate}-${localTime}.csv`;
  };

  const handleAsyncDownload = async () => {
    if (asyncStoreKey == null) {
      props.alert('Failed to download file');
      return;
    }
    const url = DocumentAPIUrls.get_url(asyncStoreKey);
    axios.get(url, {responseType: 'blob'}).then(response => {
      if (response == null || response.data == null) {
        props.alert('Failed to download file');
        return;
      }
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', getFileName());
      link.click();
    });
    setAsyncTaskId(null);
    setAsyncStoreKey(null);
  };

  const handleAsyncExport = (taskId: string, intervalId: IntervalID) => {
    fetchQuery<CSVFileExportQuery>(RelayEnvironment, csvFileExportQuery, {
      taskId,
    }).then(response => {
      if (
        response == null ||
        response.task == null ||
        response.task.status === 'FAILED'
      ) {
        clearInterval(intervalId);
        setAsyncTaskStatus('FAILED');
        props.alert('Failed to export file');
        return;
      } else if (response.task.status === 'SUCCEEDED') {
        clearInterval(intervalId);
        setAsyncTaskStatus('SUCCEEDED');
        setAsyncTaskId(taskId);
        fetchQuery<CSVFileExportKeyQuery>(
          RelayEnvironment,
          csvFileExportKeyQuery,
          {
            taskId,
          },
        ).then(response => {
          if (
            response == null ||
            response.task == null ||
            response.task.storeKey == null
          ) {
            props.alert('Failed to download file');
            return;
          }
          setAsyncStoreKey(response.task.storeKey);
        });
      }
    });
  };

  const onClick = async () => {
    const path = PATH_PREFIX + exportPath;
    const fileName = exportPath.replace('/', '').replace(/\//g, '_') + '.csv';
    setIsDownloading(true);
    try {
      await axios
        .get(path, {
          params: {
            filters: JSON.stringify(filters),
          },
          responseType: 'blob',
        })
        .then(response => {
          setIsDownloading(false);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          if (
            !isAsyncExportEnabled ||
            (exportPath !== PATH_EQUIPMENTS && exportPath !== PATH_LOCATIONS)
          ) {
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            link.click();
          } else {
            response.data.text().then(text => {
              if (text == null || text === '') {
                return;
              }
              const taskId = JSON.parse(text)['TaskID'];
              if (asyncTaskStatus !== 'IN_PROGRESS') {
                setAsyncTaskStatus('IN_PROGRESS');
                const intervalId = setInterval(
                  () => handleAsyncExport(taskId, intervalId),
                  EXPORT_TASK_REFRESH_INTERVAL_MS,
                );
              }
            });
          }
        });
    } catch (error) {
      props.alert(error.response?.data?.error || error);
      setIsDownloading(false);
    }
  };

  return (
    <div className={classes.exportButtonContainer}>
      <Button className={classes.exportButton} variant="text" onClick={onClick}>
        <div className={classes.exportButtonContent}>
          <span
            className={classNames({
              [classes.hiddenContent]:
                isDownloading || asyncTaskStatus === 'IN_PROGRESS',
            })}>
            {title}
          </span>
          <CircularProgress
            size={24}
            color="inherit"
            className={classNames({
              [classes.hiddenContent]:
                (!isDownloading && !isAsyncExportEnabled) ||
                (asyncTaskStatus !== 'IN_PROGRESS' && isAsyncExportEnabled),
            })}
          />
        </div>
      </Button>
      {isAsyncExportEnabled &&
        asyncTaskStatus === 'SUCCEEDED' &&
        asyncTaskId != null &&
        asyncStoreKey != null && (
          <IconButton
            icon={DownloadIcon}
            onClick={handleAsyncDownload}
            skin="gray"
          />
        )}
    </div>
  );
};

export default withStyles(styles)(withAlert(CSVFileExport));
