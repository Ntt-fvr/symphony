/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@material-ui/core/Button';
import ButtonUpload from './common/ButtonUpload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ConfigureTitle from './common/ConfigureTitle';
import DialogStatus from '../configure/DialogStatus';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {CardAccordion} from './common/CardAccordion';
import {CardSuggested} from './common/CardSuggested';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
import {TableResource} from './common/TableResource';
import {makeStyles} from '@material-ui/styles';

const valuesTable = [
  {
    resource: 'RNCellDU_Nokia_MLN1_3132331',
    parameter: 'arfcndu1',
    currentValue: '3960001',
    newValue: '183001',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132332',
    parameter: 'arfcndu2',
    currentValue: '3960002',
    newValue: '183002',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu3',
    currentValue: '3960003',
    newValue: '183003',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu4',
    currentValue: '3960004',
    newValue: '183004',
  },
];

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
  inputUpload: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '0 16px 0px ',
    },
  },
}));

export type Props = $ReadOnly<{|
  onClick: () => void,
|}>;

const ChangeRequestByBulk = (props: Props) => {
  const {onClick ,infoCSV } = props;
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(prevStateOpenModal => !prevStateOpenModal);
  };

  console.log(infoCSV)

  return (
    <div>
      <Grid className={classes.root} container>
        <Grid container direction="row">
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            item
            xs={7}>
            <ConfigureTitle
              title={fbt('Request bulk configuration change', '')}
              subtitle={fbt('', '  ')}
            />
          </Grid>
          <Grid
            style={{padding: '0px 0'}}
            container
            item
            xs={5}
            direction="row"
            justify="flex-end"
            alignItems="center">
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                className={classes.buttons}
                style={{marginRight: '1rem'}}
                onClick={onClick}>
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttons}
                onClick={handleOpenModal}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          style={{padding: '25px 0'}}
          container
          direction="row"
          alignItems="center"
          item
          xs={12}>
          <Grid item xs={4} md={4} lg={3}>
            <FormField>
              <TextInput
                autoFocus={true}
                placeholder="PAHT"
                autoComplete="off"
                className={classes.inputUpload}
              />
            </FormField>
          </Grid>
          <Grid item xs={8} container direction="row" alignItems="center">
            <ButtonUpload variant="text" leftIcon={CloudUploadIcon}>
              Upload file
            </ButtonUpload>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardAccordion
              className={classes.accordionDetails}
              title={'Details'}>
              <FormField>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      style={{width: '100%'}}
                      id="resourceType"
                      label="Resource Type"
                      variant="outlined"
                      name="resourceType"
                    />
                  </Grid>
                </Grid>
              </FormField>
            </CardAccordion>
            <CardAccordion title={'Upload change'}>
              <TableResource valuesTable={infoCSV} />
            </CardAccordion>
            <Grid item xs={6}>
              <CardAccordion title={'Suggested change request schedule'}>
                <CardSuggested />
              </CardAccordion>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openModal && (
        <DialogStatus
          onClose={() =>
            setOpenModal(prevStateOpenModal => !prevStateOpenModal)
          }
          onClick={onClick}
        />
      )}
    </div>
  );
};

export {ChangeRequestByBulk};
