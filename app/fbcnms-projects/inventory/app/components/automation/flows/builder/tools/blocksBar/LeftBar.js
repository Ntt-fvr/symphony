/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';
import Sidebar from '../../widgets/detailsPanel/inputs/Sidebar';
import useSettingsPanel from '../../widgets/detailsPanel/useSettingsPanel';
import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: 0,
    top: 67,
    paddingTop: 60,
    height: 'calc(100vh - 67px)',
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
  },
  root1: {
    position: 'absolute',
    right: 0,
    top: 67,
    paddingTop: 60,
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
    boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
  },
  options: {
    transform: 'translate(0px, 40px) scale(1) rotate(-90deg)',
  },
  instanceDetails: {
    transform: 'translate(0px, 100px) scale(1) rotate(-90deg)',
  },
}));

export default function LeftBar(props) {
  const classes = useStyles();
  const dialogDetails = useSettingsPanel();
  const [open, setOpen] = useState(true);
  const {isReadOnly} = props;

  return (
    <div className={isReadOnly ? open ? classes.root : classes.root1:classes.root}>
      <Sidebar
        drawerWidth={330}
        smallWidth={40}
        top={70}
        openDefault={true}
        title={dialogDetails.title}
        collapsed={value => {
          setOpen(value);
        }}
        children={
          open ? (
            <Typography variant={'subtitle1'} className={isReadOnly? classes.instanceDetails : classes.options}>
              {isReadOnly?'Instance Details':'Options'}
            </Typography>
          ) : (
            dialogDetails.children
          )
        }
      />
    </div>
  );
}
