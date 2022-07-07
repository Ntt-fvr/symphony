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
    cursor: 'text',
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
  SUBMITTEDSkin: {},
  FAILEDSkin: {},
  CANCELLEDSkin: {},
  IN_EXECUTIONSkin: {},
  SUCCESSFULSkin: {},
  PENDINGSkin: {},
  SCHEDULEDSkin: {},
  disabled: {},
  containedVariant: {
    height: '28px',
    minWidth: '110px',
    padding: '0px 12px',
    borderRadius: '4px',
    '&$hasRightIcon': {
      padding: '4px 8px 4px 16px',
    },
    '&$hasLeftIcon': {
      padding: '4px 16px 4px 8px',
    },
    //SUBMITTED
    '&$SUBMITTEDSkin': {
      backgroundColor: '#E4F2FF',
      border: '1px solid #3A5FD7',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#3A5FD7',
        },
      },
    },
    //CANCELLEDLED
    '&$CANCELLEDSkin': {
      backgroundColor: '#FAFCFF',
      border: '1px solid #9DA9BE',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#9DA9BE',
        },
      },
    },
    //FAILED
    '&$FAILEDSkin': {
      backgroundColor: '#FFE8E8',
      border: '1px solid #D4040B',

      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#D4040B',
        },
      },
    },
    //SCHEDULED
    '&$SCHEDULEDSkin': {
      backgroundColor: '#FFF9D8',
      border: '1px solid #D4850D',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#D4850D',
        },
      },
    },
    //SUCCESSFUL
    '&$SUCCESSFULSkin': {
      backgroundColor: '#EBFFE1',
      border: '1px solid #00AF5B',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#00AF5B',
        },
      },
    },
    //PENDING
    '&$PENDINGSkin': {
      backgroundColor: '#eae7fa',
      border: '1px solid #7B61FF',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#7B61FF',
        },
      },
    },
    //IN_EXECUTION
    '&$IN_EXECUTIONSkin': {
      backgroundColor: '#faf1ec',
      border: '1px solid #ef9a74',
      '&:not($disabled)': {
        '& $buttonText, $icon': {
          color: '#ef9a74',
        },
      },
    },
    //DISABLED
    '&$disabled': {
      backgroundColor: symphony.palette.disabled,
      border: 'none',
      '& $buttonText, $icon': {
        color: symphony.palette.white,
        fill: symphony.palette.white,
      },
    },
  },
  buttonText: {
    maxHeight: '100%',
    display: 'flex',
  },
}));

export type ButtonVariant = 'contained' | 'text';
export type ButtonSkin =
  | 'SUBMITTED'
  | 'IN_EXECUTION'
  | 'PENDING'
  | 'SUCCESSFUL'
  | 'SCHEDULED'
  | 'FAILED'
  | 'CANCELLED'
  | 'disabled';
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
    skin = 'SUBMITTED',
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
