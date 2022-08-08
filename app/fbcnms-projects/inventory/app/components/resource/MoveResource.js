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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
// import {graphql} from 'relay-runtime';
import {makeStyles, withStyles} from '@material-ui/core/styles';

// const LocationListQuery = graphql`
//   query MoveResourceQuery {
//     locations {
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `;

// console.log(LocationListQuery);

const LocationListQuery = {
  data: {
    locations: {
      edges: [
        {
          node: {
            id: '219043332096',
            name: 'suba',
          },
        },
        {
          node: {
            id: '219043332097',
            name: 'san fernando',
          },
        },
      ],
    },
  },
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    width: 300,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export default function MoveResource({item}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moveLocation = (id, newLocation) => {
    alert(`se movio ${id} a ${newLocation}`);
  };

  const classes = useStyles();
  const [location, setLocation] = React.useState('');
  const handleChange = event => {
    setLocation(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Move Resource
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Move Resource?</DialogTitle>

        <DialogContent>
          Select Location type
          <DialogContentText id="alert-dialog-description">
            <FormControl className={classes.margin}>
              <InputLabel id="demo-customized-select-label">
                Location
              </InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={location}
                onChange={handleChange}
                input={<BootstrapInput />}>
                {LocationListQuery.data.locations.edges.map(data => (
                  <MenuItem value={data.node.id}>{data.node.name}</MenuItem>
                ))}
              </Select>
              {location}
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              moveLocation(item.id, location);
            }}
            color="primary"
            autoFocus>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
