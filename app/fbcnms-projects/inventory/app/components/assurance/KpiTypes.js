/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
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
import AddFormulaDialog from './AddFormulaDialog';
import AddFormulaItemForm from './AddFormulaItemForm';
import EditFormulaDialog from './EditFormulaDialog';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: '30px',
    margin: '0',
    maxHeight: 'calc(100vh - 57px)',
  },
  table: {
    height: 'calc(100% - 69px)',
  },
  listContainer: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    paddingRight: '9px',
    height: 'calc(100% - 30.49px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#9DA9BE',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:active': {
      background: '#999999',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#313C48',
      boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar-track': {
      background: '#e5e5e5',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track:hover, &::-webkit-scrollbar-track:active': {
      background: '#d4d4d4',
    },
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
          formulaFk {
            id
            textFormula
            status
            kpiFk {
              id
              name
            }
            techFk {
              id
              name
            }
            networkTypeFk {
              id
              name
            }
          }
          kpiCategoryFK {
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
    networkTypes {
      edges {
        node {
          id
          name
        }
      }
    }
    counters {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Formula = {
  id: string,
  textFormula: string,
  status: true,
  techFk: {
    id: string,
    name: string,
  },
  networkTypeFk: {
    id: string,
    name: string,
  },
};

type FormulaForm = {
  data: {
    kpi: string,
    vendors: string,
    technology: string,
    networkTypes: string,
  },
};

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
      formulaFk: Array<Formula>,
    },
  },
};

const KpiTypes = () => {
  const classes = useStyles();

  const [dataKpis, setDataKpis] = useState({});
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState<Kpis>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [formulaForm, setFormulaForm] = useState<FormulaForm>({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formulaEditForm, setFormulaEditForm] = useState<any>({});

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, KpiQuery, {}).then(data => {
      setDataKpis(data);
    });
  }, [setDataKpis]);

  const handleCallback = childData => {
    setFormulaForm({data: childData});
  };

  const handleFormulaClick = () => {
    setOpenDialog(true);
  };

  const handleEditCallback = childData => {
    setFormulaEditForm({data: childData});
  };

  const handleEditFormulaClick = () => {
    setOpenEditDialog(true);
  };

  const handleRemove = id => {
    const variables: RemoveKpiMutationVariables = {
      id: id,
    };
    RemoveKpiMutation(variables, {onCompleted: () => isCompleted()});
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
        isCompleted={isCompleted}
      />
    );
  }

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <ConfigureTitle
          title={fbt('KPI (Key Performance Indicator)', 'Kpi Title')}
          subtitle={fbt(
            'Indicators and formulas to be defined by users and calculated by performance management processes.',
            'Kpi description',
          )}
        />
      </Grid>
      <Grid
        className={classes.table}
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        xl={9}>
        <TitleTextCardsKpi />
        <List disablePadding className={classes.listContainer}>
          {dataKpis.kpis?.edges.map((item, index) => (
            <KpiTypeItem
              key={index}
              threshold={dataKpis.thresholds?.edges}
              deleteItem={() => handleRemove(item.node.id)}
              edit={() => showEditKpiItemForm({item})}
              handleFormulaClick={handleFormulaClick}
              parentCallback={handleCallback}
              handleEditFormulaClick={handleEditFormulaClick}
              parentEditCallback={handleEditCallback}
              isCompleted={isCompleted}
              {...item.node}
            />
          ))}
        </List>
      </Grid>
      <Grid item xs={12} sm={12} lg={3} xl={3}>
        <AddKpiItemForm
          kpiNames={dataKpis.kpis?.edges}
          isCompleted={isCompleted}
        />
        <AddFormulaItemForm
          parentCallback={handleCallback}
          handleClick={handleFormulaClick}
        />
        {openDialog && (
          <AddFormulaDialog
            open={openDialog}
            dataFormula={formulaForm}
            dataCounter={dataKpis.counters?.edges.map(item => item.node)}
            onClose={() => {
              setOpenDialog(false);
            }}
            isCompleted={isCompleted}
          />
        )}
        {openEditDialog && (
          <EditFormulaDialog
            open={openEditDialog}
            dataFormula={formulaEditForm}
            onClose={() => {
              setOpenEditDialog(false);
            }}
            isCompleted={isCompleted}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default KpiTypes;
