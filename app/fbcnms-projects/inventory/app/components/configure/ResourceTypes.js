/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import AddResourceTypeForm from './AddResourceTypeForm';
import ConfigureTitle from './../assurance/common/ConfigureTitle';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ResourceTypeItem from './ResourceTypeItem';
import TitleTextCardsResource from './TitleTextCardsResource';
import fbt from 'fbt';
import {EditResourceTypeItem} from './EditResourceTypeItem';
import {fetchQuery, graphql} from 'relay-runtime';

// MUTATIONS //
import RemoveResourceTypeMutation from '../../mutations/RemoveResourceTypeMutation';
import type {RemoveResourceTypeMutationVariables} from '../../mutations/__generated__/RemoveResourceTypeMutation.graphql';

import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    padding: '40px',
    margin: '0',
    maxHeight: 'calc(100vh - 57px)',
  },
  table: {
    height: 'calc(100% - 46.25px)',
  },
}));

const ResourceTypesQuery = graphql`
  query ResourceTypesQuery {
    resourceTypes {
      edges {
        node {
          id
          name
          resourceTypeBaseTypeFk {
            id
            name
          }
          resourceTypeClassFk {
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
      resourceTypeBaseTypeFk: {
        id: string,
        name: string,
      },
      resourceTypeClassFk: {
        id: string,
        name: string,
      },
    },
  },
};

const ResourceTypes = () => {
  const classes = useStyles();

  const [resourceTypes, setResourceTypes] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [dataEdit, setDataEdit] = useState<Resources>({});

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, ResourceTypesQuery, {}).then(data => {
      setResourceTypes(data);
    });
  }, [setResourceTypes]);

  const showEditResourceItemForm = (resources: Resources) => {
    setShowEditForm(true);
    setDataEdit(resources);
  };

  const hideEditResourceItemForm = () => {
    setShowEditForm(false);
  };

  const handleRemove = id => {
    const variables: RemoveResourceTypeMutationVariables = {
      id: id,
    };
    RemoveResourceTypeMutation(variables, {onCompleted: () => isCompleted()});
  };

  if (showEditForm) {
    return (
      <EditResourceTypeItem
        isCompleted={isCompleted}
        formValues={dataEdit.item.node}
        resources={resourceTypes.resourceTypes?.edges.map(item => item.node)}
        hideEditResourceTypeForm={hideEditResourceItemForm}
      />
    );
  }

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <ConfigureTitle
          title={fbt('Resources', 'Resources Title')}
          subtitle={fbt(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Resources description',
          )}
        />
      </Grid>
      <Grid
        className={classes.table}
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        xl={9}>
        <TitleTextCardsResource />
        <List disablePadding>
          {resourceTypes.resourceTypes?.edges.map((item, index) => (
            <ResourceTypeItem
              key={index}
              handleRemove={() => handleRemove(item.node?.id)}
              edit={() => showEditResourceItemForm({item})}
              isEditing={showEditForm}
              resourceNames={resourceTypes.resourceTypes?.edges}
              formValues={item.node}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <AddResourceTypeForm
          isCompleted={isCompleted}
          resourceNames={resourceTypes.resourceTypes?.edges}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceTypes;
