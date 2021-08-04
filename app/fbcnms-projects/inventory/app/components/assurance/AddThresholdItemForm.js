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

import AddTresholdMutation from '../../mutations/AddThresholdMutation';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {MenuItem, Select} from '@material-ui/core';

import type {AddThresholdItemFormQuery} from './__generated__/AddThresholdItemFormQuery.graphql';

import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

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
    width: '120px',
    alignSelf: 'flex-end',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
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
        }
      }
    }
  }
`;

type Node = {
  node: {
    name: string,
    kpi: {
      name: string,
      id: string,
    },
  },
};

type Props = $ReadOnly<{|
  thresholdNames?: Array<Node>,
|}>;

type Thresholds = {
  data: {
    id: string,
    name: string,
    status: boolean,
    description: string,
    kpi: string,
  },
};

export default function AddThresholdItemForm(props: Props) {
  const {thresholdNames} = props;
  const classes = useStyles();

  const [thresholds, setThresholds] = useState<Thresholds>({data: {}});
  const [showChecking, setShowChecking] = useState(false);
  const response = useLazyLoadQuery<AddThresholdItemFormQuery>(
    KpiDataFormTresholdQuery,
    {},
  );
  const kpiResponse = response.kpis?.edges.map(item => item.node);
  const names = thresholdNames?.map(item => item.node.name);
  const kpiExisting = thresholdNames?.map(item => item.node.kpi);
  const kpiSelect = kpiResponse.filter(
    item => !kpiExisting?.map(kpi => kpi?.name).includes(item?.name),
  );

  function handleChange({target}) {
    setThresholds({
      data: {
        ...thresholds.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddTresholdMutationVariables = {
      input: {
        name: thresholds.data.name,
        status: true,
        description: thresholds.data.description,
        kpi: thresholds.data.kpi,
      },
    };
    setShowChecking(true);
    AddTresholdMutation(variables);
  }

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        data_entry="threshold"
        card_header="Add Threshold"
        title="Threshold"
        text_button="Add new threshold"
        thresholdNames={thresholdNames}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Threshold</CardHeader>
      <FormField
        className={classes.formField}
        label="Threshold Name"
        hasError={names?.some(item => item === thresholds.data.name)}
        errorText={
          names?.some(item => item === thresholds.data.name)
            ? 'Threshold name existing'
            : ''
        }
        required>
        <TextInput
          className={classes.textInput}
          autoComplete="off"
          name="name"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Associated KPI" className={classes.formField}>
        <Select
          className={classes.select}
          disableUnderline
          name="kpi"
          onChange={handleChange}>
          {kpiSelect.map((kpiDataResponse, index) => (
            <MenuItem key={index} value={kpiDataResponse?.id}>
              {kpiDataResponse?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Description" required>
        <TextInput
          autoComplete="off"
          className={classes.textInput}
          name="description"
          type="multiline"
          rows={4}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={
            !(
              Object.values(thresholds.data).length === 3 &&
              !Object.values(thresholds.data).some(item => item === '') &&
              !names?.some(item => item === thresholds.data.name)
            )
          }>
          Add Threshold
        </Button>
      </FormField>
    </Card>
  );
}
