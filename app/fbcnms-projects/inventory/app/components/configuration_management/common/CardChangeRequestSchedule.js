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
import {useState} from 'react';

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
const DATE_FORMAT = 'YYYY-MM-DD[T]HH:mm:ss';

const CardChangeRequestSchedule = (props: Props) => {
  const {schedule, onSchedule} = props;

  const [checkedHidden, setCheckedHidden] = useState(true);

  console.log('card', schedule, checkedHidden);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControlLabel
          style={{padding: '0 0 0 40px'}}
          onChange={() => setCheckedHidden(!checkedHidden)}
          checked={schedule?.type === 'AS_SOON_AS_APPROVED' && false}
          value="approved"
          control={<Radio color="primary" />}
          label="As soon as approved "
        />
        <FormControlLabel
          onChange={() => setCheckedHidden(!checkedHidden)}
          checked={schedule?.type === 'SCHEDULED_CHANGE' && true}
          // () => setCheckedHidden(checkedHidden))
          value="approval"
          control={<Radio color="primary" />}
          label="Schedule with approval"
        />
        <Divider />
      </Grid>
      <Hidden xsUp={schedule?.type === 'SCHEDULED_CHANGE' && true}>
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
                // onChange={handleOnSelectDay}
                value={
                  schedule?.type === 'SCHEDULED_CHANGE'
                    ? schedule?.weekDay
                    : schedule?.type === 'AS_SOON_AS_APPROVED' && undefined
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
                  // label="Masked timepicker"
                  placeholder={''}
                  mask="__:__ _M"
                  inputVariant="outlined"
                  value={
                    schedule?.type === 'SCHEDULED_CHANGE'
                      ? schedule?.time.slice(0, schedule?.time.length - 1)
                      : schedule?.type === 'AS_SOON_AS_APPROVED' && null
                  }
                  // onChange={date => handleDateChange(date)}
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
