/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {AddEditProjectTypeCard_editingProjectType} from './__generated__/AddEditProjectTypeCard_editingProjectType.graphql';
import type {CreateProjectTypeMutationVariables} from './mutations/__generated__/CreateProjectTypeMutation.graphql';
import type {EditProjectTypeInput} from './mutations/__generated__/EditProjectTypeMutation.graphql';
import type {EditProjectTypeMutationVariables} from './mutations/__generated__/EditProjectTypeMutation.graphql';
import type {ProjectTypeWorkOrderTemplatesPanel_workOrderTypes} from './__generated__/ProjectTypeWorkOrderTemplatesPanel_workOrderTypes.graphql';

import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import Button from '@symphony/design-system/components/Button';
import CreateProjectTypeMutation from './mutations/CreateProjectTypeMutation';
import EditProjectTypeMutation from './mutations/EditProjectTypeMutation';
import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import ExperimentalPropertyTypesTable from '../form/ExperimentalPropertyTypesTable';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import NameDescriptionSection from '../../common/NameDescriptionSection';
import ProjectTypeWorkOrderTemplatesPanel from './ProjectTypeWorkOrderTemplatesPanel';
import PropertyTypesTableDispatcher from '../form/context/property_types/PropertyTypesTableDispatcher';
import React, {useCallback, useMemo, useState} from 'react';
import update from 'immutability-helper';
import {ConnectionHandler} from 'relay-runtime';
import {FormContextProvider} from '../../common/FormContext';
import {createFragmentContainer, graphql} from 'react-relay';
import {generateTempId, isTempId} from '../../common/EntUtils';
import {
  getPropertyTypesWithoutParentsInformation,
  orderPropertyTypesIndex,
} from '../../common/property_combo/PropertyComboHelpers';
import {makeStyles} from '@material-ui/styles';
import {toMutablePropertyType} from '../../common/PropertyType';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {usePropertyTypesReducer} from '../form/context/property_types/PropertyTypesTableState';
const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 16px',
    maxHeight: '100%',
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    paddingBottom: '24px',
  },
  body: {
    overflowY: 'auto',
  },
  buttons: {
    display: 'flex',
  },
  cancelButton: {
    marginRight: '8px',
  },
}));

type Props = $ReadOnly<{|
  editingProjectType: ?AddEditProjectTypeCard_editingProjectType,
  onCancelClicked: () => void,
  onProjectTypeSaved: () => void,
  workOrderTypes: ProjectTypeWorkOrderTemplatesPanel_workOrderTypes,
|}>;

const AddEditProjectTypeCard = (props: Props) => {
  const {
    editingProjectType,
    onCancelClicked,
    onProjectTypeSaved,
    workOrderTypes,
  } = props;
  const enqueueSnackbar = useEnqueueSnackbar();
  const classes = useStyles();
  const initialProjectTypeInput: EditProjectTypeInput = useMemo(
    () => ({
      id: editingProjectType?.id ?? generateTempId(),
      name: editingProjectType?.name ?? '',
      description: editingProjectType?.description ?? undefined,
      workOrders: (editingProjectType?.workOrders ?? [])
        .map(wo => wo?.type)
        .filter(Boolean)
        .map(woType => ({type: woType.id})),
      properties: [],
    }),
    [editingProjectType],
  );

  const [projectTypeInput, setProjectTypeInput] = useState(
    initialProjectTypeInput,
  );
  const [propertyTypes, propertyTypesDispatcher] = usePropertyTypesReducer(
    (editingProjectType?.properties ?? [])
      .filter(Boolean)
      .map(toMutablePropertyType),
  );

  const deleteTempId = <T: {id: ?string}>(definition: T): T => {
    const newDef = {...definition};
    if (definition.id && definition.id.includes('@tmp')) {
      newDef['id'] = undefined;
    }
    return newDef;
  };

  const onAdd = useCallback(() => {
    const propertyTypesFinal = isTempId(projectTypeInput.id)
      ? orderPropertyTypesIndex(propertyTypes)
      : getPropertyTypesWithoutParentsInformation(propertyTypes);
    const variables: CreateProjectTypeMutationVariables = {
      input: {
        name: projectTypeInput.name,
        description: projectTypeInput.description ?? undefined,
        workOrders: projectTypeInput.workOrders,
        properties: propertyTypesFinal.map(prop => {
          return deleteTempId(prop);
        }),
      },
    };

    const updater = store => {
      const rootQuery = store.getRoot();
      const newNode = store.getRootField('createProjectType');
      if (!newNode) {
        return;
      }
      const types = ConnectionHandler.getConnection(
        rootQuery,
        'WorkOrderProjectTypesQuery_projectTypes',
      );
      if (types != null) {
        const edge = ConnectionHandler.createEdge(
          store,
          types,
          newNode,
          'ProjectTypesEdge',
        );
        ConnectionHandler.insertEdgeAfter(types, edge);
      }
    };

    const callbacks = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          enqueueSnackbar(errors[0].message, {
            variant: 'error',
          });
        } else {
          onProjectTypeSaved();
        }
      },
    };

    CreateProjectTypeMutation(variables, callbacks, updater);
  }, [projectTypeInput, onProjectTypeSaved, enqueueSnackbar, propertyTypes]);

  const onEdit = useCallback(() => {
    const woDefsMap = new Map();
    (editingProjectType?.workOrders ?? []).forEach(wo =>
      woDefsMap.set(wo?.type?.id, wo?.id),
    );
    const propertyTypesFinal = isTempId(projectTypeInput.id)
      ? orderPropertyTypesIndex(propertyTypes)
      : getPropertyTypesWithoutParentsInformation(propertyTypes);
    const variables: EditProjectTypeMutationVariables = {
      input: {
        id: projectTypeInput.id,
        name: projectTypeInput.name,
        description: projectTypeInput.description ?? undefined,
        workOrders: (projectTypeInput.workOrders ?? []).map(x => ({
          id: woDefsMap.get(x?.type),
          type: x?.type,
        })),
        properties: propertyTypesFinal,
      },
    };
    const callbacks = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          enqueueSnackbar(errors[0].message, {
            variant: 'error',
          });
        } else {
          onProjectTypeSaved();
        }
      },
    };

    EditProjectTypeMutation(variables, callbacks);
  }, [
    editingProjectType,
    projectTypeInput.id,
    projectTypeInput.name,
    projectTypeInput.description,
    projectTypeInput.workOrders,
    projectTypeInput.properties,
    enqueueSnackbar,
    propertyTypes,
    onProjectTypeSaved,
  ]);

  const isOnEditMode = editingProjectType !== null;

  const onSave = useCallback(() => {
    if (isOnEditMode) {
      return onEdit();
    }
    return onAdd();
  }, [isOnEditMode, onAdd, onEdit]);

  return (
    <FormContextProvider
      permissions={{
        entity: 'projectTemplate',
        action: isOnEditMode ? 'update' : 'create',
      }}>
      <div className={classes.root}>
        <div className={classes.header}>
          <Breadcrumbs
            breadcrumbs={[
              {
                id: 'project_templates',
                name: 'Project Templates',
                onClick: onCancelClicked,
              },
              editingProjectType
                ? {
                    id: editingProjectType.id,
                    name: editingProjectType.name,
                  }
                : {
                    id: 'new_project_type',
                    name: 'New Project Template',
                  },
            ]}
            size="large"
          />
          <div className={classes.buttons}>
            <Button
              className={classes.cancelButton}
              onClick={onCancelClicked}
              skin="regular">
              Cancel
            </Button>
            <FormAction>
              <Button onClick={onSave} disabled={!projectTypeInput.name}>
                Save
              </Button>
            </FormAction>
          </div>
        </div>
        <div className={classes.body}>
          <ExpandingPanel title="Details">
            <NameDescriptionSection
              title="Project Name"
              name={projectTypeInput.name}
              description={projectTypeInput.description}
              descriptionPlaceholder="Describe the project"
              onNameChange={value =>
                setProjectTypeInput(
                  update(projectTypeInput, {name: {$set: value}}),
                )
              }
              onDescriptionChange={value =>
                setProjectTypeInput(
                  update(projectTypeInput, {description: {$set: value}}),
                )
              }
            />
          </ExpandingPanel>
          <ProjectTypeWorkOrderTemplatesPanel
            selectedWorkOrderTypeIds={(projectTypeInput.workOrders ?? []).map(
              wo => wo.type,
            )}
            // $FlowFixMe Relay flow types
            workOrderTypes={workOrderTypes}
            onWorkOrderTypesSelected={ids => {
              setProjectTypeInput(
                update(projectTypeInput, {
                  workOrders: {$set: ids.map(id => ({type: id}))},
                }),
              );
            }}
          />
          <ExpandingPanel title="Properties">
            <PropertyTypesTableDispatcher.Provider
              value={{
                dispatch: propertyTypesDispatcher,
                propertyTypes,
              }}>
              <ExperimentalPropertyTypesTable
                supportDelete={true}
                propertyTypes={propertyTypes}
                showPropertyCombo={isTempId(projectTypeInput.id)}
              />
            </PropertyTypesTableDispatcher.Provider>
          </ExpandingPanel>
        </div>
      </div>
    </FormContextProvider>
  );
};

export default createFragmentContainer(AddEditProjectTypeCard, {
  editingProjectType: graphql`
    fragment AddEditProjectTypeCard_editingProjectType on ProjectType {
      id
      name
      description
      workOrders {
        id
        type {
          id
          name
          ...ProjectTypeWorkOrderTemplatesPanel_workOrderTypes
        }
      }
      properties {
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
        dependencePropertyTypes {
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
          propertyTypeValues {
            id
            isDeleted
            name
            parentPropertyTypeValue {
              id
              isDeleted
              name
            }
          }
        }
        propertyTypeValues {
          id
          isDeleted
          name
          parentPropertyTypeValue {
            id
            isDeleted
            name
          }
        }
        parentPropertyType {
          id
          name
        }
      }
    }
  `,
});
