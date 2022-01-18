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
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '5px',
  },
  bold: {
    fontWeight: 'bold',
  },
  editIcon: {
    paddingLeft: '10px',
  },
  deleteIcon: {
    color: symphony.palette.D300,
  },
  inside: {
    margin: 'auto 0',
  },
  contIconViewDetail: {
    paddingRight: '5px',
    justifyContent: 'center',
  },
}));

type Props = $ReadOnly<{|
  handlerData: any,
  viewDetails?: MouseEventHandler,
|}>;

const ServicesRelatedCardItemType = (props: Props) => {
  const {viewDetails, handlerData} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card variant={'none'} margins={'none'}>
        <Grid container>
          <Grid sm={3} className={classes.inside}>
            <DynamicPropertyTypes
              name="Service Type"
              txt={handlerData.item.Type}
            />
          </Grid>
          <Grid sm={3} className={classes.inside}>
            <DynamicPropertyTypes name="Service Id" txt={handlerData.item.Id} />
          </Grid>
          <Grid sm={3} md={3} lg={4} className={classes.inside}>
            <DynamicPropertyTypes
              name="Description"
              txt={handlerData.item.Description}
            />
          </Grid>

          <Grid
            container
            alignContent="center"
            justify="flex-end"
            sm={2}
            md={1}
            className={classes.contIconViewDetail}>
            <DeleteOutlinedIcon className={classes.deleteIcon} />

            <IconButton className={classes.editIcon} icon={EditIcon} />
          </Grid>
          <Grid
            container
            alignContent="center"
            justify="flex-end"
            sm={1}
            md={2}
            lg={1}
            className={classes.contIconViewDetail}>
            <Button variant="text" onClick={viewDetails}>
              <Text useEllipsis={true} weight={'bold'} color={'primary'}>
                View details
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export default ServicesRelatedCardItemType;
