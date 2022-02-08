/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Card from '@symphony/design-system/components/Card/Card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {DARK} from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
    '& .cardContainer': {
      height: '70px',
      padding: '16px',
    },
  },
  deleteIcon: {
    color: DARK.D300,
    cursor: 'pointer',
  },
  containerInner: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 0 15px',
  },
  containerDelete: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.D500,
    width: '38px',
    height: '38px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...symphony.typography.h5,
  },
}));

type Props = $ReadOnly<{|
  item: {
    id: string,
    name: string,
    resourceTypeA: {
      name: string,
    },
    resourceTypeB: {
      name: string,
    },
    resourceRelationshipType: string,
    resourceRelationshipMultiplicity: string,
  },
  handleRemove: () => void,
|}>;

const RelationshipsTypeItemList = (props: Props) => {
  const {handleRemove, item} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        <Grid container>
          <Grid item sm={4}>
            <div className={classes.inline}>
              <div className={classes.iconContainer}>
                <SettingsIcon />
              </div>
              <Text useEllipsis={true} weight={'bold'}>
                {item.resourceTypeA.name}
              </Text>
            </div>
          </Grid>
          <Grid item sm={2} className={classes.containerInner}>
            <Text useEllipsis={true}>
              {item.resourceRelationshipType.toLowerCase()}
            </Text>
          </Grid>
          <Grid item sm={2} className={classes.containerInner}>
            <Text useEllipsis={true}>
              {item.resourceRelationshipMultiplicity.toLowerCase()}
            </Text>
          </Grid>
          <Grid item sm={3} md={3} lg={3} className={classes.containerInner}>
            <Text useEllipsis={true} weight={'bold'}>
              {item.resourceTypeB.name}
            </Text>
          </Grid>
          <Grid item sm={1} className={classes.containerDelete}>
            <DeleteOutlinedIcon
              onClick={handleRemove}
              className={classes.deleteIcon}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export {RelationshipsTypeItemList};
