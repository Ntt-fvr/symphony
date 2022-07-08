/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {AddCMVersionMutationVariables} from '../../mutations/__generated__/AddCMVersionMutation.graphql';
import type {AddEditResourceInLocationQuery} from './__generated__/AddEditResourceInLocationQuery.graphql';

import React, {useState} from 'react';

import type {
  AddResourceMutationResponse,
  AddResourceMutationVariables,
  LifecycleStatus,
  OperationalSubStatus,
  PlanningSubStatus,
  TypePlanningSubStatus,
  UsageSubStatus,
} from '../../mutations/__generated__/AddResourceMutation.graphql';

import type {MutationCallbacks} from '../../mutations/MutationCallbacks';

import AddCMVersionMutation from '../../mutations/AddCMVersionMutation';
import AddResourceMutation from '../../mutations/AddResourceMutation';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Event from '@material-ui/icons/Event';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import SaveDialogConfirm from '../configure/SaveDialogConfirm';
import TextField from '@material-ui/core/TextField';
import inventoryTheme from '../../common/theme';
import moment from 'moment';
import symphony from '@symphony/design-system/theme/symphony';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from '../assurance/common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';

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
  buttons: {
    height: '36px',
    width: '111px',
  },
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: symphony.palette.B50,
    },
  },
  buttonEdit: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
      color: symphony.palette.B600,
    },
  },
}));

const queryConfigurationParameterType = graphql`
  query AddEditResourceInLocationQuery(
    $filter: ConfigurationParameterTypeFilter
  ) {
    queryConfigurationParameterType(filter: $filter) {
      id
      name
      type
      intValue
      floatValue
      stringValue
      booleanValue
      resourceSpecification
    }
  }
`;

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
  const [slotStartDate, setSlotStartDate] = useState(moment);
  const [slotEndDate, setSlotEndDate] = useState(moment);
  const [slotInstallDate, setSlotInstallDate] = useState(moment);

  const response = useLazyLoadQuery<AddEditResourceInLocationQuery>(
    queryConfigurationParameterType,
    {
      filter: {
        resourceSpecification: {
          eq: dataformModal.id,
        },
      },
    },
  );

  const dataPropertyType = response.queryConfigurationParameterType
    ?.map(p => p)
    .filter(Boolean);

  const convertParametersMap = (data: T): T =>
    data?.map(prop => {
      return {
        parameterType: {
          ...prop,
          resourceSpecification: dataformModal.id,
        },
      };
    });

  const nameEdit = useFormInput(dataformModal.name);
  const externalID = useFormInput(dataformModal.externalID);
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

  function handleCreateForm() {
    const variables: AddResourceMutationVariables = {
      input: [
        {
          locatedIn: selectedLocationId,
          name: resourceType.data.name,
          resourceSpecification: dataformModal.id,
          isDeleted: true,
          externalId: resourceType.data.externalId,
          lifecycleStatus: resourceType.data.lifecycleStatus,
          typePlanningSubStatus: resourceType.data.typePlanningSubStatus,
          planningSubStatus: resourceType.data.planningSubStatus,
          usageSubStatus: resourceType.data.usageSubStatus,
          operationalSubStatus: resourceType.data.operationalSubStatus,
        },
      ],
    };

    const response: MutationCallbacks<AddResourceMutationResponse> = {
      onCompleted: response => {
        const cmVersionVariables: AddCMVersionMutationVariables = {
          input: [
            {
              resource: {
                id: response.addResource?.resource[0]?.id,
              },
              parameters: convertParametersMap(dataPropertyType),
              status: 'CURRENT',
            },
          ],
        };
        AddCMVersionMutation(cmVersionVariables, {
          onCompleted: () => isCompleted(),
        });
        isCompleted();
      },
    };
    AddResourceMutation(variables, response);
    setResourceType({data: {}});
    closeFormAddEdit();
  }
  const renderForm = (label, nameCreate, nameEdit) => {
    return mode === 'edit' ? (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField
            required
            label={label}
            variant="outlined"
            fullWidth
            {...nameEdit}
          />
        </form>
      </Grid>
    ) : (
      <Grid item xs={6}>
        <form className={classes.formField} autoComplete="off">
          <TextField
            required
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

  const renderFormPicker = (label, value, setValue) => {
    return mode === 'edit' ? (
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            label={label}
            variant="inline"
            inputVariant="outlined"
            className={classes.formField}
            style={{
              width: '-webkit-fill-available',
              marginBottom: '41px',
            }}
            value={value}
            onChange={setValue}
            format="yyyy/MM/DD HH:mm a"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Event style={{color: '#8895AD'}} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    ) : (
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            label={label}
            variant="inline"
            inputVariant="outlined"
            className={classes.formField}
            style={{
              width: '-webkit-fill-available',
              marginBottom: '41px',
            }}
            value={value}
            onChange={setValue}
            format="yyyy/MM/DD HH:mm a"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Event style={{color: '#8895AD'}} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    );
  };

  return (
    <>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Card margins="none">
          <CardHeader className={classes.cardHeader}>
            {dataformModal.name}
          </CardHeader>
          <Grid container>
            {renderForm('Name', 'name', nameEdit)}
            {renderForm('External ID', 'externalID', externalID)}
            {renderFormSelect(
              'Lifesycle State',
              'lifecycleStatus',
              lifecycleStatus,
              selectListData.lifecycleStatus,
            )}

            {resourceType.data.lifecycleStatus === 'PLANNING'
              ? renderFormSelect(
                  'Planning Status',
                  'typePlanningSubStatus',
                  typePlanningSubStatus,
                  selectListData.typePlanningSubStatus,
                )
              : null}

            {resourceType.data.lifecycleStatus === 'OPERATING' ? (
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

            <Grid item xs={12}>
              <CardHeader className={classes.cardHeader}>Properties</CardHeader>
            </Grid>
            {renderForm('ID', 'id')}
            {renderForm('Administrative Substate', 'administrativeSubstate')}
            {renderFormPicker(
              'In Service Date',
              slotStartDate,
              setSlotStartDate,
            )}
            {renderFormPicker(
              'End Service Date',
              slotStartDate,
              setSlotStartDate,
            )}
            {renderFormPicker(
              'Out of Service Date',
              slotEndDate,
              setSlotEndDate,
            )}
            {renderFormPicker(
              'Install Date',
              slotInstallDate,
              setSlotInstallDate,
            )}
            {renderForm('Bandwith from', 'bandwithFrom')}
            {renderForm('Bandwith from', 'bandwithFrom')}
          </Grid>
          <Grid
            className={classes.header}
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttons}
                style={{marginRight: '1rem'}}
                onClick={closeFormAddEdit}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={() => setDialogOpen(true)}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {dialogOpen && (
        <SaveDialogConfirm
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          saveItem={handleCreateForm}
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
