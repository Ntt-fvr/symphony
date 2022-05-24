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
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import DialogExecuteNow from './common/DialogExecuteNow';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  CardContiner: {
    padding: '0',
  },
  titleCard: {
    color: symphony.palette.D400,
    paddingBottom: '16px',
  },
  subTitle: {
    color: symphony.palette.D400,
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '36px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  option: {
    width: '75px',
    height: '36px',
    marginLeft: '24px',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 43, 0.15)',
  },
  searchBar: {
    flexGrow: 1,
  },
  selectField: {
    width: '200px',
    '& .MuiSelect-selectMenu ': {
      height: '16px',
    },
  },
  tableInside: {
    height: '280px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose?: () => void,
  returnSheduledAction?: () => void,
  goBack?: () => void,
|}>;

const data = {
  actionTempleate: 'Sleep',
  resourceSpecification: 'RNCellDU_Nokia_MLN1_3132331',
};
const ActionPickerScheduled = (props: Props) => {
  const {returnSheduledAction, goBack} = props;
  const [openDialogExecuteNow, setOpenDialogExecuteNow] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleOpenModal = () => {
    setOpenDialogExecuteNow(
      prevStateDialogExecuteNow => !prevStateDialogExecuteNow,
    );
  };

  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12}>
        <Grid style={{marginBottom: '26px'}} container direction="column">
          <Text className={classes.titleCard} variant="h6" weight="bold">
            Scheduled the action
          </Text>
          <Text className={classes.subTitle} variant="subtitle2">
            Select one of the following actions to the schedule the action or
            run right now with the "Execute Now" button.
          </Text>
        </Grid>
        <Grid
          style={{
            paddingBottom: '19px',
            marginBottom: '30px',
            borderBottom: '1px solid',
            color: symphony.palette.D100,
          }}
          container
          direction="row"
          spacing={3}>
          <Grid item xs={5}>
            <Checkbox
              checked={checked}
              title="Select All"
              onChange={() => setChecked(prevStateChecked => !prevStateChecked)}
            />
            <Checkbox
              checked={checked}
              title="Select All"
              onChange={() => setChecked(prevStateChecked => !prevStateChecked)}
            />
            <Checkbox
              checked={checked}
              title="Select All"
              onChange={() => setChecked(prevStateChecked => !prevStateChecked)}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            className={classes.option}
            variant="outlined"
            color="primary"
            onClick={() => {
              goBack();
            }}>
            Back
          </Button>
          <Button
            onClick={() => {
              handleOpenModal();
            }}
            className={classes.option}
            variant="contained"
            color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
      {openDialogExecuteNow && (
        <DialogExecuteNow dataRow={data} onClose={handleOpenModal} />
      )}
    </div>
  );
};

export default ActionPickerScheduled;
