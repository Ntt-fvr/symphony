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
  header: {
    margin: '20px 0 24px 20px',
  },
  formField: {
    margin: '0 20px 22px 20px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
}));

export default function AddFormulaItemForm() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add formula</CardHeader>
      <FormField className={classes.formField} label="KPI Name" required>
        <TextInput
          className={classes.textInput}
          name="name"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField className={classes.formField} label="Vendor name" required>
        <TextInput
          className={classes.textInput}
          name="id"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField className={classes.formField} label="Technology" required>
        <TextInput
          className={classes.textInput}
          name="family"
          variant="outlined"
          type="string"
        />
      </FormField>
      <FormField>
        <Button className={classes.addCounter}>Build formula</Button>
      </FormField>
    </Card>
  );
}
