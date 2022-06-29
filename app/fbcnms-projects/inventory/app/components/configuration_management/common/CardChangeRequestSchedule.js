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
  setSchedule?: () => void,
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

const TYPE_SCHEDULE = {
  AS_SOON_AS_APROVED: 'AS_SOON_AS_APPROVED',
  SCHEDULE_CHANGE: 'SCHEDULED_CHANGE',
};
const DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss[Z]';

const CardChangeRequestSchedule = (props: Props) => {
  const {schedule, setSchedule} = props;
  const [dataSchedule, setDataSchedule] = useState(schedule);
  const [checkedHidden, setCheckedHidden] = useState({
    asSoonAsAproved: false,
    scheduleChange: true,
  });

  console.log('IN->', schedule);
  console.log('STATE->', dataSchedule);

  useEffect(() => {
    dataSchedule?.type == TYPE_SCHEDULE.AS_SOON_AS_APROVED
      ? setCheckedHidden({
          asSoonAsAproved: true,
          scheduleChange: false,
        })
      : checkedHidden;
  }, [dataSchedule?.type]);

  const handleChangeSchedule = () => {
    setDataSchedule({
      ...dataSchedule,
      type: TYPE_SCHEDULE.SCHEDULE_CHANGE,
    });
    setCheckedHidden({
      asSoonAsAproved: false,
      scheduleChange: true,
    });
  };
  const handleChangeAproved = () => {
    setDataSchedule({
      ...dataSchedule,
      type: TYPE_SCHEDULE.AS_SOON_AS_APROVED,
    });
    setCheckedHidden({
      asSoonAsAproved: true,
      scheduleChange: false,
    });
  };
  const handleDateChange = date => {
    console.log(date);
    const timeUp = moment(date).format(DATE_FORMAT);
    console.log(timeUp + 'Z');
    setSchedule({...schedule, time: timeUp});
    setDataSchedule({...dataSchedule, time: timeUp});
  };

  const handleOnSelectDay = e => {
    setSchedule({...schedule, weekDay: e.target.value});
    setDataSchedule({...dataSchedule, weekDay: e.target.value});
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel
          style={{padding: '0 0 0 40px'}}
          onChange={handleChangeAproved}
          checked={checkedHidden.asSoonAsAproved}
          value="approved"
          control={<Radio color="primary" />}
          label="As soon as approved "
        />
        <FormControlLabel
          onChange={handleChangeSchedule}
          checked={checkedHidden.scheduleChange}
          value="approval"
          control={<Radio color="primary" />}
          label="Schedule with approval"
        />
        <Divider />
      </Grid>
      <Hidden xsUp={!checkedHidden.scheduleChange}>
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
                onChange={handleOnSelectDay}
                value={
                  dataSchedule?.type === 'SCHEDULED_CHANGE' &&
                  dataSchedule?.weekDay
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
                    dataSchedule?.type === 'SCHEDULED_CHANGE' &&
                    dataSchedule?.time.slice(0, schedule?.time.length - 1)
                  }
                  onChange={handleDateChange}
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
