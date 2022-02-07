/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';

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

import RelayEnvironment from '../../common/RelayEnvironment';
import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

import AddResourceRelationshipsMutation from '../../mutations/AddResourceRelationshipsMutation';

import {GroupSelectClassRelationships} from './GroupSelectClassRelationships';
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
  query AddRelationshipsTypeFormQuery($filterBy: [ResourceTypeFilterInput!]) {
    resourceTypes(filterBy: $filterBy) {
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
  const [showChecking, setShowChecking] = useState(false);
  const [relationships, setRelationships] = useState<Resources>({data: {}});
  const [dataQuery, setDataQuery] = useState({data: {}});
  const [dataQuery2, setDataQuery2] = useState({data: {}});
  const [filterR, setFilterR] = useState({});

  useEffect(() => {
    data();
  }, []);

  const data = () => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {}).then(data => {
      setFilterR(data);
    });
  };

  const isCompleted2 = id => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS_ONE_OF',
          idSet: [id],
        },
      ],
    }).then(data => {
      setDataQuery(data);
    });
  };
  const isCompleted3 = id => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS_ONE_OF',
          idSet: [id],
        },
      ],
    }).then(data => {
      setDataQuery2(data);
    });
  };

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

  const handleHasError = !relationships?.data?.resourceTypeA
    ? ''
    : relationships?.data?.resourceTypeA === relationships?.data?.resourceTypeB
    ? true
    : false;
  const handleDisable = useDisabledButtonSelect(
    relationships.data,
    4,
    handleHasError,
  );

  const helperText = !relationships?.data?.resourceTypeA
    ? ''
    : relationships?.data?.resourceTypeA === relationships?.data?.resourceTypeB
    ? 'Resource name existing'
    : '';
  // debugger;
  console.log('ERROR   ', handleHasError);
  console.log('NAME   ', helperText);
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
          id="standard-select-currency-native"
          select
          className={classes.select}
          label="CLASE A"
          // onChange={handleChange}
          name="classTypeA"
          variant="outlined"
          defaultValue="">
          {filterR.resourceTypes?.edges.map((item, index) => (
            <MenuItem
              key={index}
              value={item.node.resourceTypeClass.id}
              onClick={() => isCompleted2(item.node.resourceTypeClass.id)}>
              {item.node.resourceTypeClass.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.select}
          label="RESOURCE TYPE A"
          onChange={handleChange}
          name="resourceTypeA"
          variant="outlined"
          value={relationships?.data?.resourceTypeA}
          error={handleHasError}
          helperText={helperText}>
          {dataQuery.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="standard-select-currency-native"
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
          id="standard-select-currency-native"
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
          id="standard-select-currency-native"
          select
          className={classes.select}
          label="CLASE B"
          // onChange={handleChange}
          name="classTypeB"
          variant="outlined"
          defaultValue="">
          {filterR.resourceTypes?.edges.map((item, index) => (
            <MenuItem
              key={index}
              value={item.node.resourceTypeClass.id}
              onClick={() => isCompleted3(item.node.resourceTypeClass.id)}>
              {item.node.resourceTypeClass.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.select}
          label="RESOURCE TYPE B"
          onChange={handleChange}
          name="resourceTypeB"
          variant="outlined"
          defaultValue=""
          error={handleHasError}
          helperText={helperText}>
          {dataQuery2.resourceTypes?.edges.map((item, index) => (
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
