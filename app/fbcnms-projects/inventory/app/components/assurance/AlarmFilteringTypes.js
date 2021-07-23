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
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useEffect,useState} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import PowerSearchBar from '../power_search/PowerSearchBar';
import fbt from 'fbt';
import ConfigureTitle from './common/ConfigureTitle';
import RelayEnvironment from '../../common/RelayEnvironment';
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
    AlarmFilters{
      edges{
        node{
          id
          name
          networkResource
          enable
          beginTime
          endTime
          reason
          user
          creationTime
          alarmStatus	{
            id
            name
          }
        }
      }
    }
  }
`
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
      alarmStatus:  string
    }
  },
};

const AlarmFilteringTypes = () => {
  const classes = useStyles();
  const [DataAlarms, setDataAlarms] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    fetchQuery(RelayEnvironment, AlarmFilteringQuery, {}).then(data => {
      setDataAlarms(data);
    });
  }, []);


  function handleClick() {
    setShowForm(true);
  }
  
  if (showForm) {
    return <AlarmFilteringFormCreate returnTableAlarm={()=> setShowForm(false)} />;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ConfigureTitle
            title={fbt('Alarm Filtering', 'Alarm Filtering Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Counters description ',
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <PowerSearchBar
            placeholder="Alarm Filter"
            filterConfigs={[]}
            searchConfig={[]}
            filterValues={[]}
            savedSearches={[]}
            onFiltersChanged={filters => []}
            getSelectedFilter={(filterConfig: prueba) => []}
            exportPath={'/alarm_filtering'}
            entity={'%future added value'}
          />
        </Grid>
        <Grid className={classes.addButton} item xs={2}>
          <FormField>
            <Button onClick={handleClick} className={classes.button}>
              Add Alarm Filtering
            </Button>
          </FormField>
        </Grid>
        <Grid item xs={12}>
            <AlarmFilteringTable
              dataValues={DataAlarms.AlarmFilters?.edges.map(item => item.node)}
              // onChange={() => handleRemove(item.node.id)}
              // edit={() => showEditKpiItemForm({item})}
            />
        </Grid>
      </Grid>
    </div>
  );
};

export default AlarmFilteringTypes;
