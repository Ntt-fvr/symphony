/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import Grid from '@material-ui/core/Grid';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useCallback, useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import symphony from '@symphony/design-system/theme/symphony';
import {MenuItem} from '@material-ui/core';
import {StepToStep} from './StepToStep';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  CardContiner: {
    padding: '0',
  },
  titleCard: {
    color: symphony.palette.D400,
    paddingBottom: '16px',
  },
  subTitle: {
    color: symphony.palette.D400,
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '36px',
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
  option: {
    width: '75px',
    height: '36px',
    marginLeft: '24px',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 43, 0.15)',
  },
  searchBar: {
    flexGrow: 1,
  },
  selectField: {
    width: '200px',
    '& .MuiSelect-selectMenu ': {
      height: '16px',
    },
  },
  tableInside: {
    height: '280px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose?: () => void,
  returnSheduledAction?: () => void,
|}>;
const tableColumns = [
  {
    key: 'location',
    title: 'Location',
    getSortingValue: row => row.location,
    render: row => (
      <Button color="primary" variant="text" tooltip={row.location ?? ''}>
        {row.location}
      </Button>
    ),
  },
];
const data = [
  {
    id: '386547056643',
    key: '386547056643',
    location: 'S17161',
  },
  {
    id: '386547056644',
    key: '386547056644',
    location: 'S17162',
  },
  {
    id: '386547056645',
    key: '386547056645',
    location: 'S17163',
  },
  {
    id: '386547056646',
    key: '386547056646',
    location: 'S17164',
  },
  {
    id: '386547056647',
    key: '386547056647',
    location: 'S17165',
  },
  {
    id: '386547056648',
    key: '386547056648',
    location: 'S17166',
  },
  {
    id: '386547056649',
    key: '386547056649',
    location: 'S17167',
  },
  {
    id: '386547056650',
    key: '386547056650',
    location: 'S17168',
  },
];
const StepperAction = (props: Props) => {
  const {returnSheduledAction} = props;

  const [activeStep, setActiveStep] = useState(1);
  const [checked, setChecked] = useState(true);
  const [checkedResource, setCheckedResource] = useState(false);

  const handleConfirmDate = () => {
    setActiveStep(2);
  };

  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Card className={classes.CardContiner}>
          <Grid
            style={{
              marginBottom: '22px',
              borderBottom: '1px solid',
              color: symphony.palette.D100,
            }}
            container
            justify={'center'}>
            <StepToStep activeStep={activeStep} />
          </Grid>
          <Grid style={{marginBottom: '26px'}} container direction="column">
            <Text className={classes.titleCard} variant="h6" weight="bold">
              Define the behavior of the action
            </Text>
            <Text className={classes.subTitle} variant="subtitle2">
              Use the filter to find resources to apply the actions
            </Text>
          </Grid>
          <Grid
            style={{
              paddingBottom: '19px',
              marginBottom: '30px',
              borderBottom: '1px solid',
              color: symphony.palette.D100,
            }}
            container
            direction="row"
            spacing={3}>
            <Grid item xs={5}>
              <TextField
                className={classes.formField}
                helperText={'*Required'}
                required
                label="Name"
                fullWidth
                name="name"
                variant="outlined"
                defaultValue={''}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                className={classes.formField}
                required
                label="Description"
                fullWidth
                name="description"
                variant="outlined"
                defaultValue={''}
              />
            </Grid>
          </Grid>
          <Grid style={{marginBottom: '40px'}} item xs={12}>
            <div className={classes.bar}>
              <div className={classes.searchBar}>
                <PowerSearchBar
                  placeholder="Filter Resource Type"
                  getSelectedFilter={[]}
                  onFiltersChanged={[]}
                  filterConfigs={[]}
                  searchConfig={[]}
                  entity={'SERVICE'}
                />
              </div>
            </div>
          </Grid>
          <Grid
            style={{marginBottom: '20px'}}
            container
            justify="space-between">
            <Checkbox
              checked={checked}
              title="Select All"
              onChange={() => setChecked(prevStateChecked => !prevStateChecked)}
            />
            <TextField
              required
              id="outlined-select-family"
              select
              className={classes.selectField}
              label="Sleep"
              name="family"
              defaultValue=""
              variant="outlined">
              <MenuItem>Reset</MenuItem>
              <MenuItem>Sleep</MenuItem>
              <MenuItem>Update</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} style={{margin: '20px 0 20px 0'}}>
            <Table
              className={classes.tableInside}
              data={data}
              columns={[
                {
                  key: 'id',
                  title: 'ID',
                  getSortingValue: row => row.id,
                  render: row => (
                    <Checkbox
                      checked={checkedResource}
                      title={
                        <Button
                          color="primary"
                          variant="text"
                          tooltip={row.id ?? ''}>
                          {row.id}
                        </Button>
                      }
                      onChange={() =>
                        setCheckedResource(
                          prevStateCheckResource => !prevStateCheckResource,
                        )
                      }
                    />
                  ),
                },
                ...tableColumns,
              ]}
            />
          </Grid>
          <Grid container justify="flex-end">
            <Button
              className={classes.option}
              variant="outlined"
              color="primary"
              onClick={() => {
                returnSheduledAction();
              }}>
              Cancel
            </Button>
            <Button
              disabled
              onClick={() => {
                handleConfirmDate();
              }}
              className={classes.option}
              variant="contained"
              color="primary">
              Next
            </Button>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export default StepperAction;
