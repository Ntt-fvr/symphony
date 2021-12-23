/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {
  ParametersCatalogPageQuery,
  ParametersCatalogPageQueryResponse,
} from './__generated__/ParametersCatalogPageQuery.graphql';
import type {PropertyCategoryType, ParametersCatalogType} from '../types';

import ConfigueTitle from '@fbcnms/ui/components/ConfigureTitle';

import React, {useState} from 'react';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';

import LocationTypeItem from '../../../configure/LocationTypeItem';

import AddEditParametersCatalogType from '../components/AddEditParametersCatalogType';
import DroppableTableBody from '../components/DroppableTableBody';

const useStyles = makeStyles(theme => ({
  typesList: {
    padding: '24px',
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginLeft: '10px',
  },
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  table: {
    width: '100%',
    marginTop: '15px',
  },
  listItem: {
    marginBottom: theme.spacing(),
  },
  draggableRow: {
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    borderRadius: 4,
  },
  cell: {
    border: 'none',
    paddingLeft: '10px',
  },
  panel: {
    width: '100%',
    boxShadow: 'none',
  },
  row: {
    flexGrow: 1,
  },
  removeBefore: {
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  properties: {
    marginBottom: '24px',
    width: '100%',
  },
}));

type ResponseParametersCatalogType = $NonMaybeType<
  $ElementType<
    $ElementType<
      $ElementType<
        $ElementType<ParametersCatalogPageQueryResponse, 'parametersCatalog'>,
        'edges',
      >,
      number,
    >,
    'node',
  >,
>;

type State = {
  error: string,
  editingLocationType: ParametersCatalogType,
  isSaving: boolean,
};

const parametersCatalogPageQuery = graphql`
  query ParametersCatalogPageQuery {
    parametersCatalog {
      edges {
        node {
          ...AddEditParametersCatalogType_editingParametersCatalogType
          id
          name
          index
        }
      }
    }
  }
`;

const sortByIndex = (
  a: $ReadOnly<{index?: ?number}>,
  b: $ReadOnly<{index?: ?number}>,
) => (a.index ?? 0) - (b.index ?? 0);

export const ParametersCatalogPage = () => {
  const classes = useStyles();

  const {
    parametersCatalog,
  }: ParametersCatalogPageQueryResponse = useLazyLoadQuery<ParametersCatalogPageQuery>(
    parametersCatalogPageQuery,
    {},
  );

  const parametersCatalogData: Array<ResponseParametersCatalogType> =
    parametersCatalog?.edges.map(edge => edge.node).filter(Boolean) ?? [];

  const [
    editingParametersCatalog,
    setEditingParametersCatalog,
  ] = useState<?ResponseParametersCatalogType>(null);

  // TODO: Use flag loadder when saving parameters
  const [isSaving, setIsSaving] = useState(false);

  // TODO: Notificaciones
  // const enqueueSnackbar = useEnqueueSnackbar();

  // TODO: Equivalent to location, in this case is just edit collapse or maybe not
  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const showAddEditParametersTypeToggle = (
    locType: ?ResponseParametersCatalogType,
  ) => {
    setShowAddEditCard(true);
  };

  const saveParameter = () => {
    console.log('save test');
  };

  if (showAddEditCard) {
    return <h1>Editando</h1>;
  }

  const onDragEnd = ({source, destination}) => {
    if (destination == null) {
      return;
    }
    console.log('On drag end');
  };

  const parameterCatalogChangeHandler = parameters => {
    console.log(parameters);
  };
  return (
    <div className={classes.typesList}>
      <div className={classes.firstRow}>
        <ConfigueTitle
          className={classes.title}
          title={fbt('Parameters Catalog', 'Parameters Catalog header')}
          subtitle={fbt(
            "Add and manage your organization's users by entering their details and selecting a role.",
            'Parameters Catalog subheader',
          )}
        />
      </div>
      <div className={classes.root}>
        <DroppableTableBody className={classes.table} onDragEnd={onDragEnd}>
          {parametersCatalogData?.sort(sortByIndex).map((parameters, i) => {
            return (
              <div key={i} className={classes.listItem}>
                <AddEditParametersCatalogType
                  editingPropertyCatergoryType={parameters}
                />
              </div>
            );
          })}
        </DroppableTableBody>
      </div>
    </div>
  );
};

export default ParametersCatalogPage;
