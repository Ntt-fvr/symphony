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

import type {AddCounterMutationVariables} from '../../mutations/__generated__/AddCounterMutation.graphql';

import Button from '@symphony/design-system/components/Button';
import CounterAddedSuccessfully from './CounterAddedSuccessfully';

import AddCounterMutation from '../../mutations/AddCounterMutation';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import fbt from 'fbt';

import Text from '@symphony/design-system/components/Text';
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
export default function AddCounterItemForm(props) {
  const classes = useStyles();

  const [counters, setCounters] = useState({data: {}});
  const [showChecking, setShowChecking] = useState();
  const [activate, setActivate] = useState('');

  const nameValidate = counters.data.name;
  const inputFilter = props.dataValues.filter(
    item => item.node.name === nameValidate,
  );

  function handleChange({target}) {
    setCounters({
      data: {
        ...counters.data,
        [target.name]: target.value,
      },
    });

    const validateInputs = Object.values(counters.data);
    validateInputs.map(item => item != null) &&
      validateInputs.length == 5 &&
      setActivate(validateInputs);
  }
  function handleClick() {
    const variables: AddCounterMutationVariables = {
      input: {
        name: counters.data.family,
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
      <FormField
        className={classes.formField}
        label={
          inputFilter[0] ? (
            <Text className={classes.buttonText} variant="body2" color="error">
              {fbt('Counter name existing', '')}
            </Text>
          ) : (
            'Counter name'
          )
        }
        required>
        <TextInput
          className={classes.textInput}
          name="name"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Counter ID" required>
        <TextInput
          className={classes.textInput}
          name="id"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Family name" required>
        <TextInput
          className={classes.textInput}
          name="family"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Vendor name" required>
        <TextInput
          className={classes.textInput}
          name="vendor"
          variant="outlined"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField
        className={classes.formField}
        label="Network Manager System"
        required={true}>
        <TextInput
          className={classes.textInput}
          variant="outlined"
          name="nms"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={!activate}>
          Add Counter
        </Button>
      </FormField>
    </Card>
  );
}
