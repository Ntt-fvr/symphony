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
import Button from '@symphony/design-system/components/Button';
import TextField from '../../../../../../inputs/TextField';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {Grid} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: '12px',
    '& span': {
      fontWeight: 'bold',
    },
  },
  section: {
    '&:not(:last-child)': {
      paddingBottom: '27px',
      marginBottom: '22px',
      borderBottom: `1px solid ${symphony.palette.D50}`,
    },
  },
}));

const ConfigurationChoice = () => {
  const classes = useStyles();

  const [configurationsValues, handleInputChange] = useForm({
    connectionTimeout: 0,
  });

  const {connectionTimeout} = configurationsValues;

  return (
    <>
      <Grid item xs={12}>
        <TextField
          label={'Connection Timeout'}
          type={'number'}
          name={'connectionTimeout'}
          value={connectionTimeout}
          handleInputChange={handleInputChange}
        />
      </Grid>
      <Button
        variant="text"
        className={classes.button}
        //onClick={() => dispatch({type: 'ADD_PROPERTY_TYPE'})}
        leftIcon={PlusIcon}>
        <fbt desc="">Add Rule</fbt>
      </Button>
    </>
  );
};

export default ConfigurationChoice;
