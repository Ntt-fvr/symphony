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
import {FormControl, Select, InputLabel} from '@material-ui/core'
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
      <FormControl variant="outlined" className={classes.formField}>
        <InputLabel htmlFor="outlined-age-native-simple">Domain</InputLabel>
        <Select
          native
          onChange={handleChange}
          label="Domain"
          inputProps={{
            name: 'domainFk',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          {kpi.kpis.edges.map((kpidata, index) => (
            <option key={index} value={kpidata.node.domainFk.id}> {kpidata.node.domainFk.name} </option>
          ))}
        </Select>
      </FormControl>
      
      <FormField>
        <Button className={classes.addCounter} onClick={handleClick}>
          Add KPI
        </Button>
      </FormField>
    </Card>
  );
}
