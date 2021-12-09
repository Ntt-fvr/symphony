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

import React, {useState} from 'react';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ConfigueTitle from '@fbcnms/ui/components/ConfigureTitle';

import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';

import DroppableTableBody from '../components/DroppableTableBody';
import DraggableTableRow from '../../../draggable/DraggableTableRow';
import LocationTypeItem from '../../../configure/LocationTypeItem';

import PropertyTypeTableAdmin from '../../../form/PropertyTypeTableAdmin';

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
        $NonMaybeType<
          $ElementType<ParametersCatalogPageQueryResponse, 'parametersCatalog'>,
        >,
        'edges',
      >,
      number,
    >,
    'node',
  >,
>;

type State = {
  error: string,
  editingLocationType: () => void,
  isSaving: boolean,
};

const parametersCatalogPageQuery = graphql`
  query ParametersCatalogPageQuery {
    parametersCatalog {
      totalCount
      edges {
        node {
          id
          name
          index
          isDisabled
          propertyCategories {
            id
            name
            index
          }
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

  // TODO: Use when edit parameters  catalog
  const [
    editingParametersCatalog,
    setEditingParametersCatalog,
  ] = useState<?ResponseParametersCatalogType>(null);

  // TODO: Use flag loadder when saving parameters
  const [isSaving, setIsSaving] = useState(false);

  console.log(parametersCatalogData);

  const [parameters, setParamaters] = useState<State>({
    error: '',
    editingLocationType: () => console.log('error'),
    isSaving: false,
  });

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
    // TODO: Check add context provider
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
          {parametersCatalogData.sort(sortByIndex).map((params, i) => {
            return (
              <div className={classes.listItem}>
                <DraggableTableRow
                  className={classes.draggableRow}
                  draggableCellClassName={classes.cell}
                  id={params.id}
                  index={params.index || 0}
                  key={params.id}>
                  <Accordion className={classes.panel}>
                    <AccordionSummary
                      className={classes.row}
                      expandIcon={<ExpandMoreIcon />}>
                      {params.name}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.properties}>
                        <PropertyTypeTableAdmin
                          propertyTypes={params.propertyCategories}
                          onPropertiesChanged={parameterCatalogChangeHandler}
                        />
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </DraggableTableRow>
              </div>
            );
          })}
        </DroppableTableBody>
      </div>
    </div>
  );
};

const itemsDev = [1, 2, 3, 4, 5].map(item => ({
  id: '55834574859',
  name: 'UBIGEO',
  index: 0,
  type: 'string',
  nodeType: '',
  booleanValue: false,
  stringValue: '00',
  intValue: 0,
  floatValue: 0,
  latitudeValue: 0,
  longitudeValue: 0,
  isEditable: true,
  isMandatory: false,
  isInstanceProperty: true,
}));

export default ParametersCatalogPage;
