/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';

// DESIGN SYSTEM //
import type {RemoveRuleMutationVariables} from '../../mutations/__generated__/RemoveRuleMutation.graphql';

import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';
import Paper from '@material-ui/core/Paper';
import RemoveRuleMutation from '../../mutations/RemoveRuleMutation';
import Switch from './common/Switch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px 0 10px 0',
  },
  table: {
    minWidth: '100%',
  },
  title: {
    color: DARK.D300,
  },
  delete: {
    color: DARK.D300,
  },
}));

type Rule = {
  id: string,
  name: string,
  ruleType: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  rule: Array<Rule>,
  editRule: void => void,
|}>;

export default function DenseTable(props: Props) {
  const {rule, editRule} = props;
  const classes = useStyles();

  const handleRemove = id => {
    const variables: RemoveRuleMutationVariables = {
      id: id,
    };
    RemoveRuleMutation(variables);
  };

  return (
    <Paper variant="outlined">
      <TableContainer className={classes.root}>
        <Table className={classes.table} size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>Enable</TableCell>
              <TableCell className={classes.title}>Rule Name</TableCell>
              <TableCell className={classes.title}>ID</TableCell>
              <TableCell className={classes.title}>Type of Rule</TableCell>
              <TableCell className={classes.title}>Delete</TableCell>
              <TableCell className={classes.title}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rule.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Switch status={true} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ruleType.name}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteOutlinedIcon
                      style={{color: DARK.D300}}
                      onClick={() => {
                        handleRemove(row.id);
                      }}
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    icon={EditIcon}
                    onClick={() => {
                      editRule();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
