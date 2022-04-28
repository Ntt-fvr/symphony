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
import StepConnector from '@material-ui/core/StepConnector/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiDialogTitle-root': {
      padding: '0',
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  headerSteps: {
    backgroundColor: '#F5F7FC',
    '& .MuiStepLabel-completed': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
  connectorStyle: {
    top: 10,
    left: 'calc(-50% + 1px)',
    right: 'calc(50% + 1px)',
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
}));

const stepCustomIconStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  active: {
    color: '#eaeaf0',
  },
  circle: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));

function customStepIcon(props) {
  const classes = stepCustomIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}>
      {completed ? (
        <div className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

type Props = $ReadOnly<{|
  openModal: boolean,
  onClose: () => void,
  saveModal?: () => void,
  titleSteps: Array<string>,
|}>;

const ModalSteper = (props: Props) => {
  const {openModal, onClose, saveModal, titleSteps} = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const connector = (
    <StepConnector
      className={classes.connectorStyle}
      classes={{
        active: classes.connectorActive,
        completed: classes.connectorCompleted,
        line: classes.connectorLine,
      }}
    />
  );
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSelectedIndex(null);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Dialog
        className={classes.root}
        open={openModal}
        onClose={onClose}
        fullWidth={true}>
        <DialogTitle id="alert-dialog-title">
          <Stepper
            className={classes.headerSteps}
            alternativeLabel
            activeStep={activeStep}
            connector={connector}>
            {titleSteps.map(label => (
              <Step key={label}>
                <StepLabel StepIconComponent={customStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Select a {activeStep === 1 && titleSteps[0]}
            {activeStep === 2 && titleSteps[1]}
          </Typography>
          <List component="nav">
            {titleSteps.length === 1 ? (
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
            ) : (
              <>
                <ListItem
                  button
                  selected={selectedIndex === 0}
                  onClick={event => handleListItemClick(event, 0)}>
                  <ListItemAvatar>
                    <Avatar>
                      <RouterIcon fontSize="medium" color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="OLZ" />
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
                  <ListItemText primary="XYP" />
                </ListItem>
              </>
            )}
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
            onClick={activeStep === titleSteps.length ? saveModal : handleNext}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSteper;
