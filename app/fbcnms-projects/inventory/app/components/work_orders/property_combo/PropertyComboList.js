/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import EnumPropertyValueInput from '../../form/EnumPropertyValueInput';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {DependentPropertyTypesReducerTypes} from './DependentPropertyTypesReducer';
import {NextArrowIcon} from '@symphony/design-system/icons';

type Props = $ReadOnly<{|
  propertyTypeValues: string[],
|}>;

const PropertyComboList = (props: Props) => {
  const {classes, propertyTypeValues, dispatch} = props;

  const handlePropertyTypeValues = propertyTypeValue => {
    const indexProperty = propertyTypeValues.findIndex(
      property => propertyTypeValue.name === property.name,
    );
    propertyTypeValues.splice(indexProperty, 1, propertyTypeValue);
    const action = {
      type: DependentPropertyTypesReducerTypes.updatePropertyTypesValue,
      payload: propertyTypeValues,
    };
    dispatch(action);
  };

  return (
    <Grid
      container
      spacing={1}
      className={classes.tableHeader}
      alignItems="center">
      {propertyTypeValues?.map(propertyTypeValue => (
        <>
          <Grid item xs={5}>
            <TextField
              required
              disabled
              label="Primary Property"
              fullWidth
              name="primaryProperty"
              variant="outlined"
              value={propertyTypeValue.name}
            />
          </Grid>
          <Grid item xs={2} className={classes.arrowIcon}>
            <IconButton skin="darkGray" icon={NextArrowIcon} disabled />
          </Grid>
          <Grid item xs={5}>
            <EnumPropertyValueInput
              property={propertyTypeValue}
              onChange={handlePropertyTypeValues}
              isPropertyComboEnum={true}
            />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default PropertyComboList;
