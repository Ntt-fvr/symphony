/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ConfigureTitle from './common/ConfigureTitle';
import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import KqiFormCreate from './KqiFormCreate';
import KqiFormEdit from './KqiFormEdit';

import Button from '@symphony/design-system/components/Button';
import KqiTable from './KqiTable';
import fbt from 'fbt';
import RelayEnvironment from '../../common/RelayEnvironment';
import {fetchQuery} from 'relay-runtime';
import {graphql} from 'react-relay';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  addKpi: {
    display: 'flex',
  },
}));

const KqiQuery = graphql`
  query KqiTypesQuery {
    kqis {
      edges {
        node {
          id
          name
          description
          formula
          startDateTime
          endDateTime
          kqiCategory {
            id
            name
          }
          kqiPerspective {
            id
            name
          }
          kqiSource {
            id
            name
          }
          kqiTemporalFrequency {
            id
            name
          }
          kqiTarget {
            id
          }
        }
      }
    }
    kqiPerspectives {
      edges {
        node {
          id
          name
        }
      }
    }
    kqiSources {
      edges {
        node {
          id
          name
        }
      }
    }
    kqiCategories {
      edges {
        node {
          id
          name
        }
      }
    }
    kqiTemporalFrequencies {
      edges {
        node {
          id
          name
        }
      }
    }
    kqiTargets {
      edges {
        node {
          id
          name
          impact
          frame
          alowedValidation
          initTime
          endTime
          status
          kqi {
            id
            name
          }
          kqiComparator {
            kqiTargetFk {
              id
              name
            }
            comparatorFk {
              id
              name
            }
            number
            comparatorType
          }
        }
      }
    }
  }
`;


type Kqis = {
  item: {
    node: {
      id: string,
      name: string,
      description: string,
      formula: string,
      startDateTime: string,
      endDateTime: string,
      kqiCategory: {
        id: string,
        name: string,
      },
      kqiPerspective: {
        id: string,
        name: string,
      },
      kqiSource: {
        id: string,
        name: string,
      },
      kqiTemporalFrequency: {
        id: string,
        name: string,
      }
    }
  }
}

const KqiTypes = () => {
  const classes = useStyles();
  const [dataKqi, setDataKqi] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const [showFormCreate, setShowFormCreate] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);

  const dataResponsePerspectives = dataKqi.kqiPerspectives?.edges.map(item => item.node)
  const dataResponseSources = dataKqi.kqiSources?.edges.map(item => item.node)
  const dataResponseCategories = dataKqi.kqiCategories?.edges.map(item => item.node)
  const dataResponseTemporalFrequencies = dataKqi.kqiTemporalFrequencies?.edges.map(item => item.node)
  const dataResponseKqiTargets = dataKqi.kqiTargets?.edges.map(item => item.node)

  useEffect(() => {
      fetchQuery(RelayEnvironment, KqiQuery, {}).then(data => {
        setDataKqi(data);
      });
    }, []);
  
  const handleClick = () => {
    setShowFormCreate(true);
  }
  const formEdit = (kqi: Kqis) => {
    setShowFormEdit(true);
    setDataEdit(kqi);
  }
  if (showFormCreate) {
    return (
      <KqiFormCreate
        dataPerspectives={dataResponsePerspectives}
        dataSources={dataResponseSources}
        dataCategories={dataResponseCategories}
        dataTemporalFrequencies={dataResponseTemporalFrequencies}
        returnTableKqi={() => setShowFormCreate(false)}
      />
    );
  }

  if (showFormEdit) {
    return (
      <KqiFormEdit
        dataKqiTargets={dataResponseKqiTargets}
        dataPerspectives={dataResponsePerspectives}
        dataSources={dataResponseSources}
        dataCategories={dataResponseCategories}
        dataTemporalFrequencies={dataResponseTemporalFrequencies}
        returnTableKqi={() => setShowFormEdit(false)}
        formValues={dataEdit}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <ConfigureTitle
            title={fbt('KQI (Key Quality Indicator) ', 'KQI Title')}
            subtitle={fbt(
              'Quality indicators and targets to be defined by users and used by service quality management processes',
              'KQI description',
            )}
          />
        </Grid>
        <Grid className={classes.addKpi} item xs={1}>
          <Button onClick={handleClick}>
            Add KQI
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid className={classes.paper} item xs={12}>
          <KqiTable dataValues={dataKqi.kqis?.edges.map(item => item.node)} viewFormEdit={formEdit} />
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiTypes;
