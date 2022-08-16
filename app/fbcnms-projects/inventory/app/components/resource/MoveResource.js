/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MuiAlert from '@material-ui/lab/Alert';
import UpdateResourceMutation from '../../mutations/UpdateResourceMutation';
import {Snackbar, TextField} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/core/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useState} from 'react';

const LocationTypes = graphql`
  query MoveResourceLocationTypesQuery {
    locationTypes {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;

const LocationForType = graphql`
  query MoveResourceLocationForTypeQuery($types: [ID!]) {
    locations(types: $types) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function MoveResource({item, open, setOpen}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [typeLocation, setTypeLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [openSnack, setOpenSnack] = useState(false);

  const Steps = [
    {
      title: 'Select Location Type',
      state: typeLocation,
    },
    {
      title: 'Select Location',
      state: location,
    },
  ];

  const handleClose = () => {
    setActiveStep(0);
    setTypeLocation(null);
    setLocation(null);
    setOpen(false);
  };

  const moveLocation = (id, newLocation) => {
    const variables = {
      input: {
        set: {
          locatedIn: newLocation,
        },
        filter: {
          id: id,
        },
      },
    };

    UpdateResourceMutation(variables, {
      onCompleted: () => {
        setOpen(false);
        setOpenSnack(true);
      },
      onError(e) {
        console.error('error in UpdateResourceMutation', e);
      },
    });
  };

  const maxSteps = Steps.length - 1;

  const handleNext = () => {
    if (activeStep < maxSteps && Steps[activeStep].state) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Move Resource?</DialogTitle>
        <DialogContent>
          {Steps[activeStep].title}
          <DialogContentText id="alert-dialog-description">
            <FormControl className={classes.margin}>
              <ShowAutocomplete
                activeStep={activeStep}
                typeLocation={typeLocation}
                location={location}
                setLocation={setLocation}
                setTypeLocation={setTypeLocation}
                Steps={Steps}
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          {maxSteps > activeStep ? (
            <Button
              variant="contained"
              color="primary"
              disabled={Steps[activeStep].state ? false : true}
              onClick={() => {
                handleNext();
              }}>
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={Steps[activeStep].state ? false : true}
              onClick={() => {
                moveLocation(item.id, location.id);
              }}>
              Move Resource
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <CustomizedSnackbars setOpenSnack={setOpenSnack} openSnack={openSnack} />
    </>
  );
}

function ShowAutocomplete({
  activeStep,
  typeLocation,
  location,
  setLocation,
  setTypeLocation,
  Steps,
}) {
  switch (activeStep) {
    case 1:
      return (
        <Location
          typeLocation={typeLocation}
          location={location}
          setLocation={setLocation}
          activeStep={activeStep}
          Steps={Steps}
        />
      );
    default:
      return (
        <TypeLocation
          typeLocation={typeLocation}
          setTypeLocation={setTypeLocation}
          activeStep={activeStep}
          Steps={Steps}
        />
      );
  }
}

function TypeLocation({typeLocation, setTypeLocation, activeStep, Steps}) {
  const response = useLazyLoadQuery<locationTypes>(LocationTypes, {});

  function refactorResponse() {
    const newArray = [];
    if (response) {
      response.locationTypes.edges.forEach(element => {
        newArray.push(element.node);
      });
    }
    return newArray;
  }

  return (
    <Autocomplete
      options={refactorResponse()}
      getOptionLabel={option => option.name}
      style={{width: 300}}
      value={typeLocation}
      onChange={(event, newValue) => {
        setTypeLocation(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={Steps[activeStep].title}
          variant="outlined"
        />
      )}
    />
  );
}

function Location({typeLocation, location, setLocation, activeStep, Steps}) {
  const response = useLazyLoadQuery<locationTypes>(LocationForType, {
    types: [typeLocation.id],
  });

  function refactorResponse() {
    const newArray = [];
    if (response) {
      response.locations.edges.forEach(element => {
        newArray.push(element.node);
      });
    }
    return newArray;
  }

  return (
    <Autocomplete
      options={refactorResponse()}
      getOptionLabel={option => option.name}
      style={{width: 300}}
      value={location}
      onChange={(event, newValue) => {
        setLocation(newValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={Steps[activeStep].title}
          variant="outlined"
        />
      )}
    />
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbars({setOpenSnack, openSnack}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <div>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          The resource has been moved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
