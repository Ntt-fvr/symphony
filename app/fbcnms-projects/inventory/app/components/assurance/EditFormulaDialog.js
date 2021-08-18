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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';

import type {EditFormulaMutationVariables} from '../../mutations/__generated__/EditFormulaMutation.graphql';

import CloseIcon from '@material-ui/icons/Close';
import EditFormulaMutation from '../../mutations/EditFormulaMutation';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  dialogTitle: {
    padding: '24px',
    paddingBottom: '16px',
  },
  dialogContent: {
    padding: '2rem',
    height: '250px',
  },
  dialogActions: {
    padding: '24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  time: {
    marginTop: '2rem',
  },
  option: {
    width: '150px',
    height: '40px',
  },
}));

/*type Formula = {
  data: {
    kpi: string,
    vendors: string,
    technology: string,
  },
};
 */

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  dataFormula: any,
|}>;

const EditFormulaDialog = (props: Props) => {
  const {onClose, dataFormula} = props;
  const classes = useStyles();
  const textFormula = useFormInput(dataFormula.data.textFormula);

  function handleClick() {
    const variables: EditFormulaMutationVariables = {
      input: {
        id: dataFormula.data.formula,
        textFormula: textFormula.value,
        status: true,
        techFk: '270582939648',
        kpiFk: dataFormula.data.kpiId,
      },
    };
    EditFormulaMutation(variables);
  }

  return (
    <Dialog
      maxWidth="lg"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <DialogActions>
        <Button onClick={onClose} skin="regular">
          <CloseIcon fontSize="small" color="action" />
        </Button>
      </DialogActions>
      <DialogTitle className={classes.dialogTitle}>
        <Text variant="h4">Edit Formula</Text>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Text weight="bold">Formula: </Text>
            <Text>{dataFormula.data.formula}</Text>
            <br />
            <Text weight="bold">KPI: </Text>
            <Text>{dataFormula.data.kpiFk}</Text>
          </Grid>
          <Grid item xs={9}>
            <FormField label="Formula">
              <TextInput
                {...textFormula}
                autoComplete="off"
                name="formula"
                type="multiline"
                rows={7}
              />
            </FormField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClick();
            onClose();
          }}>
          Edit Formula
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFormulaDialog;
