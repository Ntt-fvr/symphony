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
import Card from '@symphony/design-system/components/Card/Card';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogMapping from '../configure/DialogMapping';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ParameterTypesTableDispatcher from '../form/context/property_types/ParameterTypesTableDispatcher';
import React, {useState} from 'react';
import SubjectIcon from '@material-ui/icons/Subject';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import inventoryTheme from '../../common/theme';
import {makeStyles} from '@material-ui/styles';
import {useContext} from 'react';
import {useFormInput} from '../assurance/common/useFormInput';

const useStyles = makeStyles(() => ({
  mapping: {
    cursor: 'pointer',
    color: '#8895AD',
  },
}));

type Props = $ReadOnly<{|
  deleteItem?: () => void,
  title?: string,
  open?: boolean,
  parameter: any,
  onClose: () => void,
  parameterTypes?: any,
|}>;

const ButtonDialogMapping = (props: Props) => {
  const {parameter} = props;

  const [openModal, setOpenModal] = useState(false);

  const classes = useStyles();
  const handleModal = () => {
    setOpenModal(preventState => !preventState);
  };
  return (
    <>
      <SubjectIcon className={classes.mapping} onClick={() => handleModal()} />
      {openModal && (
        <DialogMapping
          title={'Mapping'}
          parameter={parameter}
          onClose={handleModal}
        />
      )}
    </>
  );
};

export default ButtonDialogMapping;
