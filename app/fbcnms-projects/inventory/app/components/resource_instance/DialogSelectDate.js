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
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogConfirmChange from './DialogConfirmChange';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import {SelectDateTime} from './SelectDateTime';
import {StepperDate} from './StepperDate';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    padding: '0',
  },
  dialogActions: {
    padding: '0 24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  option: {
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose: () => void,
  isDialogSelectDate: boolean,
|}>;

const DialogSelectDate = (props: Props) => {
  const {onClose, isDialogSelectDate} = props;
  const [isDialogConfirmChange, setIsDialogConfirmChange] = useState(
    isDialogSelectDate,
  );
  const handleClickOpenConfirmChange = () => {
    setIsDialogConfirmChange(prev => !prev);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="xs"
        open={true}
        onClose={onClose}
        fullWidth={true}
        className={classes.root}>
        {isDialogConfirmChange ? (
          <div>
            <Grid container justify={'center'}>
              <StepperDate />
            </Grid>
            <Card className={classes.title} margins="none" variant={'none'}>
              <Grid container justify={'center'}>
                <CardHeader> Select a date to make the change</CardHeader>
              </Grid>
            </Card>
            <Grid
              container
              hidden={true}
              justify={'center'}
              style={{margin: '0 0 30px 0'}}>
              <SelectDateTime />
            </Grid>
            <DialogActions className={classes.dialogActions}>
              <Button
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClickOpenConfirmChange();
                }}
                className={classes.option}
                variant="contained"
                color="primary">
                Next
              </Button>
            </DialogActions>
          </div>
        ) : (
          <DialogConfirmChange
            onClose={onClose}
            setIsDialogConfirmChange={setIsDialogConfirmChange}
          />
        )}
      </Dialog>
    </div>
  );
};

export default DialogSelectDate;

/**
 * {isDialogConfirmChange && (
        <DialogConfirmChange onClose={handleClickOpenConfirmChange} />
      )}
 * 
 <Grid container justify={'center'}>
          <StepperDate />
        </Grid>
        <Card className={classes.title} margins="none" variant={'none'}>
          <Grid container justify={'center'}>
            <CardHeader> Select a date to make the change</CardHeader>
          </Grid>
        </Card>
        <Grid
          container
          hidden={true}
          justify={'center'}
          style={{margin: '0 0 30px 0'}}>
          <SelectDateTime />
        </Grid>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.option}
            variant="outlined"
            color="primary"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClickOpenConfirmChange();
            }}
            className={classes.option}
            variant="contained"
            color="primary">
            Next
          </Button>
        </DialogActions>
 */
/**
 <Grid container justify={'center'} style={{background: '#F5F7FC'}}>
        <StepperDate />
      </Grid>
      <Card className={classes.title} margins="none" variant={'none'}>
        <Grid container justify={'center'} style={{margin: '10px 0 0 0'}}>
          <Text variant={'h6'} weight={'bold'}>
            Are you sure to execute rollback?
          </Text>
        </Grid>
      </Card>
      <Grid
        container
        hidden={true}
        justify={'center'}
        style={{margin: '0 0 20px 0'}}>
        <Card variant={'none'}>
          <Grid>
            <Card variant={'message'} className={classes.rootCard}>
              <Grid container direction="row">
                <Grid item xs={1}>
                  <InfoOutlinedIcon color={'primary'} fontSize={'medium'} />
                </Grid>
                <Grid item xs={11}>
                  <Text>
                    You will create a new version of configuration for this
                    resource. Are you sure you want to proceed?
                  </Text>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Card>
      </Grid>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={onClose}>
          Back
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          style={{height: '36px'}}
          variant="contained"
          color="primary">
          Create Change Request
        </Button>
      </DialogActions>
 */
