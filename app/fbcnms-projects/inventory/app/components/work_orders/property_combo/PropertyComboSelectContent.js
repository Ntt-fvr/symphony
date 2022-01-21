/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import PropertyComboList from './PropertyComboList';
import PropertyTypesTableDispatcher from '../../form/context/property_types/PropertyTypesTableDispatcher';
import React, {useContext, useState} from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import Strings from '@fbcnms/strings/Strings';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {PropertyType} from '../../../common/PropertyType';

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  property: PropertyType,
  setShowCompleteMessage: () => void,
|}>;

const PropertyComboSelectContent = (props: Props) => {
  const {onClose, classes, property, setShowCompleteMessage} = props;
  const {propertyTypes} = useContext(PropertyTypesTableDispatcher);
  const [dependenceProperty, setDependenceProperty] = useState({});

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <Grid container className={classes.dialogTitleContainer}>
          <Text className={classes.dialogTitleText} color={'inherit'}>
            Relate Porperties
          </Text>
          <br />
          <Text variant="body2" color={'inherit'}>
            When relating two properties, the secondary values that will be
            shown to the user will be dependent on the primary values
          </Text>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          alignItems="center"
          className={classes.tableHeader}>
          <Grid item xs={5}>
            <Text className={classes.tableTitleText} color={'inherit'}>
              Primary Property
            </Text>
          </Grid>
          <Grid item xs={5}>
            <Text className={classes.tableTitleText} color={'inherit'}>
              Dependent Property
            </Text>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              disabled
              label="Primary Property"
              fullWidth
              name="primaryProperty"
              variant="outlined"
              value={property?.name}
            />
          </Grid>
          <Grid item xs={5}>
            <Select
              options={propertyTypes.map(property => {
                return {
                  key: property.id,
                  label: property.name,
                  value: property.id,
                };
              })}
              selectedValue={dependenceProperty}
              onChange={setDependenceProperty}
              className={classes.selectInput}
            />
          </Grid>
        </Grid>
        <PropertyComboList classes={classes} property={property} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} skin="primary-outlined">
          {Strings.common.cancelButton}
        </Button>
        <Button onClick={() => setShowCompleteMessage(true)}>
          {Strings.common.saveButton}
        </Button>
      </DialogActions>
    </>
  );
};

export default PropertyComboSelectContent;
