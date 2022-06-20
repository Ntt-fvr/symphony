/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import DialogMapping from '../configure/DialogMapping';
import React, {useState} from 'react';
import SubjectIcon from '@material-ui/icons/Subject';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  mapping: {
    cursor: 'pointer',
    color: '#8895AD',
  },
}));

type Props = $ReadOnly<{|
  title?: string,
  open?: boolean,
  parameter: any,
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
