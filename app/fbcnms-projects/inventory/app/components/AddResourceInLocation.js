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

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Grid from '@material-ui/core/Grid';
import SaveDialogConfirm from '../components/configure/SaveDialogConfirm';
import TextField from '@material-ui/core/TextField';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    // padding: '24px 25px 34px 34px',
    // margin: '0',
  },
  formField: {
    margin: '0 30px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  header: {
    padding: '30px',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: symphony.palette.B50,
    },
  },
  buttonEdit: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
      color: symphony.palette.B600,
    },
  },
}));
type Props = $ReadOnly<{|
  closeFormAddEdit: () => void,
|}>;

export const AddResourceInLocation = (props: Props) => {
  const {closeFormAddEdit} = props;
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Card margins="none">
          <CardHeader className={classes.cardHeader}>
            OltCard_Huawei_H200
          </CardHeader>
          <Grid container>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="External ID"
                  variant="outlined"
                  name="externalID"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={12}>
              <CardHeader className={classes.cardHeader}>Properties</CardHeader>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  label="ID"
                  variant="outlined"
                  name="id"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Administrative Substate"
                  variant="outlined"
                  name="administrativeSubstate"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="In Service Date"
                  variant="outlined"
                  name="inServiceDate"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Out of Service Date"
                  variant="outlined"
                  name="outOfServiceDate"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Install Date"
                  variant="outlined"
                  name="installDate"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={3}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Bandwith from"
                  variant="outlined"
                  name="bandwithFrom"
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={3}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  label="Bandwith to"
                  variant="outlined"
                  name="bandwithTo"
                  fullWidth
                />
              </form>
            </Grid>
          </Grid>
          <Grid
            className={classes.header}
            container
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttons}
                style={{marginRight: '1rem'}}
                onClick={() => closeFormAddEdit()}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={() => setDialogOpen(true)}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {dialogOpen && (
        <SaveDialogConfirm
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          // saveItem={() => handleEdit()}
          resource={''}
          typeAlert={'warning'}
          customMessage="are you sure you want to leave without saving changes?"
          customTitle="Resource Creation"
        />
      )}
    </div>
  );
};
