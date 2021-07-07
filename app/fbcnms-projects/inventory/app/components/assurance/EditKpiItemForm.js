/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {EditKpiMutationVariables} from '../../mutations/__generated__/EditKpiMutation.graphql';

import EditKpiMutation from '../../mutations/EditKpiMutation';

import {FormControl, Select, InputLabel, MenuItem} from '@material-ui/core';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitle from '@fbcnms/ui/components/ConfigureTitle';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';
import Table from './Table';

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
  formValues: object,
  onClose: void,
  kpi: object,
|}>;

export const EditKpiItemForm = (props: Props) => {
  const {formValues, onClose, kpi} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.Name);
  const domainFk = useFormInput(formValues.DomainFk);
  const id = useFormInput(formValues.Id);

  function handleClick() {
    const variables: EditKpiMutationVariables = {
      input: {
        id: formValues.Id,
        name: name.value,
        domainFk: domainFk.value,
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
            title={fbt('Kpis catalog', ' ')}
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
                    variant="outlined"
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
                    
                    {kpi.kpis.edges.map((kpidata, index) => (
                      <MenuItem key={index} value={kpidata.node.domainFk.id}> {kpidata.node.domainFk.name} </MenuItem>
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
                    variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
                    type="string"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button onClick={handleClick} className={classes.addKpi}>
                    Save
                  </Button>
                </FormField>
              </Grid>
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    onClick={onClose}
                    className={classes.addKpi}
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
