/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Grid from '@material-ui/core/Grid';
import PropertyTypesTableDispatcher from '../form/context/property_types/PropertyTypesTableDispatcher';
import PropertyValueInput from '../form/PropertyValueInput';
import {makeStyles} from '@material-ui/styles';
import {useContext} from 'react';

const useStyles = makeStyles(() => ({
  inputMargin: {padding: '0 22px 22px 22px'},
  input: {
    display: 'inline-flex',
    width: '100%',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
}));

type Props = $ReadOnly<{|
  propertyTypes: any,
|}>;

const AddEditPropertyList = ({propertyTypes}: Props) => {
  const classes = useStyles();
  const {dispatch} = useContext(PropertyTypesTableDispatcher);

  return (
    <>
      {propertyTypes.name === undefined ? null : (
        <Grid container>
          <Grid item xs={12}>
            <CardHeader className={classes.cardHeader}>Properties</CardHeader>
          </Grid>
          {propertyTypes.map(property => (
            <Grid key={property.id} className={classes.inputMargin} item xs={6}>
              <PropertyValueInput
                required={!!property?.propertyType?.isMandatory}
                disabled={!property?.propertyType?.isInstanceProperty}
                label={property.name}
                className={classes.input}
                inputType="Property"
                property={property}
                headlineVariant="form"
                onChange={value =>
                  dispatch({
                    type: 'UPDATE_PROPERTY_TYPE',
                    value,
                  })
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AddEditPropertyList;
