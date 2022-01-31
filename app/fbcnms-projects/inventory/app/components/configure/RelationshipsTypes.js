/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import AddRelationshipsTypeForm from './AddRelationshipsTypeForm';
import ConfigureTitle from '../assurance/common/ConfigureTitle';
import React, {useCallback, useEffect, useState} from 'react';
import RelationshipsTypeItem from './RelationshipsTypeItem';
import RelayEnvironment from '../../common/RelayEnvironment';
import TitleTextCardsResource from './TitleTextCardsResource';
import fbt from 'fbt';
import {EditResourceTypeItem} from './EditResourceTypeItem';
import {fetchQuery, graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';

// MUTATIONS //
import RemoveResourceTypeMutation from '../../mutations/RemoveResourceTypeMutation';
// import type {RemoveResourceTypeMutationVariables} from '../../mutations/__generated__/RemoveResourceTypeMutation.graphql';
// import type {PropertyType} from '../../common/PropertyType';

import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 25px 34px 34px',
    margin: '0',
  },
}));

const RelationshipsTypesQuery = graphql`
  query RelationshipsTypesQuery {
    resourceRelationships {
      edges {
        node {
          id
          name
          resourceRelationshipMultiplicityFk {
            name
          }
          resourceRelationshipTypeFk {
            name
          }
          resourceTypeFkA {
            name
          }
          resourceTypeFkB {
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
      resourceTypeFk: {
        id: string,
      },
      resourceTypeBaseTypeFk: {
        id: string,
        name: string,
      },
      resourceTypeClassFk: {
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

  // const showEditResourceItemForm = (resources: Resources) => {
  //   setShowEditForm(true);
  //   setDataEdit(resources);
  // };

  // const hideEditResourceItemForm = () => {
  //   setShowEditForm(false);
  // };

  // const handleRemove = id => {
  //   const variables: RemoveResourceTypeMutationVariables = {
  //     id: id,
  //   };
  //   RemoveResourceTypeMutation(variables, {onCompleted: () => isCompleted()});
  // };

  // if (showEditForm) {
  //   return (
  //     <EditResourceTypeItem
  //       isCompleted={isCompleted}
  //       formValues={dataEdit.item.node}
  //       resources={resourceTypes.resourceTypes?.edges.map(item => item.node)}
  //       resourceSpecifications={resourceTypes.resourceSpecifications?.edges.map(
  //         item => item.node,
  //       )}
  //       hideEditResourceTypeForm={hideEditResourceItemForm}
  //     />
  //   );
  // }

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} style={{marginBottom: '1rem'}}>
        <ConfigureTitle
          title={fbt('Relationships', 'Relationships Title')}
          subtitle={fbt(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Relationships description',
          )}
        />
      </Grid>
      <Grid item xs={12} lg={9}>
        <TitleTextCardsResource />
        <List disablePadding>
          {relationships.resourceRelationships?.edges.map(item => (
            <RelationshipsTypeItem
              key={item.id}
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
