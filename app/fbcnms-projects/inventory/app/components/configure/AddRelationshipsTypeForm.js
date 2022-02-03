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
import type {ResourceRelationshipTypeKind} from '../../mutations/__generated__/AddResourceRelationshipsMutation.graphql';

// import type {AddResourceTypeFormQuery} from './__generated__/AddResourceTypeFormQuery.graphql';

import type {AddResourceRelationshipsMutationVariables} from '../../mutations/__generated__/AddResourceRelationshipsMutation.graphql';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';

import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

import AddResourceRelationshipsMutation from '../../mutations/AddResourceRelationshipsMutation';

import {useDisabledButtonSelect} from './../assurance/common/useDisabledButton';
import {useLazyLoadQuery} from 'react-relay/hooks';

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

const addRelationshipsTypeForm = graphql`
  query AddRelationshipsTypeFormQuery {
    resourceTypes {
      edges {
        node {
          id
          name
          resourceTypeBaseType {
            id
            name
          }
          resourceTypeClass {
            id
            name
          }
        }
      }
    }
  }
`;

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
  relationshipNames?: Array<Node>,
|}>;

type Resources = {
  data: {
    name: string,
    class: string,
    resourceTypeClass: string,
  },
};

const AddRelationshipsTypeForm = (props: Props) => {
  const {isCompleted} = props;
  const classes = useStyles();
  const [relationships, setRelationships] = useState<Resources>({data: {}});
  const [showChecking, setShowChecking] = useState(false);

  const data = useLazyLoadQuery<AddRelationshipsTypeFormQuery>(
    addRelationshipsTypeForm,
    {},
  );

  // const names = resourceNames?.map(item => item.node.name);

  const handleDisable = useDisabledButtonSelect(relationships.data, 4);

  // const handleHasError = useMemo(
  //   () => names?.some(item => item === resources.data.name),
  //   [names, resources.data.name],
  // );

  function handleChange({target}) {
    setRelationships({
      data: {
        ...relationships.data,
        [target.name]: target.value.trim(),
      },
    });
  }

  function handleClick() {
    const variables: AddResourceRelationshipsMutationVariables = {
      input: {
        resourceRelationshipType: relationships.data.resourceRelationshipTypes,
        resourceRelationshipMultiplicity:
          relationships.data.resourceRelationshipMultiplicity,
        resourceTypeA: relationships.data.resourceTypeA,
        resourceTypeB: relationships.data.resourceTypeB,
      },
    };
    setShowChecking(true);
    AddResourceRelationshipsMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setRelationships({data: {}});
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
      <CardHeader className={classes.header}>Add relationship</CardHeader>
      <form className={classes.formField} autoComplete="off">
        <TextField
          required
          select
          className={classes.select}
          label="Select base type A"
          onChange={handleChange}
          name="baseTypeA"
          variant="outlined"
          defaultValue="">
          {data.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.resourceTypeBaseType.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="resourceTypesA"
          select
          className={classes.select}
          label="Select resource type A"
          onChange={handleChange}
          name="resourceTypeA"
          variant="outlined"
          defaultValue="">
          {data.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-select-currency-native"
          select
          className={classes.select}
          label="Select relationship type"
          onChange={handleChange}
          name="resourceRelationshipTypes"
          variant="outlined"
          defaultValue="">
          <MenuItem value={'BELONGS_TO'}>BELONGS_TO</MenuItem>
          <MenuItem value={'LOCATED_IN'}>LOCATED_IN</MenuItem>
          <MenuItem value={'PHYSICAL_LINK'}>PHYSICAL_LINK</MenuItem>
          <MenuItem value={'LOGICAL_LINK'}>LOGICAL_LINK</MenuItem>
          <MenuItem value={'CROSS_CONNECTION'}>CROSS_CONNECTION</MenuItem>
        </TextField>
        <TextField
          required
          id="outlined-select-currency-native"
          select
          className={classes.select}
          label="Select relationship multiplicity"
          onChange={handleChange}
          name="resourceRelationshipMultiplicity"
          variant="outlined"
          defaultValue="">
          <MenuItem value={'MANY_TO_MANY'}>MANY_TO_MANY</MenuItem>
          <MenuItem value={'MANY_TO_ONE'}>MANY_TO_ONE</MenuItem>
          <MenuItem value={'ONE_TO_MANY'}>ONE_TO_MANY</MenuItem>
          <MenuItem value={'ONE_TO_ONE'}>ONE_TO_ONE</MenuItem>
        </TextField>
        <TextField
          required
          select
          className={classes.select}
          label="Select base type B"
          onChange={handleChange}
          name="baseTypeB"
          variant="outlined"
          defaultValue="">
          {data.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.resourceTypeBaseType.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="resourceTypesB"
          select
          className={classes.select}
          label="Select resource type B"
          onChange={handleChange}
          name="resourceTypeB"
          variant="outlined"
          defaultValue="">
          {data.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <FormField>
        <Button
          className={classes.addResource}
          onClick={handleClick}
          disabled={handleDisable}>
          Add Relationship
        </Button>
      </FormField>
    </Card>
  );
};
export {AddRelationshipsTypeForm};
