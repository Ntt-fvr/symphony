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
import {AlarmFilteringStatus} from './AlarmFilteringStatus';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';

import Switch from '@symphony/design-system/components/switch/Switch';
import {useFormInput} from './common/useFormInput';
import {makeStyles} from '@material-ui/styles';
import type {EditAlarmFilterMutationVariables} from '../../mutations/__generated__/EditAlarmFilterMutation.graphql';

import EditAlarmFilterMutation from '../../mutations/EditAlarmFilterMutation';
import type {RemoveAlarmFilterMutationVariables} from '../../mutations/__generated__/RemoveAlarmFilterMutation.graphql';

import RemoveAlarmFilterMutation from '../../mutations/RemoveAlarmFilterMutation';


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
  marginBottom: "1rem",
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
  closeEditForm: () => void,
  formValues: {
    item: {
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
      },
    },
  },
|}>;

const EditAlarmFilteringItemForm = (props: Props) => {
  const {closeEditForm, formValues} = props;
  const classes = useStyles();
  const id = useFormInput(formValues.item.id);
  const name = useFormInput(formValues.item.name);
  const networkResource = useFormInput(formValues.item.networkResource);
  const beginTime = useFormInput(moment(formValues.item.beginTime).format("YYYY-MM-DDThh:mm"));
  const endTime = useFormInput(moment(formValues.item.endTime).format("YYYY-MM-DDThh:mm"));
  const reason = useFormInput(formValues.item.reason);
  const creationTime = useFormInput(formValues.item.creationTime);
  const user = useFormInput(formValues.item.user);
  const alarmStatus = useFormInput(formValues.item.alarmStatus.id);
  const [checked, setChecked] = useState(formValues.item.enable);
  
  const handleRemove = id => {
    const variables: RemoveAlarmFilterMutationVariables = {
      id: id,
    };
    RemoveAlarmFilterMutation(variables);
  };
  
  
  function handleClickEdit() {
    const variables: EditAlarmFilterMutationVariables = {
      input: {
        id: id.value,
        name: name.value,
        networkResource: networkResource.value,
        enable: checked,
        beginTime: moment(beginTime.value).format(),
        endTime: moment(endTime.value).format(),
        reason: reason.value,
        alarmStatus: alarmStatus.value,
      },
    };
    EditAlarmFilterMutation(variables);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons} alignItems="center">
          <Grid xs={9}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Edit Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid xs={1}>
            <IconButton
              icon={DeleteOutlinedIcon}
              className={classes.delete}
              onClick={() => {
                handleRemove(formValues.item.id)
                closeEditForm()
              }}
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
                    onClick={() => closeEditForm()}>
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    onClick={() => {
                      handleClickEdit();
                      closeEditForm()
                    }}
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
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
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
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                    />
                  </FormField>
                </Grid>
                <Grid xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      {...endTime}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container xs={6} className={classes.status}>
                <Grid xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    <AlarmFilteringStatus
                      {...alarmStatus}
                      creationDate={formValues.item.creationTime}
                      beginDate={formValues.item.beginTime}
                      endDate={formValues.item.endTime}
                      className={classes.formFieldStatus}
                      name="alarmStatus"
                    />
                  </FormField>
                </Grid>
                <Grid xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput
                      className={classes.textInput}
                      name="id"
                      disabled
                      {...id}
                    />
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
