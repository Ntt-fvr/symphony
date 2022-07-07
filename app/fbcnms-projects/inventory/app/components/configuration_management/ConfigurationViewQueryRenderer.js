/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import Button from '@symphony/design-system/components/Button';
import React from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import fbt from 'fbt';
import {CircleIndicator} from '../resource_instance/CircleIndicator';
import {Grid} from '@material-ui/core';

export const PROJECTS_PAGE_SIZE = 15;

const dataMock = [];

const tableColumns = [
  {
    key: 'creation date',
    title: 'Creation date',
    render: row => row.creationDate ?? '01/03/22',
    tooltip: row => row.creationDate ?? '01/03/22',
  },
  {
    key: 'last modification date',
    title: `${fbt('Last modification date', '')}`,
    render: row => row.lastModificationDate ?? '01/05/22',
    tooltip: row => row.lastModificationDate ?? '01/03/05',
  },
  {
    key: 'resource type',
    title: `${fbt('Resource type', '')}`,
    render: row => row.resourceType ?? '',
    tooltip: row => row.resourceType ?? '',
  },
  {
    key: 'change source',
    title: `${fbt('Change source', '')}`,
    render: row => row.source ?? '',
    tooltip: row => row.source ?? '',
  },
  {
    key: 'affected resources',
    title: `${fbt('Affected resources', '')}`,
    render: row => <CircleIndicator>{row.affectedResources}</CircleIndicator>,
    tooltip: row => row.affectedResources ?? '',
  },
];

const ConfigurationViewQueryRenderer = () => {
  return (
    <Grid>
      <Table
        data={dataMock}
        columns={[
          {
            key: 'changeId',
            title: 'Change ID',
            getSortingValue: row => row.id,
            render: row => (
              <Button variant="text" tooltip={row.id ?? ''}>
                {row.id}
              </Button>
            ),
          },
          ...tableColumns,
        ]}
        paginationSettings={{
          loadNext: onCompleted => {
            loadNext(PROJECTS_PAGE_SIZE, {
              onComplete: () => onCompleted && onCompleted(),
            });
          },
          pageSize: PROJECTS_PAGE_SIZE,
          totalRowsCount: 15, //changeRequest.length,
        }}
      />
    </Grid>
  );
};

export {ConfigurationViewQueryRenderer};
