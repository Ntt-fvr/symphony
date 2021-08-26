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

import TextInput from '@symphony/design-system/components/Input/TextInput';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';

import type {EditAlarmFilterMutationVariables} from '../../mutations/__generated__/EditAlarmFilterMutation.graphql';

import Switch from '@symphony/design-system/components/switch/Switch';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';

import type {RemoveAlarmFilterMutationVariables} from '../../mutations/__generated__/RemoveAlarmFilterMutation.graphql';

import EditAlarmFilterMutation from '../../mutations/EditAlarmFilterMutation';

import RemoveAlarmFilterMutation from '../../mutations/RemoveAlarmFilterMutation';
import {AlarmFilteringStatus} from './AlarmFilteringStatus';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 0',
  },
  id: {
    margin: '50px 43px 22px 0',
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
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '2rem',
  },
  titleButtons: {
    marginBottom: '1rem',
  },
  reason: {
    minHeight: '100px',
  },
  status: {
    marginTop: '74px',
  },
  time: {
    marginBottom: '20px',
  },
  cancel: {
    width: '111px',
    height: '36px',
    alignSelf: 'center',
  },
  button: {
    width: '111px',
    height: '36px',
  },
  buttonActive: {
    border: '1px solid #00AF5B',
    color: '#00AF5B',
    fontSize: '14px',
  },
  buttonPending: {
    border: '1px solid #FFB63E',
    color: '#FFB63E',
    fontSize: '14px',
  },
  buttonClosed: {
    border: '1px solid #8895AD',
    color: '#8895AD',
    fontSize: '14px',
  },
  textFieldDate: {
    height: '12px',
    border: '1px solid #D2DAE7',
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
  const beginTime = useFormInput(
    moment(formValues.item.beginTime).format('YYYY-MM-DDThh:mm'),
  );
  const endTime = useFormInput(
    moment(formValues.item.endTime).format('YYYY-MM-DDThh:mm'),
  );
  const reason = useFormInput(formValues.item.reason);
  const creationTime = useFormInput(formValues.item.creationTime);
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
      },
    };
    EditAlarmFilterMutation(variables);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons} alignItems="center">
          <Grid xs={7} sm={9} lg={9} xl={10}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Edit Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid className={classes.delete} xs={1} sm={1} lg={1} xl={1}>
            <DeleteOutlinedIcon
              icon={DeleteOutlinedIcon}
              onClick={() => {
                handleRemove(formValues.item.id);
                closeEditForm();
              }}
            />
          </Grid>
          <Grid xs={3} sm={2} lg={2} xl={1}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.cancel}
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
                      closeEditForm();
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
                    autoComplete="off"
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
                    autoComplete="off"
                    className={classes.textInput}
                    name="networkResource"
                  />
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput
                    {...reason}
                    autoComplete="off"
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
                      autoComplete="off"
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
                      autoComplete="off"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container xs={6}>
                <Grid xs={3} className={classes.status}>
                  <AlarmFilteringStatus
                    creationDate={creationTime.value}
                    beginDate={beginTime.value}
                    endDate={endTime.value}
                  />
                </Grid>
                <Grid xs={9}>
                  <FormField label="ID" className={classes.id}>
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
