/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {PropertyKind} from '../../mutations/__generated__/AddEquipmentPortTypeMutation.graphql';
import type {PropertyType} from '../../common/PropertyType';

import AppContext from '@fbcnms/ui/context/AppContext';
import PropertyTypesTableDispatcher from './context/property_types/PropertyTypesTableDispatcher';
import React, {useContext, useMemo} from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import inventoryTheme from '../../common/theme';
import {ParameterTypeLabels} from '../PropertyTypeLabels';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
}));

type PropertyTypeOption = {|
  kind: PropertyKind,
  nodeType: ?string,
|};

type Props = $ReadOnly<{|
  propertyType: PropertyType,
  onPropertyTypeChange?: (propertyType: PropertyType) => void,
|}>;

const ParameterTypeSelect = ({propertyType, onPropertyTypeChange}: Props) => {
  const classes = useStyles();
  const context = useContext(AppContext);
  const dispatch = useContext(PropertyTypesTableDispatcher);
  const getOptionKey = (type: string) =>
    `${ParameterTypeLabels[type].kind}_${type}`;

  const options = useMemo(
    () =>
      Object.keys(ParameterTypeLabels).map((type: string) => ({
        key: getOptionKey(type),
        value: {
          kind: ParameterTypeLabels[type].kind,
          nodeType: undefined,
        },
        label: ParameterTypeLabels[type].label,
      })),

    [],
  );
  console.log('OPT-> ', options);

  const selectedValueIndex = useMemo(
    () =>
      options.findIndex(
        op =>
          op.key ===
          getOptionKey(
            propertyType.nodeType != null && propertyType.nodeType != ''
              ? propertyType.nodeType
              : propertyType.type,
          ),
      ),
    [options, propertyType],
  );
  const opt = value => {
    console.log('value->', value);
    dispatch({
      type: 'UPDATE_PROPERTY_TYPE_KIND',
      id: propertyType.id,
      kind: value.kind,
      nodeType: value.nodeType,
    });
  };

  return (
    <Select
      className={classes.input}
      options={options}
      selectedValue={
        selectedValueIndex > -1 ? options[selectedValueIndex].value : null
      }
      onChange={value => opt(value)}
      // onChange={value => {
      //   console.log(value);
      //   // onPropertyTypeChange &&
      //   //   onPropertyTypeChange({
      //   //     ...propertyType,
      //   //     type: value.kind,
      //   //     nodeType: value.nodeType,
      //   //   });
      //   dispatch({
      //     type: 'UPDATE_PROPERTY_TYPE_KIND',
      //     id: propertyType.id,
      //     kind: value.kind,
      //     nodeType: value.nodeType,
      //   });
      // }}
    />
  );
};

export default ParameterTypeSelect;
