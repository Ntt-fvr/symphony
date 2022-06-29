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
import Grid from '@material-ui/core/Grid';
import {CardSuggested} from '../CardSuggested';
import {isTempId} from '../../common/EntUtils';
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

const DEFAULT_DATA_SCHEDULE = {
  date: new Date(),
  day: 'MONDAY',
  type: 'AS_SOON_AS_APPROVED',
};

const SimpleChangeRequest = (props: Props) => {
  const {handleSimpleChangeRequest, cmVersion, resource} = props;
  const [parameters, setParameters] = useState([]);
  const [schedule, setSchedule] = useState(DEFAULT_DATA_SCHEDULE);
  const [description, setDescription] = useState('');
  const classes = useStyles();
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const handelModal = () => {
    setOpenModalStatus(prevStateOpenModal => !prevStateOpenModal);
  };
  const handleOnClose = () => {
    setOpenModalStatus(prevStateOpenModal => !prevStateOpenModal);
    setSchedule(DEFAULT_DATA_SCHEDULE);
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
            disabled={parameters.filter(p => !isTempId(p.id)).length === 0}
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={() => handelModal()}>
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <CardPlusDnD
          onChange={setParameters}
          parameters={parameters}
          cmVersionParams={cmVersion.parameters}
        />
      </Grid>
      <Grid>
        <CardSuggested onSchedule={setSchedule} schedule={schedule} />
      </Grid>
      {openModalStatus && (
        <DialogStatus
          description={description}
          onChangeDescription={setDescription}
          cmVersion={cmVersion}
          schedule={schedule}
          parameters={parameters.filter(p => !isTempId(p.id))}
          onClick={() => handleSimpleChangeRequest()}
          open={openModalStatus}
          resource={resource}
          onClose={handleOnClose}
        />
      )}
    </Grid>
  );
};

export {SimpleChangeRequest};
