/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {RelationshipTypeItemQuery} from './__generated__/RelationshipTypeItemQuery.graphql';
import type {ResourceSpecifications} from './EditResourceTypeItem';

import React from 'react';
import RelationshipFormValidation from './RelationshipFormValidation';
import TableContextForm from '../TableContext';
import TableTypesDispatcher from '../context/TableTypesDispatcher';
import Text from '@symphony/design-system/components/Text';
import {Grid} from '@material-ui/core';
import {difference} from 'lodash';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {
  toMutableTableType,
  useTableTypesReducer,
} from '../context/TableTypeState';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(() => ({
  relationship: {
    margin: '32px 0',
  },
}));

const ResourceSpecificationRelationshipsQuery = graphql`
  query RelationshipTypeItemQuery(
    $filterBy: [ResourceSpecificationFilterInput!]!
    $filterBy2: [ResourceTypeRelationshipFilterInput!]!
  ) {
    resourceSpecifications(filterBy: $filterBy) {
      totalCount
      edges {
        node {
          id
          name
          resourceType {
            id
            name
            resourceTypeBaseType
            resourceTypeClass
          }
        }
      }
    }
    resourceTypeRelationships(filterBy: $filterBy2) {
      totalCount
      edges {
        node {
          id
          resourceRelationshipType
          resourceTypeA {
            id
            name
            resourceTypeClass
          }
          resourceTypeB {
            id
            name
            resourceTypeClass
          }
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  dataForm: ResourceSpecifications,
|}>;

export default function RelationshipTypeItem(props: Props) {
  const {dataForm} = props;
  const classes = useStyles();

  const response = useLazyLoadQuery<RelationshipTypeItemQuery>(
    ResourceSpecificationRelationshipsQuery,
    {
      filterBy: [
        {
          filterType: 'RESOURCE_TYPE',
          operator: 'IS_ONE_OF',
          idSet: [dataForm?.resourceType?.id || dataForm?.id],
        },
      ],
      filterBy2: [
        {
          filterType: 'RESOURCE_RELATIONSHIP_RESOURCE',
          operator: 'IS_ONE_OF',
          idSet: [dataForm?.resourceType?.id || dataForm?.id],
        },
      ],
    },
  );

  const getdataAllRelationShips = [
    ...difference(
      response.resourceTypeRelationships.edges.map(
        item => item.node?.resourceTypeA?.resourceTypeClass,
      ),
      [dataForm.resourceType?.resourceTypeClass],
    ),
    ...difference(
      response.resourceTypeRelationships.edges.map(
        item => item.node?.resourceTypeB?.resourceTypeClass,
      ),
      [dataForm.resourceType?.resourceTypeClass],
    ),
  ];

  const dataFormTable = [
    {
      id: '',
      name: '',
      options: '',
    },
  ];
  const dimanycMapTable = (dataFormTable ?? [])
    .filter(Boolean)
    .map(toMutableTableType);

  const [tableTypesSlots, tableTypesDispatcherSlots] = useTableTypesReducer(
    dimanycMapTable,
  );
  const [tableTypesPorts, tableTypesDispatcherPorts] = useTableTypesReducer(
    dimanycMapTable,
  );
  const [tableTypesCards, tableTypesDispatcherCards] = useTableTypesReducer(
    dimanycMapTable,
  );

  return (
    <>
      {!dataForm.resourceType?.resourceTypeClass ? null : (
        <>
          <Grid className={classes.relationship} item xs={12}>
            <Text weight={'bold'} variant={'h6'}>
              Relationship types definition
            </Text>
          </Grid>
          {getdataAllRelationShips.includes('CARD') && (
            <TableTypesDispatcher.Provider
              value={{dispatch: tableTypesDispatcherCards, tableTypesCards}}>
              <TableContextForm
                nameCard="Cards"
                selectMultiple
                tableTypes={tableTypesCards}
              />
            </TableTypesDispatcher.Provider>
          )}
          {getdataAllRelationShips.includes('PORT') && (
            <TableTypesDispatcher.Provider
              value={{dispatch: tableTypesDispatcherPorts, tableTypesPorts}}>
              <TableContextForm nameCard="Ports" tableTypes={tableTypesPorts} />
            </TableTypesDispatcher.Provider>
          )}
          {getdataAllRelationShips.includes('SLOT') && (
            <TableTypesDispatcher.Provider
              value={{dispatch: tableTypesDispatcherSlots, tableTypesSlots}}>
              <TableContextForm nameCard="Slots" tableTypes={tableTypesSlots} />
            </TableTypesDispatcher.Provider>
          )}
          {getdataAllRelationShips.includes('VLAN') && (
            <RelationshipFormValidation nameForm="Vlan" />
          )}
        </>
      )}
    </>
  );
}
