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

import React, {useEffect} from 'react';
import RelationshipFormValidation from './RelationshipFormValidation';
import TableContextForm from '../TableContext';
import TableTypesDispatcher from '../context/TableTypesDispatcher';
import Text from '@symphony/design-system/components/Text';
import {Grid} from '@material-ui/core';
import {difference} from 'lodash';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useTableTypesReducer} from '../context/TableTypeState';

const useStyles = makeStyles(() => ({
  relationship: {
    margin: '32px 0',
  },
}));

const ResourceSpecificationRelationshipsQuery = graphql`
  query RelationshipTypeItemQuery(
    $filterBy2: [ResourceTypeRelationshipFilterInput!]
  ) {
    resourceSpecifications {
      edges {
        node {
          id
          name
          resourceType {
            id
            name
            resourceTypeClass
          }
          resourceSpecificationRelationship {
            id
            name
            resourceSpecification {
              id
              name
            }
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
    resourceSpecificationRelationships {
      edges {
        node {
          id
          name
          resourceSpecification {
            id
            name
            resourceType {
              resourceTypeClass
            }
          }
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  dataForm: ResourceSpecifications,
  callback: any,
|}>;

export default function RelationshipTypeItem(props: Props) {
  const {dataForm, callback} = props;
  const classes = useStyles();

  const response = useLazyLoadQuery<RelationshipTypeItemQuery>(
    ResourceSpecificationRelationshipsQuery,
    {
      filterBy2: [
        {
          filterType: 'RESOURCE_RELATIONSHIP_RESOURCE',
          operator: 'IS_ONE_OF',
          idSet: [dataForm?.resourceType?.id || dataForm?.id],
        },
        {
          filterType: 'RESOURCE_RELATIONSHIP_TYPE',
          operator: 'IS',
          typeValue: 'BELONGS_TO',
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

  const search = text =>
    response.resourceSpecificationRelationships?.edges
      .map(item => item.node)
      .filter(item =>
        item?.resourceSpecification.resourceType?.resourceTypeClass?.includes(
          text,
        ),
      );

  const searchSpecification = text =>
    response.resourceSpecifications?.edges
      .map(p => p.node)
      .filter(item => item?.resourceType?.resourceTypeClass?.includes(text));

  const spliceItems = searchClass =>
    searchClass?.map(item => {
      return {
        ...item,
        resourceSpecification: item?.resourceSpecification.id,
      };
    });

  const [tableTypesSlots, tableTypesDispatcherSlots] = useTableTypesReducer(
    spliceItems(search('SLOT') ?? []),
  );
  const [tableTypesPorts, tableTypesDispatcherPorts] = useTableTypesReducer(
    spliceItems(search('PORT') ?? []),
  );
  const [tableTypesCards, tableTypesDispatcherCards] = useTableTypesReducer(
    spliceItems(search('CARD') ?? []),
  );
  const [tableTypesVlan, tableTypesDispatcherVlan] = useTableTypesReducer(
    spliceItems(search('VLAN') ?? []),
  );

  useEffect(() => {
    callback(unifyData);
  }, [tableTypesSlots, tableTypesPorts, tableTypesCards, tableTypesVlan]);

  const unifyData = [
    ...tableTypesSlots,
    ...tableTypesPorts,
    ...tableTypesCards,
    ...tableTypesVlan,
  ];

  return (
    <>
      {!getdataAllRelationShips.length ||
      getdataAllRelationShips.toString() === 'EQUIPMENT' ? null : (
        <Grid className={classes.relationship} item xs={12}>
          <Text weight={'bold'} variant={'h6'}>
            Relationship types definition
          </Text>
        </Grid>
      )}
      {getdataAllRelationShips.includes('CARD') && (
        <TableTypesDispatcher.Provider
          value={{dispatch: tableTypesDispatcherCards, tableTypesCards}}>
          <TableContextForm
            data={searchSpecification('CARD')}
            nameCard="Card"
            selectMultiple
            tableTypes={tableTypesCards}
          />
        </TableTypesDispatcher.Provider>
      )}
      {getdataAllRelationShips.includes('PORT') && (
        <TableTypesDispatcher.Provider
          value={{dispatch: tableTypesDispatcherPorts, tableTypesPorts}}>
          <TableContextForm
            data={searchSpecification('PORT')}
            nameCard="Port"
            items
            tableTypes={tableTypesPorts}
          />
        </TableTypesDispatcher.Provider>
      )}
      {getdataAllRelationShips.includes('SLOT') && (
        <TableTypesDispatcher.Provider
          value={{dispatch: tableTypesDispatcherSlots, tableTypesSlots}}>
          <TableContextForm
            data={searchSpecification('SLOT')}
            nameCard="Slot"
            items
            tableTypes={tableTypesSlots}
          />
        </TableTypesDispatcher.Provider>
      )}
      {getdataAllRelationShips.includes('VLAN') && (
        <TableTypesDispatcher.Provider
          value={{dispatch: tableTypesDispatcherVlan, tableTypesVlan}}>
          <TableContextForm
            data={searchSpecification('VLAN')}
            nameCard="Vlan"
            vlan
            tableTypes={tableTypesVlan}
          />
        </TableTypesDispatcher.Provider>
      )}
    </>
  );
}
