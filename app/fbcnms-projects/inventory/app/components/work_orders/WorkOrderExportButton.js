/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import React from 'react';
import axios from 'axios';
import {UploadAPIUrls} from '../../common/UploadAPI';
import {makeStyles} from '@material-ui/styles';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';

const useStyles = makeStyles(_theme => ({
  exportButton: {
    minWidth: 'unset',
    paddingTop: '2px',
    height: '36px',
    marginRight: '8px',
  },
}));
const PATH = UploadAPIUrls.exported_work_order();

type Props = $ReadOnly<{|
  id: string,
|}>;

const WorkOrderExportButton = (props: Props) => {
  const {id} = props;
  const classes = useStyles();
  const enqueueSnackbar = useEnqueueSnackbar();

  const handleError = error =>
    enqueueSnackbar(error.response?.data?.error || error, {variant: 'error'});

  const onClick = async () => {
    const fileName = 'work_order_' + id + '.xlsx';
    await axios
      .get(PATH, {
        params: {
          id: id,
        },
        responseType: 'blob',
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        link.click();
      })
      .catch(handleError);
  };
  return (
    <Button
      className={classes.exportButton}
      variant="text"
      skin="gray"
      onClick={onClick}>
      <GetAppIcon />
    </Button>
  );
};

export default WorkOrderExportButton;
