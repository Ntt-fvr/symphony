/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {AddResourceMutationVariables} from '../../mutations/__generated__/AddResourceMutation.graphql';
import type {
  LifecycleStatus,
  OperationalSubStatus,
  PlanningSubStatus,
  TypePlanningSubStatus,
  UsageSubStatus,
} from '../../mutations/__generated__/AddResourceMutation.graphql';
import type {UpdateResourceMutationVariables} from '../../mutations/__generated__/UpdateResourceMutation.graphql';
import type {UpdateResourcePropertyMutationVariables} from '../../mutations/__generated__/UpdateResourcePropertyMutation.graphql';

import AddEditPropertyList from './AddEditPropertyList';
import AddResourceMutation from '../../mutations/AddResourceMutation';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormSaveCancelPanel from '@symphony/design-system/components/Form/FormSaveCancelPanel';
import Grid from '@material-ui/core/Grid';
import NameInput from '@symphony/design-system/components/Form/NameInput';
import PropertyTypesTableDispatcher from '../form/context/property_types/PropertyTypesTableDispatcher';
import React, {useState} from 'react';
import SaveDialogConfirm from '../configure/SaveDialogConfirm';
import TextField from '@material-ui/core/TextField';
import UpdateResourceMutation from '../../mutations/UpdateResourceMutation';
import UpdateResourcePropertyMutation from '../../mutations/UpdateResourcePropertyMutation';
import inventoryTheme from '../../common/theme';
import {FormContextProvider} from '../../common/FormContext';
import {MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {makeStyles} from '@material-ui/styles';
import {omit} from 'lodash';
import {
  toMutableProperty,
  toMutablePropertyEdit,
} from '../context/TableTypeState';
import {useFormInput} from '../assurance/common/useFormInput';
import {usePropertyTypesReducer} from '../form/context/property_types/PropertyTypesTableState';

const useStyles = makeStyles(() => ({
  formField: {
    margin: '0 22px 41px 22px',
    ...inventoryTheme.formField,
  },
  header: {
    padding: '30px',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
}));

const selectListData = {
  lifecycleStatus: ['PLANNING', 'INSTALLING', 'OPERATING', 'RETIRING'],
  typePlanningSubStatus: [
    'PROPOSED',
    'FEASIBILITY_CHECKED',
    'DESIGNED',
    'ORDERED',
  ],
  planningSubStatus: ['ACTIVATED', 'DESACTIVATED'],
  operationalSubStatus: ['WORKING', 'NOT_WORKING'],
  usageSubStatus: [
    'AVAILABLE',
    'RESERVED',
    'NO_AVAILABLE',
    'ASSIGNED',
    'TERMINATING',
  ],
};

type ResourceType = {
  data: {
    id: string,
    name: string,
    externalId: string,
    administrativeSubstate: string,
    lifecycleStatus: LifecycleStatus,
    typePlanningSubStatus: TypePlanningSubStatus,
    planningSubStatus: PlanningSubStatus,
    operationalSubStatus: OperationalSubStatus,
    usageSubStatus: UsageSubStatus,
  },
};

type Props = $ReadOnly<{|
  closeFormAddEdit: () => void,
  dataformModal: any,
  selectedLocationId: ?string,
  isCompleted: void => void,
  mode: string,
|}>;

const AddEditResourceInLocation = (props: Props) => {
  const {
    closeFormAddEdit,
    dataformModal,
    selectedLocationId,
    isCompleted,
    mode,
  } = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resourceType, setResourceType] = useState<ResourceType>({data: {}});
  const nameEdit = useFormInput(mode === 'edit' ? dataformModal.name : '');
  const externalId = useFormInput(dataformModal.externalId);
  const lifecycleStatus = useFormInput(dataformModal.lifecycleStatus);
  const planningSubStatus = useFormInput(dataformModal.planningSubStatus);
  const operationalSubStatus = useFormInput(dataformModal.operationalSubStatus);
  const usageSubStatus = useFormInput(dataformModal.usageSubStatus);
  const typePlanningSubStatus = useFormInput(
    dataformModal.typePlanningSubStatus,
  );

  function handleChange({target}) {
    setResourceType({
      data: {
        ...resourceType.data,
        [target.name]: target.value,
      },
    });
  }

  const [propertyTypes, propertyTypesDispatcher] = usePropertyTypesReducer(
    (mode === 'edit'
      ? dataformModal.resourceProperties ?? []
      : dataformModal.resourcePropertyTypes ?? []
    )
      .filter(Boolean)
      .map(mode === 'edit' ? toMutablePropertyEdit : toMutableProperty),
  );

  const spliceProperties = propertyTypes
    ?.map(o => {
      return {
        ...o,
        resourcePropertyType: o.type,
      };
    })
    .map(o => omit(o, ['name', 'type', 'id', 'propertyType']));

  function handleCreateForm() {
    const variables: AddResourceMutationVariables = {
      input: [
        {
          locatedIn: selectedLocationId,
          name: nameEdit.value,
          resourceSpecification: dataformModal.id,
          isDeleted: true,
          externalId: resourceType.data.externalId,
          lifecycleStatus: resourceType.data.lifecycleStatus,
          typePlanningSubStatus: resourceType.data.typePlanningSubStatus,
          planningSubStatus: resourceType.data.planningSubStatus,
          usageSubStatus: resourceType.data.usageSubStatus,
          operationalSubStatus: resourceType.data.operationalSubStatus,
          resourceProperties: !spliceProperties[0].stringValue
            ? null
            : spliceProperties,
        },
      ],
    };
    AddResourceMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setResourceType({data: {}});
        closeFormAddEdit();
      },
    });
  }

  const setDataFormEdit = {
    externalId: externalId.value,
    lifecycleStatus: lifecycleStatus.value,
    typePlanningSubStatus: typePlanningSubStatus.value,
    planningSubStatus: planningSubStatus.value,
    usageSubStatus: usageSubStatus.value,
    operationalSubStatus: operationalSubStatus.value,
  };

  const setDataValidation =
    nameEdit.value === dataformModal.name
      ? {...setDataFormEdit}
      : {...setDataFormEdit, name: nameEdit.value};

  function handleEditForm() {
    const variables: UpdateResourceMutationVariables = {
      input: {
        filter: {
          id: dataformModal.id,
        },
        set: setDataValidation,
      },
    };

    propertyTypes.forEach(e => {
      const variablesEditpropeties: UpdateResourcePropertyMutationVariables = {
        input: {
          filter: {
            id: Array<string>(e.id),
          },
          set: omit(e, ['name', 'type', 'id', 'propertyType']),
        },
      };
      UpdateResourcePropertyMutation(variablesEditpropeties);
    });

    UpdateResourceMutation(variables, {
      onCompleted: () => {
        isCompleted();
        closeFormAddEdit();
      },
    });
  }

  const renderForm = (label, nameCreate, nameEdit) => {
    return mode === 'edit' ? (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField label={label} variant="outlined" fullWidth {...nameEdit} />
        </form>
      </Grid>
    ) : (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField
            label={label}
            variant="outlined"
            name={nameCreate}
            onChange={handleChange}
            fullWidth
          />
        </form>
      </Grid>
    );
  };

  const renderFormSelect = (label, nameCreate, nameEdit, renderList) => {
    return mode === 'edit' ? (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField
            select
            label={label}
            variant="outlined"
            fullWidth
            {...nameEdit}>
            {renderList.map((item, index) => (
              <MenuItem key={index} value={item}>
                {startCase(camelCase(item))}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Grid>
    ) : (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField
            select
            label={label}
            variant="outlined"
            name={nameCreate}
            onChange={handleChange}
            fullWidth>
            {renderList.map((item, index) => (
              <MenuItem key={index} value={item}>
                {startCase(camelCase(item))}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </Grid>
    );
  };

  return (
    <>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Card margins="none">
          <PropertyTypesTableDispatcher.Provider
            value={{dispatch: propertyTypesDispatcher, propertyTypes}}>
            <FormContextProvider
              permissions={{
                entity: 'location',
              }}>
              <CardHeader className={classes.cardHeader}>
                {dataformModal.name}
              </CardHeader>
              <Grid container>
                <Grid item xs={6}>
                  <div className={classes.formField} autoComplete="off">
                    <NameInput title="" {...nameEdit} />
                  </div>
                </Grid>
                {renderForm('External ID', 'externalId', externalId)}
                {renderFormSelect(
                  'Lifesycle State',
                  'lifecycleStatus',
                  lifecycleStatus,
                  selectListData.lifecycleStatus,
                )}
                {resourceType.data.lifecycleStatus === 'PLANNING' ||
                lifecycleStatus.value === 'PLANNING'
                  ? renderFormSelect(
                      'Planning Status',
                      'typePlanningSubStatus',
                      typePlanningSubStatus,
                      selectListData.typePlanningSubStatus,
                    )
                  : null}

                {resourceType.data.lifecycleStatus === 'OPERATING' ||
                lifecycleStatus.value === 'OPERATING' ? (
                  <>
                    {renderFormSelect(
                      'Administrative Status',
                      'planningSubStatus',
                      planningSubStatus,
                      selectListData.planningSubStatus,
                    )}
                    {renderFormSelect(
                      'Operational Status',
                      'operationalSubStatus',
                      operationalSubStatus,
                      selectListData.operationalSubStatus,
                    )}
                    {renderFormSelect(
                      'Usage Status',
                      'usageSubStatus',
                      usageSubStatus,
                      selectListData.usageSubStatus,
                    )}
                  </>
                ) : null}
              </Grid>

              <AddEditPropertyList propertyTypes={propertyTypes} />
              <Grid
                className={classes.header}
                container
                direction="row"
                justify="flex-end"
                alignItems="center">
                <Grid>
                  <FormSaveCancelPanel
                    isDisabled={false}
                    onCancel={closeFormAddEdit}
                    onSave={() => setDialogOpen(true)}
                  />
                </Grid>
              </Grid>
            </FormContextProvider>
          </PropertyTypesTableDispatcher.Provider>
        </Card>
      </Grid>
      {dialogOpen && (
        <SaveDialogConfirm
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          saveItem={mode === 'edit' ? handleEditForm : handleCreateForm}
          resource={''}
          typeAlert={'information'}
          customMessage="The information will be saved and you can find it in the list of resources."
          customTitle="Resource Creation"
        />
      )}
    </>
  );
};

export default AddEditResourceInLocation;
