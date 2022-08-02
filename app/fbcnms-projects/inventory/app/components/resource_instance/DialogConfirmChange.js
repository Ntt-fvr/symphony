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
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {StepperDate} from './StepperDate';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    padding: '0',
  },
  rootCard: {
    '&.root': {
      padding: '0px',
    },
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
  setIsDialogConfirmChange: any,
  activeStep: any,
  handleBackStep: any,
|}>;

const DialogConfirmChange = (props: Props) => {
  const {
    onClose,
    setIsDialogConfirmChange,
    activeStep,
    handleBackStep,
    createChangeRequest,
  } = props;
  const classes = useStyles();
  const handleBack = () => {
    setIsDialogConfirmChange(prev => !prev);
  };

  return (
    <div>
      <Grid container justify={'center'} style={{background: '#F5F7FC'}}>
        <StepperDate activeStep={activeStep} />
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
          onClick={() => {
            handleBack();
            handleBackStep();
          }}>
          Back
        </Button>
        <Button
          onClick={() => {
            createChangeRequest();
            onClose();
          }}
          style={{height: '36px'}}
          variant="contained"
          color="primary">
          Create Change Request
        </Button>
      </DialogActions>
    </div>
  );
};

export default DialogConfirmChange;
