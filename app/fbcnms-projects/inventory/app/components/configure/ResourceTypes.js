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
import type {PropertyType} from '../../common/PropertyType';
import type {RemoveResourceTypeMutationVariables} from '../../mutations/__generated__/RemoveResourceTypeMutation.graphql';

import RemoveResourceTypeMutation from '../../mutations/RemoveResourceTypeMutation';

import ExperimentalPropertyTypesTableParameters from '../form/ExperimentalPropertyTypesTableParameters';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 25px 34px 34px',
    margin: '0',
  },
}));

const ResourceTypesQuery = graphql`
  query ResourceTypesQuery {
    resourceTypes {
      edges {
        node {
          id
          name
          resourceTypeBaseType
          resourceTypeClass
        }
      }
    }
    resourceSpecifications {
      edges {
        node {
          id
          name
          resourceType {
            id
          }
          resourcePropertyTypes {
            id
            name
            type
            nodeType
            index
            stringValue
            intValue
            booleanValue
            floatValue
            latitudeValue
            longitudeValue
            rangeFromValue
            rangeToValue
            isEditable
            isMandatory
            isInstanceProperty
            isDeleted
            category
          }
        }
      }
    }
  }
`;

const objectSelectors = {
  data: {
    resourceTypeClass: [
      {
        name: 'EQUIPMENT',
      },
      {
        name: 'SLOT',
      },
      {
        name: 'RACK',
      },
      {
        name: 'PORT',
      },
      {
        name: 'CARD',
      },
      {
        name: 'VLAN',
      },
    ],

    resourceTypeBaseType: [
      {
        name: 'LOGICAL_RESOURCE',
      },
      {
        name: 'PHYSICAL_RESOURCE',
      },
      {
        name: 'VIRTUAL_RESOURCE',
      },
    ],
  },
};

type Resources = {
  item: {
    node: {
      id: string,
      name: string,
      resourceType: {
        id: string,
      },
      resourceTypeBaseType: string,
      resourceTypeClass: string,
      propertyTypes: Array<PropertyType>,
    },
  },
};

export type DataSelector = {
  resourceTypeBaseType: string,
  resourceTypeClass: string,
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
        dataSelector={objectSelectors.data}
        formValues={dataEdit.item.node}
        resources={resourceTypes.resourceTypes?.edges.map(item => item.node)}
        resourceSpecifications={resourceTypes.resourceSpecifications?.edges.map(
          item => item.node,
        )}
        hideEditResourceTypeForm={hideEditResourceItemForm}
      />
    );
  }

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} style={{marginBottom: '1rem'}}>
        <ConfigureTitle
          title={fbt('Resources', 'Resources Title')}
          subtitle={fbt(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Resources description',
          )}
        />
      </Grid>
      <Grid item xs={12} lg={9}>
        <TitleTextCardsResource />
        <List disablePadding>
          {resourceTypes.resourceTypes?.edges.map((item, index) => (
            <ResourceTypeItem
              key={index}
              handleRemove={() => handleRemove(item.node?.id)}
              edit={() => showEditResourceItemForm({item})}
              isEditing={showEditForm}
              resourceDataLenght={resourceTypes.resourceSpecifications?.edges}
              formValues={item.node}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} lg={3}>
        <AddResourceTypeForm
          isCompleted={isCompleted}
          resourceNames={resourceTypes.resourceTypes?.edges}
          dataSelector={objectSelectors.data}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceTypes;
