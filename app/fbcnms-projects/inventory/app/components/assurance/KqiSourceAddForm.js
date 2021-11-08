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
import AddedSuccessfullyMessage from './common/AddedSuccessfullyMessage';

// MUTATIONS //
import type {AddKqiSourceMutationVariables} from '../../mutations/__generated__/AddKqiSourceMutation.graphql';

import AddKqiSourceMutation from '../../mutations/AddKqiSourceMutation';

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
    margin: '0 20px 30px 20px',
  },
  textInput: {
    minHeight: '36px',
  },
  header: {
    margin: '20px 0 30px 20px',
  },
  addCounter: {
    margin: '20px',
    width: '135px',
    alignSelf: 'flex-end',
  },
}));
type Node = {
  node: {
    name: string,
  },
};
type Props = $ReadOnly<{|
  kqiSourcesNames: Array<Node>,
|}>;

type KqiSources = {
  data: {
    id: string,
    name: string,
  },
};

export const KqiSourceAddForm = (props: Props) => {
  const {kqiSourcesNames, isCompleted} = props;
  const classes = useStyles();
  const [kqiSource, setKqiSource] = useState<KqiSources>({data: {}});
  const [showChecking, setShowChecking] = useState();

  const names = kqiSourcesNames?.map(item => item.node.name);

  function handleChange({target}) {
    setKqiSource({
      data: {
        ...kqiSource.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddKqiSourceMutationVariables = {
      input: {
        name: kqiSource.data.name,
      },
    };
    setKqiSource({data: {}});
    setShowChecking(true);
    AddKqiSourceMutation(variables, {onCompleted: () => isCompleted()});
  }

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        card_header="Add KQI Source"
        title="KQI Source"
        text_button="Add new KQI Source"
        setReturn={setReturn}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add KQI Source</CardHeader>
      <FormField
        className={classes.formField}
        label="Name"
        required
        hasError={names?.some(item => item === kqiSource.data.name)}
        errorText={
          names?.some(item => item === kqiSource.data.name)
            ? 'Name existing'
            : ''
        }>
        <TextInput
          className={classes.textInput}
          name="name"
          type="string"
          onChange={handleChange}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={
            !(
              Object.values(kqiSource.data).length === 1 &&
              !Object.values(kqiSource.data).some(item => item === '') &&
              !names?.some(item => item === kqiSource.data.name)
            )
          }>
          Save KQI Source
        </Button>
      </FormField>
    </Card>
  );
};
