/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import symphony, {BLUE, YELLOW} from '@symphony/design-system/theme/symphony';
import {Dialog, DialogContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  upContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '24px',
    '& span': {
      maxWidth: '400px',
      marginTop: '32px',
      textAlign: 'center',
    },
  },
  deleteIcon: {
    '& svg': {
      fontSize: '50px',
      color: YELLOW.Y600,
    },
  },
  archiveIcon: {
    '& svg': {
      fontSize: '50px',
      color: '#C4C4C4',
    },
  },
  section: {
    '&:not(:last-child)': {
      paddingBottom: '16px',
      borderBottom: `1px solid ${symphony.palette.separator}`,
    },
    marginBottom: '16px',
  },
  downSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    paddingBottom: '16px',
    '& .MuiButton-outlined': {
      border: '1px solid black',
    },
  },
  btnOutlined: {
    background: 'white!important',
    border: `1px solid ${BLUE.B600}`,
    '& span': {
      color: `${BLUE.B400}!important`,
    },
  },
}));

type Props = $ReadOnly<{|
  icon?: React.Element,
  text?: React.Element,
  isOpen: boolean,
  activeModal?: number,
  openModal: () => void,
|}>;

const ArchiveDeleteDialog = ({
  icon,
  text,
  isOpen,
  activeModal,
  openModal,
}: Props) => {
  const classes = useStyles();
  if (isOpen) {
    return (
      <Dialog fullWidth={true} maxWidth="sm" open={true}>
        <div className={classes.section}>
          <DialogContent>
            <div className={classes.upContainer}>
              <span
                className={
                  activeModal === 1 ? classes.archiveIcon : classes.deleteIcon
                }>
                {icon}
              </span>
              {text}
            </div>
          </DialogContent>
        </div>
        <div className={classes.downSection}>
          <Button
            className={classes.btnOutlined}
            color="primary"
            onClick={() => openModal()}>
            Cancel
          </Button>
          <Button>Confirm</Button>
        </div>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default ArchiveDeleteDialog;
