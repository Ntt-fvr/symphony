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
    paddingTop: '28px',
    paddingBottom: '6px',
  },
  button: {
    marginTop: '10px'
  }
}));

type EmptyStateBackdropType = {
  wrapper?: {style: StyleType},
  illustration?: {
    render?: (props: StyleType) => React.Node,
    props?: StyleType,
  },
  heading?: {style?: StyleType, textContent?: string},
  paragraph?: {style?: StyleType, textContent?: string},
  button?: {buttonTextContent?: string, buttonProps?: any},
}

type StyleType = {[key: string]: string}

const EmptyStateBackdrop = ({
  wrapper,
  illustration = {render: () => null},
  heading,
  paragraph,
  button
}: EmptyStateBackdropType) => {
  const classes = useStyles();
  const {
    textContent: buttonTextContent,
    ...buttonProps
  } = button;

  return (
    // $FlowFixMe
    <div className={classes.emptyStateRoot} style={{...wrapper?.style}}>
      <illustration.render {...illustration?.props}/>
      <Text
        variant="h6"
        color="regular"
        className={classes.heading}
        style={{...heading?.style}}
      >
        {heading?.textContent}
      </Text>
      <Text
        variant="body2"
        color="regular"
        style={{...paragraph?.style}}
      >
        {paragraph?.textContent}
      </Text>
      {button && 
        <Button
          className={classes.button}
          {...buttonProps}
        >
          {buttonTextContent}
        </Button>}
    </div>
  );
};

export default EmptyStateBackdrop;