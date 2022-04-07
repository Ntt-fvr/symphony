/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {Property} from '../../common/Property';
import type {PropertyType, PropertyTypeValues} from '../../common/PropertyType';

import IconButton from '@symphony/design-system/components/IconButton';
import PropertyComboPrincipalDialog from '../work_orders/property_combo/PropertyComboPrincipalDialog';
import PropertyTypesTableDispatcher from './context/property_types/PropertyTypesTableDispatcher';
import React, {useContext, useState} from 'react';
import Tokenizer from '@fbcnms/ui/components/Tokenizer';
import update from 'immutability-helper';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {Launch, PlaylistAdd} from '@material-ui/icons';
import {
  getAllPropertyTypesValuesInString,
  getValidDependencePropertyTypeValueInString,
} from '../work_orders/property_combo/PropertyComboHelpers';
import {isJSON} from '@symphony/design-system/utils/displayUtils';
import {isTempId} from '../../common/EntUtils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    width: '100%',
  },
  input: {
    marginRight: '10px',
  },
}));

type Props<T: Property | PropertyType | PropertyTypeValues> = $ReadOnly<{|
  property: T,
  onBlur?: ?() => void,
  onChange: T => void,
  disabled?: ?boolean,
  showPropertyCombo?: ?boolean,
  isPropertyComboEnum?: ?boolean,
  isDependentProperty?: boolean,
  dependencePropertyTypeValues?: PropertyTypeValues[],
|}>;

function EnumPropertyValueInput<T: Property | PropertyType>(props: Props<T>) {
  const {
    property,
    onBlur,
    onChange,
    disabled,
    showPropertyCombo = false,
    isPropertyComboEnum = false,
    isDependentProperty = false,
    dependencePropertyTypeValues = [],
  } = props;

  const propertyComboFeatureFlag = useFeatureFlag('property_combo');
  const allowPropertyCombo = showPropertyCombo && propertyComboFeatureFlag;

  const propertyTypeIcon = !property.parentPropertyType ? PlaylistAdd : Launch;
  const {propertyTypes} = useContext(PropertyTypesTableDispatcher);

  const allDependentPropertyValues =
    isDependentProperty ||
    (isTempId(property.id) && property.dependencePropertyTypes?.length > 0)
      ? getAllPropertyTypesValuesInString(property, isDependentProperty)
      : null;

  const validDependencePropertyTypeValue = isPropertyComboEnum
    ? getValidDependencePropertyTypeValueInString(
        property,
        dependencePropertyTypeValues,
      )
    : null;

  const jsonStr =
    allDependentPropertyValues ||
    validDependencePropertyTypeValue ||
    property.stringValue ||
    [];

  const options = isJSON(jsonStr) ? JSON.parse(jsonStr) : [];
  const optionsArr = Array.isArray(options) ? options : [];
  const classes = useStyles();
  const [tokens, setTokens] = useState(
    optionsArr.map(option => ({
      id: option,
      label: option,
    })),
  );
  const [viewDialogProperty, setViewDialogProperty] = useState(false);
  const showDialog = () => setViewDialogProperty(true);
  const hideDialog = () => setViewDialogProperty(false);
  
  return (
    <div className={classes.container}>
      <Tokenizer
        searchSource="UserInput"
        tokens={tokens}
        disabled={
          disabled ||
          (isTempId(property.id) &&
            property.dependencePropertyTypes?.length > 0)
        }
        onEntriesRequested={() => {}}
        placeholder="Press Enter after each value"
        onChange={newEntries => {
          setTokens(newEntries);
          isPropertyComboEnum
            ? onChange(
                update(property, {
                  propertyTypeValues: {
                    $set: newEntries.map(t => ({name: t.label})),
                  },
                }),
              )
            : onChange(
                update(property, {
                  stringValue: {
                    $set: JSON.stringify(newEntries.map(t => t.label)),
                  },
                }),
              );
        }}
        onBlur={() => {
          onBlur && onBlur();
        }}
        className={classes.input}
      />
      {allowPropertyCombo && (
        <div>
          <IconButton
            skin="primary"
            onClick={showDialog}
            icon={propertyTypeIcon}
            disabled={
              propertyTypes.length <= 1 ||
              tokens.length < 1 ||
              !isTempId(property.id)
            }
          />
          <PropertyComboPrincipalDialog
            open={viewDialogProperty}
            onClose={hideDialog}
            property={property}
            onSave={propertyComboInfo => {
              onChange(
                update(property, {
                  dependencePropertyTypes: {
                    $set: propertyComboInfo.dependencePropertyTypes,
                  },
                  propertyTypeValues: {
                    $set: propertyComboInfo.propertyTypeValues,
                  },
                  stringValue: {
                    $set: null,
                  },
                }),
              );
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EnumPropertyValueInput;
 