/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FocusEvent} from '@symphony/design-system/components/Input/TextInput';
import type {Property} from '../../common/Property';
import type {PropertyType} from '../../common/PropertyType';
import type {WithStyles} from '@material-ui/core';

import * as React from 'react';
import EnumPropertySelectValueInput from './EnumPropertySelectValueInput';
import EnumPropertyValueInput from './EnumPropertyValueInput';
import FormContext from '../../common/FormContext';
import FormField from '@symphony/design-system/components/FormField/FormField';
import GPSPropertyValueInput from './GPSPropertyValueInput';
import NodePropertyInput from '../NodePropertyInput';
import RangePropertyValueInput from './RangePropertyValueInput';
import Select from '@symphony/design-system/components/Select/Select';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import classNames from 'classnames';
import update from 'immutability-helper';
import {getPropertyValue} from '../../common/Property';
import {withStyles} from '@material-ui/core/styles';

type Props<T: Property | PropertyType> = {|
  autoFocus: boolean,
  className: string,
  inputClassName?: ?string,
  label: ?string,
  inputType: 'Property' | 'PropertyType',
  property: T,
  required: boolean,
  disabled: boolean,
  onChange: T => void,
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: SyntheticKeyboardEvent<>) => void,
  headlineVariant?: 'headline' | 'form',
  fullWidth?: boolean,
  showPropertyCombo?: boolean,
  isDependentProperty?: boolean,
|} & WithStyles<typeof styles>;

const styles = {
  input: {
    width: (props: Props<Property | PropertyType>): string =>
      props.fullWidth ? 'auto' : '300px',
    display: 'flex',
    '&&': {
      margin: '0px',
    },
  },
  container: {
    display: 'flex',
    width: '280px',
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
};

class PropertyValueInput<T: Property | PropertyType> extends React.Component<
  Props<T>,
> {
  static defaultProps = {
    required: false,
    autoFocus: false,
    disabled: false,
    headlineVariant: 'headline',
    fullWidth: false,
  };

  getTextInput = (showDisabled): React.Node => {
    const {
      autoFocus,
      classes,
      onChange,
      onBlur,
      required,
      className,
      inputType,
      headlineVariant,
      onKeyDown,
      showPropertyCombo = false,
      isDependentProperty = false,
    } = this.props;

    const disabled = this.props.disabled || showDisabled;
    const property = this.props.property;
    const propertyType = !!property.propertyType
      ? property.propertyType
      : property;
    const label = headlineVariant === 'form' ? null : this.props.label;
    const propInputType = propertyType.type;
    switch (propInputType) {
      case 'enum': {
        return inputType != 'Property' ? (
          <EnumPropertyValueInput
            property={property}
            onChange={onChange}
            disabled={disabled}
            showPropertyCombo={showPropertyCombo}
            isDependentProperty={isDependentProperty}
          />
        ) : (
          <EnumPropertySelectValueInput
            className={classNames(classes.input, className)}
            property={property}
            onChange={onChange}
            disabled={disabled}
          />
        );
      }
      case 'date':
      case 'datetime_local':
      case 'email':
      case 'string':
        const coercedInputType:
          | 'date'
          | 'datetime_local'
          | 'email'
          | 'string' = propInputType;
        return (
          <TextInput
            autoFocus={autoFocus}
            disabled={disabled}
            className={classNames(classes.input, className)}
            value={property.stringValue ?? ''}
            onBlur={e => onBlur && onBlur(e)}
            onEnterPressed={e => onKeyDown && onKeyDown(e)}
            onChange={event =>
              onChange(
                update(property, {
                  stringValue: {$set: event.target.value},
                }),
              )
            }
            // as we cant use hypens on server side types,
            // replacing with underscores
            // e.g. datetime_local -> datetime-local.
            type={coercedInputType.replace('_', '-')}
          />
        );
      case 'int':
        return (
          <TextInput
            autoFocus={autoFocus}
            disabled={disabled}
            className={classNames(classes.input, className)}
            placeholder="0"
            value={property.intValue ?? undefined}
            onBlur={e => onBlur && onBlur(e)}
            onEnterPressed={e => onKeyDown && onKeyDown(e)}
            onChange={event =>
              onChange(
                update(property, {
                  intValue: {$set: parseInt(event.target.value)},
                }),
              )
            }
            type="number"
          />
        );
      case 'float':
        return (
          <TextInput
            autoFocus={autoFocus}
            disabled={disabled}
            className={classNames(classes.input, className)}
            value={property.floatValue ?? 0}
            onBlur={e => onBlur && onBlur(e)}
            onEnterPressed={e => onKeyDown && onKeyDown(e)}
            onChange={event =>
              onChange(
                update(property, {
                  floatValue: {$set: parseFloat(event.target.value)},
                }),
              )
            }
            type="number"
          />
        );
      case 'gps_location':
        return (
          <GPSPropertyValueInput
            required={required}
            disabled={disabled}
            label={this.props.label}
            className={classNames(classes.input, className)}
            value={{
              latitude: property.latitudeValue,
              longitude: property.longitudeValue,
            }}
            onLatitudeChange={event =>
              onChange(
                update(property, {
                  latitudeValue: {$set: parseFloat(event.target.value)},
                }),
              )
            }
            onLongitudeChange={event =>
              onChange(
                update(property, {
                  longitudeValue: {$set: parseFloat(event.target.value)},
                }),
              )
            }
          />
        );
      case 'bool':
        return (
          <Select
            className={classNames(classes.input, className)}
            label={label}
            disabled={disabled}
            selectedValue={property.booleanValue}
            onChange={value =>
              onChange(
                update(property, {
                  booleanValue: {
                    $set: value,
                  },
                }),
              )
            }
            options={[
              {
                key: 'true',
                value: true,
                label: 'True',
              },
              {
                key: 'false',
                value: false,
                label: 'False',
              },
            ]}
          />
        );
      case 'range':
        return (
          <RangePropertyValueInput
            required={required}
            disabled={disabled}
            label={this.props.label}
            className={classNames(classes.input, className)}
            onBlur={e => onBlur && onBlur(e)}
            value={{
              rangeFrom: property.rangeFromValue,
              rangeTo: property.rangeToValue,
            }}
            onRangeFromChange={event =>
              onChange(
                update(property, {
                  rangeFromValue: {$set: parseFloat(event.target.value)},
                }),
              )
            }
            onRangeToChange={event =>
              onChange(
                update(property, {
                  rangeToValue: {$set: parseFloat(event.target.value)},
                }),
              )
            }
          />
        );
      case 'node':
        return inputType == 'Property' ? (
          <NodePropertyInput
            type={propertyType.nodeType ?? ''}
            // eslint-disable-next-line no-warning-comments
            // $FlowFixMe - need to fix this entire file as it receives either property or property type
            value={property.nodeValue}
            onChange={node =>
              // eslint-disable-next-line no-warning-comments
              // $FlowFixMe - need to fix this entire file as it receives either property or property type
              onChange({
                ...property,
                nodeValue: node,
              })
            }
            label={label}
          />
        ) : (
          <Text>-</Text>
        );
    }
    return null;
  };

  render() {
    return (
      <FormContext.Consumer>
        {form => {
          const input = this.getTextInput(
            form.alerts.missingPermissions.detected,
          );

          const {property, headlineVariant, required} = this.props;
          const propertyType = !!property.propertyType
            ? property.propertyType
            : property;

          const propInputType = propertyType.type;
          if (
            headlineVariant !== 'form' ||
            propInputType === 'gps_location' ||
            propInputType === 'range'
          ) {
            return input;
          }
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
  }
}

// eslint-disable-next-line no-warning-comments
// $FlowFixMe - styling based on props works, but flow doesn't recognize it.
export default withStyles(styles)(PropertyValueInput);
