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
import AddedSuccessfullyMessage from './../assurance/common/AddedSuccessfullyMessage';

// MUTATIONS //
import type {AddResourceTypeFormQuery} from './__generated__/AddResourceTypeFormQuery.graphql';

import type {AddResourceTypeMutationVariables} from '../../mutations/__generated__/AddResourceTypeMutation.graphql';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';

import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

import AddResourceTypeMutation from '../../mutations/AddResourceTypeMutation';

import {useDisabledButton} from './../assurance/common/useDisabledButton';
import {useLazyLoadQuery} from 'react-relay/hooks';

// const AddResourcesQuery = graphql`
//   query AddResourceTypeFormQuery {
//     resourceTypeClasses {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//     resourceTypeBaseTypes {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `;

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    marginLeft: '14px',
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0 0 0',
    },
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
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
  header: {
    margin: '20px 0 24px 0',
  },
  addResource: {
    margin: '15px 0',
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
  resourceNames?: Array<Node>,
|}>;

type Resources = {
  data: {
    name: string,
    class: string,
    resourceTypeClass: string,
  },
};

export default function AddRelationshipTypeForm(props: Props) {
  const {isCompleted, resourceNames} = props;
  const classes = useStyles();
  const [resources, setResources] = useState<Resources>({data: {}});
  const [showChecking, setShowChecking] = useState(false);

  // const data = useLazyLoadQuery<AddResourceTypeFormQuery>(
  //   AddResourcesQuery,
  //   {},
  // );

  // const names = resourceNames?.map(item => item.node.name);

  // const handleDisable = useDisabledButton(resources.data, names, 3);

  // const handleHasError = useMemo(
  //   () => names?.some(item => item === resources.data.name),
  //   [names, resources.data.name],
  // );

  function handleChange({target}) {
    setResources({
      data: {
        ...resources.data,
        [target.name]: target.value.trim(),
      },
    });
  }

  function handleClick() {
    const variables: AddResourceTypeMutationVariables = {
      input: {
        name: resources.data.name,
        resourceTypeClassFk: resources.data.class,
        resourceTypeBaseTypeFk: resources.data.resourceTypeClass,
      },
    };
    setShowChecking(true);
    AddResourceTypeMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setResources({data: {}});
      },
    });
  }

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        card_header="Add Resource Type"
        title="Resource"
        text_button="Add new resource"
        setReturn={setReturn}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Resource Type</CardHeader>
      <form className={classes.formField} autoComplete="off">
        <TextField
          required
          select
          className={classes.select}
          label="Select base type A"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeClasses.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select resource type A"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeClasses.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select relationship type"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeClasses.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select relationship multiplicity"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeBaseTypes.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select base type B"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeClasses.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select resource type B"
          onChange={handleChange}
          name=""
          variant="outlined"
          defaultValue="">
          {/* {data.resourceTypeClasses.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))} */}
        </TextField>
      </form>
      <FormField>
        <Button
          className={classes.addResource}
          onClick={handleClick}
          // disabled={handleDisable}
        >
          Add Relationship
        </Button>
      </FormField>
    </Card>
  );
}
