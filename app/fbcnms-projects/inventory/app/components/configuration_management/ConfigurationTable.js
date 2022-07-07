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

const dataMock = [
  {
    creationDate: '01/03/22',
    lastModificationDate: '01/05/22',
    resourceType: 'resource1',
    source: 'source1',
    affectedResources: 'affectedResources1',
  },
  {
    creationDate: '01/03/30',
    lastModificationDate: '01/05/30',
    resourceType: 'resource2',
    source: 'source2',
    affectedResources: 'affectedResources2',
  },
];

export type Props = $ReadOnly<{|
  dataConfig?: any,
|}>;

const ConfigurationTable = (props: Props) => {
  const {dataConfig} = props;

  // console.log('tabla-> ', dataConfig);

  // const {queryCMVersion, queryResource, resourceSpecification} = dataConfig;

  console.log('CMV', dataConfig);

  const tableColumns = [
    {
      key: 'location',
      title: 'Location',
      render: row => row.resource.locatedIn ?? '',
      tooltip: row => row.resource.locatedIn ?? '',
    },
    {
      key: 'parameter',
      title: `${fbt('parameter', '')}`,
      render: row => row.lastModificationDate ?? '',
      tooltip: row => row.lastModificationDate ?? '',
    },
    {
      key: 'parameter1',
      title: `${fbt('parameter', '')}`,
      render: row => row.resourceType ?? '',
      tooltip: row => row.resourceType ?? '',
    },
    {
      key: 'parameter2',
      title: `${fbt('parameter', '')}`,
      render: row => row.source ?? '',
      tooltip: row => row.source ?? '',
    },
    {
      key: 'parameter3',
      title: `${fbt('parameter', '')}`,
      render: row => row.affectedResources,
      tooltip: row => row.affectedResources ?? '',
    },
  ];

  return (
    <Grid>
      <Table
        data={dataConfig}
        columns={[
          {
            key: 'resource',
            title: 'Resource',
            getSortingValue: row => row.id,
            render: row => (
              <Button variant="text" tooltip={row.resource.name ?? ''}>
                {row.resource.name}
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

export {ConfigurationTable};
