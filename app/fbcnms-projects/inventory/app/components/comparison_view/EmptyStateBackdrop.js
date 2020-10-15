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
import Text from '@symphony/design-system/components/Text';
import Button from '@symphony/design-system/components/Button';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  emptyStateRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
    width: '100%',
  },
  heading: {
    margin: '15px 0'
  },
  paragraph: {
    marginBottom: '20px'
  }
}));

type EmptyStateBackdropType = {
  wrapperStyle?: {[key: string]: string},
  illustration?: React.Node,
  headingText?: string,
  paragraphText?: string,
  children?: React.Node,
}

const EmptyStateBackdrop = ({
  wrapperStyle,
  illustration,
  headingText,
  paragraphText,
  children,
}: EmptyStateBackdropType) => {
  const classes = useStyles();

  return (
    <div className={classes.emptyStateRoot} style={{...wrapperStyle}}>
      {illustration}
      <Text
        variant="h6"
        color="regular"
        className={classes.heading}
      >
        {headingText}
      </Text>
      <Text
        variant="body2"
        color="regular"
        className={classes.paragraph}
      >
        {paragraphText}
      </Text>
      {children}
    </div>
  );
};

export default EmptyStateBackdrop;