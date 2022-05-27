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
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
import symphony, {BLUE} from '@symphony/design-system/theme/symphony';
import {Dialog, FormControl, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useForm} from '../../utils/useForm';

const useStyles = makeStyles(theme => ({
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
    right: '30px',
    top: '30px',
    '& svg': {
      color: '#8895AD',
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
      borderBottom: `1px solid ${symphony.palette.separator}`,
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
}));

type Props = $ReadOnly<{|
  openModal: () => void,
  name: string,
  text: string,
  description: string,
  isOpen: boolean,
|}>;

const EditFlowDialog = ({
  isOpen,
  name,
  text,
  description,
  openModal,
}: Props) => {
  const classes = useStyles();
  const [configurationsValues, handleInputChange] = useForm({
    flowName: name,
    flowDescription: description,
  });

  const {flowName, flowDescription} = configurationsValues;

  if (!isOpen) return null;

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={true}>
      <div className={classes.dialogContainer}>
        <Text variant="h4">{name}</Text>
        <div className={classes.closeIcon}>
          <CloseIcon onClick={() => openModal()} />
        </div>
        <div className={classes.section}>
          <div className={classes.dialogContent}>
            <Text variant="body1" color="gray">
              {text}
            </Text>
          </div>
          <DialogContent>
            <FormControl fullWidth>
              <div className={classes.inputContainer}>
                <div className={classes.nameInput}>
                  <TextField
                    variant="outlined"
                    label={`${fbt('Name', '')}`}
                    type={'text'}
                    name={'flowName'}
                    value={flowName || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className={classes.inputContainer}>
                <div className={classes.root}>
                  <TextField
                    variant="outlined"
                    label={`${fbt('Description', '')}`}
                    multiline
                    rows={4}
                    fullWidth
                    name={'flowDescription'}
                    value={flowDescription || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </FormControl>
          </DialogContent>
        </div>
        <DialogActions>
          <Button
            className={classes.btnOutlined}
            color="primary"
            onClick={() => openModal()}>
            Cancel
          </Button>
          <Button>Save</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EditFlowDialog;
