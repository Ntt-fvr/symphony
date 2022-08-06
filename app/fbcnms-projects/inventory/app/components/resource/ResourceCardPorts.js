/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useCallback} from 'react';

import Button from '@symphony/design-system/components/Button';
import PopoverMenu from '@symphony/design-system/components/Select/PopoverMenu';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableCore from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import fbt from 'fbt';
import {ThreeDotsVerticalIcon} from '@symphony/design-system/icons';
import {formatMultiSelectValue} from '@symphony/design-system/utils/displayUtils';
import {makeStyles} from '@material-ui/styles';
import {useStatusValues} from '../../common/FilterTypes';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  rootTable: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  rootHead: {
    display: 'flex',
  },
  rootRow: {
    display: 'flex',
  },
  rootCell: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  textEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  menu: {
    width: 'auto',
    whiteSpace: 'nowrap',
  },
  menuButton: {
    minWidth: 'unset',
    paddingLeft: 0,
    paddingRight: 0,
  },
  icon: {
    padding: '4px',
    backgroundColor: 'white',
    borderRadius: '100%',
    cursor: 'pointer',
  },
  disabled: {
    opacity: 0.5,
    cursor: 'default',
  },
}));

const options = [
  {
    onClick: () => alert('Add Phisical Link'),
    caption: fbt(
      'Add Phisical Link',
      'Caption for menu option for add Add Phisical Link',
    ),
  },
  {
    onClick: () => alert('Add Crossconnectio'),
    caption: fbt(
      'Add Crossconnection',
      'Caption for menu option for add Add Crossconnection',
    ),
  },
  {
    onClick: () => alert('Add Vlan'),
    caption: fbt('Add Vlan', 'Caption for menu option for add VLAN'),
  },
];

const data = [
  {
    id: '395136991232',
    name: 'Test',
    description: 'Test',
    owner: {
      id: '382252089344',
      email: 'a@b.c',
    },
    creationDate: '2022-05-31T15:21:45Z',
    installDate: null,
    status: 'PLANNED',
    assignedTo: null,
    location: {
      id: '219043332096',
      name: 'Test',
    },
    workOrderType: {
      id: '408021893120',
      name: 'WO Test',
    },
    project: null,
    closeDate: null,
    priority: 'NONE',
    resource: {
      portName: '23124324_OLT_Port_pi',
      portExternalID: '23124324',
      portType: 'OLT_Port_pi',
      parentResource: 'Olt_Card_000001',
      administrativeStatus: 'Activated',
      operationalStatus: 'Working',
      usageStatus: 'Available',
      physicallyLinkedType: 'Bras_port',
      physicallyLinked: '42987432897',
      crossPortType: 'ODFxt_port',
      crossPort: '2343244',
      svlan: 'View List',
    },
  },
  {
    id: '395136991233',
    name: 'Test 2',
    description: 'Test 2',
    owner: {
      id: '382252089344',
      email: 'a@b.c',
    },
    creationDate: '2022-05-31T15:21:45Z',
    installDate: null,
    status: 'PLANNED',
    assignedTo: null,
    location: {
      id: '219043332096',
      name: 'Test',
    },
    workOrderType: {
      id: '408021893120',
      name: 'WO Test',
    },
    project: null,
    closeDate: null,
    priority: 'NONE',
    resource: {
      portName: '23124324_OLT_Port_pi',
      portExternalID: '23124324',
      portType: 'OLT_Port_pi',
      parentResource: 'Olt_Card_000001',
      administrativeStatus: 'Activated',
      operationalStatus: 'Working',
      usageStatus: 'Available',
      physicallyLinkedType: 'Bras_port',
      physicallyLinked: '42987432897',
      crossPortType: 'ODFxt_port',
      crossPort: '2343244',
      svlan: 'View List',
    },
  },
  {
    id: '395136991234',
    name: 'Test 3',
    description: 'Test 3',
    owner: {
      id: '382252089344',
      email: 'a@b.c',
    },
    creationDate: '2022-05-31T15:21:45Z',
    installDate: null,
    status: 'PLANNED',
    assignedTo: null,
    location: {
      id: '219043332096',
      name: 'Test',
    },
    workOrderType: {
      id: '408021893120',
      name: 'WO Test',
    },
    project: null,
    closeDate: null,
    priority: 'NONE',
    resource: {
      portName: '23124324_OLT_Port_pi',
      portExternalID: '23124324',
      portType: 'OLT_Port_pi',
      parentResource: 'Olt_Card_000001',
      administrativeStatus: 'Activated',
      operationalStatus: 'Working',
      usageStatus: 'Available',
      physicallyLinkedType: 'Bras_port',
      physicallyLinked: '42987432897',
      crossPortType: 'ODFxt_port',
      crossPort: '2343244',
      svlan: 'View List',
    },
  },
];
const CardPorts = () => {
  const classes = useStyles();
  const {statusValues} = useStatusValues();
  const handleOptionClick = useCallback(
    optIndex => {
      options[optIndex].onClick();
    },
    [options],
  );

  const menuOptions = options.map((opt, optIndex) => ({
    key: optIndex + '',
    label: opt.caption,
    value: optIndex,
  }));

  const DotButton = () => {
    return (
      <PopoverMenu
        variant="text"
        menuDockRight={true}
        options={menuOptions}
        onChange={handleOptionClick}>
        <ThreeDotsVerticalIcon />
      </PopoverMenu>
    );
  };

  const tableColumns = [
    {
      key: 'action',
      title: '',
      render: () => <DotButton />,
      width: 20,
    },
    {
      key: 'portName',
      title: 'Port Name',
      getSortingValue: row => row.resource?.portName,
      render: row => (
        <Button
          variant="text"
          onClick={() => alert('Ir a :' + row.id)}
          tooltip={row.resource?.portName ?? ''}>
          {row.resource?.portName}
        </Button>
      ),
      width: 80,
    },
    {
      key: 'portExternalID',
      title: `${fbt('Port External ID', '')}`,
      render: row => row.resource?.portExternalID ?? '',
      tooltip: row => row.resource?.portExternalID ?? '',
      width: 120,
    },
    {
      key: 'portType',
      title: 'Port Type',
      render: row =>
        row.resource ? (
          <Button
            variant="text"
            onClick={() => alert('Ir a :' + row.id)}
            tooltip={row.resource?.portType ?? ''}>
            {row.resource?.portType ?? ''}
          </Button>
        ) : null,
      width: 80,
    },
    {
      key: 'parentResource',
      title: 'Parent Resource',
      render: row => row.resource?.parentResource ?? '',
      tooltip: row => row.resource?.parentResource ?? '',
      width: 120,
    },
    {
      key: 'administrativeStatus',
      title: 'Administrative Status',
      render: row =>
        formatMultiSelectValue(
          statusValues.map(({value, label}) => ({value, label})),
          row.status,
        ) ?? '',
      tooltip: row =>
        formatMultiSelectValue(
          statusValues.map(({value, label}) => ({value, label})),
          row.status,
        ) ?? '',
      width: 100,
    },
    {
      key: 'operationalStatus',
      title: 'Operational Status',
      render: row =>
        formatMultiSelectValue(
          statusValues.map(({value, label}) => ({value, label})),
          row.status,
        ) ?? '',
      width: 100,
    },
    {
      key: 'usageStatus',
      title: 'Usage Status',
      render: row =>
        formatMultiSelectValue(
          statusValues.map(({value, label}) => ({value, label})),
          row.status,
        ) ?? '',
      width: 100,
    },
    {
      key: 'physicallyLinkedType',
      title: 'Physically linked resource type',
      render: row =>
        row.resource ? (
          <Button
            variant="text"
            onClick={() => alert('Ir a :' + row.id)}
            tooltip={row.resource?.physicallyLinkedType ?? ''}>
            {row.resource?.physicallyLinkedType ?? ''}
          </Button>
        ) : null,
      width: 120,
    },
    {
      key: 'physicallyLinked',
      title: 'Physically linked resource',
      render: row => row.resource?.physicallyLinked ?? '',
      width: 120,
    },
    {
      key: 'crossPortType',
      title: 'Crossconnected port type',
      render: row => row.resource?.crossPortType ?? '',
      width: 120,
    },
    {
      key: 'crossPort',
      title: 'Crossconnected Port',
      render: row =>
        row.resource ? (
          <Button
            variant="text"
            onClick={() => alert('Ir a :' + row.id)}
            tooltip={row.resource?.crossPort ?? ''}>
            {row.resource?.crossPort ?? ''}
          </Button>
        ) : null,
      width: 120,
    },
    {
      key: 'svlan',
      title: 'S-vlan',
      render: row =>
        row.resource ? (
          <Button
            variant="text"
            onClick={() => alert('Ir a :' + row.id)}
            tooltip={row.resource?.svlan ?? ''}>
            {row.resource?.svlan ?? ''}
          </Button>
        ) : null,
      width: 100,
    },
  ];

  return (
    <div className={classes.container}>
      <TableCore component="div" className={classes.rootTable}>
        <TableHead component="div" className={classes.rootHead}>
          <TableRow component="div" className={classes.rootRow}>
            {tableColumns.map((col, colIndex) => {
              return (
                <TableCell
                  key={colIndex}
                  component="div"
                  className={classes.rootCell}>
                  <Typography
                    color="primary"
                    style={{width: `${col.width}px`}}
                    component="div">
                    {col.title}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody component="div">
          {data.map((d, rowIndex) => {
            const rowId = d.id ?? rowIndex;
            return (
              <TableRow key={rowId} component="div" className={classes.rootRow}>
                {tableColumns.map((col, colIndex) => {
                  const renderCol = col.render(d);
                  return (
                    <TableCell key={colIndex} component="div">
                      <Typography
                        className={classes.textEllipsis}
                        style={{width: `${col.width}px`}}
                        component="div">
                        {renderCol}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableCore>
    </div>
  );
};
export default CardPorts;
