/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {AppContextType} from '@fbcnms/ui/context/AppContext';
import type {FeatureID} from '@fbcnms/types/features';
import type {PropertyCategoryType} from '../types';
import type {WithStyles} from '@material-ui/core';

import AppContext from '@fbcnms/ui/context/AppContext';
import Button from '@symphony/design-system/components/Button';
import React, {useState, useContext} from 'react';

import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@symphony/design-system/components/IconButton';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import {DeleteIcon, PlusIcon} from '@symphony/design-system/icons';
import {removeItem, setItem, updateItem} from '@fbcnms/util/arrays';
import {withStyles} from '@material-ui/core/styles';

// TODO: Change name Draggable & Droppable to avoid duplicated
import DraggableTableRow from './DraggableTableRow';
import DroppableTableBody from './DroppableTableBody';
import {reorder} from '../utils';
// TODO: Reorder function utily
// import {reorder} from '../draggable/DraggableUtils';

const styles = () => ({
  container: {
    maxWidth: '1366px',
    overflowX: 'auto',
  },
  root: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    width: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
  cell: {
    width: '100%',
    paddingLeft: '0px',
    width: 'unset',
  },
  selectMenu: {
    height: '14px',
  },
  actionsBar: {
    width: '20px',
  },
});

type Props = {|
  propertyTypes: Array<PropertyCategoryType>,
  onPropertiesChanged: (newProperties: Array<PropertyCategoryType>) => void,
  supportDelete?: boolean,
|} & WithStyles<typeof styles>;

class PropertyCategories extends React.Component<Props> {
  static contextType = AppContext;
  context: AppContextType;
  render() {
    const {classes} = this.props;
    const propertyTypes = this.props.propertyTypes;
    return (
      <div className={classes.container}>
        <Table component="div" className={classes.root}>
          <TableHead component="div">
            <TableRow component="div">
              <TableCell size="small" padding="none" component="div" />
              <TableCell component="div" className={classes.cell}>
                Name
              </TableCell>
              <TableCell component="div" />
            </TableRow>
          </TableHead>
          <DroppableTableBody onDragEnd={this._onDragEnd}>
            {propertyTypes.map((property, i) => (
              <DraggableTableRow id={property.id} index={i} key={property.id}>
                <TableCell className={classes.cell} component="div" scope="row">
                  <FormField>
                    <TextInput
                      autoFocus={true}
                      placeholder="Name"
                      className={classes.input}
                      value={property.name}
                      onChange={this._handleNameChange(i)}
                      onBlur={this._handleNameBlur(i)}
                    />
                  </FormField>
                </TableCell>

                <TableCell
                  className={classes.actionsBar}
                  align="right"
                  component="div">
                  <FormAction>
                    <IconButton
                      skin="primary"
                      onClick={this._onRemovePropertyClicked(i, property)}
                      disabled={
                        !this.props.supportDelete &&
                        !property.id.includes('@tmp')
                      }
                      icon={DeleteIcon}
                    />
                  </FormAction>
                </TableCell>
              </DraggableTableRow>
            ))}
          </DroppableTableBody>
        </Table>
        <FormAction>
          <Button
            variant="text"
            onClick={this._onAddProperty}
            leftIcon={PlusIcon}>
            Add Parameter
          </Button>
        </FormAction>
      </div>
    );
  }

  _handleNameChange = index => event => {
    // console.log('Change Name\n', index);
    // console.log('Change event\n', event.target.value);

    this.props.onPropertiesChanged(
      updateItem<PropertyCategoryType, 'name'>(
        this.props.propertyTypes,
        index,
        'name',
        // $FlowFixMe: need to figure out how to cast string to PropertyKind
        event.target.value,
      ),
    );
  };

  _handleNameBlur = index => event => {
    console.log('Change Name\n', index);
    console.log('Change event\n', event.target.value);
    const name = this.props.propertyTypes[index]?.name;
    const trimmedName = name && name.trim();
    console.log(name);
    console.log('Blur Name\n', index);

    if (name === trimmedName) {
      return;
    }

    this.props.onPropertiesChanged(
      updateItem<PropertyCategoryType, 'name'>(
        this.props.propertyTypes,
        index,
        'name',
        trimmedName,
      ),
    );
  };

  _onAddProperty = () => {
    console.log(this.props.propertyTypes);
    this.props.onPropertiesChanged([
      ...this.props.propertyTypes,
      this.getInitialProperty(),
    ]);
  };

  _onRemovePropertyClicked = (
    index,
    property: PropertyCategoryType,
  ) => _event => {
    if (property.id?.includes('@tmp')) {
      this.props.onPropertiesChanged(
        removeItem(this.props.propertyTypes, index),
      );
    } else {
      this.props.onPropertiesChanged(
        updateItem<PropertyCategoryType, 'isDeleted'>(
          this.props.propertyTypes,
          index,
          'isDeleted',
          true,
        ),
      );
    }
  };

  _onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.propertyTypes,
      result.source.index,
      result.destination.index,
    );

    const newItems = items.map((property, i) => ({...property, index: i}));
    this.props.onPropertiesChanged(newItems);
  };

  getInitialProperty(): PropertyCategoryType {
    return {
      id: `PropertyType@tmp-${this.props.propertyTypes.length}-${Date.now()}`,
      name: '',
      index: this.props.propertyTypes.length,
      numberOfProperties: 0,
    };
  }
}

// export const PropertyCategoriesTable = (props: Props) => {
//     const {classes, onPropertiesChanged, propertyTypes} = props;
//     const appContext = useContext(AppContext);

//     const handleNameChange = index => event => {
//     onPropertiesChanged(
//       updateItem<PropertyCategoryType, 'name'>(
//         propertyTypes,
//         index,
//         'name',
//         // $FlowFixMe: need to figure out how to cast string to PropertyKind
//         event.target.value,
//       ),
//     );
//   };

//     return (
//         <div>
//             algo
//         </div>
//     )
// }

export default withStyles(styles)(PropertyCategories);
