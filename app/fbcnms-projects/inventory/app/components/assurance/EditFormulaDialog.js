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

import type {EditFormulaMutationVariables} from '../../mutations/__generated__/EditFormulaMutation.graphql';

import type {EditCounterFormulaMutationVariables} from '../../mutations/__generated__/EditCounterFormulaMutation.graphql';

import Chip from '@material-ui/core/Chip';
import CloseIcon from '@material-ui/icons/Close';
import EditCounterFormulaMutation from '../../mutations/EditCounterFormulaMutation';
import EditFormulaMutation from '../../mutations/EditFormulaMutation';
import FormField from '@symphony/design-system/components/FormField/FormField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Switch from '@symphony/design-system/components/switch/Switch';
import TextField from '@material-ui/core/TextField';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  icon: {
    fontsize: '10px',
  },
  dialogContent: {
    overflow: 'hidden',
    height: '50vh',
  },
  option: {
    width: '150px',
    height: '40px',
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
  textArea: {
    width: '100%',
    height: '100%',
    '& .MuiOutlinedInput-multiline': {
      height: '49vh',
      '& textarea': {
        height: '100% !important',
      },
    },
  },
  styleSearch: {
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 120px)',
    },
    height: 'calc(100% - 100px)',
    width: '100%',
    paddingBottom: '1.5rem',
    overflow: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#9DA9BE',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: '#999999',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#313C48',
      boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar-track': {
      background: '#e5e5e5',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track:hover, &::-webkit-scrollbar-track:active': {
      background: '#d4d4d4',
    },
  },
}));

type TextFormula = {
  formula: string,
  search: string,
};

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  dataFormula: any,
  isCompleted: void => void,
  dataCounter: any,
|}>;

const EditFormulaDialog = (props: Props) => {
  const {onClose, dataFormula, isCompleted} = props;
  const dataCounterFormula = dataFormula.data.counterformulaFk;
  const [checkedItems, setCheckedItems] = useState(
    dataCounterFormula.map(item => {
      return {...item, checked: item.mandatory};
    }),
  );

  const [textFormulaSearch, setTextFormulaSearch] = useState<TextFormula>({});
  const classes = useStyles();
  const textFormula = useFormInput(dataFormula.data.textFormula);
  const statusCheck = useFormInput(dataFormula.data.status);
  function handleChange({target}) {
    setTextFormulaSearch({
      ...textFormulaSearch,
      [target.name]: target.value,
    });
  }

  const searchCountersFiltered = !textFormulaSearch.search
    ? dataCounterFormula
    : dataCounterFormula?.filter(item =>
        item.counterFk?.name
          .toString()
          .toLowerCase()
          .includes(textFormulaSearch.search.toLocaleLowerCase()),
      );

  function onDragStart(e, v) {
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/plain', v);
  }

  function handleClick() {
    const variables: EditFormulaMutationVariables = {
      input: {
        id: dataFormula.data.formula,
        textFormula: textFormula.value,
        status: Boolean(statusCheck.value),
        techFk: dataFormula.data.tech,
        kpiFk: dataFormula.data.kpiId,
        networkTypeFk: dataFormula.data.networkTypes,
      },
    };
    EditFormulaMutation(variables, {onCompleted: () => isCompleted()});
  }

  const handleChangeCheck = (checked, item) => {
    const variables: EditCounterFormulaMutationVariables = {
      input: {
        id: item.id,
        mandatory: checked,
        counterFk: item.counterFk.id,
        formulaFk: item.formulaFk.id,
      },
    };
    EditCounterFormulaMutation(variables, {
      onCompleted: () =>
        setCheckedItems([
          ...checkedItems.filter(oldItem => item.id !== oldItem.id),
          {...item, checked},
        ]),
    });
  };

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
      <DialogTitle>
        <Grid container>
          <Grid item xs={5}>
            <Text variant="h6">Edit Formula</Text>
          </Grid>
          <Grid item xs={7}>
            <TextField
              placeholder="Add counter"
              color="primary"
              type="text"
              className={classes.textField}
              variant="outlined"
              name="search"
              autoComplete="off"
              onChange={handleChange}
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
          <Grid item xs={5} style={{height: '50vh'}}>
            <Text variant="body2" weight="regular">
              Press the counter to add it to the expression. You can use your
              keyboard or the buttons on the screen to add math symbols and
              numbers.
            </Text>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              style={{margin: '1rem auto'}}>
              <Grid item xs={3} lg={2} style={{lineHeight: '0px'}}>
                <Text variant="caption" color="lightBlue">
                  Mandatory counter
                </Text>
              </Grid>
              <Grid item xs style={{lineHeight: '0px'}}>
                <Text variant="caption" color="lightBlue">
                  Name counter
                </Text>
              </Grid>
            </Grid>

            <Grid className={classes.styleSearch}>
              {searchCountersFiltered.map((item, index) => {
                return (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={3} lg={2}>
                      <Switch
                        title={''}
                        checked={
                          checkedItems.find(
                            itemChecked => item.id === itemChecked.id,
                          ).checked
                        }
                        onChange={checked => handleChangeCheck(checked, item)}
                      />
                    </Grid>
                    <Grid item xs={9} lg={10}>
                      <Chip
                        color="primary"
                        key={index}
                        label={item.counterFk?.name}
                        style={{
                          backgroundColor: item.color,
                          color: symphony.palette.white,
                          fontWeight: '500',
                        }}
                        draggable="true"
                        onDragStart={e => onDragStart(e, item.counterFk?.name)}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <FormField>
              <TextField
                {...textFormula}
                className={classes.textArea}
                name="formula"
                variant="outlined"
                multiline
              />
            </FormField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{height: '100px', paddingRight: '26px'}}>
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
