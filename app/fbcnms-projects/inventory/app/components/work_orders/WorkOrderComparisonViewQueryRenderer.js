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

import EmptyStateBackdrop from '../comparison_view/EmptyStateBackdrop';
import React, {useEffect, useMemo, useState} from 'react';
import WorkOrdersMap from './WorkOrdersMap';
import WorkOrdersView, {WORK_ORDERS_PAGE_SIZE} from './WorkOrdersView';
import classNames from 'classnames';
import {DisplayOptions} from '../InventoryViewContainer';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import EducationNote from '@symphony/design-system/illustrations/EducationNote';

import type {DisplayOptionTypes} from '../InventoryViewContainer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
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
  showDialog: any,
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
    showDialog,
  } = props;

  const [tableKey, setTableKey] = useState(0);

  const filtersVariable = useMemo(
    () =>
      filters.map(f => ({
        filterType: f.name.toUpperCase(),
        operator: f.operator.toUpperCase(),
        stringValue: f.stringValue,
        propertyValue: f.propertyValue,
        idSet: f.idSet,
        stringSet: f.stringSet,
      })),
    [filters],
  );
  useEffect(() => setTableKey(key => key + 1), [filtersVariable, orderBy]);

  const response = useLazyLoadQuery<WorkOrderComparisonViewQueryRendererSearchQuery>(
    workOrderSearchQuery,
    {
      limit: WORK_ORDERS_PAGE_SIZE,
      filters: filtersVariable,
      orderBy,
    },
  );

  if (response == null || response.workOrdersMap == null) {
    return null;
  }

  const {totalCount} = response.workOrdersMap;
  if (totalCount === 0) {
    return <EmptyStateBackdrop
      illustration={{render: EducationNote}}
      heading={{textContent: 'Start creating work order templates'}}
      button={{
        textContent: 'Create work order template',
        onClick: showDialog
      }}
    />;
  }

  return (
    <div className={classNames(classes.root, className)}>
      {displayMode === DisplayOptions.map ? (
        <WorkOrdersMap
          workOrders={response.workOrdersMap.edges
            .filter(Boolean)
            // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
            // $FlowFixMe[prop-missing] $FlowFixMe T74239404 Found via relay types
            .map(edge => edge.node)}
        />
      ) : (
        <WorkOrdersView
          key={tableKey}
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
