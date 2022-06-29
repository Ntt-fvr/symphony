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
import type {
  AddResourceMutationResponse,
  AddResourceMutationVariables,
} from '../../mutations/__generated__/AddResourceMutation.graphql';

import type {
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
import React, {useState} from 'react';
import SaveDialogConfirm from '../configure/SaveDialogConfirm';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import symphony from '@symphony/design-system/theme/symphony';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(() => ({
  formField: {
    margin: '0 30px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
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
      stringValue
      intValue
      booleanValue
      floatValue
      latitudeValue
      longitudeValue
      rangeFromValue
      rangeToValue
    }
  }
`;

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
|}>;

const AddEditResourceInLocation = (props: Props) => {
  const {
    closeFormAddEdit,
    dataformModal,
    selectedLocationId,
    isCompleted,
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

  const convertParametersMap = (data: T): Array<T> =>
    data?.map(prop => {
      return {
        ...prop,
      };
    });

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

  const selectListData = {
    lifecycleStatus: ['PLANNING', 'INSTALLING', 'OPERATING', 'RETIRED'],
    typePlanningSubStatus: [
      'PROPOSED',
      'FEASIBILITY CHECKED',
      'DESIGNED',
      'ORDERED',
    ],
    planningSubStatus: ['ACTIVATED', 'DESACTIVATED'],
    operationalSubStatus: ['WORKING', 'NOT WORKING'],
    usageSubStatus: ['AVAILABLE', 'RESERVED', 'NOT AVAILABLE', 'ASSIGNED'],
  };

  return (
    <>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Card margins="none">
          <CardHeader className={classes.cardHeader}>
            {dataformModal.name}
          </CardHeader>
          <Grid container>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  name="name"
                  onChange={handleChange}
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="External ID"
                  variant="outlined"
                  name="externalID"
                  onChange={handleChange}
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  select
                  label="Lifesycle state"
                  variant="outlined"
                  name="lifecycleStatus"
                  onChange={handleChange}
                  fullWidth>
                  {selectListData.lifecycleStatus.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {startCase(camelCase(item))}
                    </MenuItem>
                  ))}
                </TextField>
              </form>
            </Grid>

            {resourceType.data.lifecycleStatus === 'PLANNING' ? (
              <Grid item xs={6}>
                <form className={classes.formField}>
                  <TextField
                    select
                    label="Planning Status"
                    variant="outlined"
                    name="typePlanningSubStatus"
                    onChange={handleChange}
                    fullWidth>
                    {selectListData.typePlanningSubStatus.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {startCase(camelCase(item))}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
              </Grid>
            ) : null}

            {resourceType.data.lifecycleStatus === 'OPERATING' ? (
              <>
                <Grid item xs={6}>
                  <form className={classes.formField}>
                    <TextField
                      select
                      label="Administrative Status"
                      variant="outlined"
                      name="planningSubStatus"
                      onChange={handleChange}
                      fullWidth>
                      {selectListData.planningSubStatus.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {startCase(camelCase(item))}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                </Grid>
                <Grid item xs={6}>
                  <form className={classes.formField}>
                    <TextField
                      select
                      label="Operational Status"
                      variant="outlined"
                      name="operationalSubStatus"
                      onChange={handleChange}
                      fullWidth>
                      {selectListData.operationalSubStatus.map(
                        (item, index) => (
                          <MenuItem key={index} value={item}>
                            {startCase(camelCase(item))}
                          </MenuItem>
                        ),
                      )}
                    </TextField>
                  </form>
                </Grid>
                <Grid item xs={6}>
                  <form className={classes.formField}>
                    <TextField
                      select
                      label="Usage Status"
                      variant="outlined"
                      name="usageSubStatus"
                      onChange={handleChange}
                      fullWidth>
                      {selectListData.usageSubStatus.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {startCase(camelCase(item))}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                </Grid>
              </>
            ) : null}

            <Grid item xs={12}>
              <CardHeader className={classes.cardHeader}>Properties</CardHeader>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  label="ID"
                  variant="outlined"
                  onChange={handleChange}
                  name="id"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Administrative Substate"
                  variant="outlined"
                  onChange={handleChange}
                  name="administrativeSubstate"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  label="In Service Date"
                  variant="inline"
                  inputVariant="outlined"
                  className={classes.formField}
                  style={{
                    width: '-webkit-fill-available',
                    marginBottom: '41px',
                  }}
                  value={slotStartDate}
                  onChange={setSlotStartDate}
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
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  label="Out of Service Date"
                  variant="inline"
                  inputVariant="outlined"
                  className={classes.formField}
                  style={{
                    width: '-webkit-fill-available',
                    marginBottom: '41px',
                  }}
                  value={slotEndDate}
                  onChange={setSlotEndDate}
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
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  label="Install Date"
                  variant="inline"
                  inputVariant="outlined"
                  className={classes.formField}
                  style={{
                    width: '-webkit-fill-available',
                    marginBottom: '41px',
                  }}
                  value={slotInstallDate}
                  onChange={setSlotInstallDate}
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
            <Grid item xs={3}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Bandwith from"
                  variant="outlined"
                  name="bandwithFrom"
                  onChange={handleChange}
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={3}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Bandwith to"
                  variant="outlined"
                  name="bandwithTo"
                  onChange={handleChange}
                  fullWidth
                />
              </form>
            </Grid>
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
          typeAlert={'warning'}
          customMessage="are you sure you want to leave without saving changes?"
          customTitle="Resource Creation"
        />
      )}
    </>
  );
};

export default AddEditResourceInLocation;
