/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';

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

const filterData = graphql`
  query GroupSelectClassRelationshipsQuery(
    $filterBy: [ResourceTypeFilterInput!]
  ) {
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

const GroupSelectClassRelationships = (props: Props) => {
  // const {isCompleted} = props;
  const classes = useStyles();
  const [showChecking, setShowChecking] = useState(false);
  const [relationships, setRelationships] = useState({});
  const [filterR, setFilterR] = useState({});

  useEffect(() => {
    isCompleted();
    // isCompleted2();
  }, []);

  const isCompleted = () => {
    fetchQuery(RelayEnvironment, filterData, {}).then(data => {
      setRelationships(data);
    });
  };

  const isCompleted2 = id => {
    fetchQuery(RelayEnvironment, filterData, {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE_CLASS',
          operator: 'IS_ONE_OF',
          idSet: [id],
        },
      ],
    }).then(data => {
      setFilterR(data);
    });
  };

  console.log('Inicial  --   ', relationships.resourceTypes?.edges.length);
  console.log('Filtrada --   ', filterR);

  function handleChange({target}) {
    setRelationships({
      ...relationships.resourceTypes,
      [target.name]: target.value.trim(),
    });
  }

  return (
    <form className={classes.formField} autoComplete="off">
      <TextField
        required
        select
        className={classes.select}
        label="CLASE A"
        // onChange={handleChange}
        name="classTypeA"
        variant="outlined"
        defaultValue="">
        {relationships.resourceTypes?.edges.map((item, index) => (
          <MenuItem
            key={index}
            value={item.node.id}
            onClick={() => isCompleted2(item.node.resourceTypeClass.id)}>
            {item.node.resourceTypeClass.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        required
        id="resourceTypesA"
        select
        className={classes.select}
        label="RESOURCE TYPE A"
        // onChange={handleChange}
        name="resourceTypeA"
        variant="outlined"
        defaultValue="">
        {filterR.resourceTypes?.edges.map((item, index) => (
          <MenuItem key={index} value={item.node.id}>
            {item.node.name}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
};
export {GroupSelectClassRelationships};
