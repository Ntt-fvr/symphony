/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';

// DESING SYSTEM //
import type {MouseEventHandler} from '@symphony/design-system/components/Core/Clickable';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DynamicPropertyTypes from './common/DynamicPropertyTypes';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@symphony/design-system/components/IconButton';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '7px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    '&.root': {
      padding: '0px',
    },
  },
  insideContainer: {
    padding: '11px 15px',
  },
  view: {
    display: 'flex',
    alignItems: 'center',
  },
  deleteIcon: {
    marginRight: '10px',
    color: DARK.D300,
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
  viewDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconContainer: {
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.D500,
    width: '48px',
    height: '48px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...symphony.typography.h5,
  },
}));

type Props = $ReadOnly<{|
  open: MouseEventHandler,
  Type: string,
  Id: string,
  Description: string,
  AssociatedServices: string,
|}>;

const ServiceTypeCard = (props: Props) => {
  const {open, Type, Id, Description, AssociatedServices} = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card margins="none" className={classes.container}>
        <Grid container className={classes.insideContainer}>
          <Grid item xs={3}>
            <div className={classes.inline}>
              <div className={classes.iconContainer}>
                <LinearScaleIcon />
              </div>
              <Text useEllipsis={true}>
                <DynamicPropertyTypes name="Service type" txt={Type} />
              </Text>
            </div>
          </Grid>
          <Grid item xs={2} sm={3} md={2} className={classes.inline}>
            <Text useEllipsis={true}>
              <DynamicPropertyTypes name="Service ID" txt={Id} />
            </Text>
          </Grid>
          <Hidden only={['sm']}>
            <Grid item xs={3} className={classes.inline}>
              <Text useEllipsis={true}>
                <DynamicPropertyTypes name="Description" txt={Description} />
              </Text>
            </Grid>
          </Hidden>

          <Grid item xs={2} className={classes.inline}>
            <Text useEllipsis={true}>
              <DynamicPropertyTypes
                name="Associated services"
                txt={AssociatedServices}
              />
            </Text>
          </Grid>
          <Grid item sm={2} md={1} className={classes.viewDetails}>
            <DeleteOutlinedIcon className={classes.deleteIcon} />
            <IconButton icon={EditIcon} />
          </Grid>
          <Grid item xs={1} sm={2} md={1} className={classes.viewDetails}>
            <Button variant="text" className={classes.view} onClick={open}>
              <Text useEllipsis={true} weight="bold" color="primary">
                View details
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export default ServiceTypeCard;
