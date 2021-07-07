/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AddKpiMutation from '../../mutations/AddKpiMutation';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useState} from 'react';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {FormControl, Select, InputLabel, MenuItem} from '@material-ui/core'
import type {AddKpiMutationVariables} from '../../mutations/__generated__/AddKpiMutation.graphql';

import CounterAddedSuccessfully from './CounterAddedSuccessfully';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
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
  kpi: object,
  edit: void,
  onChange: void,
|}>;


export default function AddKpiItemForm(props: Props) {
  const {kpi} = props;
  const classes = useStyles();

  const [kpis, setKpis] = useState({data: {}});
  const [showChecking, setShowChecking] = useState(false);
  function handleChange({target}) {
    setKpis({
      data: {
        ...kpis.data,
        [target.name]: target.value,
      },
    });
  }

  async function handleClick() {
    const variables: AddKpiMutationVariables = {
      input: {
        name: kpis.data.name,
        domainFk: kpis.data.domainFk
      },
    };
    setShowChecking(true);
    AddKpiMutation(variables);
  }
  if (showChecking) {
    return <CounterAddedSuccessfully />;
  }

  return (
    <Card className={classes.root}>
      <CardHeader>Add KPI</CardHeader>
      <FormField className={classes.formField} label="Kpi name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Category" required>
        <TextInput
          className={classes.textInput}
          name="category"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Status" required>
        <TextInput
          className={classes.textInput}
          name="status"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Domain" className={classes.formField}>
        <Select
          variant="outlined"
          className={classes.select}
          onChange={handleChange}
          inputProps={{
            name: 'domainFk',
          }}
        >

          {kpi.kpis.edges.map((kpidata, index) => (
            <MenuItem key={index} value={kpidata.node.domainFk.id}> {kpidata.node.domainFk.name} </MenuItem>
          ))}
        </Select>
      </FormField>
      
      <FormField>
        <Button className={classes.addCounter} onClick={handleClick}>
          Add KPI
        </Button>
      </FormField>
    </Card>
  );
}
