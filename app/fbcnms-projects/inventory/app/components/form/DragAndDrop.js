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
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DialogMapping from '../configure/DialogMapping';
import DragIndicatorIcon from '@fbcnms/ui/icons/DragIndicatorIcon';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {MenuItem} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

import EnumPropertyValueInput from './EnumPropertyValueInput';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
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
  formField: {
    width: '100%',
    padding: '0 12px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  selectField: {
    width: '100%',
  },
  checkbox: {
    textAlign: 'center',
    '& div': {
      justifyContent: 'center',
    },
  },
  mapping: {
    cursor: 'pointer',
    color: '#8895AD',
  },
  dragIndicatorIcon: {
    '&&': {
      fontSize: '15px',
    },
    cursor: '-webkit-grabbing',
    cursor: 'grabbing',
  },
}));

type Props = $ReadOnly<{|
  children: React.Node,
  onDelete?: () => void,
|}>;

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragAndDrop = (props: Props) => {
  const {children} = props;
  const [parameters, setParameters] = useState([]);
  // const [checked, setChecked] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  // const [changeInput, setChangeInput] = useState('TXT');
  const classes = useStyles();

  /*const borrarEstaConst = () => {
    const handleChecked = () => {
      setChecked(!checked);
    };
    const handleDelete = (i, ID) => {
      i, ID;
    };
    const handleModal = () => {
      setOpenModal(preventState => !preventState);
    };
    const nameChange = ({target}) => {
      target.value;
    };
    const chip = () => {};
    const handleOption = mc => {
      mc === 'MC' && setChangeInput('MC');
      mc === 'TXT' && setChangeInput('TXT');
    };
  };*/
  const handleAddParameters = () => {
    const id = Math.floor(Math.random() * 101);
    setParameters([...parameters, {id}]);
  };

  return (
    <div className={classes.container}>
      {/* <Table component="div" className={classes.root}> */}
      <DragDropContext
        onDragEnd={result => {
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
        }}>
        <Droppable droppableId={'1'}>
          {droppableProvided => (
            <TableBody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}>
              {parameters.map((item, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i}>
                  {draggableProvided => (
                    <TableRow
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}>
                      <TableCell
                        style={{minWidth: '35px', width: '35px'}}
                        size="small"
                        padding="none"
                        component="div">
                        <div {...draggableProvided.dragHandleProps}>
                          <DragIndicatorIcon
                            className={classes.dragIndicatorIcon}
                          />
                        </div>
                      </TableCell>
                      {children}
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </DragDropContext>
      {/* </Table> */}
      <FormAction>
        <Button
          variant="text"
          onClick={handleAddParameters}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Property</fbt>
        </Button>
      </FormAction>
      {/* {openModal && <DialogMapping name={'Mapping'} onClose={handleModal} />} */}
    </div>
  );
};

export default DragAndDrop;
