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
import React from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {CardAccordion} from './common/CardAccordion';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
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
}));

const ChangeRequestTypes = () => {
  const classes = useStyles();

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
        </Grid>
        <Grid style={{border: '1px solid blue'}} item xs={3} />
      </Grid>
    </Grid>
  );
};

export {ChangeRequestTypes};
