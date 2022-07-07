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
import Card from '@symphony/design-system/components/Card/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ModalSteper from './ModalSteper';
import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  cardContentFilter: {
    padding: '.5rem',
  },
  cardHeader: {
    '& .MuiCardHeader-title': {
      fontSize: '20px',
    },
  },
}));

type Props = $ReadOnly<{|
  onAddResourceSlot: (selectedResourceType: {}) => void,
  dataListStepper: any,
|}>;

export const ResourceNetworkCard = (props: Props) => {
  const {onAddResourceSlot, dataListStepper} = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogFilter, setOpenDialogFilter] = useState(null);

  const handleClickDialogFilter = event => {
    setOpenDialogFilter(event.currentTarget);
  };
  const handleCloseDialogFilter = () => {
    setOpenDialogFilter(null);
  };

  return (
    <>
      <Card margins="none">
        <Grid container className={classes.cardContentFilter}>
          <Button
            style={{height: '38px', color: symphony.palette.D400}}
            variant="outlined"
            onClick={handleClickDialogFilter}>
            Filter Resource
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={openDialogFilter}
            keepMounted
            open={Boolean(openDialogFilter)}
            onClose={handleCloseDialogFilter}>
            <MenuItem onClick={handleCloseDialogFilter}>Name</MenuItem>
            <MenuItem onClick={handleCloseDialogFilter}>
              Resource External ID
            </MenuItem>
            <MenuItem onClick={handleCloseDialogFilter}>Resource Type</MenuItem>
            <MenuItem onClick={handleCloseDialogFilter}>
              Relationship Type
            </MenuItem>
          </Menu>
        </Grid>
      </Card>
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title="Logical Links"
          action={
            <Button
              variant="contained"
              color="primary"
              style={{height: '36px'}}
              onClick={() => {
                setOpenDialog(true);
              }}>
              Add Logical Link
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography color="primary">Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary">Resource External ID</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary">Resource type</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography color="primary">Relationship Type</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" style={{margin: 0}} />
            </Grid>
            <Grid item xs={3}>
              <Button color="primary" disableRipple>
                <Typography>OLT_1212323434</Typography>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Typography>32243242332</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>OLT</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Logical</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid item xs align="right">
            <Typography>1- 10 of 16</Typography>
          </Grid>
        </CardActions>
      </Card>
      {openDialog && (
        <ModalSteper
          openModal={openDialog}
          onClose={() => setOpenDialog(false)}
          dataListStepper={dataListStepper}
          saveModal={() => setOpenDialog(false)}
          addButtonLink={onAddResourceSlot}
          titleSteps={[
            'Resource type',
            'Resource specification',
            'Resource Instance',
          ]}
        />
      )}
    </>
  );
};
