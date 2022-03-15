/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import RouterIcon from '@material-ui/icons/Router';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

type Props = $ReadOnly<{|
  openModal: boolean,
  onClose: () => void,
  saveModal: () => void,
|}>;

function getSteps() {
  return ['Resource type', 'Resource specification'];
}

const ModalSteper = (props: Props) => {
  const {openModal, onClose, saveModal} = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSelectedIndex(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Dialog open={openModal} onClose={onClose} fullWidth={true}>
        <DialogTitle id="alert-dialog-title">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography variant="h6"> Select a resource type </Typography>
        </DialogTitle>
        <DialogContent>
          <List component="nav">
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={event => handleListItemClick(event, 0)}>
              <ListItemAvatar>
                <Avatar>
                  <RouterIcon fontSize="medium" color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="CLARK" />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={event => handleListItemClick(event, 1)}>
              <ListItemAvatar>
                <Avatar>
                  <RouterIcon fontSize="medium" color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="OLZ" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={onClose}
            className={classes.backButton}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedIndex !== null ? false : true}
            onClick={activeStep === 1 ? saveModal : handleNext}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSteper;
