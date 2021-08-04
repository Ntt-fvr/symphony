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

import Accordion from '@material-ui/core/Accordion';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
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
  },
  insideContainer: {
    padding: '9px 15px',
  },
  bold: {
    fontWeight: 'bold',
  },

  editIcon: {
    margin: '0px',
  },
  deleteIcon: {
    margin: '0px',
    color: DARK.D300,
  },
  inside: {
    margin: '8px 0',
    display: 'flex',
    alignItems: 'center',
  },
  kqiName: {
    justifyContent: 'flex-start',
  },
  iD: {
    justifyContent: 'center',
    paddingRight: '14rem',
  },
  contIconDelete: {
    justifyContent: 'flex-end',
  },
  contIconEdit: {
    paddingLeft: '',
    justifyContent: 'center',
  },
  inter: {
    border: '1px solid red',
  },
}));

const KqiSourcesTypeItem = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card margins={'none'} className={classNames(classes.container)}>
        <Grid container className={classes.insideContainer}>
          <Grid xs={3} className={classNames(classes.inside, classes.kqiName)}>
            <Button
              onClick={props.edit}
              variant="text"
              className={classes.bold}>
              <Text weight={'bold'} color={'primary'}>
                TLLI Availability
              </Text>
            </Button>
          </Grid>

          <Grid xs={7} className={classNames(classes.inside, classes.iD)}>
            <Text className={classes.bold}>1101623842021</Text>
          </Grid>

          <Grid
            xs={1}
            className={classNames(classes.inside, classes.contIconDelete)}>
            <DeleteOutlinedIcon className={classes.deleteIcon} />
          </Grid>
          <Grid
            xs={1}
            className={classNames(classes.inside, classes.contIconEdit)}>
            <IconButton
              className={classes.editIcon}
              icon={EditIcon}
              onClick={props.edit}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export default KqiSourcesTypeItem;
