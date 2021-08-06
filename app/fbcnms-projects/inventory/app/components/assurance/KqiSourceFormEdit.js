/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import fbt from 'fbt';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import ConfigureTitle from './common/ConfigureTitle';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 18px 22px 18px',
  },
  formFieldStatus: {
    marginTop: '1rem',
  },
  textInput: {
    minHeight: '36px',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '2.5rem',
  },
  titleButtons: {
    padding: '1rem 1rem 0 4rem',
    alignItems: 'center',
  },
  reason: {
    minHeight: '100px',
  },
  status: {
    paddingTop: '40px',
  },
  time: {
    marginBottom: '20px',
  },
}));

const KqiSourceFormEdit = props => {
  const classes = useStyles();

  function handleChange(e) {
    console.log(e.target.value);
  }

  const handleRemove = () => {
    console.log('REMOVE ALARM');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid item xs={10}>
            <ConfigureTitle title={fbt('Edit KQI Source', ' ')} subtitle={''} />
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="outlined"
                    color="primary"
                    onClick={() => props.returnKqiSources()}>
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="contained"
                    color="primary"
                    onClick={() => props.returnKqiSources()}>
                    Save
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item xs={6}>
                <FormField label="Name" className={classes.formField}>
                  <TextInput
                    className={classes.textInput}
                    name="name"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="ID">
                  <TextInput
                    className={classes.textInput}
                    name="iD"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiSourceFormEdit;
