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
import {NextArrowIcon} from '@symphony/design-system/icons';

type Props = $ReadOnly<{|
  propertyChoiceList: string[],
|}>;

const PropertyComboList = (props: Props) => {
  const {classes, property} = props;
  const propertyChoiceList = JSON.parse(property.stringValue);

  return (
    <Grid
      container
      spacing={1}
      className={classes.tableHeader}
      alignItems="center">
      {propertyChoiceList?.map(propertyChoice => (
        <>
          <Grid item xs={5}>
            <TextField
              required
              disabled
              label="Primary Property"
              fullWidth
              name="primaryProperty"
              variant="outlined"
              value={propertyChoice}
            />
          </Grid>
          <Grid item xs={2} className={classes.arrowIcon}>
            <IconButton skin="darkGray" icon={NextArrowIcon} disabled />
          </Grid>
          <Grid item xs={5}>
            <EnumPropertyValueInput property={property} />
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default PropertyComboList;
