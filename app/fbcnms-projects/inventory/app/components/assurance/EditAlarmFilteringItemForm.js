/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

import moment from 'moment';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import AlarmFilteringAddDialog from './AlarmFilteringAddDialog';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import InventorySuspense from '../../common/InventorySuspense';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {StatusActive} from './AlarmFilteringStatus';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';

import Switch from './common/Switch';
import {useFormInput} from './common/useFormInput';
import {makeStyles} from '@material-ui/styles';
import type {EditAlarmFilterMutationVariables} from '../../mutations/__generated__/EditAlarmFilterMutation.graphql';

import EditAlarmFilterMutation from '../../mutations/EditAlarmFilterMutation';

import DateTimeFormat from '../../common/DateTimeFormat.js';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 0',
  },
  formFieldStatus: {
    marginTop: '1rem',
  },
  textInput: {
    minHeight: '36px',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '2rem',
  },
  titleButtons: {
    padding: '1rem 1rem 0 1rem',
    alignItems: 'center',
  },
  reason: {
    minHeight: '100px',
  },
  status: {
    paddingTop: '40px',
  },
  time: {
    marginBottom: '20px',
  },
}));

type Props = $ReadOnly<{|
  returnTableAlarm: () => void,
  dataValues: any,
  formValues: {
    id: string,
    name: string,
    networkResource: string,
    enable: boolean,
    beginTime: string,
    endTime: string,
    reason: string,
    user: string,
    creationTime: string,
    alarmStatus: {
      id: string,
      name: string,
    }
  }
|}>;


const EditAlarmFilteringItemForm = (props: Props) => {
  const {returnTableAlarm, dataValues, formValues} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const id = useFormInput(formValues.id);
  const name = useFormInput(formValues.name);
  const networkResource = useFormInput(formValues.networkResource);
  const beginTime = useFormInput(formValues.beginTime);
  const endTime = useFormInput(formValues.endTime);
  const reason = useFormInput(formValues.reason);
  const creationTime = useFormInput(formValues.creationTime);
  const user = useFormInput(formValues.user);
  
  function handleChange({target}) {
    setAlarmFilter({
      data: {
        ...AlarmFilter.data,
        [target.name]: target.value,
      },
    });
  }

    function handleClickEdit() {
    const variables: EditAlarmFilterMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        networkResource: networkResource.value,
        enable: true,
        beginTime: beginTime.value,
        endTime: endTime.value,
        reason: reason.value,
        user: user.value,
        creationTime: creationTime.value,
      },
    };
    EditAlarmFilterMutation(variables);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid xs={9}>
            <Text className={classes.textTitle} variant="h6">
              { fbt('Edit Alarm Filtering', ' ')}
            </Text>
          </Grid>
          <Grid xs={1}>
            <DeleteOutlinedIcon
              className={classes.delete}
              // onClick={() => handleRemove()}
            />
          </Grid>
          <Grid xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="outlined"
                    color="primary"
                    onClick={() => returnTableAlarm()}
                  >
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className={classes.option}
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Card>
            <Grid container>
              <Grid xs={1}>
                <FormField label="Enabled">
                  <Switch
                    name="enable"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"  
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField
                  label="Network Resource"
                  className={classes.formField}>
                  <TextInput
                    {...networkResource}
                    className={classes.textInput}
                    name="networkResource"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput
                    {...reason}
                    className={classes.textInput}
                    type="multiline"
                    rows={4}
                    name="reason"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container xs={6}>
                <Grid className={classes.time} xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
                <Grid xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      {...beginTime}
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2021-07-01T10:30"
                      name="beginTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      {...endTime}
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2021-07-02T11:30"
                      name="endTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container xs={6} className={classes.status}>
                <Grid xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    <StatusActive className={classes.formFieldStatus} name="alarmStatus" />
                  </FormField>
                </Grid>
                <Grid xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput className={classes.textInput} name="id" disabled {...id} />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default EditAlarmFilteringItemForm;
