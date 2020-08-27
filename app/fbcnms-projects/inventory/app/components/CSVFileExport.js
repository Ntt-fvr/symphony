/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {CSVFileExportQuery} from './__generated__/CSVFileExportQuery.graphql';

import type {FiltersQuery} from './comparison_view/ComparisonViewTypes';
import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithStyles} from '@material-ui/core';

import AppContext from '@fbcnms/ui/context/AppContext';
import Button from '@symphony/design-system/components/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState} from 'react';
import RelayEnvironment from '../common/RelayEnvironment';
import axios from 'axios';
import classNames from 'classnames';
import withAlert from '@fbcnms/ui/components/Alert/withAlert';
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
  const [isAsyncExportInProgress, setIsAsyncExportInProgress] = useState(false);
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

  const handleAsyncExport = (taskID: string, intervalId: IntervalID) => {
    fetchQuery<CSVFileExportQuery>(RelayEnvironment, csvFileExportQuery, {
      taskId: taskID,
    }).then(response => {
      if (response == null || response.task == null) {
        return;
      }
      switch (response.task.status) {
        case 'SUCCEEDED':
          //TODO: present a download button
          clearInterval(intervalId);
          setIsAsyncExportInProgress(false);
          break;
        case 'FAILED':
          //TODO: show appropriate failure message and present original export button
          clearInterval(intervalId);
          setIsAsyncExportInProgress(false);
          break;
        default:
          //TODO: present a progress bar and loading circle
          break;
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
              const taskID = JSON.parse(text)['TaskID'];
              if (!isAsyncExportInProgress) {
                setIsAsyncExportInProgress(true);
                const intervalId = setInterval(
                  () => handleAsyncExport(taskID, intervalId),
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
              [classes.hiddenContent]: isDownloading,
            })}>
            {title}
          </span>
          <CircularProgress
            size={20}
            color="inherit"
            className={classNames({
              [classes.hiddenContent]: !isDownloading,
            })}
          />
        </div>
      </Button>
    </div>
  );
};

export default withStyles(styles)(withAlert(CSVFileExport));
