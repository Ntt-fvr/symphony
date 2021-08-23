/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useMemo, useState} from 'react';

// COMPONENTS //
import AddedSuccessfullyMessage from './AddedSuccessfullyMessage';

// MUTATIONS //
import type {AddCounterItemFormQuery} from './__generated__/AddCounterItemFormQuery.graphql';
import type {AddCounterMutationVariables} from '../../mutations/__generated__/AddCounterMutation.graphql';

import {useLazyLoadQuery} from 'react-relay/hooks';

import AddCounterMutation from '../../mutations/AddCounterMutation';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';

import TextInput from '@symphony/design-system/components/Input/TextInput';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

const AddCountersQuery = graphql`
  query AddCounterItemFormQuery {
    counterFamilies {
      edges {
        node {
          id
          name
        }
      }
    }
    vendors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

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
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}));

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  counterNames?: Array<Node>,
|}>;

type Counters = {
  data: {
    name: string,
    id: string,
    nms: string,
    family: string,
    vendor: string,
  },
};

export default function AddCounterItemForm(props: Props) {
  const {counterNames} = props;
  const classes = useStyles();
  const [counters, setCounters] = useState<Counters>({data: {}});
  const [showChecking, setShowChecking] = useState();

  const data = useLazyLoadQuery<AddCounterItemFormQuery>(AddCountersQuery, {});
  const names = counterNames?.map(item => item.node.name);

  const handleDisable = useMemo(
    () =>
      !(
        Object.values(counters.data).length === 5 &&
        !Object.values(counters.data).some(item => item === '') &&
        !names?.some(item => item === counters.data.name)
      ),
    [counters.data, names],
  );

  const handleHasError = useMemo(
    () => names?.some(item => item === counters.data.name),
    [names, counters.data.name],
  );

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
        name: counters.data.name,
        externalID: counters.data.id,
        networkManagerSystem: counters.data.nms,
        counterFamily: counters.data.family,
        vendorFk: counters.data.vendor,
      },
    };
    setShowChecking(true);
    AddCounterMutation(variables);
  }

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        data_entry="counter"
        card_header="Add Counter"
        title="Counter"
        text_button="Add new counter"
        names={counterNames}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Counter</CardHeader>
      <FormField
        className={classes.formField}
        label="Counter name"
        required
        hasError={handleHasError}
        errorText={
          names?.some(item => item === counters.data.name)
            ? 'Counter name existing'
            : ''
        }>
        <TextInput
          className={classes.textInput}
          name="name"
          autoComplete="off"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Counter ID" required>
        <TextInput
          className={classes.textInput}
          name="id"
          autoComplete="off"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField className={classes.formField} label="Family name" required>
        <Select
          className={classes.select}
          disableUnderline
          name="family"
          onChange={handleChange}>
          {data.counterFamilies.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Vendor name" required>
        <Select
          className={classes.select}
          disableUnderline
          name="vendor"
          onChange={handleChange}>
          {data.vendors.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField
        className={classes.formField}
        label="Network Manager System"
        required={true}>
        <TextInput
          className={classes.textInput}
          name="nms"
          autoComplete="off"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={handleDisable}>
          Add Counter
        </Button>
      </FormField>
    </Card>
  );
}
