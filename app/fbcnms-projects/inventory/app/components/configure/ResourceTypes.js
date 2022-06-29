/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {PropertyType} from '../../common/PropertyType';
import type {RemoveResourceTypeMutationVariables} from '../../mutations/__generated__/RemoveResourceTypeMutation.graphql';
import type {ResourceTypeBaseTypeKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';
import type {ResourceTypeClassKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';

import AddResourceTypeForm from './AddResourceTypeForm';
import ConfigureTitle from './../assurance/common/ConfigureTitle';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import RemoveResourceTypeMutation from '../../mutations/RemoveResourceTypeMutation';
import ResourceTypeItem from './ResourceTypeItem';
import TitleTextCardsResource from './TitleTextCardsResource';
import fbt from 'fbt';
import {EditResourceTypeItem} from './EditResourceTypeItem';
import {Grid, List} from '@material-ui/core';
import {fetchQuery, graphql} from 'relay-runtime';
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
          vendor {
            id
            name
          }
          resourceType {
            id
            resourceTypeClass
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
    vendors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export type DataSelectorsForm = {
  resourceTypeClass: Array<ResourceTypeClassKind>,
  resourceTypeBaseType: Array<ResourceTypeBaseTypeKind>,
};

type Resources = {
  item: {
    node: {
      id: string,
      name: string,
      resourceType: {
        id: string,
        resourceTypeClass: string,
      },
      resourceTypeBaseType: string,
      resourceTypeClass: string,
      resourcePropertyTypes: Array<PropertyType>,
    },
  },
};

const dataSelectorsForm = {
  resourceTypeClass: ['CARD', 'EQUIPMENT', 'PORT', 'RACK', 'SLOT', 'VLAN'],
  resourceTypeBaseType: [
    'LOGICAL_RESOURCE',
    'PHYSICAL_RESOURCE',
    'VIRTUAL_RESOURCE',
  ],
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
        dataSelectorsForm={dataSelectorsForm}
        formValues={dataEdit.item.node}
        dataFormQuery={resourceTypes}
        hideEditResourceTypeForm={hideEditResourceItemForm}
      />
    );
  }

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} style={{marginBottom: '1rem'}}>
        <ConfigureTitle
          title={fbt('ResourceTypes', 'Resources Title')}
          subtitle={fbt(
            'List of the types of resources required for the inventory management.',
            'ResourceTypes description',
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
          dataSelectorsForm={dataSelectorsForm}
        />
      </Grid>
    </Grid>
  );
};

export default ResourceTypes;
