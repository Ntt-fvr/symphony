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
import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';

import Button from '@symphony/design-system/components/Button';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

// import {useEffect, useState} from 'react';
// import {useGraph} from '../canvas/graph/GraphContext';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '4px',
  },
  header: {
    backgroundColor: symphony.palette.background,
    padding: '2px',
    textAlign: 'center',
  },
  body: {
    padding: '8px 0',
  },
  blockType: {
    border: `1px solid ${symphony.palette.D50}`,
    width: '100%',
    height: '80px',
    '&:hover': {
      borderColor: symphony.palette.primary,
    },
    '&:not(:last-child)': {
      marginBottom: '8px',
    },
  },
}));

export type BlocksCategoryProps = $ReadOnly<{|
  header: string,
  blockTypes: $ReadOnlyArray<IBlockType>,
|}>;

function blockTypeClickHanlder(blocType: IBlockType): MouseEventHandler {
  return () => {
    blocType.createBlock();
  };
}

export default function BlocksCategory(props: BlocksCategoryProps) {
  const {header, blockTypes} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Text variant="subtitle2">{header}</Text>
      </div>
      <div className={classes.body}>
        {blockTypes.map(blockType => {
          const PresentationComponent = blockType.presentationComponent;
          return (
            <Button
              skin="regular"
              className={classes.blockType}
              onClick={blockTypeClickHanlder(blockType)}>
              <PresentationComponent />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
