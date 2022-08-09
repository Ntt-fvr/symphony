/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
//  import type {ArchiveFlowMutationVariables} from '../../mutations/__generated__/AddContractMutation.graphql';
//  import ArchiveFlowMutation from '../../../../../mutations/ArchiveFlowMutation';
import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import symphony, {BLUE, YELLOW} from '@symphony/design-system/theme/symphony';
import {Dialog, DialogContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
const useStyles = makeStyles(() => ({
  upContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '24px',
    '& span': {
      maxWidth: '400px',
      marginTop: '32px',
      textAlign: 'center',
    },
  },
  deleteIcon: {
    '& svg': {
      fontSize: '50px',
      color: YELLOW.Y600,
    },
  },
  archiveIcon: {
    '& svg': {
      fontSize: '50px',
      color: '#C4C4C4',
    },
  },
  section: {
    '&:not(:last-child)': {
      paddingBottom: '16px',
      borderBottom: `1px solid ${symphony.palette.separator}`,
    },
    marginBottom: '16px',
  },
  downSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    paddingBottom: '16px',
    '& .MuiButton-outlined': {
      border: '1px solid black',
    },
  },
  btnOutlined: {
    background: 'white!important',
    border: `1px solid ${BLUE.B600}`,
    '& span': {
      color: `${BLUE.B400}!important`,
    },
  },
}));
type Props = $ReadOnly<{|
  icon?: React.Element,
  text?: React.Element,
  isOpen: boolean,
  activeModal?: string,
  openModal: () => void,
|}>;
const ModalDelete = ({icon, text, openModal, infoResource}: Props) => {
  console.log(infoResource);
  const handleClick = () => {
    //  const variables: ArchiveFlowMutationVariables = {
    //    input: {flowID: idFlow},
    //  };
    //  ArchiveFlowMutation(variables, {
    //    onCompleted: () => {
    //      window.location.reload();
    //    },
    //  });
  };
  const classes = useStyles();
  if (openModal) {
    return (
      <Dialog fullWidth={true} maxWidth="sm" open={true}>
        <div className={classes.section}>
          <DialogContent>
            <div className={classes.upContainer}>
              <span className={'archive'}>{icon}</span>
              {text}
            </div>
          </DialogContent>
        </div>
        <div className={classes.downSection}>
          <Button
            className={classes.btnOutlined}
            color="primary"
            onClick={() => openModal()}>
            Cancel
          </Button>
          <Button onClick={handleClick}>Confirm</Button>
        </div>
      </Dialog>
    );
  } else {
    return null;
  }
};
export default ModalDelete;
