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
import AddedSuccessfullyMessage from './common/AddedSuccessfullyMessage';

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

import TextField from '@material-ui/core/TextField';
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
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  textInput: {
    minHeight: '36px',
  },
  header: {
    margin: '20px 0 24px 0',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
  },
  select: {
    width: '100%',
  },
}));

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
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
  const {isCompleted, counterNames} = props;
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
    console.log(counters.data);
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
    AddCounterMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setCounters({data: {}});
      },
    });
  }

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        card_header="Add Counter"
        title="Counter"
        text_button="Add new counter"
        setReturn={setReturn}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Counter</CardHeader>
      <form className={classes.formField} autoComplete="off">
        <TextField
          required
          className={classes.input}
          id="counter-name"
          label="Counter name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          error={names?.some(item => item === counters.data.name)}
          helperText={
            names?.some(item => item === counters.data.name)
              ? 'Counter name existing'
              : ''
          }
        />
        <TextField
          required
          className={classes.input}
          id="counter-id"
          label="Counter ID"
          variant="outlined"
          name="id"
          onChange={handleChange}
        />
        <TextField
          required
          id="outlined-select-family"
          select
          className={classes.select}
          label="Family name"
          onChange={handleChange}
          name="family"
          variant="outlined">
          {data.counterFamilies.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-vendor"
          select
          className={classes.select}
          label="Vendor name*"
          onChange={handleChange}
          name="vendor"
          variant="outlined">
          {data.vendors.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          className={classes.input}
          id="network-manager-system"
          label="Network Manager System"
          variant="outlined"
          name="nms"
          onChange={handleChange}
        />
      </form>
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
