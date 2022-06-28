/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Select from '@symphony/design-system/components/Select/Select';
import {uploadFileNifi} from '../../FileUpload/FileUploadUtilsNifi';
import shortid from 'shortid';
import { csvToArray } from '../csvToArray';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    margin: '0',
  },
}));

const valuesNF = [
  {
    key: 'enrichment-data',
    value: 'enrichment-data',
    label: 'enrichment-data',
  },
  {
    key: 'nf-initial-parameters',
    value: 'nf-initial-parameters',
    label: 'nf-initial-parameters',
  },
];

export type MouseEventHandler = (
  SyntheticMouseEvent<HTMLElement>,
) => void | Promise<void>;

export type ButtonVariant = 'contained' | 'outlined';

export type ButtonColor = 'default' | 'inherit' | 'primary' | 'secondary';

export type Props = $ReadOnly<{|
  className?: string,
  onClickBulk?: ?MouseEventHandler,
  onClickNf?: ?MouseEventHandler,
  disabled?: boolean,
  color?: ButtonColor,
  variant?: ButtonVariant,
|}>;

const ButtonsChangeRequest = (props: Props) => {
  const {
    className,
    disabled,
    onClickBulk,
    onClickNf,
    color = 'primary',
    variant = 'contained',
  } = props;
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState('');

  const fileValidate = value => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = e => {
      const file = e.target.files[0];
      const fileId = shortid.generate();

      if (value == 'enrichment-data') {
        uploadFileNifi(file, fileId);
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          const text = e.target.result;
          onClickBulk(csvToArray(text), file.name);
        };
        reader.readAsText(file);
      }
    };
    input.click();
    setSelectedValue(value);
  };

  return (
    <Grid className={classes.root}>
      <Select
        options={valuesNF}
        selectedValue={selectedValue}
        onChange={value => fileValidate(value)}
      />

      <Button
        onClick={onClickBulk}
        disabled={disabled}
        style={{padding: '10px 16px', margin: '0 0 0 20px'}}
        variant={variant}
        color={color}>
        Create bulk request
      </Button>
    </Grid>
  );
};
export default ButtonsChangeRequest;
