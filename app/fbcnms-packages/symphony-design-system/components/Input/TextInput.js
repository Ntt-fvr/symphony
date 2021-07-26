/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {ClickableEvents} from '@symphony/design-system/components/Core/Clickable';
import type {TRefFor} from '../../types/TRefFor.flow';

import * as React from 'react';
import Clickable from '@symphony/design-system/components/Core/Clickable';
import FormElementContext from '../Form/FormElementContext';
import InputContext from './InputContext';
import Text from '../Text';
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useCallback, useContext, useMemo, useState} from 'react';

export const KEYBOARD_KEYS = {
  CODES: {
    BACKSPACE: 8,
    ENTER: 13,
    ESC: 27,
  },
  MODIFIERS: {
    SHIFT: 'shift',
  },
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    position: 'relative',
    overflow: 'hidden',
    padding: '0px 8px',
    border: `1px solid ${symphony.palette.D100}`,
    borderRadius: '4px',
    display: 'flex',
    minHeight: '36px',
    boxSizing: 'border-box',
    backgroundColor: symphony.palette.white,
    '&$hasFocus': {
      borderColor: symphony.palette.D500,
    },
    '&:hover:not($disabled)': {
      borderColor: symphony.palette.D500,
    },
    '&$disabled': {
      backgroundColor: symphony.palette.background,
    },
    '&$hasError': {
      borderColor: symphony.palette.R600,
    },
  },
  multilineInputContainer: {
    height: 'unset',
    paddingRight: 0,
  },
  clickable: {
    flexGrow: 1,
  },
  hasFocus: {},
  disabled: {
    '& $input': {
      cursor: 'not-allowed',
      '&::placeholder': {
        color: symphony.palette.disabled,
      },
      color: symphony.palette.secondary,
    },
  },
  hasError: {},
  input: {
    color: symphony.palette.D900,
    margin: 0,
    border: 0,
    outline: 0,
    background: 'transparent',
    minWidth: '48px',
    flexBasis: '48px',
    flexGrow: 1,
    flexShrink: 1,
    padding: '5px 8px',
    ...symphony.typography.body2,
    '&::placeholder': {
      color: symphony.palette.D400,
    },
  },
  multilineInput: {
    resize: 'none',
  },
  hint: {
    paddingTop: '4px',
  },
  hintText: {
    color: symphony.palette.D200,
  },
  suffix: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '-2px',
    marginLeft: '8px',
  },
  processingIndicator: {
    position: 'absolute',
    borderBottom: `3px solid transparent`,
    bottom: 0,
    left: '0%',
  },
  showProcessingIndicator: {
    borderBottomColor: symphony.palette.primary,
    animation: '$progress 2s infinite',
  },
  '@keyframes progress': {
    '0%': {
      right: '100%',
      left: '0%',
    },
    '50%': {
      left: '0%',
    },
    '100%': {
      right: '0%',
      left: '100%',
    },
  },
}));

export type FocusEvent<T> = {
  target: T,
  relatedTarget: HTMLElement,
};

type FocusEventFn<T: HTMLElement> = (FocusEvent<T>) => void;

type Props = $ReadOnly<{|
  /** Input type. See: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types */
  autoComplete?: string,
  type?: string,
  name?: string,
  value?: string | number,
  className?: string,
  containerClassName?: string,
  placeholder?: string,
  rows?: number,
  autoFocus?: boolean,
  disabled?: boolean,
  hasError?: boolean,
  isProcessing?: ?boolean,
  prefix?: React.Node,
  hint?: string,
  suffix?: React.Node,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: () => void,
  onBlur?: FocusEventFn<HTMLInputElement>,
  onEnterPressed?: (e: SyntheticKeyboardEvent<>) => void,
  onEscPressed?: (e: SyntheticKeyboardEvent<>) => void,
  onBackspacePressed?: (e: SyntheticKeyboardEvent<>) => void,
  ...ClickableEvents,
|}>;

function TextInput(props: Props, forwardedRef: TRefFor<HTMLInputElement>) {
  const {
    autoComplete = 'on',
    autoFocus = false,
    className,
    containerClassName,
    hasError: hasErrorProp,
    disabled: disabledProp,
    prefix,
    suffix,
    value,
    hint,
    onFocus,
    onBlur,
    onChange,
    onEnterPressed,
    onEscPressed,
    onBackspacePressed,
    type = 'string',
    rows = 2,
    isProcessing = false,
    onClick,
    onMouseDown,
    ...rest
  } = props;
  const classes = useStyles();
  const {hasError: contextHasError, disabled: contextDisabled} = useContext(
    FormElementContext,
  );
  const disabled = useMemo(
    () => (disabledProp ? disabledProp : contextDisabled),
    [disabledProp, contextDisabled],
  );
  const hasError = useMemo(
    () => (hasErrorProp ? hasErrorProp : contextHasError),
    [hasErrorProp, contextHasError],
  );
  const [hasFocus, setHasFocus] = useState(
    disabled ? false : autoFocus === true,
  );

  const onInputFocused = useCallback(() => {
    setHasFocus(true);
    onFocus && onFocus();
  }, [onFocus]);

  const onInputBlurred = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setHasFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const onInputChanged = useCallback(
    (e: SyntheticInputEvent<HTMLInputElement>) => {
      onChange && onChange(e);
    },
    [onChange],
  );

  const onKeyDown = useCallback(
    (e: SyntheticKeyboardEvent<>) => {
      switch (e.keyCode) {
        case KEYBOARD_KEYS.CODES.ENTER:
          onEnterPressed && onEnterPressed(e);
          break;
        case KEYBOARD_KEYS.CODES.ESC:
          onEscPressed && onEscPressed(e);
          break;
        case KEYBOARD_KEYS.CODES.BACKSPACE:
          onBackspacePressed && onBackspacePressed(e);
          break;
      }
    },
    [onEnterPressed, onEscPressed, onBackspacePressed],
  );

  const isMultiline = useMemo(() => type === 'multiline', [type]);

  return (
    <div className={classNames(classes.root, className)}>
      <div
        className={classNames(
          classes.inputContainer,
          {
            [classes.multilineInputContainer]: isMultiline,
            [classes.hasFocus]: hasFocus,
            [classes.disabled]: disabled,
            [classes.hasError]: hasError,
          },
          containerClassName,
        )}>
        <InputContext.Provider value={{disabled, value: value ?? ''}}>
          {prefix}
          <Clickable
            className={classes.clickable}
            onClick={onClick}
            onMouseDown={onMouseDown}
            disabled={disabled}>
            {isMultiline ? (
              <textarea
                {...rest}
                rows={rows}
                disabled={disabled}
                className={classNames(classes.input, classes.multilineInput)}
                onFocus={onInputFocused}
                onBlur={onInputBlurred}
                onChange={onInputChanged}
                onKeyDown={onKeyDown}
                value={value}
              />
            ) : (
              <input
                {...rest}
                type={type}
                className={classes.input}
                autoComplete={autoComplete}
                disabled={disabled}
                onFocus={onInputFocused}
                onBlur={onInputBlurred}
                onChange={onInputChanged}
                onKeyDown={onKeyDown}
                value={value}
                ref={forwardedRef}
                autoFocus={autoFocus}
              />
            )}
          </Clickable>
          {suffix && <div className={classes.suffix}>{suffix}</div>}
        </InputContext.Provider>
        <div
          className={classNames(classes.processingIndicator, {
            [classes.showProcessingIndicator]: isProcessing,
          })}
        />
      </div>
      {hint && (
        <div className={classes.hint}>
          <Text variant="caption" className={classes.hintText}>
            {hint}
          </Text>
        </div>
      )}
    </div>
  );
}

export default React.forwardRef<Props, HTMLInputElement>(TextInput);
