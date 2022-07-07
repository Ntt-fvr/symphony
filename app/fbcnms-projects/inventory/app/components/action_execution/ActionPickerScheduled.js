/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';
import DialogExecuteNow from './common/DialogExecuteNow';
import Event from '@material-ui/icons/Event';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MomentUtils from '@date-io/moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {
  DatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  titleCard: {
    color: symphony.palette.D400,
    paddingBottom: '16px',
  },
  subTitle: {
    color: symphony.palette.D400,
  },
  radioButton: {
    '& .MuiTypography-body1': {
      color: symphony.palette.D500,
    },
  },
  option: {
    width: '75px',
    height: '36px',
    marginLeft: '24px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose?: () => void,
  goBack?: () => void,
|}>;

const data = {
  actionTempleate: 'Sleep',
  resourceSpecification: 'RNCellDU_Nokia_MLN1_3132331',
};
const ActionPickerScheduled = (props: Props) => {
  const {goBack} = props;
  const [execType, setExecType] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date('2022-03-02T24:00:00'));
  const [openDialogExecuteNow, setOpenDialogExecuteNow] = useState(false);

  const handleOpenModal = () => {
    setOpenDialogExecuteNow(
      prevStateDialogExecuteNow => !prevStateDialogExecuteNow,
    );
  };

  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Grid style={{marginBottom: '26px'}} container direction="column">
          <Text className={classes.titleCard} variant="h6" weight="bold">
            Scheduled the action
          </Text>
          <Text className={classes.subTitle} variant="subtitle2">
            Select one of the following actions to the schedule the action or
            run right now with the "Execute Now" button.
          </Text>
        </Grid>
        <Grid
          style={{
            paddingBottom: '19px',
            marginBottom: '50px',
          }}
          container
          direction="row"
          spacing={3}>
          <Grid item xs={12}>
            <RadioGroup row onChange={({target}) => setExecType(target.value)}>
              <FormControlLabel
                className={classes.radioButton}
                value="End"
                control={<Radio color="primary" />}
                label="Manual Execution"
                labelPlacement="end"
              />
              <FormControlLabel
                className={classes.radioButton}
                value="start"
                control={<Radio color="primary" />}
                label="One time execution"
              />
              <FormControlLabel
                className={classes.radioButton}
                value="bottom"
                control={<Radio color="primary" />}
                label="Períodical Execution"
              />
            </RadioGroup>
          </Grid>
          {execType == 'start' && (
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container spacing={3}>
                  <Grid item>
                    <DatePicker
                      autoOk
                      variant="inline"
                      margin="normal"
                      label="Date"
                      value={date}
                      onChange={setDate}
                      inputVariant="outlined"
                      format="MM/DD/YYYY"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <Event style={{color: symphony.palette.D400}} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <TimePicker
                      autoOk
                      margin="normal"
                      variant="inline"
                      id="time-picker"
                      label="Time"
                      value={time}
                      minutesStep={5}
                      inputVariant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <AccessTimeIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="08:00 AM"
                      mask="__:__ _M"
                      onChange={date => setTime(date)}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          )}
        </Grid>
        <Grid container justify="flex-end">
          <Button
            className={classes.option}
            variant="outlined"
            color="primary"
            onClick={() => {
              goBack();
            }}>
            Back
          </Button>
          <Button
            onClick={() => {
              handleOpenModal();
            }}
            className={classes.option}
            variant="contained"
            color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
      {openDialogExecuteNow && (
        <DialogExecuteNow
          dataRow={data}
          execType={execType ?? ''}
          execDetails={{date: date ?? '', hour: time ?? ''}}
          onClose={handleOpenModal}
        />
      )}
    </div>
  );
};

export default ActionPickerScheduled;
