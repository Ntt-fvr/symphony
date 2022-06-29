/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Hidden from '@material-ui/core/Hidden';
import MomentUtils from '@date-io/moment';
import Radio from '@material-ui/core/Radio';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {FormField} from './FormField';
import {Grid} from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {MenuItem} from '@material-ui/core';
import {useCallback, useEffect, useState} from 'react';

export type Props = $ReadOnly<{|
  schedule?: any,
  onSchedule?: any,
|}>;

const days = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

const CardChangeRequestSchedule = (props: Props) => {
  const {schedule, onSchedule} = props;
  const [dataSchedule, setDataSchedule] = useState(schedule);
  const [checkedHidden, setCheckedHidden] = useState({
    as: false,
    schedule: true,
  });

  console.log('dt2->', dataSchedule);
  console.log('2->', checkedHidden);

  useEffect(() => {
    dataSchedule?.type == 'AS_SOON_AS_APPROVED'
      ? setCheckedHidden({
          as: true,
          schedule: false,
        })
      : checkedHidden;
    console.log(dataSchedule);
  }, [dataSchedule?.type]);

  const cambio = () => {
    setDataSchedule({
      ...dataSchedule,
      type: 'SCHEDULED_CHANGE',
    });
    setCheckedHidden({
      as: false,
      schedule: true,
    });
  };
  const cambio2 = () => {
    setDataSchedule({
      ...dataSchedule,
      type: 'AS_SOON_AS_APPROVED',
    });
    setCheckedHidden({
      as: true,
      schedule: false,
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel
          style={{padding: '0 0 0 40px'}}
          onChange={cambio2}
          checked={checkedHidden.as}
          value="approved"
          control={<Radio color="primary" />}
          label="As soon as approved "
        />
        <FormControlLabel
          onChange={cambio}
          checked={checkedHidden.schedule}
          value="approval"
          control={<Radio color="primary" />}
          label="Schedule with approval"
        />
        <Divider />
      </Grid>
      <Hidden xsUp={!checkedHidden.schedule}>
        <Grid style={{margin: '0 0 20px 0'}} item xs={12}>
          <Text
            style={{padding: '33px 0 0 40px'}}
            useEllipsis={true}
            weight={'regular'}
            color={'gray'}>
            Choose date and time for change execution after approval
          </Text>
        </Grid>
        <FormField>
          <Grid container>
            <Grid item xs={5}>
              <TextField
                required
                id="outlined-select-family"
                select
                style={{
                  padding: '0',
                  marginLeft: '40px',
                  width: '70%',
                }}
                label="Day"
                name="day"
                value={
                  schedule?.type === 'SCHEDULED_CHANGE' && dataSchedule?.weekDay
                }
                variant="outlined">
                {days.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardTimePicker
                  keyboardIcon={<AccessTimeIcon />}
                  placeholder={''}
                  mask="__:__ _M"
                  inputVariant="outlined"
                  value={
                    schedule?.type === 'SCHEDULED_CHANGE' &&
                    dataSchedule?.time.slice(0, schedule?.time.length - 1)
                  }
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </FormField>
      </Hidden>
    </Grid>
  );
};
export {CardChangeRequestSchedule};
