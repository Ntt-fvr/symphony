/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@symphony/design-system/components/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: symphony.palette.D500,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F7FC',
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    boxShadow: symphony.shadows.DP2,
    marginBottom: '20px',
  },
  container: {
    maxHeight: '100%',
  },
}));

const TYPES = {
  string: 'stringValue',
  int: 'intValue',
  float: 'floatValue',
  enum: 'stringValue',
};

const TableConfigurationParameters = (props: Props) => {
  const {
    ConfigurationParameters,
    setComparationCurrent,
    setCurrentVersion,
  } = props;
  const [infoTable, setInfoTable] = useState([]);
  const classes = useStyles();
  const itemsSelected = ConfigurationParameters?.parameters;
  const itemsCurrent = setCurrentVersion[0]?.parameters;

  useEffect(() => {
    let arrayCompare;
    let arrayTable = [];

    if (itemsCurrent?.length <= itemsSelected?.length) {
      arrayCompare = itemsSelected;
    } else {
      arrayCompare = itemsCurrent;
    }

    arrayCompare?.map(function (parameter, index) {
      const parameterCurrent = itemsCurrent.filter(
        item => item.id === parameter.id,
      );
      const parameterSelected = itemsSelected.filter(
        item => item.id === parameter.id,
      );
      const data = {
        name:
          parameterCurrent.length > 0
            ? parameterCurrent[0].parameterType.name
            : parameterSelected[0].parameterType.name,
        valueOne:
          parameterSelected.length > 0
            ? parameterSelected[0][
                TYPES[parameterSelected[0].parameterType.type]
              ]
            : '',
        valueTwo:
          parameterCurrent.length > 0
            ? parameterCurrent[0][TYPES[parameterCurrent[0].parameterType.type]]
            : '',
      };

      arrayTable.push(data);
    });

    setInfoTable(arrayTable);
  }, [setComparationCurrent ,itemsSelected]);

  return (
    <div className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Value 1</StyledTableCell>

              {setComparationCurrent && (
                <StyledTableCell>Value 2</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!setComparationCurrent
              ? itemsSelected?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{item?.parameterType?.name}</TableCell>
                    <TableCell>
                      {item[TYPES[item.parameterType.type]]}
                    </TableCell>
                  </StyledTableRow>
                ))
              : infoTable?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.valueOne}</TableCell>
                    <TableCell>{item?.valueTwo}</TableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export {TableConfigurationParameters};
