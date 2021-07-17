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

import AddedSuccessfullyMessage from './AddedSuccessfullyMessage';

import type {AddTresholdMutationVariables} from '../../mutations/__generated__/AddTresholdMutation.graphql';

import AddTresholdMutation from '../../mutations/AddTresholdMutation';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {MenuItem, Select} from '@material-ui/core';

import {makeStyles} from '@material-ui/styles';
import type {AddThresholdItemFormQuery} from './__generated__/AddThresholdItemFormQuery.graphql';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {graphql} from 'react-relay';

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
    width: '120px',
    alignSelf: 'flex-end',
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


const KpiDataFormTresholdQuery = graphql`
  query AddThresholdItemFormQuery {
    kpis {
      edges {
        node {
          id
          name
          status
          domainFk {
            id
            name
          }
        }
      }
    }
  }
`;


type Props = $ReadOnly<{|
  dataValues: Array<string>,
|}>;


type Thresholds = {
  data: {
    id: string,
    name: string,
    status: boolean,
    description: string,
    kpi: string
  },
};

export default function AddThresholdItemForm(props: Props) {
  const {dataValues} = props;
  const classes = useStyles();

  const [tresholds, setTresholds] = useState<Thresholds>({data: {}});
  const [showChecking, setShowChecking] = useState(false);
  const [activate, setActivate] = useState('');
  const response = useLazyLoadQuery<AddThresholdItemFormQuery>(KpiDataFormTresholdQuery, {});
  const kpiResponse = response.kpis?.edges.map(item => item.node)

  // const inputFilter = () => {
  //   return dataValues?.filter(item => item === kpis.data.name) || [];
  // };
  
  function handleChange({target}) {
    setTresholds({
      data: {
        ...tresholds.data,
        [target.name]: target.value,
      },
    });
    
    // const validateInputs = Object.values(kpis.data);
    // validateInputs.map(item => item != null) &&
    // validateInputs.length === 5 &&
    // setActivate(validateInputs);

  }
  

  function handleClick() {
    const variables: AddTresholdMutationVariables = {
      input: {
        name: tresholds.data.name,
        status: true,
        description: tresholds.data.description,
        kpi: tresholds.data.kpi,
      },
    };
    setShowChecking(true);
    AddTresholdMutation(variables);
  }
  // const validationName = () => {
  //   if (inputFilter().length > 0) {
  //     return {hasError: true, errorText: 'Kpis existing'};
  //   }
  // };

  if (showChecking) {
    return <AddedSuccessfullyMessage data_entry="threshold" card_header="Add Treshold" title="Treshold" text_button="Add new treshold"/>;
  }

  return (
    <Card className={classes.root}>
      <CardHeader>Add Threshold</CardHeader>
      <FormField className={classes.formField} label="Threshold Name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="ID" required>
        <TextInput
          className={classes.textInput}
          type="string"
          disabled
        />
      </FormField>
      <FormField label="Associated KPI" className={classes.formField}>
        <Select
          variant="outlined"
          className={classes.select}
          onChange={handleChange}
          inputProps={{
            name: 'kpi',
          }}>
          {kpiResponse.map((kpiDataResponse, index) => (
            <MenuItem key={index} value={kpiDataResponse.id}>
              {kpiDataResponse.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Description" required>
        <TextInput
          className={classes.textInput}
          name="description"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button className={classes.addCounter} onClick={handleClick}>Add Threshold</Button>
      </FormField>
    </Card>
  );
}
