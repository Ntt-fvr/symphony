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
import Button from '@symphony/design-system/components/Button';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
import {BLUE} from '@symphony/design-system/theme/symphony';
import {Checkbox, Dialog, FormControlLabel} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  dialogContainer: {
    position: 'relative',
    padding: '30px 50px',
    maxWidth: '100%',
    '& .MuiFormControlLabel-root': {
      marginRight: '0',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    '& svg': {
      color: BLUE.B600,
      cursor: 'pointer',
    },
  },
  infoContainer: {
    margin: '3.5rem 5px 20px 5px',
    backgroundColor: BLUE.B50,
    display: 'flex',
    border: `1px solid ${BLUE.B600}`,
    borderRadius: '5px',
    padding: '15px 20px',
    gap: '15px',
    '& .left': {
      '& svg': {
        fontSize: '26px',
        color: BLUE.B600,
      },
    },
    '& .right': {
      display: 'flex',
      flexDirection: 'column',
      '& .deleteText': {
        fontWeight: 'bolder',
      },
    },
  },
  btnOutlined: {
    background: 'white!important',
    border: `2px solid ${BLUE.B600}`,
    marginRight: '10px',
    '& span': {
      color: `${BLUE.B400}!important`,
    },
  },
}));

const InfoBlock = ({title, text}) => {
  const classes = useStyles();
  return (
    <div className={classes.infoContainer}>
      <div className="left">
        <InfoOutlinedIcon />
      </div>
      <div className="right">
        <Text variant="body1" className="deleteText">
          {title}
        </Text>
        <Text variant="body1">{text}</Text>
      </div>
    </div>
  );
};

type Props = $ReadOnly<{|
  showCheck: boolean,
  title: string,
  text: string,
|}>;

const SingleActionDialog = ({showCheck, title, text}: Props) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth={true} maxWidth="sm" open={true}>
      <div className={classes.dialogContainer}>
        <div className={classes.closeIcon}>
          <CloseIcon />
        </div>
        <InfoBlock title={title} text={text} />
        {showCheck && (
          <DialogActions>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={state.checkedB}
                  // onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Do not show this message again"
            />
          </DialogActions>
        )}
        <DialogActions>
          <Button
            className={classes.btnOutlined}
            color="primary"
            // onClick={() => openModal()}
          >
            Cancel
          </Button>
          <Button>Continue</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default SingleActionDialog;
