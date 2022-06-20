/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ParameterTypesTableDispatcher from '../form/context/property_types/ParameterTypesTableDispatcher';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import inventoryTheme from '../../common/theme';
import {makeStyles} from '@material-ui/styles';
import {useContext} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  dialogActions: {
    padding: '0 24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  option: {
    width: '111px',
    height: '36px',
  },
  textarea: {
    minHeight: '60px',
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
}));

type Props = $ReadOnly<{|
  deleteItem?: () => void,
  title?: string,
  open?: boolean,
  parameter: any,
  onClose: () => void,
  parameterTypes?: any,
|}>;

const DialogConfirmDelete = (props: Props) => {
  const {onClose, deleteItem, title, parameter} = props;
  const {dispatch} = useContext(ParameterTypesTableDispatcher);

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <Card variant={'none'}>
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}>
          <Text useEllipsis={true} weight={'bold'} variant={'h6'}>
            {title}
          </Text>
          <IconButton
            style={{
              position: 'relative',
              top: '0px',
              right: '0px',
            }}
            onClick={onClose}
            size={'small'}>
            <CloseIcon color="action" />
          </IconButton>
        </Grid>
        <Grid
          style={{
            display: 'flex',
            marginBottom: '30px',
          }}>
          <Text useEllipsis={true} variant={'subtitle1'} weight={'regular'}>
            Parameter:
          </Text>
          <Text
            style={{
              marginLeft: '10px',
            }}
            useEllipsis={true}
            color={'primary'}>
            {parameter?.name}
          </Text>
        </Grid>
        <Text
          style={{
            marginBottom: '18px',
          }}
          useEllipsis={true}
          variant={'subtitle2'}>
          Add In or Out regular expressions for data processing
        </Text>
        <Grid>
          <Text
            style={{
              margin: '0 0 10px 10px',
            }}
            useEllipsis={true}
            weight={'bold'}>
            In
          </Text>
        </Grid>
        <Grid
          style={{
            marginBottom: '25px',
          }}>
          <TextInput
            autoFocus={true}
            type="multiline"
            rows={4}
            placeholder="Text"
            autoComplete="off"
            value={parameter?.mappingIn}
            className={classes.input}
            onChange={({target}) =>
              dispatch({
                type: 'UPDATE_PARAMETER_TYPE_TEXT_IN',
                id: parameter.id,
                mappingIn: target.value,
              })
            }
            onBlur={() =>
              dispatch({
                type: 'UPDATE_PARAMETER_TYPE_TEXT_IN',
                id: parameter.id,
                mappingIn: parameter.mappingIn.trim(),
              })
            }
          />
        </Grid>
        <Grid>
          <Text
            style={{
              margin: '0 0 10px 10px',
            }}
            useEllipsis={true}
            weight={'bold'}>
            Out
          </Text>
        </Grid>
        <TextInput
          autoFocus={true}
          type="multiline"
          rows={4}
          placeholder="Text"
          autoComplete="off"
          value={parameter?.mappingOut}
          className={classes.input}
          onChange={({target}) =>
            dispatch({
              type: 'UPDATE_PARAMETER_TYPE_TEXT_OUT',
              id: parameter.id,
              mappingOut: target.value,
            })
          }
          onBlur={() =>
            dispatch({
              type: 'UPDATE_PARAMETER_TYPE_TEXT_OUT',
              id: parameter.id,
              mappingOut: parameter.mappingOut.trim(),
            })
          }
        />
        <Grid />
      </Card>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
            deleteItem();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmDelete;
