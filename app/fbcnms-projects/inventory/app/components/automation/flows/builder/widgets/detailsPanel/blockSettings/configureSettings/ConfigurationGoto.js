/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {IBlock} from '../../../../canvas/graph/shapes/blocks/BaseBlock';

import * as React from 'react';
import BlockNameInput from './BlockNameInput';
import Select from '../../../../../../inputs/Select';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from '../../../../../utils/useForm';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  formLabel: {
    '& .MuiFormControlLabel-labelPlacementStart': {
      marginLeft: 0,
    },
    '& .MuiFormControlLabel-label': {
      paddingRight: 24,
    },
  },
}));

type Props = $ReadOnly<{|
  block: IBlock,
|}>;

const ConfigurationGoTo = ({block}: Props) => {
  const types = [
    {name: 'Origin', id: 'origin'},
    {name: 'Destination', id: 'destination'},
  ];
  const classes = useStyles();
  const [configurationsValues, handleInputChange] = useForm({
    type: '',
  });

  const {type} = configurationsValues;

  return (
    <Grid container spacing={4} className={classes.root}>
      <Grid item xs={12}>
        <BlockNameInput block={block} />
      </Grid>
      <Grid item xs={12}>
        <Select
          label={'Type'}
          name={'type'}
          value={type}
          onChange={handleInputChange}
          items={types}
        />
      </Grid>
    </Grid>
  );
};

export default ConfigurationGoTo;
