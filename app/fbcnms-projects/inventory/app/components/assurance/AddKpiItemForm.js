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

// COMPONENTS //
import CounterAddedSuccessfully from './CounterAddedSuccessfully';

// MUTATIONS //
import type {AddKpiMutationVariables} from '../../mutations/__generated__/AddKpiMutation.graphql';
import AddKpiMutation from '../../mutations/AddKpiMutation';

// DESING SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  formField: {
    margin: '0 20px 22px 20px',
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
  kpi: Object,
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
      <CardHeader className={classes.header}>Add KPI</CardHeader>
      <FormField className={classes.formField} label="Kpi name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Category" required>
        <TextInput
          className={classes.textInput}
          name="category"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Status" required>
        <TextInput
          className={classes.textInput}
          name="status"
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
