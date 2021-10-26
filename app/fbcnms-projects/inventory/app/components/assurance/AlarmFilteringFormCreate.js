/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddAlarmFilterMutationVariables} from '../../mutations/__generated__/AddAlarmFilterMutation.graphql';

import React, {useMemo, useState} from 'react';
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

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px',
  },
  header: {
    marginBottom: '1rem',
  },
  gridStyleLeft: {
    paddingRight: '0.5rem',
  },
  gridStyleRight: {
    paddingLeft: '0.5rem',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  calendar: {
    '& .MuiOutlinedInput-input': {
      height: '12px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
    },
  },
}));

type Props = $ReadOnly<{|
  returnTableAlarm: () => void,
  isCompleted: void => void,
|}>;

const AlarmFilteringFormCreate = (props: Props) => {
  const {returnTableAlarm, isCompleted} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleDisable = useMemo(
    () =>
      !(
        Object.values(AlarmFilter.data).length === 5 &&
        !Object.values(AlarmFilter.data).some(item => item === '')
      ),
    [AlarmFilter.data],
  );

  function handleChange({target}) {
    setAlarmFilter({
      data: {
        ...AlarmFilter.data,
        [target.name]: target.value.trim(),
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
    AddAlarmFilterMutation(variables, {onCompleted: () => isCompleted()});
    returnTableAlarm();
  }

  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Grid>
            <Text variant="h6" weight="bold">
              {fbt('Create Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid xs>
            <FormField>
              <Button
                style={{marginRight: '1rem'}}
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={() => returnTableAlarm()}>
                Cancel
              </Button>
            </FormField>
          </Grid>
          <Grid>
            <FormField>
              <Button
                onClick={() => setDialogOpen(true)}
                className={classes.option}
                variant="contained"
                color="primary"
                disabled={handleDisable}>
                Save
              </Button>
            </FormField>
          </Grid>
        </Grid>
        <Grid xs>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                <FormField label="Enabled">
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField label="Name">
                  <TextInput
                    autoComplete="off"
                    name="name"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12}>
                  <FormField label="Network Resource">
                    <TextInput
                      autoComplete="off"
                      name="networkResource"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField label="Reason">
                  <TextInput
                    type="multiline"
                    rows={4}
                    name="reason"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField label="Start">
                    <TextField
                      className={classes.calendar}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField label="End">
                    <TextField
                      className={classes.calendar}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid
                  item
                  xs={4}
                  lg={3}
                  xl={2}
                  className={classes.gridStyleLeft}
                  style={{marginTop: '25px'}}>
                  <AlarmFilteringStatus
                    creationDate={moment(
                      AlarmFilter.data.creationTime,
                    ).format()}
                    beginDate={moment(AlarmFilter.data.beginTime).format()}
                    endDate={moment(AlarmFilter.data.endTime).format()}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  lg={9}
                  xl={10}
                  className={classes.gridStyleRight}>
                  <FormField label="ID">
                    <TextInput autoComplete="off" name="id" disabled />
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
    </Grid>
  );
};
export default AlarmFilteringFormCreate;
