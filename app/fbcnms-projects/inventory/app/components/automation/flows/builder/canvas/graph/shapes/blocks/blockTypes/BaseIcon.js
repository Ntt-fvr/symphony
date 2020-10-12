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
import SvgIcon from '@symphony/design-system/icons/SvgIcon';
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    minWidth: '48px',
    minHeight: '48px',
    width: '48px',
    height: '48px',
    marginRight: '16px',
    backgroundColor: symphony.palette.D50,
  },
  circle: {
    borderRadius: '50%',
  },
  rounded: {
    borderRadius: '4px',
  },
  square: {
    borderRadius: '11px',
  },
  square: {
    borderRadius: '11px',
  },
  greenBg: {
    backgroundColor: symphony.palette.AUTOMATION.GREEN,
    '& > $icon': {
      fill: symphony.palette.white,
    },
  },
  blueBg: {
    backgroundColor: symphony.palette.AUTOMATION.BLUE,
    '& > $icon': {
      fill: symphony.palette.white,
    },
  },
  orangeBg: {
    backgroundColor: symphony.palette.AUTOMATION.ORANGE,
    '& > $icon': {
      fill: symphony.palette.white,
    },
  },
  redBg: {
    backgroundColor: symphony.palette.AUTOMATION.RED,
    '& > $icon': {
      fill: symphony.palette.white,
    },
  },
  violetBg: {
    backgroundColor: symphony.palette.AUTOMATION.VIOLET,
    '& > $icon': {
      fill: symphony.palette.white,
    },
  },
  defaultBg: {
    backgroundColor: symphony.palette.D50,
  },
  icon: {},
}));

export type ShapeVariant = 'circle' | 'rounded' | 'square';
export type ColorVariant =
  | 'green'
  | 'blue'
  | 'orange'
  | 'red'
  | 'violet'
  | 'default';

type Props = {
  children: React.Node,
  className?: string,
  shape?: ShapeVariant,
  hoverColor?: ColorVariant,
  hovered: boolean,
};

const BaseIcon = (props: Props) => {
  const classes = useStyles();
  const {
    children,
    className,
    shape = 'circle',
    hoverColor = 'default',
    hovered,
  } = props;
  const hoveredClass = hovered ? `${hoverColor}Bg` : 'defaultBg';

  return (
    <div
      className={classNames(
        classes.wrapper,
        classes[shape],
        classes[hoveredClass],
        className,
      )}>
      <SvgIcon className={classes.icon} variant="large">
        {children}
      </SvgIcon>
    </div>
  );
};

export default BaseIcon;
