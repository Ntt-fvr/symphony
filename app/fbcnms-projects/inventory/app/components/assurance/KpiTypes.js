/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import fbt from 'fbt';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';

// COMPONENTS //
import AddKpiItemForm from './AddKpiItemForm';
import ConfigureTitle from './common/ConfigureTitle';
import KpiTypeItem from './KpiTypeItem';
import TitleTextCardsKpi from './TitleTextCardsKpi';
import {EditKpiItemForm} from './EditKpiItemForm';

// MUTATIONS //
import type {RemoveKpiMutationVariables} from '../../mutations/__generated__/RemoveKpiMutation.graphql';

import RemoveKpiMutation from '../../mutations/RemoveKpiMutation';

// DESIGN SYSTEM //
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarKpi: {
    listStyle: 'none',
  },
}));

const KpiQuery = graphql`
  query KpiTypesQuery {
    kpis {
      edges {
        node {
          id
          name
          status
          description
          domainFk {
            id
            name
          }
        }
      }
    }
    thresholds {
      edges {
        node {
          name
          kpi {
            name
          }
        }
      }
    }
  }
`;

type Kpis = {
  item: {
    node: {
      id: string,
      name: string,
      status: boolean,
      domainFk: {
        id: string,
        name: string,
      },
      description: string,
    },
  },
};

const KpiTypes = () => {
  const classes = useStyles();

  const [dataKpis, setDataKpis] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    fetchQuery(RelayEnvironment, KpiQuery, {}).then(data => {
      setDataKpis(data);
    });
  }, [dataKpis]);

  const handleRemove = id => {
    const variables: RemoveKpiMutationVariables = {
      id: id,
    };
    RemoveKpiMutation(variables);
  };

  const showEditKpiItemForm = (kpis: Kpis) => {
    setShowEditCard(true);
    setDataEdit(kpis);
  };

  const hideEditKpiForm = () => {
    setShowEditCard(false);
  };

  if (showEditCard) {
    return (
      <EditKpiItemForm
        kpi={dataKpis.kpis?.edges.map(item => item.node)}
        formValues={dataEdit.item.node}
        threshold={dataKpis.thresholds?.edges}
        hideEditKpiForm={hideEditKpiForm}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={9} xl={9}>
          <ConfigureTitle
            title={fbt('KPI (Key Performance Indicator)', 'Kpi Title')}
            subtitle={fbt(
              'Indicators and formulas to be defined by users and calculated by performance management processes.',
              'Kpi description',
            )}
          />
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <TitleTextCardsKpi />
          <List disablePadding>
            {dataKpis.kpis?.edges.map((item, index) => (
              <KpiTypeItem
                key={index}
                threshold={dataKpis.thresholds?.edges}
                onChange={() => handleRemove(item.node.id)}
                edit={() => showEditKpiItemForm({item})}
                {...item.node}
              />
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddKpiItemForm kpiNames={dataKpis.kpis?.edges} />
        </Grid>
      </Grid>
    </div>
  );
};

export default KpiTypes;
