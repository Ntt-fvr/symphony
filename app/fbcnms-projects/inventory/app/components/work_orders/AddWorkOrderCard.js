/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {AddAppointmentMutationVariables} from '../../mutations/__generated__/AddAppointmentMutation.graphql';
import type {AddEditWorkOrderTypeCard_workOrderType} from '../configure/__generated__/AddEditWorkOrderTypeCard_workOrderType.graphql';
import type {
  AddWorkOrderCardTypeQuery,
  AddWorkOrderCardTypeQueryResponse,
} from './__generated__/AddWorkOrderCardTypeQuery.graphql';
import type {
  AddWorkOrderMutationResponse,
  AddWorkOrderMutationVariables,
} from '../../mutations/__generated__/AddWorkOrderMutation.graphql';
import type {ChecklistCategoriesMutateStateActionType} from '../checklist/ChecklistCategoriesMutateAction';
import type {ChecklistCategoriesStateType} from '../checklist/ChecklistCategoriesMutateState';
import type {MutationCallbacks} from '../../mutations/MutationCallbacks.js';
import type {WorkOrder} from '../../common/WorkOrder';

import AddAppointmentMutation from '../../mutations/AddAppointmentMutation';
import AddWorkOrderMutation from '../../mutations/AddWorkOrderMutation';
import AppContext from '@fbcnms/ui/context/AppContext';
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import CheckListCategoryExpandingPanel from '../checklist/checkListCategory/CheckListCategoryExpandingPanel';
import ChecklistCategoriesMutateDispatchContext from '../checklist/ChecklistCategoriesMutateDispatchContext';
import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import FormField from '@symphony/design-system/components/FormField/FormField';
import FormSaveCancelPanel from '@symphony/design-system/components/Form/FormSaveCancelPanel';
import Grid from '@material-ui/core/Grid';
import LoadingIndicator from '../../common/LoadingIndicator';
import LocationTypeahead from '../typeahead/LocationTypeahead';
import MomentUtils from '@date-io/moment';
import NameDescriptionSection from '../../common/NameDescriptionSection';
import ProjectTypeahead from '../typeahead/ProjectTypeahead';
import PropertyTypeInput from '../../common/property_combo/PropertyTypeInput';
import React, {useCallback, useContext, useReducer, useState} from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import SelectAvailabilityAssignee, {
  AppointmentData,
} from './SelectAvailabilityAssignee';
import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import nullthrows from '@fbcnms/util/nullthrows';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {FormContextProvider} from '../../common/FormContext';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {convertChecklistCategoriesStateToInput} from '../checklist/ChecklistUtils';
import {generateTempId, getGraphError} from '../../common/EntUtils';
import {getAllInitialProperties} from '../../common/property_combo/PropertyComboHelpers';
import {
  getInitialStateFromChecklistDefinitions,
  reducer,
} from '../checklist/ChecklistCategoriesMutateReducer';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {priorityValues, useStatusValues} from '../../common/FilterTypes';
import {toPropertyInput} from '../../common/Property';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useHistory, useRouteMatch} from 'react-router';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 32px',
  },
  contentRoot: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1,
    overflow: 'auto',
  },
  cards: {
    flexGrow: 1,
    overflow: 'hidden',
    overflowY: 'auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    paddingBottom: '15px',
  },
  inputFilter: {
    paddingBottom: '22px',
  },
  filterButton: {
    width: '87px',
    alignSelf: 'flex-end',
    marginTop: '30px',
  },
  calendarButton: {
    width: '132px',
    alignSelf: 'flex-end',
  },
  gridInput: {
    display: 'inline-flex',
  },
  nameHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '24px',
  },
  breadcrumbs: {
    flexGrow: 1,
  },
  separator: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    margin: '0 0 24px -24px',
    paddingBottom: '24px',
    width: 'calc(100% + 48px)',
  },
  dense: {
    paddingTop: '9px',
    paddingBottom: '9px',
    height: '14px',
  },
  cancelButton: {
    marginRight: '8px',
  },
}));

const workOrderTypeQuery = graphql`
  query AddWorkOrderCardTypeQuery($workOrderTypeId: ID!) {
    workOrderType: node(id: $workOrderTypeId) {
      __typename
      ... on WorkOrderType {
        id
        name
        description
        propertyTypes {
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
          parentPropertyType {
            id
            name
          }
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
            parentPropertyType {
              id
              name
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
        }
        checkListCategoryDefinitions {
          id
          title
          description
          checklistItemDefinitions {
            id
            title
            type
            index
            isMandatory
            enumValues
            enumSelectionMode
            helpText
          }
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  workOrderTypeId: string,
|}>;

const AddWorkOrderCard = (props: Props) => {
  const {workOrderTypeId} = props;
  const classes = useStyles();
  const {statusValues, closedStatus} = useStatusValues();

  const featureFlagFilters = useFeatureFlag('scheduling_filter_dates');

  const [loading, setLoading] = useState<boolean>(false);

  const {
    workOrderType,
  }: AddWorkOrderCardTypeQueryResponse = useLazyLoadQuery<AddWorkOrderCardTypeQuery>(
    workOrderTypeQuery,
    {
      workOrderTypeId,
    },
  );

  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    duration: 0,
    date: null,
    saveAppointment: false,
  });

  const [workOrder, setWorkOrder] = useState<?WorkOrder>(
    workOrderType?.__typename === 'WorkOrderType'
      ? {
          id: generateTempId(),
          workOrderType: null,
          workOrderTypeId: workOrderType.id,
          name: workOrderType.name,
          description: workOrderType.description,
          locationId: null,
          location: null,
          properties: getAllInitialProperties(workOrderType),
          workOrders: [],
          owner: {id: '', email: ''},
          creationDate: '',
          installDate: '',
          status: 'PLANNED',
          priority: 'NONE',
          equipmentToAdd: [],
          equipmentToRemove: [],
          linksToAdd: [],
          linksToRemove: [],
          files: [],
          images: [],
          assignedTo: null,
          project: null,
          checkListCategories: [],
        }
      : null,
  );

  const {isFeatureEnabled} = useContext(AppContext);
  const mandatoryPropertiesOnCloseEnabled = isFeatureEnabled(
    'mandatory_properties_on_work_order_close',
  );

  const enqueueSnackbar = useEnqueueSnackbar();
  const history = useHistory();
  const match = useRouteMatch();

  const [editingCategories, dispatch] = useReducer<
    ChecklistCategoriesStateType,
    ChecklistCategoriesMutateStateActionType,
    ?$ElementType<
      AddEditWorkOrderTypeCard_workOrderType,
      'checkListCategoryDefinitions',
    >,
  >(
    reducer,
    workOrderType?.__typename === 'WorkOrderType'
      ? workOrderType.checkListCategoryDefinitions
      : null,
    getInitialStateFromChecklistDefinitions,
  );

  const _enqueueError = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        children: key => (
          <SnackbarItem id={key} message={message} variant="error" />
        ),
      });
    },
    [enqueueSnackbar],
  );

  const _saveWorkOrder = () => {
    const {
      name,
      description,
      locationId,
      project,
      assignedTo,
      owner,
      status,
      priority,
      properties,
      organizationFk,
    } = nullthrows(workOrder);
    setLoading(true);
    const workOrderTypeId = nullthrows(workOrder?.workOrderTypeId);
    const variables: AddWorkOrderMutationVariables = {
      input: {
        name,
        description,
        locationId,
        workOrderTypeId,
        organizationFk: organizationFk?.id,
        assigneeId: assignedTo?.id,
        ownerId: owner?.id || null,
        projectId: project?.id,
        status,
        priority,
        properties: toPropertyInput(properties),
        checkListCategories: convertChecklistCategoriesStateToInput(
          editingCategories,
        ),
      },
    };

    const callbacks: MutationCallbacks<AddWorkOrderMutationResponse> = {
      onCompleted: (response, errors) => {
        if (errors && errors[0]) {
          setLoading(false);
          _enqueueError(errors[0].message);
        } else {
          // navigate to main page
          _saveAppointment(response.addWorkOrder.id);
        }
      },
      onError: (error: Error) => {
        setLoading(false);
        _enqueueError(getGraphError(error));
      },
    };
    ServerLogger.info(LogEvents.SAVE_PROJECT_BUTTON_CLICKED, {
      source: 'workOrder_details',
    });
    AddWorkOrderMutation(variables, callbacks);
  };

  const _saveAppointment = workorderID => {
    const assigneeID = workOrder?.assignedTo?.id;
    const {duration, date, saveAppointment} = appointmentData;

    if (!saveAppointment || !assigneeID) {
      setLoading(false);
      return history.push(match.url);
    } else {
      const variables: AddAppointmentMutationVariables = {
        input: {
          workorderID,
          assigneeID,
          duration,
          date,
        },
      };
      AddAppointmentMutation(variables, {
        onCompleted: () => {
          setLoading(false);
          return history.push(match.url);
        },
        onError: () => setLoading(false),
      });
    }
  };

  const _setWorkOrderDetail = (
    key:
      | 'name'
      | 'description'
      | 'assignedTo'
      | 'project'
      | 'locationId'
      | 'organizationFk'
      | 'priority'
      | 'status',
    value,
  ) => {
    setWorkOrder(prevWorkOrder => {
      if (!prevWorkOrder) {
        return;
      }
      return {...prevWorkOrder, [`${key}`]: value};
    });
  };

  const _propertyChangedHandler = index => property =>
    // $FlowFixMe - known techdebt with Property/PropertyType flow definitions
    setWorkOrder(prevWorkOrder => {
      if (!prevWorkOrder) {
        return;
      }
      return {
        ...prevWorkOrder,
        properties: [
          ...prevWorkOrder.properties.slice(0, index),
          // $FlowFixMe - known techdebt with Property/PropertyType flow definitions
          property,
          ...prevWorkOrder.properties.slice(index + 1),
        ],
      };
    });

  const _checkListCategoryChangedHandler = updatedCategories => {
    setWorkOrder(prevWorkOrder => {
      if (!prevWorkOrder) {
        return;
      }
      return {
        ...prevWorkOrder,
        checkListCategories: updatedCategories,
      };
    });
  };

  const navigateToMainPage = () => {
    ServerLogger.info(LogEvents.WORK_ORDERS_SEARCH_NAV_CLICKED, {
      source: 'work_order_details',
    });
    history.push(match.url);
  };

  if (workOrder == null) {
    return null;
  }

  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <FormContextProvider
            permissions={{
              entity: 'workorder',
              action: 'create',
              workOrderTypeId: workOrderTypeId,
            }}>
            <div className={classes.nameHeader}>
              <Breadcrumbs
                className={classes.breadcrumbs}
                breadcrumbs={[
                  {
                    id: 'workOrders',
                    name: 'WorkOrders',
                    onClick: () => navigateToMainPage(),
                  },
                  {
                    id: `new_workOrder_` + Date.now(),
                    name: 'New WorkOrder',
                  },
                ]}
                size="large"
              />
              <FormSaveCancelPanel
                onCancel={navigateToMainPage}
                onSave={_saveWorkOrder}
              />
            </div>
            <div className={classes.contentRoot}>
              <div className={classes.cards}>
                <Grid container spacing={2}>
                  <Grid item xs={8} sm={8} lg={8} xl={8}>
                    <ExpandingPanel title="Details">
                      <NameDescriptionSection
                        name={workOrder.name}
                        description={workOrder.description}
                        onNameChange={value =>
                          _setWorkOrderDetail('name', value)
                        }
                        onDescriptionChange={value =>
                          _setWorkOrderDetail('description', value)
                        }
                      />
                      <div className={classes.separator} />
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4} xl={4}>
                          <FormField label="Project">
                            <ProjectTypeahead
                              className={classes.gridInput}
                              margin="dense"
                              onProjectSelection={project =>
                                _setWorkOrderDetail('project', project)
                              }
                            />
                          </FormField>
                        </Grid>
                        {workOrder.workOrderType && (
                          <Grid item xs={12} sm={6} lg={4} xl={4}>
                            <FormField label="Type">
                              <TextField
                                disabled
                                variant="outlined"
                                margin="dense"
                                className={classes.gridInput}
                                value={workOrder.workOrderType.name}
                              />
                            </FormField>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={6} lg={4} xl={4}>
                          <FormField label="Priority">
                            <Select
                              options={priorityValues}
                              selectedValue={workOrder.priority}
                              onChange={value =>
                                _setWorkOrderDetail('priority', value)
                              }
                            />
                          </FormField>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} xl={4}>
                          <FormField label="Status">
                            <Select
                              options={statusValues}
                              selectedValue={workOrder.status}
                              onChange={value => {
                                _setWorkOrderDetail('status', value);
                              }}
                            />
                          </FormField>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} xl={4}>
                          <FormField label="Location">
                            <LocationTypeahead
                              headline={null}
                              className={classes.gridInput}
                              margin="dense"
                              onLocationSelection={location =>
                                _setWorkOrderDetail(
                                  'locationId',
                                  location?.id ?? null,
                                )
                              }
                            />
                          </FormField>
                        </Grid>
                        {featureFlagFilters && (
                          <Grid item xs={12} sm={6} lg={4} xl={4}>
                            <FormField label="Scheduled at">
                              <TextInput
                                type="date"
                                className={classes.gridInput}
                                disabled
                              />
                            </FormField>
                          </Grid>
                        )}
                        {workOrder.properties
                          .filter(property => !property.propertyType.isDeleted)
                          .map((property, index) => (
                            <PropertyTypeInput
                              key={property.id}
                              elementType={workOrder}
                              property={property}
                              required={
                                !!property.propertyType.isMandatory &&
                                (workOrder.status === closedStatus.value ||
                                  !mandatoryPropertiesOnCloseEnabled)
                              }
                              classes={classes}
                              properties={workOrder.properties}
                              index={index}
                              _propertyChangedHandler={_propertyChangedHandler}
                            />
                          ))}
                      </Grid>
                    </ExpandingPanel>
                    <ChecklistCategoriesMutateDispatchContext.Provider
                      value={dispatch}>
                      <CheckListCategoryExpandingPanel
                        categories={editingCategories}
                      />
                    </ChecklistCategoriesMutateDispatchContext.Provider>
                  </Grid>
                  <Grid item xs={4} sm={4} lg={4} xl={4}>
                    <SelectAvailabilityAssignee
                      workOrder={workOrder}
                      isOwner={false}
                      isAssignee={false}
                      title={'Select availabilty assignee'}
                      setAppointmentData={setAppointmentData}
                      _setWorkOrderDetail={_setWorkOrderDetail}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </FormContextProvider>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
};

export default AddWorkOrderCard;
