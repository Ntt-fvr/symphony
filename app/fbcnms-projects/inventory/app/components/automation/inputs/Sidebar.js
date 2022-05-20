/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import React, {useState, useContext} from 'react';
import {DARK} from '@symphony/design-system/theme/symphony';
import {Drawer, IconButton} from '@material-ui/core';
import {MenuCloseIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/core/styles';

const Sidebar = ({
  drawerWidth,
  smallWidth,
  top,
  title,
  openDefault,
  children,
  collapsed,
}) => {

  const [open, setOpen] = useState(openDefault ? openDefault : false);

  const useStyles = makeStyles(theme => {
    return {
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: smallWidth
          ? theme.spacing(0, 1, 0, open ? 0 : 2)
          : theme.spacing(0, 1, 0, 2),
        position: 'fixed',
        top: top ? top : 0,
        width: 'inherit',
        backgroundColor: '#FFF',
        zIndex: 2,
        minHeight: top ? top : 64,
      },
      hide: {
        display: 'none',
      },
      drawer: {
        height: '100%',
        width: drawerWidth ? drawerWidth : 240,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          position: 'relative',
          overflow: 'hidden',
          paddingTop: top ? 0 : 64,
          borderRightWidth: 0,
          '&:hover': {
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-thumb': {
              border: '4px solid rgba(0, 0, 0, 0)',
              backgroundClip: 'padding-box',
              borderRadius: 9999,
              backgroundColor: 'transparent',
            },
          },
        },
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `${smallWidth ? smallWidth : '73'}px !important`,
      },
      iconMenu: {
        padding: smallWidth ? 8 : 12,
        backgroundColor: 'transparent',
        color: DARK.D400,
        fill: DARK.D400,
        '& svg': {
          fill: DARK.D400,
        },
        '&:hover': {
          color: theme.palette.primary.main,
          fill: theme.palette.primary.main,
          backgroundColor: 'transparent',
          '& svg': {
            color: theme.palette.primary.main,
            fill: theme.palette.primary.main,
          },
        },
      },
    };
  });
  const classes = useStyles();

  const handleCollapsed = () => {
    if (open) {
      setOpen(false);
      collapsed(false);
    } else {
      setOpen(true);
      collapsed(true);
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={`${classes.drawer} ${
        open ? classes.drawerClose : classes.drawerOpen
      }`}
      classes={{
        paper: open ? classes.drawerClose : classes.drawerOpen,
      }}>
      <div className={classes.toolbar}>
        {!open && title}
        <IconButton
          disableTouchRipple={true}
          color="secondary"
          className={classes.iconMenu}
          onClick={() => handleCollapsed()}>
          {openDefault ? (
            open ? (
              <MenuOpenIcon />
            ) : (
              <MenuCloseIcon />
            )
          ) : open ? (
            <MenuCloseIcon />
          ) : (
            <MenuOpenIcon />
          )}
        </IconButton>
      </div>
      {children}
    </Drawer>
  );
};

export default Sidebar;
