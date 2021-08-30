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
import {BLUE} from '@symphony/design-system/theme/symphony';

import IconButton from '@material-ui/core/IconButton'

import React, {useState} from 'react';

import AddButton from './common/AddButton';
import Switch from '@symphony/design-system/components/switch/Switch';
import {withStyles} from '@material-ui/core/styles';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import {DARK} from '@symphony/design-system/theme/symphony';
import Text from '@symphony/design-system/components/Text';

import {makeStyles} from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: 'white',
    color: BLUE.B600,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#EDF0F9',
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
  id: {},
  head: {},
  containerTitle: {
    height: '64px',
    padding: '0',
    margin: '0',
    borderBottom: '2px solid #F5F7FC',
  },
  insideCenter: {
    textAlign: 'center',
  },
  title: {
    marginLeft: '2rem',
  },
  plusButton: {
    marginLeft: '5rem',
  },
}));



type Props = $ReadOnly<{|
  dataTableTargets: any,
  create: () => void,
  edit: () => void,
|}>;

const handleClick = () => {
  console.log('delete row');
};

const KqiTableAssociatedTarget = (props: Props) => {
  const {dataTableTargets, create, edit} = props

  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Grid container alignItems="center" className={classes.containerTitle}>
          <Grid xs={10}>
            <Text className={classes.title} variant="h6" weight="bold">
              Associated targets
            </Text>
          </Grid>
          <Grid xs={2}>
            <AddButton
              onClick={create}
              className={classes.plusButton}
              textButton={'Add targert'}
              disabled={false}
            />
          </Grid>
        </Grid>
        <Table className={classes.head} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Enable</StyledTableCell>
              <StyledTableCell>Target name</StyledTableCell>
              <StyledTableCell>Comparator</StyledTableCell>
              <StyledTableCell className={classes.insideCenter}>
                Warning comparator
              </StyledTableCell>
              <StyledTableCell className={classes.insideCenter}>
                Periods
              </StyledTableCell>
              <StyledTableCell className={classes.insideCenter}>
                Allowed Variation
              </StyledTableCell>
              <StyledTableCell className={classes.insideCenter}>
                Active Hours
              </StyledTableCell>
              <StyledTableCell className={classes.insideCenter}>
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTableTargets.map((item, index) => (
                <StyledTableRow key={index}>
                  <TableCell>
                    <Switch
                      checked={checked}
                      title={''}
                      onChange={setChecked}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={edit} variant="text">
                      <Text
                        variant={'subtitle1'}
                        weight={'medium'}
                        color={'primary'}>
                        {item.name}
                      </Text>
                    </Button>
                  </TableCell>
                  <TableCell>{item.comparator}</TableCell>
                  <TableCell className={classes.insideCenter}>
                    {item.warningComparator}
                  </TableCell>
                  <TableCell className={classes.insideCenter}>
                    {item.frame}
                  </TableCell>
                  <TableCell className={classes.insideCenter}>
                    {item.alowedValidation}
                  </TableCell>
                  <TableCell className={classes.insideCenter}>
                    {item.activeHours}
                  </TableCell>
                  <TableCell className={classes.insideCenter}>
                    <IconButton>
                      <DeleteOutlinedIcon  
                        onClick={handleClick}
                        style={{ color: DARK.D300 }}
                      />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default KqiTableAssociatedTarget;
