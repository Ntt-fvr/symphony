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
// import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DialogSelectName from './DialogSelectName';
// import DraggableTableRow from '../draggable/DraggableTableRow';
// import DroppableTableBody from '../draggable/DroppableTableBody';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
// import ParameterTypeSelect from './ParameterTypeSelect';
// import ParameterTypesTableDispatcher from './context/property_types/ParameterTypesTableDispatcher';
// import ParameterValueInput from './ParameterValueInput';
// import SubjectIcon from '@material-ui/icons/Subject';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {PlusIcon} from '@symphony/design-system/icons';
// import {isTempId} from '../../common/EntUtils';
import {makeStyles} from '@material-ui/styles';
// import {sortByIndex} from '../draggable/DraggableUtils';
import {useState} from 'react';

// import EnumPropertyValueInput from './EnumPropertyValueInput';

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

type Props = $ReadOnly<{||}>;
const actionTypes = [{}];

const TableConfigureAction = (props: Props) => {
  const {} = props;
  const [isDialogSelectDate, setIsDialogSelectDate] = useState(false);
  const classes = useStyles();
  // const dispatch = useContext(ParameterTypesTableDispatcher);

  const handleModalAddAction = () => {
    setIsDialogSelectDate(preventState => !preventState);
  };

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.root}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell style={{width: '40%'}} component="div">
              <fbt desc="">Name</fbt>
            </TableCell>
            <TableCell
              style={{width: '5%'}}
              // className={classes.checkbox}
              component="div">
              <fbt desc="">Delete</fbt>
            </TableCell>
            <TableCell
              style={{width: '5%'}}
              // className={classes.checkbox}
              component="div">
              <fbt desc="">Edit</fbt>
            </TableCell>
            <TableCell style={{width: '50%'}} />
          </TableRow>
        </TableHead>

        {actionTypes?.map((item, i) => (
          <TableRow component="div" key={i}>
            <TableCell component="div" scope="row">
              <FormField>
                <TextInput
                  autoFocus={true}
                  placeholder="Name"
                  autoComplete="off"
                  className={classes.input}
                />
              </FormField>
            </TableCell>

            <TableCell
              // className={classes.checkbox}
              component="div">
              <FormAction>
                <IconButton aria-label="delete">
                  <DeleteOutlinedIcon color="primary" />
                </IconButton>
              </FormAction>
            </TableCell>

            <TableCell
              // className={classes.checkbox}
              component="div">
              <FormAction>
                <IconButton aria-label="delete">
                  <EditIcon color="primary" />
                </IconButton>
              </FormAction>
            </TableCell>

            <TableCell component="div" scope="row" />
          </TableRow>
        ))}
      </Table>
      <FormAction>
        <Button
          variant="text"
          onClick={handleModalAddAction}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Action</fbt>
        </Button>
      </FormAction>
      {isDialogSelectDate && (
        <DialogSelectName
          isDialogSelectDate={isDialogSelectDate}
          onClose={handleModalAddAction}
        />
      )}
    </div>
  );
};

export default TableConfigureAction;
