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
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Hidden from '@material-ui/core/Hidden';
import MomentUtils from '@date-io/moment';
import Radio from '@material-ui/core/Radio';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {FormField} from './change_request/common/FormField';
import {Grid} from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
}));

export type Props = $ReadOnly<{||}>;

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const CardSuggested = (props: Props) => {
  const {} = props;
  const classes = useStyles();

  const [checkedHidden, setCheckedHidden] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date('2022-03-02T24:00:00'),
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={classes.container}>
      <Card margins="none">
        <Grid style={{margin: '0 16px'}}>
          <CardHeader className={classes.cardHeader}>
            Parameters to changed
          </CardHeader>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel
                style={{padding: '0 0 0 40px'}}
                onChange={() => setCheckedHidden(!checkedHidden)}
                checked={checkedHidden}
                value="approved"
                control={<Radio color="primary" />}
                label="As soon as approved "
              />
              <FormControlLabel
                onChange={() => setCheckedHidden(!checkedHidden)}
                checked={!checkedHidden}
                value="approval"
                control={<Radio color="primary" />}
                label="Schedule with approval"
              />
              <Divider />
            </Grid>
            <Hidden xsUp={checkedHidden}>
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
                      label="Family name"
                      name="family"
                      defaultValue=""
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
                        label="Masked timepicker"
                        placeholder="08:00 AM"
                        mask="__:__ _M"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={date => handleDateChange(date)}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </FormField>
            </Hidden>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export {CardSuggested};
