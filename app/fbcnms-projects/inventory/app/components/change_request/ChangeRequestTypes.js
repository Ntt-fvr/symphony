/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import ButtonSaveDelete from './common/ButtonSaveDelete';
import ConfigureTitle from './common/ConfigureTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@symphony/design-system/components/RadioGroup/RadioGroup';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MomentUtils from '@date-io/moment';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {CardAccordion} from './common/CardAccordion';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {MenuItem} from '@material-ui/core';
import {Tabla} from './common/Tabla';
import {makeStyles} from '@material-ui/styles';

const valuesTable = [
  {
    resource: 'RNCellDU_Nokia_MLN1_3132331',
    parameter: 'arfcndu1',
    currentValue: '3960001',
    newValue: '183001',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132332',
    parameter: 'arfcndu2',
    currentValue: '3960002',
    newValue: '183002',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu3',
    currentValue: '3960003',
    newValue: '183003',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu4',
    currentValue: '3960004',
    newValue: '183004',
  },
];

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleCounter: {
    margin: '0 0 40px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    marginRight: '24px',
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '9px 16px 0px ',
    },
  },
  listContainer: {
    overflow: 'auto',
    paddingRight: '9px',
    maxHeight: 'calc(95vh - 156px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: symphony.palette.D300,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: symphony.palette.D200,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: symphony.palette.D400,
    },
    '&::-webkit-scrollbar-track': {
      background: symphony.palette.D100,
      borderRadius: '4px',
    },
  },
  fieldComment: {
    '& .MuiFormControl-root': {
      margin: 0,
    },
  },
  comment: {
    '& .MuiOutlinedInput-multiline': {
      padding: '7.5px 14px',
    },
  },
}));

const ChangeRequestTypes = () => {
  const [checked, setChecked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2022-03-02T24:00:00'),
  );

  console.log('NOTAS-> ', notes);
  const classes = useStyles();

  const handleChecked = () => {
    setChecked(prevState => !prevState);
  };
  const date = new Date();
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      // e.preventDefault();
      setNotes([...notes, {[e.target.name]: e.target.value, date}]);
    }
    console.log(e.target.value);
  };
  const handleSubmit = e => {
    setValue('');
    e.preventDefault();
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleCounter} item xs={12}>
        <ConfigureTitle
          title={fbt('Change Request', '')}
          subtitle={fbt('', '  ')}
        />
        <Grid>
          <ButtonSaveDelete className={classes.buttonDelete} variant="outlined">
            Delete
          </ButtonSaveDelete>
          <ButtonSaveDelete>Save</ButtonSaveDelete>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid style={{border: '1px solid red'}} item xs={9}>
          <CardAccordion className={classes.accordionDetails} title={'Details'}>
            <FormField>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    style={{width: '100%'}}
                    id="id"
                    label="Id"
                    variant="outlined"
                    name="name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{width: '100%'}}
                    id="resource_type"
                    label="Resource type"
                    variant="outlined"
                    name="name"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    style={{width: '100%'}}
                    id="change_source"
                    label="Change source"
                    variant="outlined"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{width: '100%'}}
                    id="change_source"
                    label="Change source"
                    variant="outlined"
                    multiline
                    rows={4}
                    name="name"
                  />
                </Grid>
              </Grid>
            </FormField>
          </CardAccordion>
          <CardAccordion title={'Target parameters'}>
            <Tabla valuesTable={valuesTable} />
          </CardAccordion>
          <CardAccordion title={'Suggested change request schedule'}>
            <Grid container>
              <Grid item xs={12}>
                <FormControlLabel
                  style={{padding: '0 0 0 40px'}}
                  onClick={() => handleChecked()}
                  checked={checked}
                  value="approved"
                  control={<Radio color="primary" />}
                  label="As soon as approved "
                />
                <FormControlLabel
                  onClick={() => handleChecked()}
                  checked={checked}
                  value="approval"
                  control={<Radio color="primary" />}
                  label="Schedule with approval"
                />
                <Divider />
              </Grid>
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
                        padding: '6px 0 0 0 ',
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
                        margin="dense"
                        variant="outline"
                        id="time-picker"
                        label="Time picker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </FormField>
            </Grid>
          </CardAccordion>
        </Grid>
        <Grid style={{border: '1px solid blue'}} item xs={3}>
          <CardAccordion title={'Activity & Comments'}>
            <Grid container>
              <Grid item xs={12}>
                <List>
                  {notes.map(nota => (
                    <ListItem key={nota.comment}>
                      <CreateOutlinedIcon color="disabled" />
                      <ListItemText
                        style={{overflowWrap: 'anywhere'}}
                        primary={nota.comment}
                        secondary={nota.date.toString()}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12}>
                <FormField
                  onSubmit={handleSubmit}
                  className={classes.fieldComment}>
                  <TextField
                    className={classes.comment}
                    onKeyPress={handleKeyPress}
                    onChange={e => setValue(e.target.value)}
                    style={{width: '100%'}}
                    id="comment"
                    label="Write a comment..."
                    value={value}
                    variant="outlined"
                    name="comment"
                    helperText="Press Enter to post comment"
                  />
                </FormField>
              </Grid>
            </Grid>
          </CardAccordion>
        </Grid>
      </Grid>
    </Grid>
  );
};

export {ChangeRequestTypes};
