/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddResourceRelationshipsMutationVariables} from '../../mutations/__generated__/AddResourceRelationshipsMutation.graphql';

import AddResourceRelationshipsMutation from '../../mutations/AddResourceRelationshipsMutation';
import AddedSuccessfullyMessage from './../assurance/common/AddedSuccessfullyMessage';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonSelect} from './../assurance/common/useDisabledButton';

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
  addRelationship: {
    margin: '15px 0',
    alignSelf: 'flex-end',
  },
  selectForm: {
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

type Props = $ReadOnly<{|
  isCompleted: void => void,
|}>;

type Relationship = {
  data: {
    resourceRelationshipMultiplicity: string,
    resourceRelationshipTypes: string,
    resourceTypeA: string,
    resourceTypeB: string,
  },
};

const AddRelationshipsTypeForm = (props: Props) => {
  const {isCompleted} = props;
  const classes = useStyles();
  const [showChecking, setShowChecking] = useState(false);
  const [relationships, setRelationships] = useState<Relationship>({data: {}});
  const [resourceTypeA, setResourceTypeA] = useState({data: {}});
  const [resourceTypeB, setResourceTypeB] = useState({data: {}});
  const [filter, setFilter] = useState({});

  useEffect(() => {
    data();
  }, []);

  const data = () => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {}).then(data => {
      setFilter(data);
    });
  };

  const filterClassA = id => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS_ONE_OF',
          idSet: [id],
        },
      ],
    }).then(data => {
      setResourceTypeA(data);
    });
  };
  const filterClassB = id => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS_ONE_OF',
          idSet: [id],
        },
      ],
    }).then(data => {
      setResourceTypeB(data);
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

  const handleHasError =
    relationships?.data?.resourceTypeA === undefined &&
    relationships?.data?.resourceTypeB === undefined
      ? false
      : relationships?.data?.resourceTypeA ===
        relationships?.data?.resourceTypeB
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
    ? 'Relationship same'
    : '';

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        card_header="Add Relationship"
        title="Relationship"
        text_button="Add new Relationship"
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
          className={classes.selectForm}
          label="Select resource class type A"
          name="classTypeA"
          variant="outlined"
          defaultValue="">
          {filter.resourceTypes?.edges.map((item, index) => (
            <MenuItem
              key={index}
              value={item.node.resourceTypeClass.id}
              onClick={() => filterClassA(item.node.resourceTypeClass.id)}>
              {item.node.resourceTypeClass.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.selectForm}
          label="Search resource type A"
          onChange={handleChange}
          name="resourceTypeA"
          variant="outlined"
          defaultValue=""
          error={handleHasError}
          helperText={helperText}>
          {resourceTypeA.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.selectForm}
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
          className={classes.selectForm}
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
          className={classes.selectForm}
          label="Select resource class type B"
          name="classTypeB"
          variant="outlined"
          defaultValue="">
          {filter.resourceTypes?.edges.map((item, index) => (
            <MenuItem
              key={index}
              value={item.node.resourceTypeClass.id}
              onClick={() => filterClassB(item.node.resourceTypeClass.id)}>
              {item.node.resourceTypeClass.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.selectForm}
          label="Search resource type B"
          onChange={handleChange}
          name="resourceTypeB"
          variant="outlined"
          defaultValue=""
          error={handleHasError}
          helperText={helperText}>
          {resourceTypeB.resourceTypes?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node.id}>
              {item.node.name}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <FormField>
        <Button
          className={classes.addRelationship}
          onClick={handleClick}
          disabled={handleDisable}>
          Add Relationship
        </Button>
      </FormField>
    </Card>
  );
};
export {AddRelationshipsTypeForm};
