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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveResource from './MoveResource';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: 3,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  left: {
    left: -137,
  },
}));

type Item = {
  belongsTo: Any,
  externalId: Any,
  id: String,
  isDeleted: Boolean,
  lifecycleStatus: Any,
  locatedIn: String,
  location: {id: String, name: String},
  name: String,
  operationalSubStatus: Any,
  planningSubStatus: Any,
  resourceProperties: {}[],
  resourceSName: String,
  resourceSpecification: String,
  resourceTypeName: String,
  typePlanningSubStatus: Any,
  usageSubStatus: Any,
};

type Props = $ReadOnly<{|
  item: Item,
|}>;

export default function ResourceMenudots(props: Props) {
  const {item} = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [openMoveResource, setOpenMoveResource] = useState(false);

  const HandleOpenMoveResource = e => {
    setOpenMoveResource(true);
    handleClose(e);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <div className={classes.root}>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <MoreHorizIcon />
          </Button>
          <Popper
            placement="left-start"
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal>
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}>
                <Paper className={classes.left}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}>
                      <MenuItem
                        onClick={e => {
                          HandleOpenMoveResource(e);
                        }}>
                        Move Resource
                      </MenuItem>
                      <MenuItem onClick={handleClose}>DeleteResource</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <MoveResource
        open={openMoveResource}
        setOpen={setOpenMoveResource}
        item={item}
      />
    </>
  );
}
