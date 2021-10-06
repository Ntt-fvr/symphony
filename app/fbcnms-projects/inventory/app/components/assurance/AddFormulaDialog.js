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
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';

import type {AddFormulaMutationVariables} from '../../mutations/__generated__/AddFormulaMutation.graphql';

import AddFormulaMutation from '../../mutations/AddFormulaMutation';
import CloseIcon from '@material-ui/icons/Close';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Switch from '@symphony/design-system/components/switch/Switch';

import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import symphony from '@symphony/design-system/theme/symphony';
import {Editor, Element, Frame} from '@craftjs/core';
import {makeStyles} from '@material-ui/styles';
const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  dialogTitle: {
    padding: '0 24px',
  },
  dialogContent: {
    // padding: '2rem',
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
  th: {
    border: 'none',
    'padding-left': 0,
    lineHeight: 'normal',
  },
  thfirst: {
    width: '20%',
    border: 'none',
    lineHeight: 'normal',
    'padding-left': 0,
  },
  textField: {
    width: '70%',
    '& .MuiOutlinedInput-root': {
      color: symphony.palette.D300,
      height: '26px',
      '& .Mui-focused.MuiOutlinedInput-notchedOutline': {
        border: '2px solid black',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '4px',
        borderWidth: '2px',
        borderColor: symphony.palette.D300,
      },
      '& .MuiOutlinedInput-notchedOutline:hover': {
        borderColor: symphony.palette.D100,
      },
    },
  },
}));

type Formula = {
  data: {
    kpi: string,
    vendors: string,
    technology: string,
    network: string,
  },
};

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  dataFormula: Formula,
|}>;

const AddFormulaDialog = (props: Props) => {
  const {onClose, dataFormula} = props;
  const classes = useStyles();
  const [textFormula, setTextFormula] = useState<any>({});

  function handleChange({target}) {
    setTextFormula({
      ...textFormula,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    const variables: AddFormulaMutationVariables = {
      input: {
        textFormula: textFormula.formula,
        status: true,
        techFk: dataFormula.data.technology,
        kpiFk: dataFormula.data.kpi,
        networkTypeFk: dataFormula.data.networkTypes,
      },
    };
    AddFormulaMutation(variables);
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
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Text variant="h6">Build Formula</Text>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Add counter"
              color="primary"
              type="search"
              className={classes.textField}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Text variant="body2" weight="regular">
              Press the counter to add it to the expression. You can use your
              keyboard or the buttons on the screen to add math symbols and
              numbers.
            </Text>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.thfirst}>
                    <Text variant="subtitle4" color="lightBlue">
                      Mandatory counter
                    </Text>
                  </TableCell>
                  <TableCell className={classes.th}>
                    <Text variant="subtitle4" color="lightBlue">
                      Name counter
                    </Text>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Switch
                  className={classes.readRule}
                  checked={true}
                  disabled={false}
                />
                <Switch
                  className={classes.readRule}
                  checked={false}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={10}>
                <Chip
                  key={1}
                  label={'pmRrcConnEstabSucc'}
                  className={classes.chip}
                  color="primary"
                />
                <Chip
                  key={2}
                  label={'pmErabRelAbnormalMmeActQci1'}
                  className={classes.chip}
                  color="secondary"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Editor
              resolver={{
                Text,
              }}>
              <Frame>
                <Element
                  canvas
                  padding={5}
                  background="#eeeeee"
                  data-cy="root-container">
                  <Text variant="body2" weight="regular">
                    ()
                  </Text>
                </Element>
              </Frame>
            </Editor>
            <FormField>
              <TextInput
                autoComplete="off"
                name="formula"
                type="multiline"
                rows={7}
                onChange={handleChange}
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
          Save Formula
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFormulaDialog;
