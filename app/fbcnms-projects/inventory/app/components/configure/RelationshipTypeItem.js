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
import {graphql} from 'relay-runtime';
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
  const getDataReltionShipsA = response.resourceTypeRelationships.edges.map(
    item => item.node?.resourceTypeA?.resourceTypeClass,
  );
  const getDataReltionShipsB = response.resourceTypeRelationships.edges.map(
    item => item.node?.resourceTypeB?.resourceTypeClass,
  );
  const getdataAllRelationShips = [
    ...getDataReltionShipsA,
    ...getDataReltionShipsB,
  ];

  return (
    <>
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
