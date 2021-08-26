/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import AlarmFilteringFormCreate from './AlarmFilteringFormCreate';
import AlarmFilteringTable from './AlarmFilteringTable';
import Button from '@symphony/design-system/components/Button';
import EditAlarmFilteringItemForm from './EditAlarmFilteringItemForm';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useEffect, useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import ConfigureTitle from './common/ConfigureTitle';
import PowerSearchBar from '../power_search/PowerSearchBar';
import RelayEnvironment from '../../common/RelayEnvironment';
import fbt from 'fbt';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';

const useStyles = makeStyles(() => ({
  root: {
    margin: '40px',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: '0 3.5rem',
  },
}));

const AlarmFilteringQuery = graphql`
  query AlarmFilteringTypesQuery {
    alarmFilters {
      edges {
        node {
          id
          name
          networkResource
          enable
          beginTime
          endTime
          reason
          user
          creationTime
          alarmStatus {
            id
            name
          }
        }
      }
    }
  }
`;
type Alarms = {
  item: {
    node: {
      id: string,
      name: string,
      networkResource: string,
      enable: boolean,
      beginTime: string,
      endTime: string,
      reason: string,
      user: string,
      creationTime: string,
      alarmStatus: string,
    },
  },
};

const AlarmFilteringTypes = () => {
  const classes = useStyles();
  const [DataAlarms, setDataAlarms] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchQuery(RelayEnvironment, AlarmFilteringQuery, {}).then(data => {
      setDataAlarms(data);
    });
  }, [DataAlarms]);

  const handleClickEdit = (alarm: Alarms) => {
    setShowEditForm(true);
    setDataEdit(alarm);
  };

  const handleClickAdd = () => {
    setShowForm(true);
  };

  if (showForm) {
    return (
      <AlarmFilteringFormCreate
        returnTableAlarm={() => setShowForm(false)}
      />
    );
  }

  if (showEditForm) {
    return (
      <EditAlarmFilteringItemForm
        closeEditForm={() => setShowEditForm(false)}
        formValues={dataEdit}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConfigureTitle
            title={fbt('Alarm Filter', 'Alarm Filter Title')}
            subtitle={fbt(
              'Alarm filtering rules for Fault Management processes',
              'Alarm description ',
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10} />
        <Grid className={classes.addButton} item xs={2}>
          <FormField>
            <Button onClick={handleClickAdd} className={classes.button}>
              Add Alarm Filter
            </Button>
          </FormField>
        </Grid>
        <Grid item xs={12}>
          <AlarmFilteringTable
            dataValues={DataAlarms.alarmFilters?.edges.map(item => item.node)}
            edit={handleClickEdit}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AlarmFilteringTypes;
