/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

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

const PATH_PREFIX = '/graph/export';
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

  const handleAsyncDownload = async () => {
    //TODO: send axios.get to async service with the taskId to get the file.
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
          if (!isAsyncExportEnabled) {
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
      {isAsyncExportEnabled && asyncTaskStatus === 'SUCCEEDED' && (
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
