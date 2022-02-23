/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {RemoveResourceRelationshipMutationVariables} from '../../mutations/__generated__/RemoveResourceRelationshipMutation.graphql';

import ConfigureTitle from '../assurance/common/ConfigureTitle';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import RemoveResourceRelationshipMutation from '../../mutations/RemoveResourceRelationshipMutation';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {AddRelationshipsTypeForm} from './AddRelationshipsTypeForm';
import {Grid, List} from '@material-ui/core';
import {RelationshipsTypeItemList} from './RelationshipsTypeItemList';
import {TitleTextCardsRelationships} from './TitleTextCardsRelationships';
import {fetchQuery, graphql} from 'relay-runtime';
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
          id
        }
      }
    }
  }
`;

const RelationshipsTypes = () => {
  const classes = useStyles();
  const [relationships, setRelationships] = useState({});

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, RelationshipsTypesQuery, {}).then(data => {
      setRelationships(data);
    });
  }, [setRelationships]);

  const handleRemove = id => {
    const variables: RemoveResourceRelationshipMutationVariables = {
      id: id,
    };
    RemoveResourceRelationshipMutation(variables, {
      onCompleted: () => isCompleted(),
    });
  };

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
          {relationships.resourceRelationships?.edges.map((item, index) => (
            <RelationshipsTypeItemList
              key={index}
              handleRemove={() => handleRemove(item.node.id)}
              item={item.node}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} lg={3}>
        <AddRelationshipsTypeForm isCompleted={isCompleted} />
      </Grid>
    </Grid>
  );
};

export {RelationshipsTypes};
