/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */


import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitle from '@fbcnms/ui/components/ConfigureTitle';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

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


const EditCounterItemForm = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitle
            className={classes.title}
            title={fbt('Threshold Catalog', ' ')}
            subtitle={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader>Build Rule</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <FormField className={classes.formField} label="Name" required>
                  <TextInput
                    className={classes.textInput}
                    name="name"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Vendor name"
                  required>
                  <TextInput className={classes.textInput} name="vendorName" />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Network Manager System"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="NetworkManagerSystem"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Counter ID"
                  required>
                  <TextInput
                    className={classes.textInput}
                    name="CounterID"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} xl={4}>
              <FormField
                className={classes.formField}
                label="Family name"
                required>
                <TextInput
                  className={classes.textInput}
                  name="FamilyName"
                />
              </FormField>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditCounterItemForm;
