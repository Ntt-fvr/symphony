/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {RemoveThresholdMutationVariables} from '../../mutations/__generated__/RemoveThresholdMutation.graphql';

import AddThresholdItemForm from './AddThresholdItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ThresholdTypeItem from './ThresholdTypeItem';
import TitleTextCardsThresholds from './TitleTextCardsThresholds';
import fbt from 'fbt';
import {EditTresholdItemForm} from './EditThresholdItemForm';
import {Grid, List} from '@material-ui/core';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

import AddRuleItemForm from './AddRuleItemForm';
import EditCounterItemForm from './EditCounterItemForm';
import RemoveThresholdMutation from '../../mutations/RemoveThresholdMutation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const ThresholdQuery = graphql`
  query ThresholdTypesQuery {
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

type Thresholds = {
  item: {
    node: {
      id: string,
      name: string,
      description: string,
      status: boolean,
      kpi: {
        id: string,
        name: string,
      },
    },
  },
};

const ThresholdTypes = () => {
  const classes = useStyles();

  const [dataThreshold, setDataThreshold] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  //const [showAddForm, setShowAddForm] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchQuery(RelayEnvironment, ThresholdQuery, {}).then(data => {
      setDataThreshold(data);
    });
  }, [dataThreshold]);

  const handleRemove = id => {
    const variables: RemoveThresholdMutationVariables = {
      id: id,
    };
    RemoveThresholdMutation(variables);
  };

  const showEditThresholdItemForm = (thresholds: Thresholds) => {
    setShowEditCard(true);
    setDataEdit(thresholds);
  };

  const hideEditThresholdForm = () => {
    setShowEditCard(false);
  };

  if (showEditCard) {
    return (
      <EditTresholdItemForm
        formValues={dataEdit.item.node}
        hideEditThresholdForm={hideEditThresholdForm}
      />
    );
  }

  /*const showAddRuleItemForm = () => {
    setShowAddForm(true);
  };

  if (showAddForm) {
    return <AddRuleItemForm />;
  }
   */

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

          <List disablePadding>
            {dataThreshold.tresholds?.edges.map((item, index) => (
              <ThresholdTypeItem
                key={index}
                handleRemove={() => handleRemove(item.node.id)}
                edit={() => showEditThresholdItemForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddThresholdItemForm
            dataValues={dataThreshold.tresholds?.edges.map(item => item.node)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ThresholdTypes;
