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
import {graphql} from 'relay-runtime';
import {
  toMutableTableType,
  useTableTypesReducer,
} from '../context/TableTypeState';
import {useLazyLoadQuery} from 'react-relay/hooks';

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
  const getDataRelationShipsA = response.resourceTypeRelationships.edges.map(
    item => item.node?.resourceTypeA?.resourceTypeClass,
  );
  const getDataRelationShipsB = response.resourceTypeRelationships.edges.map(
    item => item.node?.resourceTypeB?.resourceTypeClass,
  );
  const getdataAllRelationShips = [
    ...getDataRelationShipsA,
    ...getDataRelationShipsB,
  ];
  const dataFormTable = [
    {
      id: '',
      name: '',
    },
  ];
  const [tableTypes, tableTypesDispatcher] = useTableTypesReducer(
    (dataFormTable ?? []).filter(Boolean).map(toMutableTableType),
  );

  return (
    <>
      <TableTypesDispatcher.Provider
        value={{dispatch: tableTypesDispatcher, tableTypes}}>
        <TableContextForm tableTypes={tableTypes} />
      </TableTypesDispatcher.Provider>
      {getdataAllRelationShips.includes('CARD') && (
        <RelationshipFormValidation nameForm="Cards" />
      )}
      {getdataAllRelationShips.includes('PORT') && (
        <RelationshipFormValidation nameForm="Ports" />
      )}
      {getdataAllRelationShips.includes('SLOT') && (
        <RelationshipFormValidation nameForm="Slots" />
      )}
      {getdataAllRelationShips.includes('VLAN') && (
        <RelationshipFormValidation nameForm="Vlan" />
      )}
    </>
  );
}
