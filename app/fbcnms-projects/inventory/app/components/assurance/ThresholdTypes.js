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
import ThresholdProvider from './ThresholdProvider';
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
    thresholds {
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
            status
            gracePeriod
            additionalInfo
            specificProblem
            eventTypeName
            startDateTime
            endDateTime
            ruleType {
              id
              name
            }
            ruleLimit {
              comparator {
                id
                name
              }
              id
              number
              limitType
            }
            eventSeverity {
              id
              name
            }
            threshold {
              id
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
  const [showEditRuleForm, setShowEditRuleForm] = useState(false);
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

  // render edit rule

  const showEditRuleItemForm = (thresholds: Thresholds) => {
    setDataEdit(thresholds);
    setShowEditRuleForm(true);
  };

  const hideEditRuleForm = () => {
    setShowEditRuleForm(false);
  };

  if (showEditRuleForm) {
    return (
      <ThresholdProvider>
        <EditRuleItemForm hideAddRuleForm={hideEditRuleForm} />
      </ThresholdProvider>
    );
  }

  // render Edit Threshold

  const showEditThresholdItemForm = (thresholds: Thresholds) => {
    setShowEditCard(true);
    setDataEdit(thresholds);
  };

  const hideEditThresholdForm = () => {
    setShowEditCard(false);
  };

  const thresholdNames = dataThreshold.thresholds?.edges.map(
    item => item?.node.name,
  );

  if (showEditCard) {
    return (
      <ThresholdProvider>
        <EditThresholdItemForm
          thresholdNames={thresholdNames}
          formValues={dataEdit?.item.node}
          hideEditThresholdForm={hideEditThresholdForm}
          editRule={() => {
            showEditRuleItemForm(dataEdit);
          }}
        />
      </ThresholdProvider>
    );
  }

  return (
    <ThresholdProvider>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} lg={9} xl={9}>
            <ConfigureTitle
              title={fbt('Thresholds', 'Threshold Title')}
              subtitle={fbt(
                'Thresholds definition for alarm generation',
                'Threshold description',
              )}
            />
          </Grid>
          <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
            <TitleTextCardsThresholds />

            <List disablePadding>
              {dataThreshold.thresholds?.edges.map((item, index) => (
                <ThresholdTypeItem
                  key={index}
                  handleRemove={() => handleRemove(item.node?.id)}
                  edit={() => showEditThresholdItemForm({item})}
                  addRule={() => showAddRuleItemForm({item})}
                  editRule={() => showEditRuleItemForm({item})}
                  {...item?.node}
                />
              ))}
            </List>
          </Grid>
          <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
            <AddThresholdItemForm
              thresholdNames={dataThreshold.thresholds?.edges}
            />
          </Grid>
        </Grid>
      </div>
    </ThresholdProvider>
  );
};

export default ThresholdTypes;
