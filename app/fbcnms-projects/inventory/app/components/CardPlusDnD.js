/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DraggableTableRow from './draggable/DraggableTableRow';
import DroppableTableBody from './draggable/DroppableTableBody';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../common/theme';
import {Grid} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  root: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
  checkbox: {
    textAlign: 'center',
    '& div': {
      justifyContent: 'center',
    },
  },
}));

type Props = $ReadOnly<{||}>;

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const CardPlusDnD = (props: Props) => {
  const {} = props;
  const [parameters, setParameters] = useState([]);

  const classes = useStyles();

  const handleDelete = (i, ID) => {
    i, ID;
  };

  const handleAddParameters = () => {
    const id = Math.floor(Math.random() * 101);
    setParameters([...parameters, {id}]);
  };
  const nameChange = ({target}) => {
    target.value;
  };

  const onDragEnd = result => {
    {
      const {source, destination} = result;
      if (!destination) {
        return;
      }
      if (
        source.index === destination.index &&
        source.droppableId === destination.droppableId
      ) {
        return;
      }
      setParameters(parameters =>
        reorder(parameters, source.index, destination.index),
      );
    }
  };

  return (
    <div className={classes.container}>
      <Card margins="none">
        <CardHeader className={classes.cardHeader}>
          Parameters to changed
        </CardHeader>
        <Grid
          container
          direction="column"
          style={{padding: '0 49px 35px 49px'}}>
          <Table component="div" className={classes.root}>
            <TableHead component="div">
              <TableRow component="div">
                <TableCell component="div" />
                <TableCell component="div">
                  <fbt desc="">Parameter name</fbt>
                </TableCell>
                <TableCell component="div">
                  <fbt desc="">Current value</fbt>
                </TableCell>
                <TableCell component="div">
                  <fbt desc="">New Value</fbt>
                </TableCell>
                <TableCell className={classes.checkbox} component="div">
                  <fbt desc="">Delete</fbt>
                </TableCell>
              </TableRow>
            </TableHead>
            <DroppableTableBody onDragEnd={onDragEnd}>
              {parameters.map((item, i) => (
                <DraggableTableRow
                  id={item.id}
                  index={i}
                  key={`${i}.${item.id}`}>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <TextInput
                        autoFocus={true}
                        placeholder="Parameter name"
                        autoComplete="off"
                        value={item.id}
                        className={classes.input}
                        onChange={nameChange}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <TextInput
                        autoFocus={true}
                        placeholder="Current value"
                        autoComplete="off"
                        value={item.id}
                        className={classes.input}
                        onChange={nameChange}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <TextInput
                        autoFocus={true}
                        placeholder="New Value"
                        autoComplete="off"
                        value={item.id}
                        className={classes.input}
                        onChange={nameChange}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell className={classes.checkbox} component="div">
                    <FormAction>
                      <IconButton aria-label="delete">
                        <DeleteOutlinedIcon
                          color="primary"
                          onClick={() => handleDelete()}
                        />
                      </IconButton>
                    </FormAction>
                  </TableCell>
                </DraggableTableRow>
              ))}
            </DroppableTableBody>
          </Table>
          <FormAction>
            <Button
              variant="text"
              onClick={handleAddParameters}
              leftIcon={PlusIcon}>
              <fbt desc="">Add Property</fbt>
            </Button>
          </FormAction>
        </Grid>
      </Card>
    </div>
  );
};

export default CardPlusDnD;
