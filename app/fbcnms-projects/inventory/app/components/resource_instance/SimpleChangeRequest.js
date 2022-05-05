/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@material-ui/core/Button';
import CardPlusDnD from '../CardPlusDnD';
import DialogStatus from '../configure/DialogStatus';
import {CardSuggested} from '../CardSuggested';
// import Card from '@symphony/design-system/components/Card/Card';
// import CardHeader from '@symphony/design-system/components/Card/CardHeader';
// import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
// import DialogInformation from './DialogInformation';
// import DialogSelectDate from './DialogSelectDate';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
// import PowerSearchBar from '../power_search/PowerSearchBar';
// import Radio from '@material-ui/core/Radio';
// import Text from '@symphony/design-system/components/Text';
// import {CircleIndicator} from './CircleIndicator';
// import {TableConfigurationParameters} from './TableConfigurationParameters';
// import {TimeLine} from './TimeLine';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    margin: '0',
    padding: '0 0 30px 0 ',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
}));

type Props = $ReadOnly<{|
  handleSimpleChangeRequest: any,
|}>;

const SimpleChangeRequest = (props: Props) => {
  const {handleSimpleChangeRequest} = props;
  const classes = useStyles();
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const handelModal = () => {
    setOpenModalStatus(prevStateOpenModal => !prevStateOpenModal);
  };

  return (
    <Grid className={classes.root}>
      <Grid
        style={{padding: '20px 0'}}
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
            onClick={handleSimpleChangeRequest}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={() => handelModal()}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <CardPlusDnD />
      </Grid>
      <Grid>
        <CardSuggested />
      </Grid>
      {openModalStatus && (
        <DialogStatus
          onClick={() => handleSimpleChangeRequest()}
          open={openModalStatus}
          onClose={() =>
            setOpenModalStatus(prevStateOpenModal => !prevStateOpenModal)
          }
        />
      )}
    </Grid>
  );
};

export {SimpleChangeRequest};
