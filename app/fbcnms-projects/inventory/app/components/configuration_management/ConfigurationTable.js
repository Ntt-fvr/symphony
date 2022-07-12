/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
// import Button from '@symphony/design-system/components/Button';
import React, {useEffect, useState} from 'react';
import Table from '@symphony/design-system/components/Table/Table';
import {Grid} from '@material-ui/core';

export const PROJECTS_PAGE_SIZE = 15;
export type Props = $ReadOnly<{|
  dataConfig?: any,
  selectResourceType2?: any,
  dataColumn?: any,
|}>;

const ConfigurationTable = (props: Props) => {
  const {dataConfig, dataColumn} = props;

  // const test = dataConfig?.map(item =>
  //   item?.cmVersions[0]?.parameters?.map(item => {
  //     return {
  //       key: item?.id,
  //       title: item?.parameterType?.name,
  //       render: row => row?.parameterType?.stringValue ?? '',
  //       tooltip: row => row?.parameterType?.stringValue ?? '',
  //     };
  //   }),
  // );

  // const set = test?.filter(item => item).flat();
  // // const [resour, setResour] = useState(dataResources);

  // useEffect(() => {
  //   setResour([...resour, ...set]);
  // }, [stateChange]);

  return (
    <Grid>
      <Table
        data={dataConfig}
        columns={dataColumn}
        paginationSettings={{
          loadNext: onCompleted => {
            loadNext(PROJECTS_PAGE_SIZE, {
              onComplete: () => onCompleted && onCompleted(),
            });
          },
          pageSize: PROJECTS_PAGE_SIZE,
          totalRowsCount: 15,
        }}
      />
    </Grid>
  );
};

export {ConfigurationTable};
