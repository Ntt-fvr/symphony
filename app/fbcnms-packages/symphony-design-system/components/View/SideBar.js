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
import {makeStyles} from '@material-ui/styles';

const MAJOR_SIZE = '240px';

const useStyles = makeStyles(() => ({
  root: {
    flexBasis: MAJOR_SIZE,
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flexBasis: MAJOR_SIZE,
    width: MAJOR_SIZE,
    minWidth: MAJOR_SIZE,
    maxWidth: MAJOR_SIZE,
  },
  header: {
    flexGrow: 0,
    padding: '24px 16px 0 16px',
    backgroundColor: symphony.palette.white,
  },
  body: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    paddingBottom: '8px',
    backgroundColor: symphony.palette.white,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}));

export type MenuItem = $ReadOnly<{|
  label: React.Node,
  tooltip?: ?string,
|}>;

type Props = {
  header?: ?React.Node,
  children?: ?React.Node,
  className?: ?string,
  headerClassName?: ?string,
  bodyClassName?: ?string,
};

export default function SideBar(props: Props) {
  const {header, children, className, headerClassName, bodyClassName} = props;
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <Text
        className={classNames(classes.header, headerClassName)}
        variant="body1"
        weight="medium">
        {header}
      </Text>
      <div className={classNames(classes.body, bodyClassName)}>{children}</div>
    </div>
  );
}
