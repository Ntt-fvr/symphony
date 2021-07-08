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
import AddCounterMutation from '../../mutations/AddCounterMutation';
import type {AddCounterMutationVariables} from '../../mutations/__generated__/AddCounterMutation.graphql';

// DESING SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  formField: {
    margin: '0 20px 22px 20px',
  },
  textInput: {
    minHeight: '36px',
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
}));

export default function AddCounterItemForm() {
  const classes = useStyles();

  const [counters, setCounters] = useState({data: {}});
  const [showChecking, setShowChecking] = useState(false);

  function handleChange({target}) {
    setCounters({
      data: {
        ...counters.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddCounterMutationVariables = {
      input: {
        name: counters.data?.family,
        counter: [
          {
            name: counters.data.name,
            externalID: counters.data.id,
            networkManagerSystem: counters.data.nms,
          },
        ],
      },
    };

    setShowChecking(true);
    AddCounterMutation(variables);
  }

  if (showChecking) {
    return <CounterAddedSuccessfully />;
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Counter</CardHeader>
      <FormField className={classes.formField} label="Counter name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Counter ID" required>
        <TextInput
          className={classes.textInput}
          name="id"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Family name" required>
        <TextInput
          className={classes.textInput}
          name="family"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Vendor name" required>
        <TextInput
          className={classes.textInput}
          name="vendor"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField
        className={classes.formField}
        label="Network Manager System"
        required>
        <TextInput
          className={classes.textInput}
          name="nms"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button className={classes.addCounter} onClick={handleClick}>
          Add Counter
        </Button>
      </FormField>
    </Card>
  );
}
