/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ButtonAlarmStatus from './common/ButtonAlarmStatus';
import ButtonSaveDelete from './common/ButtonSaveDelete';
import CommentsActivitiesBox from '../comments/CommentsActivitiesBox';
import ConfigureTitle from './common/ConfigureTitle';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {CardAccordion} from './common/CardAccordion';
import {CardSuggested} from './common/CardSuggested';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
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

const status = ['Approve', 'Reject'];

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleModule: {
    margin: '0 0 40px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    marginRight: '24px',
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '0 16px 0px ',
    },
  },
  listComment: {
    '& .MuiAccordionDetails-root': {
      padding: '0 0 16px 0',
      width: '100%',
    },
  },
  inExpandingPanelFix: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  commentsLog: {
    maxHeight: '400px',
  },
}));

const ChangeRequestDetails = () => {
  const classes = useStyles();

  const [statusAlarm] = useState('Pending for approval');

  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid className={classes.titleModule} item xs={12}>
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
      <Grid style={{display: 'flex'}}>
        <ButtonAlarmStatus skin={'yellow'}>
          Status: {statusAlarm}{' '}
        </ButtonAlarmStatus>
        <FormField>
          <TextField
            required
            id="outlined-select-action"
            select
            style={{
              padding: '0',
              marginLeft: '40px',
              width: '250px',
            }}
            label="Action"
            name="action"
            defaultValue=""
            variant="outlined">
            {status.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </FormField>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={8}>
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
            <CardSuggested />
          </CardAccordion>
        </Grid>
        <Grid item xs={4}>
          <CardAccordion
            className={classes.listComment}
            title={'Activity & Comments'}>
            <Grid item xs={12}>
              <CommentsActivitiesBox
                boxElementsClass={classes.inExpandingPanelFix}
                commentsLogClass={classes.commentsLog}
                relatedEntityId={''}
                relatedEntityType="%future added value"
                // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
                activities={[]}
                comments={[]}
              />
            </Grid>
          </CardAccordion>
        </Grid>
      </Grid>
    </Grid>
  );
};

export {ChangeRequestDetails};
