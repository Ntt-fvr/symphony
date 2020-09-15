/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ProjectsTableView_projects} from './__generated__/ProjectsTableView_projects.graphql';

import Button from '@symphony/design-system/components/Button';
import DateTimeFormat from '../../common/DateTimeFormat';
import LocationLink from '../location/LocationLink';
import PriorityTag from '../work_orders/PriorityTag';
import React, {useMemo} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {prioritySortingValues} from '../../common/FilterTypes';

const useStyles = makeStyles(() => ({
  workOrderCell: {
    borderRadius: '15px',
    minWidth: '26px',
  },
}));

type Props = {
  projects: ProjectsTableView_projects,
  onProjectSelected: string => void,
};

const ProjectsTableView = (props: Props) => {
  const {projects, onProjectSelected} = props;

  const data = useMemo(
    () => projects.map(project => ({...project, key: project.id})),
    [projects],
  );
  const classes = useStyles();

  if (projects.length === 0) {
    return null;
  }

  return (
    <Table
      data={data}
      columns={[
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
          render: row => DateTimeFormat.dateTime(row.createTime),
        },
      ]}
    />
  );
};

export default createFragmentContainer(ProjectsTableView, {
  projects: graphql`
    fragment ProjectsTableView_projects on Project @relay(plural: true) {
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
  `,
});
