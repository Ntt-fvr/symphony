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
import classNames from 'classnames';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '30px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
}));

export type Props = $ReadOnly<{|
  className?: string,
  children: React.Node,
|}>;

const FormField = (props: Props) => {
  const {children, className} = props;
  const classes = useStyles();

  return (
    <div style={{width: '100%'}}>
      <form
        className={classNames(classes.formField, className)}
        autoComplete="off">
        {children}
      </form>
    </div>
  );
};
export {FormField};
