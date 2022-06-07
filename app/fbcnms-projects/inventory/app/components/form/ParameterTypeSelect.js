/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

// import type {PropertyType} from '../../common/PropertyType';
import type {ParameterType} from '../../common/ParameterType';

import ParameterTypesTableDispatcher from './context/property_types/ParameterTypesTableDispatcher';
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
type Props = $ReadOnly<{|
  parameterType: ParameterType,
  onParameterTypeChange?: (propertyType: ParameterType) => void,
|}>;

const ParameterTypeSelect = ({parameterType, onParameterTypeChange}: Props) => {
  const classes = useStyles();
  const {dispatch} = useContext(ParameterTypesTableDispatcher);
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

  const selectedValueIndex = useMemo(
    () =>
      options.findIndex(
        op =>
          op.key ===
          getOptionKey(
            parameterType.nodeType != null && parameterType.nodeType != ''
              ? parameterType.nodeType
              : parameterType.type,
          ),
      ),
    [options, parameterType],
  );

  return (
    <Select
      className={classes.input}
      options={options}
      selectedValue={
        selectedValueIndex > -1 ? options[selectedValueIndex].value : null
      }
      onChange={value => {
        onParameterTypeChange &&
          onParameterTypeChange({
            ...parameterType,
            type: value.kind,
            nodeType: value.nodeType,
          });
        dispatch({
          type: 'UPDATE_PARAMETER_TYPE_KIND',
          id: parameterType.id,
          kind: value.kind,
          nodeType: value.nodeType,
        });
      }}
    />
  );
};

export default ParameterTypeSelect;
