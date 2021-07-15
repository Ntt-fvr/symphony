/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {RemoveTresholdMutationVariables} from '../../mutations/__generated__/RemoveTresholdMutation.graphql';

import AddThresholdItemForm from './AddThresholdItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ThresholdTypeItem from './ThresholdTypeItem';
import TitleTextCardsThresholds from './TitleTextCardsThresholds';
import fbt from 'fbt';
import {Grid, List} from '@material-ui/core';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

import AddRuleItemForm from './AddRuleItemForm';
import EditCounterItemForm from './EditCounterItemForm';
import RemoveTresholdMutation from '../../mutations/RemoveTresholdMutation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const TresholdQuery = graphql`
  query TresholdTypesQuery {
    tresholds {
      edges {
        node {
          id
          name
          description
          status
          kpi {
            id
            name
          }
        }
      }
    }
  }
`;

const TresholdTypes = () => {
  const classes = useStyles();

  const [DataTreshold, setDataTreshold] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchQuery(RelayEnvironment, TresholdQuery, {}).then(data => {
      setDataTreshold(data);
    });
  }, [DataTreshold]);

  const handleRemove = id => {
    const variables: RemoveTresholdMutationVariables = {
      id: id,
    };
    RemoveTresholdMutation(variables);
  };

  // const showEditKpiItemForm = (kpis: Kpis) => {
  //   setShowEditCard(true);
  //   setDataEdit(kpis);
  // };

  // const hideEditKpiForm = () => {
  //   setShowEditCard(false);
  // };

  // if (showEditCard) {
  //   return (
  //     <EditKpiItemForm
  //       kpi={DataTreshold.kpis?.edges.map(item => item.node)}
  //       formValues={dataEdit.item.node}
  //       hideEditKpiForm={hideEditKpiForm}
  //     />
  //   );
  // }

  const showAddRuleItemForm = () => {
    setShowAddForm(true);
  };

  if (showAddForm) {
    return <AddRuleItemForm />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
            title={fbt('Thresholds', 'Threshold Title')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
              'Threshold description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <TitleTextCardsThresholds />

          <ThresholdTypeItem
            id={'hola'}
            name={'hola'}
            description={'hola'}
            kpi={'hola'}
            addRule={showAddRuleItemForm}
          />

          <List disablePadding>
            {DataTreshold.tresholds?.edges.map((item, index) => (
              <ThresholdTypeItem
                key={index}
                onChange={() => handleRemove(item.node.id)}
                // edit={() => showEditKpiItemForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddThresholdItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default TresholdTypes;
