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
  root: {},
  name: {
    marginRight: '7px',
  },
  container: {
    margin: '7px 0',
  },
}));
type Props = $ReadOnly<{|
  name?: string,
  btn?: string,
  txt?: string,
  className?: string,
|}>;

const DynamicPropertyTypes = (props: Props) => {
  const {name, txt, btn, className} = props;
  const classes = useStyles();

  return (
    <div className={(classes.root, className)}>
      <Text
        className={classes.container}
        useEllipsis={true}
        variant="subtitle2">
        <span className={classes.name}>{name}:</span>

        <Text weight={'bold'} color={'regular'}>
          <span>{txt}</span>
        </Text>

        <a style={{textDecoration: 'none'}} target="_blank">
          <Text weight={'bold'} color={'primary'}>
            <span>{btn}</span>
          </Text>
        </a>
      </Text>
    </div>
  );
};

export default DynamicPropertyTypes;
