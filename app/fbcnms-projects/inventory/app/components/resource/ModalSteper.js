/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddButton from '../assurance/common/AddButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React, {useState} from 'react';
import RouterIcon from '@material-ui/icons/Router';
import SearchIcon from '@material-ui/icons/Search';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiDialogTitle-root': {
      padding: '0',
    },
    '& .MuiDialog-paperScrollPaper': {
      height: '75%',
    },
  },
  backButton: {
    height: '32px',
    marginRight: theme.spacing(1),
  },
  headerSteps: {
    backgroundColor: symphony.palette.D10,
    '& .MuiStepLabel-label': {
      color: symphony.palette.D400,
    },
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
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      color: symphony.palette.D300,
      height: '30px',
      '& .Mui-focused.MuiOutlinedInput-notchedOutline': {
        border: '1px solid black',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '4px',
        borderWidth: '1px',
        borderColor: symphony.palette.D300,
      },
      '& .MuiOutlinedInput-notchedOutline:hover': {
        borderColor: symphony.palette.D100,
      },
    },
  },
}));

const stepCustomIconStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 20,
    alignItems: 'center',
    zIndex: 1,
  },

  point: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    backgroundColor: '#eaeaf0',
    border: '1px solid #8895AD',
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
  const {completed} = props;

  return (
    <div className={classes.root}>
      {completed ? (
        <div className={classes.completed} />
      ) : (
        <div className={classes.point} />
      )}
    </div>
  );
}

type Props = $ReadOnly<{|
  openModal: boolean,
  titleSteps: Array<string>,
  dataListStepper: any,
  onClose: () => void,
  saveModal: (selectedResourceType: {}) => void,
  addButtonLink?: (selectedResourceType: {}) => void,
|}>;

const ModalSteper = (props: Props) => {
  const {
    openModal,
    onClose,
    saveModal,
    titleSteps,
    dataListStepper,
    addButtonLink,
  } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [getDataList, setGetDataList] = useState({});
  const [searchData, setSearchData] = useState('');

  const connector = (
    <StepConnector
      className={classes.connectorStyle}
      classes={{
        completed: classes.connectorCompleted,
        line: classes.connectorLine,
      }}
    />
  );

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSelectedIndex(null);
  };

  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    setGetDataList(item.node);
  };

  const searchResourceType = dataListStepper?.resourceTypes?.edges.filter(
    item =>
      item.node?.name
        .toString()
        .toLowerCase()
        .includes(searchData.toLocaleLowerCase()),
  );

  const searchRSpecifications = dataListStepper?.resourceSpecifications?.edges.filter(
    item =>
      item.node?.name
        .toString()
        .toLowerCase()
        .includes(searchData.toLocaleLowerCase()),
  );

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
          <Typography variant="h6" align="center" style={{margin: '1rem 0'}}>
            Select a {activeStep === 1 && titleSteps[0]}
            {activeStep === 2 && titleSteps[1]}
            {activeStep === 3 && titleSteps[2]}
          </Typography>
          <TextField
            className={classes.textField}
            placeholder="Label"
            color="primary"
            type="text"
            variant="outlined"
            value={searchData}
            autoComplete="off"
            onChange={event => setSearchData(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {titleSteps.length >= 2 ? (
            <>
              {activeStep === 1 &&
                searchResourceType.map((item, index) => (
                  <List component="nav">
                    <ListItem
                      button
                      key={item.node?.id}
                      selected={selectedIndex === index}
                      onClick={event =>
                        handleListItemClick(event, index, item)
                      }>
                      <ListItemAvatar>
                        <Avatar>
                          <RouterIcon fontSize="medium" color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.node?.name} />
                    </ListItem>
                  </List>
                ))}
              {activeStep === 2 &&
                searchRSpecifications.map((item, index) => (
                  <List component="nav">
                    <ListItem
                      button
                      key={item.node.id}
                      selected={selectedIndex === index}
                      onClick={event =>
                        handleListItemClick(event, index, item)
                      }>
                      <ListItemAvatar>
                        <Avatar>
                          <RouterIcon fontSize="medium" color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.node.name} />
                    </ListItem>
                  </List>
                ))}
              {activeStep === 3 &&
                searchRSpecifications.map((item, index) => (
                  <List component="nav">
                    <ListItem
                      button
                      key={item.node.id}
                      selected={selectedIndex === index}
                      onClick={event =>
                        handleListItemClick(event, index, item)
                      }>
                      <ListItemAvatar>
                        <Avatar>
                          <RouterIcon fontSize="medium" color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.node.name} />
                    </ListItem>
                  </List>
                ))}
            </>
          ) : (
            searchRSpecifications.map((item, index) => (
              <List component="nav">
                <ListItem
                  button
                  key={item.node.id}
                  selected={selectedIndex === index}
                  onClick={event => handleListItemClick(event, index, item)}>
                  <ListItemAvatar>
                    <Avatar>
                      <RouterIcon fontSize="medium" color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.node.name} />
                </ListItem>
              </List>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs>
              {activeStep === 3 && (
                <AddButton
                  disabled={selectedIndex !== null ? true : false}
                  textButton="New Resource"
                  onClick={() =>
                    !addButtonLink ? undefined : addButtonLink(getDataList)
                  }
                />
              )}
            </Grid>
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
              onClick={
                activeStep === titleSteps.length
                  ? () => saveModal(getDataList)
                  : handleNext
              }>
              Next
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSteper;
