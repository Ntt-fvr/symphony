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

import AlarmFilteringAddDialog from './AlarmFilteringAddDialog';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {StatusActive} from './AlarmFilteringStatus';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';

import Switch from './common/Switch';

import {makeStyles} from '@material-ui/styles';

import type {AddAlarmFilterMutationVariables} from '../../mutations/__generated__/AddAlarmFilterMutation.graphql';

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';

import type {RemoveAlarmFilterMutationVariables} from '../../mutations/__generated__/RemoveAlarmFilterMutation.graphql';

import RemoveAlarmFilterMutation from '../../mutations/RemoveAlarmFilterMutation';

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

type AlarmFilter = {
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
};

type Props = $ReadOnly<{|
  returnTableAlarm: () => void,
  dataValues: any,
|}>;

const AlarmFilteringFormCreate = (props: Props) => {
  const {returnTableAlarm, dataValues} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleChange({target}) {
    setAlarmFilter({
      data: {
        ...AlarmFilter.data,
        [target.name]: target.value,
      },
    });
  }

  const handleRemove = id => {
    // const removeItem =  setAlarmFilter(dataValues.filter(item => item.id !== id))
    const variables: RemoveAlarmFilterMutationVariables = {
      id: id,
    };
    RemoveAlarmFilterMutation(variables);
  };

  function handleClick() {
    const variables: AddAlarmFilterMutationVariables = {
      input: {
        name: AlarmFilter.data.name,
        networkResource: AlarmFilter.data.networkResource,
        enable: true,
        beginTime: moment(AlarmFilter.data.beginTime).format(),
        endTime: moment(AlarmFilter.data.endTime).format(),
        reason: AlarmFilter.data.reason,
        user: 'user',
        creationTime: moment(AlarmFilter.data.creationTime).format(),
        alarmStatus: 8589934592,
      },
    };
    returnTableAlarm();
    AddAlarmFilterMutation(variables);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid xs={9}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Edit Alarm Filtering', ' ')}
            </Text>
          </Grid>
          <Grid xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="outlined"
                    color="primary"
                    onClick={() => returnTableAlarm()}>
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
                  <Switch name="enable" onChange={handleChange} />
                </FormField>
              </Grid>
              <Grid xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput
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
                    className={classes.textInput}
                    name="networkResource"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput
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
                    <StatusActive
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
                    />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {dialogOpen && (
        <AlarmFilteringAddDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAlarmSelected={handleClick}
          onAlarmSelectedData={AlarmFilter.data}
        />
      )}
    </div>
  );
};
export default AlarmFilteringFormCreate;
