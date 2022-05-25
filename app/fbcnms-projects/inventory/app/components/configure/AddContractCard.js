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
import {makeStyles} from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Event from '@material-ui/icons/Event';
import ButtonSaveDelete from '../assurance/common/ButtonSaveDelete';


import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';

import symphony from '@symphony/design-system/theme/symphony';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';


import {InputAdornment} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MomentUtils from '@date-io/moment';

import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import moment from 'moment';


const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '34px 16px 8px 17px',
  },
  header: {
    margin: '0 0 1rem 1rem',
  },
  formField: {
    margin: '0 22px 0px 22px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
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
  card:{
   margin:'0 0 1rem 1rem'
  },
  cardHeader: {
    margin: '26px 43px 22px 23px',
  },
  marginP: {
    margin:'0',
    color:'#8895AD'
  }

}));


type Rule = {
    data: {
      name: string,
      organization: boolean,
      externalId: number,
      category: string,
      description: string
    },
  };

const AddContractCard = () => {
  const classes = useStyles();
  const [rule, setRule] = useState<Rule>({data: {}});
  const [slotStartDate, setSlotStartDate] = useState(moment);
  const [slotEndDate, setSlotEndDate] = useState(moment);


  const handleClick = () => {
      console.log(rule)
  }

  function handleChange({target}) {
      setRule({
        data: {
          ...rule.data,
          [target.name]: target.value.trim(),
        },
      });
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifycontent="flex-end"
          alignItems="center">
          <Grid item xs justify="flex-end" cl>
            <ConfigureTitleSubItem
              title={fbt('Contracts / ', ' New Contract')}
              tag={` New Contract`}
            />
            <p className={classes.marginP}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          </Grid>
          <Grid justify="flex-end">
            <ButtonSaveDelete
              variant={'outlined'}
              onClick={() => {
                hideEditCounterForm();
              }}>
              {'Cancel'}
            </ButtonSaveDelete>
          </Grid>
          <Grid>
            <ButtonSaveDelete
              onClick={() => {
                handleClick();
              }} disabled={false}>
              {'Save'}
            </ButtonSaveDelete>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card margins={'none'} className={classes.card}>
            <CardHeader className={classes.cardHeader}>Details</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    id="counter-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    helperText="* Required"
                    onChange={handleChange}
                    fullWidth
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    id="outlined-select-vendor"
                    select
                    label="Organization"
                    fullWidth
                    name="oranization"
                    helperText="* Required"
                    onChange={handleChange}
                    variant="outlined"></TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    label="External ID"
                    variant="outlined"
                    name="externalId"
                    helperText="* Required"
                    onChange={handleChange}
                    fullWidth
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    label="Category"
                    variant="outlined"
                    name="category"
                    onChange={handleChange}
                    fullWidth
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={5} xl={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    id="counter-name"
                    label="Description"
                    variant="outlined"
                    name="description"
                    onChange={handleChange}
                    fullWidth
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      label="Effective Date"
                      variant="inline"
                      inputVariant="outlined"
                      value={slotStartDate}
                      onChange={setSlotStartDate}
                      format="yyyy/MM/DD"
                      helperText="* Required"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <Event style={{color: '#8895AD'}} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker
                      label="Expiration Date"
                      variant="inline"
                      inputVariant="outlined"
                      value={slotEndDate}
                      onChange={setSlotEndDate}
                      format="yyyy/MM/DD"
                      helperText="* Required"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <Event style={{color: '#8895AD'}} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddContractCard;
