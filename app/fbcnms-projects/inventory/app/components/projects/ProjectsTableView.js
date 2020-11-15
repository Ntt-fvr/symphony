/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ProjectOrder} from './__generated__/ProjectsTableViewPaginationQuery.graphql';
import type {ProjectsTableViewPaginationQuery} from './__generated__/ProjectsTableViewPaginationQuery.graphql';
import type {ProjectsTableView_query$key} from './__generated__/ProjectsTableView_query.graphql';

import Button from '@symphony/design-system/components/Button';
import DateTimeFormat from '../../common/DateTimeFormat';
import LocationLink from '../location/LocationLink';
import PriorityTag from '../work_orders/PriorityTag';
import React, {useMemo} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {TABLE_SORT_ORDER} from '@symphony/design-system/components/Table/TableContext';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {prioritySortingValues} from '../../common/FilterTypes';
import {usePaginationFragment} from 'react-relay/hooks';

const useStyles = makeStyles(() => ({
  workOrderCell: {
    borderRadius: '15px',
    minWidth: '26px',
  },
  table: {
    height: '100%',
  },
}));

export const PROJECTS_PAGE_SIZE = 15;

type Props = $ReadOnly<{|
  projects: ProjectsTableView_query$key,
  onProjectSelected: string => void,
  orderBy: ProjectOrder,
  onOrderChanged: (newOrderSettings: ProjectOrder) => void,
|}>;

const ProjectsTableView = (props: Props) => {
  const {onProjectSelected, orderBy, onOrderChanged} = props;
  const classes = useStyles();

  // $FlowFixMe[missing-type-arg] $FlowFixMe T74239404 Found via relay types
  const {data, loadNext} = usePaginationFragment<
    ProjectsTableViewPaginationQuery,
    ProjectsTableView_query$key,
  >(
    graphql`
      fragment ProjectsTableView_query on Query
        @argumentDefinitions(
          first: {type: "Int"}
          orderBy: {type: "ProjectOrder"}
          filterBy: {type: "[ProjectFilterInput!]"}
          cursor: {type: "Cursor"}
        )
        @refetchable(queryName: "ProjectsTableViewPaginationQuery") {
        projects(
          after: $cursor
          first: $first
          orderBy: $orderBy
          filterBy: $filterBy
        ) @connection(key: "ProjectsTableView_projects") {
          totalCount
          edges {
            node {
              id
              createTime
              name
              createdBy {
                email
              }
              location {
                id
                name
              }
              type {
                id
                name
              }
              priority
              numberOfWorkOrders
            }
          }
        }
      }
    `,
    props.projects,
  );

  const columns = [
    {
      key: 'name',
      title: 'Project',
      render: row => (
        <Button variant="text" onClick={() => onProjectSelected(row.id)}>
          {row.name}
        </Button>
      ),
      getSortingValue: row => row.name,
    },
    {
      key: 'numberOfWorkOrders',
      title: 'Work Orders',
      getSortingValue: row => row?.numberOfWorkOrders,
      render: row =>
        row?.numberOfWorkOrders ? (
          <Button
            className={classes.workOrderCell}
            onClick={() => onProjectSelected(row.id)}>
            {row.numberOfWorkOrders}
          </Button>
        ) : null,
    },
    {
      key: 'type',
      title: `${fbt('Template', '')}`,
      getSortingValue: row => row.type?.name,
      render: row => row.type?.name ?? '',
    },
    {
      key: 'location',
      title: 'Location',
      getSortingValue: row => row.location?.name,
      render: row =>
        row.location ? (
          <LocationLink title={row.location.name} id={row.location.id} />
        ) : (
          ''
        ),
    },
    {
      key: 'owner',
      title: 'Owner',
      getSortingValue: row => row?.createdBy?.email,
      render: row => row?.createdBy?.email ?? '',
    },
    {
      key: 'priority',
      title: 'Priority',
      getSortingValue: row => prioritySortingValues[row.priority],
      render: row => <PriorityTag priority={row.priority} />,
    },
    {
      key: 'createTime',
      title: 'Creation Time',
      getSortingValue: row => new Date(row.createTime).getTime(),
      render: row => DateTimeFormat.dateTime(row.createTime),
    },
  ];

  const projectsData = useMemo(
    () =>
      data?.projects?.edges.map(edge => {
        if (edge.node) {
          return {...edge.node, key: edge.node.id};
        }
      }),
    [data],
  );

  if (projectsData == null || projectsData.length === 0) {
    return <div />;
  }

  return (
    <Table
      className={classes.table}
      data={projectsData}
      columns={columns}
      onSortChanged={newSortSettings =>
        onOrderChanged({
          direction:
            newSortSettings.order === TABLE_SORT_ORDER.ascending
              ? 'ASC'
              : 'DESC',
          field: newSortSettings.columnKey === 'name' ? 'NAME' : 'UPDATED_AT',
        })
      }
      paginationSettings={{
        loadNext: onCompleted => {
          loadNext(PROJECTS_PAGE_SIZE, {
            // $FlowFixMe[incompatible-call] $FlowFixMe T74239404 Found via relay types
            onComplete: () => onCompleted && onCompleted(),
          });
        },
        pageSize: PROJECTS_PAGE_SIZE,
        totalRowsCount: data.projects.totalCount,
      }}
      sortSettings={
        orderBy.field === 'NAME'
          ? {
              columnKey: 'name',
              order:
                orderBy.direction === 'ASC'
                  ? TABLE_SORT_ORDER.ascending
                  : TABLE_SORT_ORDER.descending,
              overrideSorting: true,
            }
          : undefined
      }
    />
  );
};

export default ProjectsTableView;
