/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';
import type {SvgIconStyleProps} from '@symphony/design-system/icons/SvgIcon';
import type {TRefFor} from '@symphony/design-system/types/TRefFor.flow';

import * as React from 'react';
import Clickable from '@symphony/design-system/components/Core/Clickable';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
import {joinNullableStrings} from '@fbcnms/util/strings';
import {makeStyles} from '@material-ui/styles';
import {useFormElementContext} from '@symphony/design-system/components/Form/FormElementContext';
import {useMemo} from 'react';

const useStyles = makeStyles(_theme => ({
  root: {
    border: 0,
    '&:focus': {
      outline: 'none',
    },
    flexShrink: 0,
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100%',
  },
  icon: {},
  hasIcon: {
    justifyContent: 'start',
    '& $buttonText': {
      flexGrow: 1,
    },
  },
  rightIcon: {
    marginLeft: '8px',
  },
  leftIcon: {
    marginRight: '8px',
  },
  hasRightIcon: {
    '& $buttonText': {
      textAlign: 'left',
    },
  },
  hasLeftIcon: {
    '& $buttonText': {
      textAlign: 'right',
    },
  },
  primarySkin: {},
  redSkin: {},
  orangeSkin: {},
  greenSkin: {},
  violetSkin: {},
  yellowSkin: {},
  containedVariant: {
    height: '36px',
    minWidth: '88px',
    padding: '4px 12px',
    borderRadius: '4px',
    '&$hasRightIcon': {
      padding: '4px 8px 4px 16px',
    },
    '&$hasLeftIcon': {
      padding: '4px 16px 4px 8px',
    },
    //PRIMARY
    '&$primarySkin': {
      backgroundColor: '#E4F2FF',
      border: '1px solid #3A5FD7',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#3A5FD7',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#EDF0F9',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
    //RED
    '&$redSkin': {
      backgroundColor: '#FFE8E8',
      border: '1px solid #D4040B',

      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#D4040B',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#FFF2F3',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
    //YELLOW
    '&$yellowSkin': {
      backgroundColor: '#FFF9D8',
      border: '1px solid #D4850D',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#D4850D',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#FFFCEE',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
    //GREEN
    '&$greenSkin': {
      backgroundColor: '#EBFFE1',
      border: '1px solid #00AF5B',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#00AF5B',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#F0FFF8',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
    //VIOLET
    '&$violetSkin': {
      backgroundColor: '#eae7fa',
      border: '1px solid #7B61FF',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#7B61FF',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#edebfc',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
    //ORANGE
    '&$orangeSkin': {
      backgroundColor: '#faf1ec',
      border: '1px solid #ef9a74',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#ef9a74',
        },
      },
      '&:hover:not($disabled)': {
        backgroundColor: '#fff7f1',
      },
      '&:active:not($disabled)': {
        backgroundColor: '#f5f7fc',
      },
    },
  },
  buttonText: {
    maxHeight: '100%',
    display: 'flex',
  },
  /*textVariant: {
    display: 'inline-flex',
    textAlign: 'left',
    background: 'none',
    padding: 0,
    height: '24px',
    maxWidth: '100%',
    '&$primarySkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.primary,
          fill: symphony.palette.primary,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.B700,
          fill: symphony.palette.B700,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.B700,
          fill: symphony.palette.B700,
        },
      },
    },
    '&$redSkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.R600,
          fill: symphony.palette.R600,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
    },
    '&$regularSkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.secondary,
          fill: symphony.palette.secondary,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
    },
    '&$graySkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.D500,
          fill: symphony.palette.D500,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.primary,
          fill: symphony.palette.primary,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.primary,
          fill: symphony.palette.primary,
        },
      },
    },
    '&$secondaryGraySkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.D500,
          fill: symphony.palette.D500,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.D900,
          fill: symphony.palette.D900,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.primary,
          fill: symphony.palette.primary,
        },
      },
    },
    '&$darkGraySkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.D700,
          fill: symphony.palette.D700,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
    },
    '&$brightGraySkin': {
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: symphony.palette.D300,
          fill: symphony.palette.D300,
        },
      },
      '&:hover:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
      '&:active:not($disabled)': {
        '& $buttonText, $icon': {
          opacity: 0.75,
        },
      },
    },
    '&$disabled': {
      '& $buttonText, $icon': {
        color: symphony.palette.disabled,
        fill: symphony.palette.disabled,
      },
    },
  },*/
}));

export type ButtonVariant = 'contained' | 'text';
export type ButtonSkin =
  | 'primary'
  | 'violet'
  | 'red'
  | 'gray'
  | 'yellow'
  | 'darkGray'
  | 'brightGray'
  | 'orange'
  | 'green';
export type SvgIconComponent =
  | React.ComponentType<SvgIconStyleProps>
  | React$ComponentType<SvgIconExports>;

export type ButtonProps = $ReadOnly<{|
  skin?: ButtonSkin,
  variant?: ButtonVariant,
  useEllipsis?: ?boolean,
  disabled?: boolean,
  tooltip?: string,
|}>;

export type Props = $ReadOnly<{|
  className?: string,
  children: React.Node,
  onClick?: ?MouseEventHandler,
  onMouseDown?: ?MouseEventHandler,
  leftIcon?: SvgIconComponent,
  leftIconClass?: string,
  rightIcon?: SvgIconComponent,
  rightIconClass?: string,
  ...ButtonProps,
|}>;

const ButtonAlarmStatus = (
  props: Props,
  forwardedRef: TRefFor<HTMLElement>,
) => {
  const {
    className,
    children,
    skin = 'primary',
    disabled: disabledProp = false,
    variant = 'contained',
    useEllipsis = true,
    onClick,
    onMouseDown,
    leftIcon: LeftIcon = null,
    leftIconClass = null,
    rightIcon: RightIcon = null,
    rightIconClass = null,
    tooltip: tooltipProp,
  } = props;
  const classes = useStyles();

  const {
    disabled: contextDisabled,
    tooltip: contextTooltip,
  } = useFormElementContext();

  const disabled = useMemo(() => disabledProp || contextDisabled, [
    disabledProp,
    contextDisabled,
  ]);

  const tooltip = useMemo(
    () => joinNullableStrings([tooltipProp, contextTooltip]),
    [contextTooltip, tooltipProp],
  );

  return (
    <Clickable
      className={classNames(
        classes.root,
        classes[`${skin}Skin`],
        classes[`${variant}Variant`],
        {
          [classes.disabled]: disabled,
          [classes.hasIcon]: LeftIcon != null || RightIcon != null,
          [classes.hasLeftIcon]: LeftIcon != null,
          [classes.hasRightIcon]: RightIcon != null,
        },
        className,
      )}
      tooltip={tooltip ?? ''}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={onMouseDown}
      ref={forwardedRef}>
      {LeftIcon ? (
        <LeftIcon
          color="inherit"
          className={classNames(classes.icon, classes.leftIcon, leftIconClass)}
        />
      ) : null}
      <Text
        variant="body2"
        weight="medium"
        useEllipsis={useEllipsis}
        className={classes.buttonText}>
        {children}
      </Text>
      {RightIcon ? (
        <RightIcon
          className={classNames(
            classes.icon,
            classes.rightIcon,
            rightIconClass,
          )}
          color="inherit"
        />
      ) : null}
    </Clickable>
  );
};

export default React.forwardRef<Props, HTMLElement>(ButtonAlarmStatus);
