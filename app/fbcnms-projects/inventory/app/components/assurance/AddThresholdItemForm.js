/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '120px',
    alignSelf: 'flex-end',
  },
}));

export default function AddThresholdItemForm() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader>Add Threshold</CardHeader>
      <FormField className={classes.formField} label="Threshold Name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField className={classes.formField} label="ID" required>
        <TextInput
          className={classes.textInput}
          name="id"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField className={classes.formField} label="Associated KPI" required>
        <TextInput
          className={classes.textInput}
          name="family"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField className={classes.formField} label="Description" required>
        <TextInput
          className={classes.textInput}
          name="vendor"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField>
        <Button className={classes.addCounter}>Add Threshold</Button>
      </FormField>
    </Card>
  );
}
