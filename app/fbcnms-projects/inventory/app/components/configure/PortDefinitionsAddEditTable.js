/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {EquipmentPortType} from '../../common/EquipmentType';
import type {PortDefinitionsAddEditTable_portDefinitions} from './__generated__/PortDefinitionsAddEditTable_portDefinitions.graphql';

import Button from '@symphony/design-system/components/Button';
import CardSection from '../CardSection';
import CircularProgress from '@material-ui/core/CircularProgress';
import DraggableTableRow from '../draggable/DraggableTableRow';
import DroppableTableBody from '../draggable/DroppableTableBody';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import RelayEnvironment from '../../common/RelayEnvironment.js';
import Select from '@symphony/design-system/components/Select/Select';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import inventoryTheme from '../../common/theme';
import update from 'immutability-helper';
import {DeleteIcon, PlusIcon} from '@symphony/design-system/icons';
import {fetchQuery, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {reorder} from '../draggable/DraggableUtils';
import {sortLexicographically} from '@symphony/design-system/utils/displayUtils';
import {useEffect, useState} from 'react';

const useStyles = makeStyles(_theme => ({
  table: inventoryTheme.table,
  input: inventoryTheme.textField,
  cell: {
    paddingLeft: '0px',
  },
  addButton: {
    marginBottom: '12px',
  },
  loadingContainer: inventoryTheme.loadingContainer,
}));

graphql`
  fragment PortDefinitionsAddEditTable_portDefinitions on EquipmentPortDefinition
    @relay(plural: true) {
    id
    name
    index
    visibleLabel
    portType {
      id
      name
    }
  }
`;

const equipmentPortTypesQuery = graphql`
  query PortDefinitionsAddEditTable__equipmentPortTypesQuery {
    equipmentPortTypes(first: 500)
      @connection(key: "PortDefinitionsTable_equipmentPortTypes") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  portDefinitions: PortDefinitionsAddEditTable_portDefinitions,
  onPortDefinitionsChanged?: ?(
    newPorts: PortDefinitionsAddEditTable_portDefinitions,
  ) => void,
|}>;

const PortDefinitionsAddEditTable = (props: Props) => {
  const [equipmentPortTypes, setEquipmentPortTypes] = useState(null);
  const classes = useStyles();

  const getEquipmentPortTypes = async (): Promise<Array<EquipmentPortType>> => {
    const response = await fetchQuery(
      RelayEnvironment,
      equipmentPortTypesQuery,
      {},
    );
    return response.equipmentPortTypes.edges
      .map(edge => edge.node)
      .filter(Boolean)
      .sort((portTypeA, portTypeB) =>
        sortLexicographically(portTypeA.name, portTypeB.name),
      );
  };

  useEffect(() => {
    getEquipmentPortTypes().then(_equipmentPortTypes => {
      setEquipmentPortTypes(_equipmentPortTypes);
    });
  }, []);

  const getEditablePortPropertyCell = (portIndex, value, name, placeholder) => {
    return (
      <FormField>
        <TextInput
          placeholder={placeholder}
          variant="outlined"
          className={classes.input}
          value={value ? value : ''}
          onChange={({target}) =>
            onPortPropertyChanged(name, target.value, portIndex)
          }
        />
      </FormField>
    );
  };

  const onAddPort = () => {
    const {onPortDefinitionsChanged} = props;
    onPortDefinitionsChanged &&
      onPortDefinitionsChanged(
        update(props.portDefinitions, {
          $push: [getEditingPort()],
        }),
      );
  };

  const onPortPropertyChanged = (propertyName, newValue, portIndex) => {
    const {onPortDefinitionsChanged} = props;
    onPortDefinitionsChanged &&
      onPortDefinitionsChanged(
        update(props.portDefinitions, {
          // $FlowFixMe Set state for each field
          [portIndex]: {[propertyName]: {$set: newValue}},
        }),
      );
  };

  const onRemovePortClicked = portIndex => {
    const {onPortDefinitionsChanged} = props;
    onPortDefinitionsChanged &&
      onPortDefinitionsChanged(
        update(props.portDefinitions, {$splice: [[portIndex, 1]]}),
      );
  };

  const _onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      props.portDefinitions,
      result.source.index,
      result.destination.index,
    );

    const newItems = [];
    items.map((portDefinition, i) => {
      newItems.push(update(portDefinition, {index: {$set: i}}));
    });

    props.onPortDefinitionsChanged && props.onPortDefinitionsChanged(newItems);
  };

  const getEditingPort = (): $Shape<
    $ElementType<PortDefinitionsAddEditTable_portDefinitions, number>,
  > => {
    const index = props.portDefinitions.length;
    return {
      id: `PortDefinition@tmp-${index}-${Date.now()}`,
      name: '',
      index: index,
      visibleLabel: '',
      portType: null,
    };
  };

  const {portDefinitions} = props;
  if (portDefinitions.length === 0) {
    return null;
  }
  if (!equipmentPortTypes) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size={50} />
      </div>
    );
  }
  return (
    <CardSection title="Ports">
      <Table component="div" className={classes.table}>
        <TableHead component="div">
          <TableRow component="div">
            <TableCell component="div" size="small" padding="checkbox" />
            <TableCell component="div" className={classes.cell}>
              Name
            </TableCell>
            <TableCell component="div" className={classes.cell}>
              Visible Label
            </TableCell>
            <TableCell component="div" className={classes.cell}>
              Type
            </TableCell>
            <TableCell component="div" />
          </TableRow>
        </TableHead>
        <DroppableTableBody onDragEnd={_onDragEnd}>
          {portDefinitions.map((portDefinition, i) => (
            <DraggableTableRow key={i} id={portDefinition.id} index={i}>
              <TableCell className={classes.cell} component="div" scope="row">
                {getEditablePortPropertyCell(
                  i,
                  portDefinition.name,
                  'name',
                  'Name',
                )}
              </TableCell>
              <TableCell component="div" className={classes.cell} align="left">
                {getEditablePortPropertyCell(
                  i,
                  portDefinition.visibleLabel,
                  'visibleLabel',
                  'Visible Label',
                )}
              </TableCell>
              <TableCell className={classes.cell} component="div" scope="row">
                {portDefinition.id.includes('@tmp') ? (
                  <FormField>
                    <Select
                      className={classes.input}
                      options={equipmentPortTypes.map(type => ({
                        key: type.id,
                        value: type.id,
                        label: type.name,
                      }))}
                      selectedValue={portDefinition.portType?.id || ''}
                      onChange={value =>
                        onPortPropertyChanged('portType', {id: value}, i)
                      }
                    />
                  </FormField>
                ) : (
                  portDefinition.portType?.name
                )}
              </TableCell>
              <TableCell component="div" align="right">
                <FormAction>
                  <IconButton
                    onClick={onRemovePortClicked.bind(this, i)}
                    disabled={!portDefinition.id.includes('@tmp')}
                    icon={DeleteIcon}
                  />
                </FormAction>
              </TableCell>
            </DraggableTableRow>
          ))}
        </DroppableTableBody>
      </Table>
      <Button
        className={classes.addButton}
        variant="text"
        leftIcon={PlusIcon}
        onClick={onAddPort}>
        Add Port
      </Button>
    </CardSection>
  );
};

export default PortDefinitionsAddEditTable;
