/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {WorkOrderComparisonViewQueryRendererSearchQuery} from './__generated__/WorkOrderComparisonViewQueryRendererSearchQuery.graphql';
import type {WorkOrderOrder} from './__generated__/WorkOrderComparisonViewQueryRendererSearchQuery.graphql';

import ComparisonViewNoResults from '../comparison_view/ComparisonViewNoResults';
import React from 'react';
import WorkOrdersMap from './WorkOrdersMap';
import WorkOrdersView, {WORK_ORDERS_PAGE_SIZE} from './WorkOrdersView';
import classNames from 'classnames';
import {DisplayOptions} from '../InventoryViewContainer';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

import type {DisplayOptionTypes} from '../InventoryViewContainer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  noResultsRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
  noResultsLabel: {
    color: theme.palette.grey[600],
  },
  searchIcon: {
    color: theme.palette.grey[600],
    marginBottom: '6px',
    fontSize: '36px',
  },
}));

type Props = $ReadOnly<{|
  className?: string,
  onWorkOrderSelected: (workOrderId: string) => void,
  filters: Array<any>,
  orderBy: WorkOrderOrder,
  displayMode?: DisplayOptionTypes,
  onOrderChanged: (newOrderSettings: WorkOrderOrder) => void,
|}>;

const workOrderSearchQuery = graphql`
  query WorkOrderComparisonViewQueryRendererSearchQuery(
    $limit: Int
    $filters: [WorkOrderFilterInput!]!
    $orderBy: WorkOrderOrder
  ) {
    ...WorkOrdersView_query
      @arguments(first: $limit, orderBy: $orderBy, filterBy: $filters)
    workOrdersMap: workOrders(
      orderBy: $orderBy
      filterBy: $filters
      first: 100
    ) {
      totalCount
      edges {
        node {
          ...WorkOrdersMap_workOrders
        }
      }
    }
  }
`;

const WorkOrderComparisonViewQueryRenderer = (props: Props) => {
  const classes = useStyles();
  const {
    filters,
    onWorkOrderSelected,
    displayMode,
    className,
    orderBy,
    onOrderChanged,
  } = props;

  const response = useLazyLoadQuery<WorkOrderComparisonViewQueryRendererSearchQuery>(
    workOrderSearchQuery,
    {
      limit: WORK_ORDERS_PAGE_SIZE,
      filters: filters.map(f => ({
        filterType: f.name.toUpperCase(),
        operator: f.operator.toUpperCase(),
        stringValue: f.stringValue,
        propertyValue: f.propertyValue,
        idSet: f.idSet,
        stringSet: f.stringSet,
      })),
      orderBy,
    },
  );

  if (response == null || response.workOrdersMap == null) {
    return null;
  }

  const {totalCount} = response.workOrdersMap;
  if (totalCount === 0) {
    return <ComparisonViewNoResults />;
  }

  return (
    <div className={classNames(classes.root, className)}>
      {displayMode === DisplayOptions.map ? (
        <WorkOrdersMap
          workOrders={response.workOrdersMap.edges
            .filter(Boolean)
            .map(edge => edge.node)}
        />
      ) : (
        <WorkOrdersView
          workOrders={response}
          onWorkOrderSelected={onWorkOrderSelected}
          orderBy={orderBy}
          onOrderChanged={onOrderChanged}
        />
      )}
    </div>
  );
};

export default WorkOrderComparisonViewQueryRenderer;
