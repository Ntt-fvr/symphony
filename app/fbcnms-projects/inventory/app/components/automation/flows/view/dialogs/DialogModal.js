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
import Alert from '@material-ui/lab/Alert';
import Button from '@symphony/design-system/components/Button';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Text from '@symphony/design-system/components/Text';
import {BLUE, DARK} from '@symphony/design-system/theme/symphony';
import {Dialog} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-input': {
      minHeight: '90px',
    },
  },
  nameInput: {
    '& .MuiTextField-root': {
      width: '60%',
    },
  },
  dialogContainer: {
    position: 'relative',
    padding: '24px',
    maxWidth: '100%',
  },
  closeIcon: {
    position: 'absolute',
    right: '18px',
    top: '18px',
    '& svg': {
      color: BLUE.B600,
      cursor: 'pointer',
    },
  },
  inputContainer: {
    width: '100%',
    '&:not(:first-child)': {
      margin: '24px 0',
    },
  },
  dialogContent: {
    margin: '20px 0 44px 0',
  },
  section: {
    width: '100%',
    '&:not(:last-child)': {
      paddingBottom: '16px',
    },
    marginBottom: '16px',
  },
  btnOutlined: {
    background: 'white!important',
    border: `1px solid ${BLUE.B600}`,
    marginRight: '10px',
    '& span': {
      color: `${BLUE.B400}!important`,
    },
  },
  dialogActions: {
    boxSizing: 'border-box',
    margin: '0 26px',
    paddingRight: 0,
  },
  dialogTitleText: {
    fontSize: '16px',
    lineHeight: '18.75px',
    color: DARK.D900,
    fontWeight: 'bold',
  },
  dialogDescriptionText: {
    fontSize: '14px',
    lineHeight: '16.45px',
    color: DARK.D900,
    fontWeight: 400,
  },
}));

type Props = $ReadOnly<{|
  isOpen: boolean,
  handleOpenModal: () => void,
  handleClick: () => void,
  btnConfirmText: string,
  title?: string,
  alertType?: string,
  description?: string,
  children?: ?React.Node,
|}>;

const DialogModal = ({
  alertType,
  isOpen,
  handleOpenModal,
  handleClick,
  btnConfirmText,
  title,
  description,
  children,
}: Props) => {
  const classes = useStyles();

  if (!isOpen) return null;

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={isOpen}>
      <div className={classes.dialogContainer}>
        {!alertType && <Text variant="h4">{title || ''}</Text>}
        <div className={classes.closeIcon}>
          <CloseIcon onClick={handleOpenModal} />
        </div>
        <div className={classes.section}>
          <div className={classes.dialogContent}>
            {!alertType && (
              <Text variant="body1" color="gray">
                {description || ''}
              </Text>
            )}
          </div>
          <DialogContent>
            {!alertType ? (
              children
            ) : (
              <Alert severity="info">
                <div>
                  <Text className={classes.dialogTitleText}>{title}</Text>
                </div>
                <div>
                  <Text className={classes.dialogDescriptionText}>
                    {description}
                  </Text>
                </div>
              </Alert>
            )}
          </DialogContent>
        </div>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.btnOutlined}
            color="primary"
            onClick={handleOpenModal}>
            Cancel
          </Button>
          <Button onClick={handleClick}>{btnConfirmText}</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default DialogModal;
