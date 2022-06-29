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
import {csvToArray} from './csvToArray';

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
  const {onClick, infoCSV, nameFile} = props;
  console.log(props);
  const [infoTable, setInfoTable] = useState(props.infoCSV);
  const [nameFileSelected, setNameFileSelected] = useState(props.nameFile);
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(prevStateOpenModal => !prevStateOpenModal);
  };

  const fileValidate = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        setInfoTable(csvToArray(text));
        setNameFileSelected(file.name);
      };
      reader.readAsText(file);
    };
    input.click();
    setSelectedValue(value);
  };

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
                value={nameFileSelected === '' ? nameFile : nameFileSelected}
              />
            </FormField>
          </Grid>
          <Grid item xs={8} container direction="row" alignItems="center">
            <ButtonUpload variant="text" leftIcon={CloudUploadIcon} onClick={fileValidate}>
              Upload file
            </ButtonUpload>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardAccordion title={'Upload change'}>
              <TableResource
                valuesTable={infoTable.length === 0 ? infoCSV : infoTable}
              />
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
