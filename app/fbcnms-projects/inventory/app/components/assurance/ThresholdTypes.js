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
import {EditThresholdItemForm} from './EditThresholdItemForm';
import {Grid, List} from '@material-ui/core';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';

import AddRuleItemForm from './AddRuleItemForm';
import EditRuleItemForm from './EditRuleItemForm';
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
          rule {
            id
            name
            ruleType {
              name
            }
          }
        }
      }
    }
  }
`;

type Rule = {
  id: string,
  name: string,
  ruleType: {
    name: string,
  },
};

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
      rule: Array<Rule>,
    },
  },
};

const ThresholdTypes = () => {
  const classes = useStyles();

  const [dataThreshold, setDataThreshold] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditRule, setShowEditRule] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [dataEditRule, setDataEditRule] = useState([]);

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

  // render Edit Threshold

  const showEditThresholdItemForm = (thresholds: Thresholds) => {
    setShowEditCard(true);
    setDataEdit(thresholds);
  };

  const hideEditThresholdForm = () => {
    setShowEditCard(false);
  };

  const thresholdNames = dataThreshold.tresholds?.edges.map(
    item => item.node.name,
  );

  if (showEditCard) {
    return (
      <EditThresholdItemForm
        thresholdNames={thresholdNames}
        formValues={dataEdit.item.node}
        hideEditThresholdForm={hideEditThresholdForm}
      />
    );
  }

  // render Add Rule

  const showAddRuleItemForm = (thresholds: Thresholds) => {
    setDataEdit(thresholds);
    setShowAddForm(true);
  };

  const hideAddRuleForm = () => {
    setShowAddForm(false);
  };

  if (showAddForm) {
    return (
      <AddRuleItemForm
        threshold={dataEdit.item.node}
        hideAddRuleForm={hideAddRuleForm}
      />
    );
  }

  // render Edit Rule

  const hideEditCounterForm = () => {
    setShowEditRule(false);
  };

  const showEditRuleItemForm = rule => {
    setDataEditRule(rule);
    setShowEditRule(true);
  };

  if (showEditRule) {
    return <EditRuleItemForm hideAddRuleForm={hideEditCounterForm} />;
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

          <List disablePadding>
            {dataThreshold.tresholds?.edges.map((item, index) => (
              <ThresholdTypeItem
                key={index}
                handleRemove={() => handleRemove(item.node.id)}
                edit={() => showEditThresholdItemForm({item})}
                addRule={() => showAddRuleItemForm({item})}
                editRule={() => showEditRuleItemForm(item.node?.rule)}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddThresholdItemForm
            thresholdNames={dataThreshold.tresholds?.edges}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ThresholdTypes;
