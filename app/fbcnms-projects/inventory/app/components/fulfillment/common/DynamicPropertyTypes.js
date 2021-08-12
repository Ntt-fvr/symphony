/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';
import {makeStyles} from '@material-ui/styles';

import Text from '@symphony/design-system/components/Text';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    // border: '1px solid red',
  },
  bold: {
    fontWeight: 'bold',
  },
}));
type Props = $ReadOnly<{|
  name?: string,
  btn?: string,
  txt?: string,
  className?: string,
|}>;

const DynamicPropertyTypes = (props: Props) => {
  const {name, txt, className} = props;
  const classes = useStyles();

  return (
    <div className={(classes.root, className)}>
      <Text variant="subtitle2">{name}:</Text>
      <Text weight={'bold'} color={'regular'}>
        {txt}
      </Text>
    </div>
  );
};

export default DynamicPropertyTypes;
