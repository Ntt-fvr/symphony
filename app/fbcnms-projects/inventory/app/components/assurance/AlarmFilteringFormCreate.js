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

import React, {useRef, useState} from 'react';
import fbt from 'fbt';

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
import {useDisabledButton} from './common/useDisabledButton';
import {useValidation} from './common/useValidation';

import type {Node} from './AlarmFilteringTypes';

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px',
  },
  header: {
    marginBottom: '1rem',
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      width: '100%',
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
  reason: {
    minHeight: '60px',
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
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
      height: '24px',
    },
  }
}));

type Props = $ReadOnly<{|
  returnTableAlarm: () => void,
  isCompleted: void => void,
  alarms?: Array<Node>,
|}>;

const AlarmFilteringFormCreate = (props: Props) => {
  const {returnTableAlarm, isCompleted, alarms} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const elementRef = useRef();

  const namesAlarms = alarms?.map(item => item.node.name);

  const handleDisable = useDisabledButton(AlarmFilter.data, namesAlarms, 5);

  const validationName = useValidation(
    AlarmFilter.data.name,
    namesAlarms,
    'Alarm',
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
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullwidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    {...validationName}
                  />
                </form>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      required
                      fullwidth
                      label="Network Resource"
                      variant="outlined"
                      name="networkResource"
                      onChange={handleChange}
                    />
                  </form>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullwidth
                    multiline
                    rows={3}
                    label="Reason"
                    variant="outlined"
                    name="reason"
                    className={classes.reason}
                    inputProps={{maxLength: 120}}
                    onChange={handleChange}
                  />
                </form>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField className={classes.formField}>
                    <TextField
                      className={classes.calendar}
                      variant="outlined"
                      label="Start"
                      InputLabelProps={{shrink: true}}
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField className={classes.formField}>
                    <TextField
                      className={classes.calendar}
                      variant="outlined"
                      label="End"
                      InputLabelProps={{shrink: true}}
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
                    forwardedRef={elementRef}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  lg={9}
                  xl={10}
                  className={classes.gridStyleRight}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      disabled
                      className={classes.textInput}
                      label="ID"
                      variant="outlined"
                      name="id"
                      onChange={handleChange}
                    />
                  </form>
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
