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
import TableConfigurtionParameter from './TableConfigurtionParameter';
import Text from '@symphony/design-system/components/Text';
import {StepperName} from './StepperName';
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

const DialogConfigurationParameter = (props: Props) => {
  const {onClose, setIsDialogConfirmChange, activeStep, handleBackStep} = props;

  const classes = useStyles();
  const handleBack = () => {
    setIsDialogConfirmChange(prev => !prev);
  };
  return (
    <div>
      <Grid container justify={'center'} style={{background: '#F5F7FC'}}>
        <StepperName activeStep={activeStep} />
      </Grid>
      <Card className={classes.title} margins="none" variant={'none'}>
        <Grid container justify={'center'} style={{margin: '10px 0 0 0'}}>
          <Text variant={'h6'} weight={'bold'}>
            Configuration Parameter
          </Text>
        </Grid>
      </Card>
      {/**tabla** */}
      <Grid style={{margin: '20px 30px 20px 30px'}} item xs={12}>
        <TableConfigurtionParameter />
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
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          style={{height: '36px'}}
          variant="contained"
          color="primary">
          Back
        </Button>
        <Button
          onClick={() => {
            onClose();
          }}
          style={{height: '36px'}}
          variant="contained"
          color="primary">
          save
        </Button>
      </DialogActions>
    </div>
  );
};

export default DialogConfigurationParameter;
