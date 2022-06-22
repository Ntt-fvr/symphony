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
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DialogSelectName from './DialogSelectName';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import inventoryTheme from '../../common/theme';
import {EditIcon} from '@symphony/design-system/icons';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  rootTable: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
}));

type Props = $ReadOnly<{|actionTypes: [{}], resourceSpecification: string|}>;

const TableConfigureAction = (props: Props) => {
  const {actionTypes, resourceSpecification} = props;
  const [isDialogSelectDate, setIsDialogSelectDate] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedActionTemplate, setSelectedActionTemplate] = useState({});
  const classes = useStyles();

  const handleModalAddAction = () => {
    setIsDialogSelectDate(preventState => !preventState);
  };

  return (
    <div className={classes.container}>
      <Table component="div" className={classes.rootTable}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell style={{width: '40%'}} component="div">
              <fbt desc="">Action Name</fbt>
            </TableCell>
            <TableCell style={{width: '40%'}} component="div">
              <fbt desc="">Action Type</fbt>
            </TableCell>
            <TableCell style={{width: '5%'}} component="div">
              <fbt desc="">Edit</fbt>
            </TableCell>
            <TableCell style={{width: '5%'}} component="div">
              <fbt desc="">Delete</fbt>
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
                  value={item?.name}
                  className={classes.input}
                  disabled={true}
                />
              </FormField>
            </TableCell>
            <TableCell component="div" scope="row">
              <FormField>
                <TextInput
                  autoFocus={true}
                  placeholder="Type"
                  autoComplete="off"
                  value={item?.type}
                  className={classes.input}
                  disabled={true}
                />
              </FormField>
            </TableCell>
            <TableCell component="div">
              <FormAction>
                <IconButton
                  aria-label="Edit"
                  onClick={e => {
                    e.preventDefault();
                    setSelectedActionTemplate(item);
                    setIsEditMode(true);
                    handleModalAddAction();
                  }}>
                  <EditIcon color="primary" />
                </IconButton>
              </FormAction>
            </TableCell>

            <TableCell component="div">
              <FormAction>
                <IconButton aria-label="delete">
                  <DeleteOutlinedIcon color="primary" />
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
          onClick={() => {
            setIsEditMode(false);
            handleModalAddAction();
          }}
          leftIcon={PlusIcon}>
          <fbt desc="">Add Action</fbt>
        </Button>
      </FormAction>
      {isDialogSelectDate && (
        <DialogSelectName
          isDialogSelectDate={isDialogSelectDate}
          onClose={() => {
            setIsEditMode(false);
            handleModalAddAction();
          }}
          isEdit={isEditMode}
          actionDetails={selectedActionTemplate}
          resourceSpecification={resourceSpecification}
        />
      )}
    </div>
  );
};

export default TableConfigureAction;
