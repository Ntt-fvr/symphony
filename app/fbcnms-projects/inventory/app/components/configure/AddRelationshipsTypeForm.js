/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddResourceTypeRelationshipMutationVariables} from '../../mutations/__generated__/AddResourceTypeRelationshipMutation.graphql';

import _ from 'lodash';

import AddResourceTypeRelationshipMutation from '../../mutations/AddResourceTypeRelationshipMutation';
import AddedSuccessfullyMessage from './../assurance/common/AddedSuccessfullyMessage';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonSelect} from '../assurance/common/useDisabledButton';

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
          resourceTypeBaseType
          resourceTypeClass
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

const dataSelectorsForm = {
  resourceTypeClass: ['CARD', 'EQUIPMENT', 'PORT', 'RACK', 'SLOT', 'VLAN'],
  resourceRelationshipTypes: [
    'BELONGS_TO',
    'LOCATED_IN',
    'PHYSICAL_LINK',
    'LOGICAL_LINK',
    'CROSS_CONNECTION',
  ],
  resourceRelationshipMultiplicity: [
    'MANY_TO_MANY',
    'MANY_TO_ONE',
    'ONE_TO_MANY',
    'ONE_TO_ONE',
  ],
};

const AddRelationshipsTypeForm = (props: Props) => {
  const {isCompleted} = props;
  const classes = useStyles();
  const [showChecking, setShowChecking] = useState(false);
  const [relationships, setRelationships] = useState<Relationship>({data: {}});
  const [resourceTypeA, setResourceTypeA] = useState({data: {}});
  const [resourceTypeB, setResourceTypeB] = useState({data: {}});

  const filterClassA = baseTypeA => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS',
          typeClassValue: baseTypeA.target.value,
        },
      ],
    }).then(data => {
      setResourceTypeA(data);
    });
  };
  const filterClassB = baseTypeB => {
    fetchQuery(RelayEnvironment, addRelationshipsTypeForm, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS',
          typeClassValue: baseTypeB.target.value,
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
    const variables: AddResourceTypeRelationshipMutationVariables = {
      input: {
        resourceRelationshipType: relationships.data.resourceRelationshipTypes,
        resourceRelationshipMultiplicity:
          relationships.data.resourceRelationshipMultiplicity,
        resourceTypeA: relationships.data.resourceTypeA,
        resourceTypeB: relationships.data.resourceTypeB,
      },
    };
    setShowChecking(true);
    AddResourceTypeRelationshipMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setRelationships({data: {}});
      },
    });
  }

  const handleHasError =
    relationships.data.resourceTypeA === undefined &&
    relationships.data.resourceTypeB === undefined
      ? false
      : relationships.data.resourceTypeA === relationships.data.resourceTypeB;

  const helperText = !relationships.data.resourceTypeA
    ? ''
    : relationships.data.resourceTypeA === relationships.data.resourceTypeB
    ? 'Relationship same'
    : '';

  const handleDisable = useDisabledButtonSelect(
    relationships.data,
    6,
    handleHasError,
  );

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
          onChange={handleChange}
          onClick={filterClassA}
          name="classTypeA"
          variant="outlined"
          defaultValue="">
          {dataSelectorsForm?.resourceTypeClass?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {startCase(camelCase(item))}
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
          {dataSelectorsForm?.resourceRelationshipTypes?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {startCase(camelCase(item))}
            </MenuItem>
          ))}
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
          {dataSelectorsForm?.resourceRelationshipMultiplicity?.map(
            (item, index) => (
              <MenuItem key={index} value={item}>
                {startCase(camelCase(item))}
              </MenuItem>
            ),
          )}
        </TextField>
        <TextField
          required
          id="standard-select-currency-native"
          select
          className={classes.selectForm}
          label="Select resource class type B"
          onChange={handleChange}
          onClick={filterClassB}
          name="classTypeB"
          variant="outlined"
          defaultValue="">
          {dataSelectorsForm?.resourceTypeClass?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {startCase(camelCase(item))}
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
