/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {Property} from '../../../common/Property';
import type {PropertyType} from '../../../common/PropertyType';

import FormContext from '../../../common/FormContext';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import classNames from 'classnames';
import update from 'immutability-helper';
import {getPropertyValue} from '../../../common/Property';
import {getValidPropertyValuesFromParent} from './PropertyComboHelpers';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  input: {
    width: '300px',
    display: 'flex',
  },
  container: {
    display: 'flex',
    width: '250px',
  },
  toValue: {
    marginLeft: '6px',
  },
  selectMenu: {
    height: '32px',
    padding: '6px 8px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
}));

type Props = $ReadOnly<{|
  onChange: () => void,
  property: Property,
  className: any,
  required: boolean,
  parentProperty: Property,
|}>;

const EnumPropertyComboSelectValueInput = <T: Property | PropertyType>({
  onChange,
  property,
  className,
  required,
  parentProperty,
  ...restButtonProps
}: Props<T>) => {
  const classes = useStyles();
  const options = parentProperty
    ? getValidPropertyValuesFromParent(parentProperty, property)
    : property.propertyType.propertyTypeValues;
  const optionsArr = Array.isArray(options) ? options : [];

  const getPropertySelected = name =>
    optionsArr.find(value => value.name === name);

  return (
    <FormContext.Consumer>
      {form => {
        const input = (
          <Select
            className={classNames(classes.input, className)}
            options={optionsArr.map(stringVal => ({
              key: stringVal.id,
              value: stringVal,
              label: stringVal.name,
            }))}
            selectedValue={
              property && property.stringValue
                ? getPropertySelected(property.stringValue)
                : ''
            }
            {...restButtonProps}
            onChange={value => {
              onChange(
                update(property, {
                  stringValue: {
                    $set: value.name,
                  },
                }),
                value,
              );
            }}
          />
        );
        const propertyType = !!property.propertyType
          ? property.propertyType
          : property;

        const errorText = form.alerts.error.check({
          fieldId: propertyType.name,
          fieldDisplayName: propertyType.name,
          value: getPropertyValue(property),
          required,
        });
        return (
          <FormField
            required={required}
            hasError={!!errorText}
            errorText={errorText}
            label={propertyType.name}>
            {input}
          </FormField>
        );
      }}
    </FormContext.Consumer>
  );
};

export default EnumPropertyComboSelectValueInput;
