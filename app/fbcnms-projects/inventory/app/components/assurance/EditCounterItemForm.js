/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {useFormInput} from './common/useFormInput';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import ConfigueTitle from '@fbcnms/ui/components/ConfigureTitle';
import fbt from 'fbt';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
}));

export const EditCounterItemForm = props => {
  const classes = useStyles();
  const name = useFormInput(props.formValues.Name);
  const vendor = useFormInput(props.formValues.VendorName);
  const NetworkManagerSystem = useFormInput(
    props.formValues.NetworkManagerSystem,
  );
  const CounterID = useFormInput(props.formValues.CounterID);
  const FamilyName = useFormInput(props.formValues.FamilyName);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <ConfigueTitle
            className={classes.title}
            title={fbt('Counters catalog',' ')}
            subtitle={''}
          />
        </Grid>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader>Edit container detail</CardHeader>
            <Grid container>
              <Grid item s={12} sm={12} lg={12} xl={12}>
                <FormField className={classes.formField} label="Name" required>
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
                    variant="outlined"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item s={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Vendor name"
                  required>
                  <TextInput
                    {...vendor}
                    className={classes.textInput}
                    name="vendorName"
                    variant="outlined"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item s={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Network Manager System"
                  required>
                  <TextInput
                    {...NetworkManagerSystem}
                    className={classes.textInput}
                    name="NetworkManagerSystem"
                    variant="outlined"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item s={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Counter ID"
                  required>
                  <TextInput
                    {...CounterID}
                    className={classes.textInput}
                    name="CounterID"
                    variant="outlined"
                    type="string"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid item s={12} sm={12} lg={4} xl={4}>
              <FormField
                className={classes.formField}
                label="Family name"
                required>
                <TextInput
                  {...FamilyName}
                  className={classes.textInput}
                  name="FamilyName"
                  variant="outlined"
                  type="string"
                />
              </FormField>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item s={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button className={classes.addCounter}>Save</Button>
                </FormField>
              </Grid>
              <Grid item s={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    onClick={props.onClose}
                    className={classes.addCounter}
                    skin="brightGray">
                    Cancel
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
