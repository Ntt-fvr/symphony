/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

// COMPONENTS //
import TableThreshold from './TableThreshold';
import {useFormInput} from './common/useFormInput';

// MUTATIONS //
import type {EditThresholdMutationVariables} from '../../mutations/__generated__/EditThresholdMutation.graphql';

import EditTresholdMutation from '../../mutations/EditThresholdMutation';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Switch from '@symphony/design-system/components/switch/Switch';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from './common/useDisabledButton';
import {useValidationEdit} from './common/useValidation';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 30px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  cardHeader: {
    margin: '20px 43px 22px 40px',
  },
  textInput: {
    minHeight: '36px',
  },
  description: {
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
  },
  action: {
    paddingRight: '1.3rem',
  },
  addThreshold: {
    marginRight: '1rem',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  select: {
    paddingTop: '10px',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}));

type Rule = {
  id: string,
  name: string,
  ruleType: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    description: string,
    status: boolean,
    kpi: {
      id: string,
      name: string,
    },
    rule: Array<Rule>,
  },
  thresholdNames: Array<string>,
  hideEditThresholdForm: void => void,
  editRule: void => void,
  isCompleted: void => void,
|}>;

export const EditThresholdItemForm = (props: Props) => {
  const {
    thresholdNames,
    formValues,
    hideEditThresholdForm,
    editRule,
    isCompleted,
  } = props;
  const classes = useStyles();
  const name = useFormInput(formValues.name);
  const description = useFormInput(formValues.description);
  const [checked, setChecked] = useState(formValues.status);

  const dataInputsObject = [name.value.trim(), description.value.trim()];

  const inputFilter = () => {
    return (
      thresholdNames?.filter(
        item => item === name.value.trim() && item !== formValues.name.trim(),
      ) || []
    );
  };

  const validationName = useValidationEdit(inputFilter, 'Threshold');

  const handleDisable = useDisabledButtonEdit(dataInputsObject, 2, inputFilter);

  const handleClick = () => {
    const variables: EditThresholdMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value.trim(),
        description: description.value.trim(),
        status: checked,
      },
    };
    EditTresholdMutation(variables, {
      onCompleted: () => {
        isCompleted();
        hideEditThresholdForm();
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Threshold Catalog/', 'Threshold Catalog')}
            tag={` ${formValues.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              Edit container detail
            </CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={11} xl={11}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.textInput}
                    label="Name"
                    variant="outlined"
                    name="name"
                    fullWidth
                    {...name}
                    {...validationName}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullWidth
                    className={classes.textInput}
                    label="ID"
                    variant="outlined"
                    name="id"
                    value={formValues?.id}
                    disabled
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullWidth
                    className={classes.textInput}
                    label="Associated KPI"
                    variant="outlined"
                    name="kpi"
                    value={formValues?.kpi.name}
                    disabled
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    multiline
                    rows={3}
                    required
                    className={classes.description}
                    label="Description"
                    variant="outlined"
                    name="description"
                    inputProps={{maxLength: 120}}
                    fullWidth
                    {...description}
                  />
                </form>
              </Grid>
            </Grid>
            <Grid
              className={classes.action}
              item
              xs={12}
              container
              justify="flex-end">
              <FormField>
                <Button
                  className={classes.addThreshold}
                  onClick={() => {
                    handleClick();
                    hideEditThresholdForm();
                  }}
                  disabled={handleDisable}>
                  Save
                </Button>
              </FormField>
              <FormField>
                <Button
                  className={classes.addThreshold}
                  onClick={() => {
                    hideEditThresholdForm();
                  }}
                  skin="brightGray">
                  Cancel
                </Button>
              </FormField>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader>Formulas contained</CardHeader>
            <TableThreshold rule={formValues.rule} editRule={editRule} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
