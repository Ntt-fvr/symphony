/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddThresholdItemForm from './AddThresholdItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import {Grid, List} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';
import ThresholdTypeItem from './ThresholdTypeItem';
import TitleTextCardsThresholds from './TitleTextCardsThresholds';
import {EditTresholdItemForm} from './EditTresholdItemForm';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';
import type {RemoveTresholdMutationVariables} from '../../mutations/__generated__/RemoveTresholdMutation.graphql';

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
    tresholds{
      edges{
        node{
          id
          name
          description
          status
          kpi{
            id
            name
          }
        }
      }
    }
  }
`;

type Tresholds = {
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

const TresholdTypes = () => {
  const classes = useStyles();

  const [DataTreshold, setDataTreshold] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
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

  const showEditTresholdItemForm = (tresholds: Tresholds) => {
    setShowEditCard(true);
    setDataEdit(tresholds);
  };

  const hideEditTresholdForm = () => {
    setShowEditCard(false);
  };

  if (showEditCard) {
    return (
      <EditTresholdItemForm
        formValues={dataEdit.item.node}
        hideEditTresholdForm={hideEditTresholdForm}
      />
    );
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
            {DataTreshold.tresholds?.edges.map((item, index) => (
              <ThresholdTypeItem
                key={index}
                onChange={() => handleRemove(item.node.id)}
                edit={() => showEditTresholdItemForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddThresholdItemForm 
            dataValues={DataTreshold.tresholds?.edges.map(item => item.node)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TresholdTypes;
