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
import {AlarmFilteringStatus} from './AlarmFilteringStatus';

import Switch from '@symphony/design-system/components/switch/Switch';

import {makeStyles} from '@material-ui/styles';

import type {AddAlarmFilterMutationVariables} from '../../mutations/__generated__/AddAlarmFilterMutation.graphql';

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';

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
  cancel: {
    width: '111px',
    height: '36px',
    marginRight: '70px',
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
    marginBottom: '1rem',
  },
  reason: {
    minHeight: '100px',
  },
  status: {
    paddingTop: '40px',
  },
  filterStatus: {
    marginTop: '25px',
  },
  time: {
    marginBottom: '13px',
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
  returnTableAlarm: () => void,
|}>;

const AlarmFilteringFormCreate = (props: Props) => {
  const {returnTableAlarm} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  function handleChange({target}) {
    setAlarmFilter({
      data: {
        ...AlarmFilter.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddAlarmFilterMutationVariables = {
      input: {
        name: AlarmFilter.data.name,
        networkResource: AlarmFilter.data.networkResource,
        enable: checked,
        beginTime: moment(AlarmFilter.data.beginTime).format(),
        endTime: moment(AlarmFilter.data.endTime).format(),
        reason: AlarmFilter.data.reason,
        user: 'user',
        creationTime: moment(AlarmFilter.data.creationTime).format(),
      },
    };
    AddAlarmFilterMutation(variables);
    returnTableAlarm();
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons} alignItems="center">
          <Grid xs={7} sm={9} lg={11} xl={11}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Create Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid xs={5} sm={3} lg={1} xl={1} container>
            <Grid xs={6}>
              <FormField>
                <Button
                  className={classes.cancel}
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                      InputProps={{
                        classes: {
                          input: classes.textFieldDate,
                        },
                      }}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textFieldDate,
                        },
                      }}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container xs={6} className={classes.status}>
                <Grid xs={3} className={classes.filterStatus}>
                  <AlarmFilteringStatus
                    creationDate={moment(
                      AlarmFilter.data.creationTime,
                    ).format()}
                    beginDate={moment(AlarmFilter.data.beginTime).format()}
                    endDate={moment(AlarmFilter.data.endTime).format()}
                  />
                </Grid>
                <Grid xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput
                      autoComplete="off"
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
