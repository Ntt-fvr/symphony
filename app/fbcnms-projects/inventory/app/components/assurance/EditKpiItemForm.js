/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import fbt from 'fbt';

// COMPONENTS //
import {useFormInput} from './common/useFormInput';
import Table from './Table';

// MUTATIONS //
import TextInput from '@symphony/design-system/components/Input/TextInput';
import type {EditKpiMutationVariables} from '../../mutations/__generated__/EditKpiMutation.graphql';
import EditKpiMutation from '../../mutations/EditKpiMutation';

// DESING SYSTEM //
import {FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitle from '@fbcnms/ui/components/ConfigureTitle';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  textInput: {
    minHeight: '36px',
  },
  addKpi: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  select:{
    paddingTop: '10px',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px'
  },
}));

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    domainFk: string,
    status: boolean,
  },
  hideEditKpiForm: any,
  kpi: object,
|}>;

export const EditKpiItemForm = (props: Props) => {
  const {formValues, kpi, hideEditKpiForm} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const domainFk = useFormInput(formValues.domainFk);
  const id = useFormInput(formValues.id);
  
  const handleClick = () => {
    const variables: EditKpiMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        domainFk: domainFk.value,
        status: true,
      },
    };
    EditKpiMutation(variables);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitle
            className={classes.title}
            title={fbt('KPI Catalog', ' ')}
            subtitle={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader>Edit container detail</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <FormField className={classes.formField} label="Name" required>
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField label="Domain" className={classes.formField} required>
                  <Select
                    {...domainFk}
                    variant="outlined"
                    className={classes.select}
                    inputProps={{
                      name: 'Domain',
                    }}>
                    
                    {kpi.map((kpidata, index) => (
                      <MenuItem key={index} value={kpidata.domainFk.id}> {kpidata.domainFk.name} </MenuItem>
                    ))}
                  </Select>
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  className={classes.formField}
                  label="Network Manager System"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="AssociatedThreshold"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  className={classes.formField}
                  label="Category"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="Category"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  className={classes.formField}
                  label="Maturity"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="Maturity"
                    type="string"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField className={classes.formField} label="Unit" required>
                  <TextInput
                    className={classes.textInput}
                    name="Unit"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField className={classes.formField} label="Id" required>
                  <TextInput
                    {...id}
                    className={classes.textInput}
                    name="Id"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Description"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="Description"
                    type="string"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button 
                    className={classes.addKpi}
                    onClick={() => {
                      handleClick();
                      hideEditKpiForm();
                    }}
                    >
                    Save
                  </Button>
                </FormField>
              </Grid>
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addKpi}
                    onClick={hideEditKpiForm}
                    skin="brightGray">
                    Cancel
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Card>
              <CardHeader>Formulas contained</CardHeader>
              <Table />
            </Card>
        </Grid>
      </Grid>
    </div>
  );
};
