/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {IBlockType} from '../../canvas/graph/shapes/blocks/blockTypes/BaseBlockType';

import Button from '@symphony/design-system/components/Button';
import ExpandLess from '@material-ui/icons/ArrowDropDown';
import ExpandMore from '@material-ui/icons/ArrowDropUp';
import React, {useCallback} from 'react';
import classNames from 'classnames';
import useDragAndDropHandler from '../../../utils/useDragAndDropHandler';
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {DARK} from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '& .MuiTypography-body1': {
      fontWeight: 500,
      lineHeight: '16px',
      color: DARK.D400,
      letterSpacing: '1px',
      fontSize: 12,
      textTransform: 'uppercase',
    },
    '& .MuiSvgIcon-root': {
      color: DARK.D400,
    },
    '& .MuiListItem-button:hover': {
      backgroundColor: 'transparent',
    },
  },
  blockType: {
    width: '100%',
    height: '40px',
    padding: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    cursor: 'move',
    '& div[class*="wrapper"]': {
      width: 40,
      height: 40,
      minWidth: 40,
      minHeight: 40,
    },
    '& svg[class*="large"]': {
      width: 40,
      height: 40,
      minWidth: 40,
      minHeight: 40,
    },
    '& > span': {
      width: '100%',
    },
    '&:not(:last-child)': {
      marginBottom: '16px',
    },
  },
}));

export type BlocksCategoryProps = $ReadOnly<{|
  header: string,
  blockTypes: $ReadOnlyArray<IBlockType>,
  collapsed: boolean,
|}>;

export default function BlocksCategory(props: BlocksCategoryProps) {
  const {header, blockTypes} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary={
            <Grid item xs zeroMinWidth>
              <Typography variant={'body1'} noWrap>
                {header}
              </Typography>
            </Grid>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {blockTypes &&
            blockTypes.map((blockType, index) => (
              <ListItem key={index}>
                <Block
                  key={index}
                  blockType={blockType}
                  className={classNames(classes.blockType)}
                />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </List>
  );
}

type BlockProps = $ReadOnly<{|
  blockType: IBlockType,
  className: string,
|}>;

function Block(props: BlockProps) {
  const {blockType, className} = props;
  const PresentationComponent = blockType.presentationComponent;

  const enqueueSnackbar = useEnqueueSnackbar();

  const callCreateBlock = useCallback(
    (position, translateClientCoordinates) => {
      try {
        blockType.createBlock(position, translateClientCoordinates);
      } catch (err) {
        enqueueSnackbar(err, {variant: 'error'});
      }
    },
    [blockType, enqueueSnackbar],
  );

  const onDrop = useCallback(
    (clientX, clientY) => {
      const position = {
        x: clientX,
        y: clientY,
      };
      callCreateBlock(position, true);
    },
    [callCreateBlock],
  );
  const onClick = useCallback(() => {
    callCreateBlock();
  }, [callCreateBlock]);

  const dragAndDropHandler = useDragAndDropHandler(
    PresentationComponent,
    onDrop,
    onClick,
  );

  return (
    <Button
      skin="regular"
      className={className}
      onMouseDown={dragAndDropHandler}>
      <PresentationComponent />
    </Button>
  );
}
