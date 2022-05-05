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
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  title: {},
  body: {},
  whiteSpace: {
    whiteSpace: 'break-spaces',
  },
  actionItems: {},
  item: {},
  lastSaved: {
    padding: '18px',
    backgroundColor: symphony.palette.D50,
  },
}));

type Props = $ReadOnly<{|
  title: React.Node,
  subtitle?: ?React.Node,
  body: React.Node,
  actionItems?: Array<React.Node>,
  className?: string,
|}>;

export default function DetailsPanelSection(props: Props) {
  const classes = useStyles();
  const {title, subtitle, body, actionItems, className} = props;
  return (
    <div className={classNames(className, classes.root)}>
      <div className={classes.header}>
        <div className={classes.title}>
          <Text variant="subtitle1">{title}</Text>
          {subtitle && (
            <Text variant="body2" color="gray">
              {subtitle}
            </Text>
          )}
        </div>
        <div className={classes.actionItems}>
          {actionItems &&
            actionItems.map(item => <div className={classes.item}>{item}</div>)}
        </div>
      </div>
      <Typography variant={'body2'} className={classes.whiteSpace}>
        {body}
      </Typography>
    </div>
  );
}
