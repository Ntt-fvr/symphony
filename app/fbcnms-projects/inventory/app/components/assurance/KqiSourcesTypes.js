/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {DeleteKqiSourceMutationVariables} from '../../mutations/__generated__/DeleteKqiSourceMutation.graphql';

import DeleteKqiSourceMutation from '../../mutations/DeleteKqiSourceMutation';

import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import fbt from 'fbt';
import {fetchQuery, graphql} from 'relay-runtime';

import ConfigureTitle from './common/ConfigureTitle';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import {TitleTextCardsKqiSource} from './TitleTextCardsKqiSource';

import {KqiSourceAddForm} from './KqiSourceAddForm';

import KqiSourceFormEdit from './KqiSourceFormEdit';

import KqiSourcesTypeItem from './KqiSourcesTypeItem ';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  listCarCounter: {
    listStyle: 'none',
  },
  powerSearchContainer: {
    margin: '10px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
}));

const KqiSourceQuery = graphql`
  query KqiSourcesTypesQuery {
    kqiSources {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
type KqiSource = {
  item: {
    node: {
      id: string,
      name: string,
    },
  },
};

const KqiSourcesTypes = () => {
  const classes = useStyles();
  const [items, setItems] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState<KqiSource>({});

  useEffect(() => {
    fetchQuery(RelayEnvironment, KqiSourceQuery, {}).then(data => {
      setItems(data);
    });
  }, [items]);

  const handleRemove = id => {
    const variables: DeleteKqiSourceMutationVariables = {
      id: id,
    };
    DeleteKqiSourceMutation(variables);
  };

  const showEditKqiSourceForm = (kqiSources: KqiSource) => {
    setShowEditCard(true);
    setDataEdit(kqiSources);
  };
  const hideKqiSourceFormEdit = () => {
    setShowEditCard(false);
  };

  const kqiSourcesNames = items.kqiSources?.edges.map(item => item.node.name);

  if (showEditCard) {
    return (
      <KqiSourceFormEdit
        kqiSourcesNames={kqiSourcesNames}
        formValues={dataEdit.item.node}
        hideKqiSourceFormEdit={hideKqiSourceFormEdit}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ConfigureTitle
            title={fbt('KQI Sources', 'KQI Title')}
            subtitle={fbt(
              'Data sources for quality indicators',
              'KQI sources description',
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
          <TitleTextCardsKqiSource />
          <List>
            {items.kqiSources?.edges.map(item => (
              <KqiSourcesTypeItem
                key={item.node?.id}
                handleRemove={() => handleRemove(item.node?.id)}
                edit={() => showEditKqiSourceForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
          <KqiSourceAddForm kqiSourcesNames={items.kqiSources?.edges} />
        </Grid>
      </Grid>
    </div>
  );
};

export default KqiSourcesTypes;
