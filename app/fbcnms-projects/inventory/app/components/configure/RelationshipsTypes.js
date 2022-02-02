/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import ConfigureTitle from '../assurance/common/ConfigureTitle';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {AddRelationshipsTypeForm} from './AddRelationshipsTypeForm';
import {RelationshipsTypeItemList} from './RelationshipsTypeItemList';
// import {EditResourceTypeItem} from './EditResourceTypeItem';
import {TitleTextCardsRelationships} from './TitleTextCardsRelationships';
import {fetchQuery, graphql} from 'relay-runtime';
// import {useLazyLoadQuery} from 'react-relay/hooks';

// MUTATIONS //
// import RemoveResourceTypeMutation from '../../mutations/RemoveResourceTypeMutation';
// import type {RemoveResourceTypeMutationVariables} from '../../mutations/__generated__/RemoveResourceTypeMutation.graphql';
// import type {PropertyType} from '../../common/PropertyType';

import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 25px 34px 34px',
    margin: '0',
  },
  listContainer: {
    overflow: 'auto',
    paddingRight: '9px',
    maxHeight: 'calc(95vh - 156px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: symphony.palette.D300,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: symphony.palette.D200,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: symphony.palette.D400,
    },
    '&::-webkit-scrollbar-track': {
      background: symphony.palette.D100,
      borderRadius: '4px',
    },
  },
}));

const RelationshipsTypesQuery = graphql`
  query RelationshipsTypesQuery {
    resourceRelationships {
      edges {
        node {
          resourceRelationshipType
          resourceRelationshipMultiplicity
          resourceTypeA {
            id
            name
          }
          resourceTypeB {
            id
            name
          }
        }
      }
    }
  }
`;

type Resources = {
  item: {
    node: {
      id: string,
      name: string,
      resourceType: {
        id: string,
      },
      resourceTypeBaseType: {
        id: string,
        name: string,
      },
      resourceTypeClass: {
        id: string,
        name: string,
      },
      propertyTypes: Array<PropertyType>,
    },
  },
};

const RelationshipsTypes = () => {
  const classes = useStyles();

  // const dataServices = useLazyLoadQuery<RelationshipsTypesQuery>(
  //   relationshipsTypes,
  //   {},
  // );
  const [relationships, setRelationships] = useState({});
  // const [showEditForm, setShowEditForm] = useState(false);
  // const [dataEdit, setDataEdit] = useState<Resources>({});
  // console.log('Query -> ', dataServices);
  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, RelationshipsTypesQuery, {}).then(data => {
      setRelationships(data);
    });
  }, [setRelationships]);
  console.log(relationships);

  // const handleRemove = id => {
  //   const variables: RemoveResourceTypeMutationVariables = {
  //     id: id,
  //   };
  //   RemoveResourceTypeMutation(variables, {onCompleted: () => isCompleted()});
  // };

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} style={{marginBottom: '1rem'}}>
        <ConfigureTitle
          title={fbt('Relationships', 'Relationships Title')}
          subtitle={fbt(
            'Define and manage relationships between resource types for network modeling. You can not edit these relationships. Remove and create relationships as required, assuring you are not impacting inventory data.',
            'Relationships description',
          )}
        />
      </Grid>
      <Grid item xs={12} lg={9}>
        <TitleTextCardsRelationships />
        <List disablePadding className={classes.listContainer}>
          {relationships?.resourceRelationships?.edges.map((item, index) => (
            <RelationshipsTypeItemList
              key={index}
              // handleRemove={() => handleRemove(item.node?.id)}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} lg={3}>
        <AddRelationshipsTypeForm
          isCompleted={isCompleted}
          // resourceNames={resourceTypes.resourceTypes?.edges}
        />
      </Grid>
    </Grid>
  );
};

export {RelationshipsTypes};
