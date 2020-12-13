/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  ProjectOrder,
  ProjectOrderField,
} from './__generated__/ProjectsTableViewPaginationQuery.graphql';
import type {ProjectsTableViewPaginationQuery} from './__generated__/ProjectsTableViewPaginationQuery.graphql';
import type {ProjectsTableView_query$key} from './__generated__/ProjectsTableView_query.graphql';

import Button from '@symphony/design-system/components/Button';
import DateTimeFormat from '../../common/DateTimeFormat';
import LocationLink from '../location/LocationLink';
import PriorityTag from '../work_orders/PriorityTag';
import React, {useMemo} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {TABLE_SORT_ORDER} from '@symphony/design-system/components/Table/TableContext';
import {getPropertyValue} from '../../common/Property';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
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
  const useColumnSelector = useFeatureFlag('projects_column_selector');

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
              properties {
                id
                stringValue
                intValue
                floatValue
                booleanValue
                latitudeValue
                longitudeValue
                rangeFromValue
                rangeToValue
                nodeValue {
                  id
                  name
                }
                propertyType {
                  id
                  name
                  type
                  nodeType
                  isEditable
                  isMandatory
                  isInstanceProperty
                  stringValue
                  intValue
                  floatValue
                  booleanValue
                  latitudeValue
                  longitudeValue
                  rangeFromValue
                  rangeToValue
                }
              }
              numberOfWorkOrders
            }
          }
        }
      }
    `,
    props.projects,
  );

  const allProjectPropertyNames = data?.projects?.edges
    .flatMap(({node}) => node?.properties.map(p => p.propertyType.name))
    .filter((propertyName, i, self) => self.indexOf(propertyName) === i);

  const columns = [
    {
      key: 'name',
      title: 'Project',
      render: row => (
        <Button variant="text" onClick={() => onProjectSelected(row.id)}>
          {row.name}
        </Button>
      ),
      isSortable: true,
    },
    {
      key: 'numberOfWorkOrders',
      title: 'Work Orders',
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
      render: row => row.type?.name ?? '',
    },
    {
      key: 'location',
      title: 'Location',
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
      render: row => row?.createdBy?.email ?? '',
    },
    {
      key: 'priority',
      title: 'Priority',
      render: row => <PriorityTag priority={row.priority} />,
      isSortable: true,
    },
    {
      key: 'createTime',
      title: 'Creation Time',
      render: row => DateTimeFormat.dateTime(row.createTime),
      isSortable: true,
    },

    ...(useColumnSelector
      ? allProjectPropertyNames
          .filter(name => !!name)
          .map((name = '') => ({
            key: name,
            title: name,
            getSortingValue: row => row.type?.name,
            render: row => {
              const indexOfProperty = row.properties.findIndex(
                property => property.propertyType.name === name,
              );

              return (
                (indexOfProperty >= 0 &&
                  getPropertyValue(row.properties[indexOfProperty])) ||
                null
              );
            },
          }))
      : []),
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

  const orderByObj: {[string]: ProjectOrderField} = {
    name: 'NAME',
    createTime: 'CREATED_AT',
    updateTime: 'UPDATED_AT',
    priority: 'PRIORITY',
  };

  const getSortSettings = orderBy => {
    const orderByColumnObj: {[ProjectOrderField]: string} = {
      NAME: 'name',
      CREATED_AT: 'createTime',
      UPDATED_AT: 'updateTime',
      PRIORITY: 'priority',
    };

    if (!orderBy.field || !orderByColumnObj[orderBy.field]) {
      return undefined;
    }

    return {
      columnKey: orderByColumnObj[orderBy.field],
      order:
        orderBy.direction === 'ASC'
          ? TABLE_SORT_ORDER.ascending
          : TABLE_SORT_ORDER.descending,
      overrideSorting: true,
    };
  };

  if (projectsData.length === 0) {
    return null;
  }

  return (
    <Table
      className={classes.table}
      data={projectsData}
      columns={columns}
      onSortChanged={newSortSettings => {
        return onOrderChanged({
          direction:
            newSortSettings.order === TABLE_SORT_ORDER.ascending
              ? 'ASC'
              : 'DESC',
          field: orderByObj[newSortSettings.columnKey]
            ? orderByObj[newSortSettings.columnKey]
            : 'UPDATED_AT',
        });
      }}
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
      sortSettings={getSortSettings(orderBy)}
    />
  );
};

export default ProjectsTableView;
