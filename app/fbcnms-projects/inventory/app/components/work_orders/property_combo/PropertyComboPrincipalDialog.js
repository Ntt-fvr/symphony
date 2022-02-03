/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@symphony/design-system/components/IconButton';
import PropertyComboCompleted from './PropertyComboCompleted';
import PropertyComboSelectContent from './PropertyComboSelectContent';
import React, {useState} from 'react';
import {CloseIcon} from '@symphony/design-system/icons';
import {GREEN} from '@symphony/design-system/theme/symphony';
import {PropertyType} from '../../../common/PropertyType';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    color: 'black',
  },
  avatar: {
    backgroundColor: '#e4f2ff',
  },
  dialogTitle: {
    textAlign: 'end',
  },
  dialogTitleText: {
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    marginBottom: '14px',
  },
  tableTitleText: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 400,
    marginBottom: '14px',
  },
  dialogContent: {
    margin: '0rem 1rem',
    height: '400px',
  },
  dialogActions: {
    padding: '24px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  tableHeader: {
    justifyContent: 'space-between',
    padding: '20px 0px',
  },
  dialogTitleContainer: {
    paddingBottom: '30px',
  },
  arrowIcon: {
    textAlign: 'center',
    fontSize: '16px',
  },
  header: {
    margin: '4px',
  },
  containerIcon: {
    paddingBottom: '1rem',
  },
  icon: {
    fontSize: '80px',
    color: GREEN.G600,
  },
  dialogItalicText: {
    fontSize: '14px',
    fontWeight: 500,
    fontStyle: 'italic',
    margin: '12px 0px 20px',
  },
  center: {
    textAlign: 'center',
  },
  completedContent: {
    width: '50%',
    alignSelf: 'center',
  },
  selectInput: {
    width: '100%',
  },
}));

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
  property: PropertyType,
  onSave: () => void,
|}>;

const PropertyComboPrincipalDialog = (props: Props) => {
  const {open, onClose, property, onSave} = props;
  const [showCompleteMessage, setShowCompleteMessage] = useState<boolean>(
    false,
  );
  const classes = useStyles();

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <DialogTitle className={classes.dialogTitle} onClose={true}>
        <IconButton skin="primary" icon={CloseIcon} onClick={onClose} />
      </DialogTitle>
      {showCompleteMessage ? (
        <PropertyComboCompleted classes={classes} />
      ) : (
        <PropertyComboSelectContent
          onClose={onClose}
          classes={classes}
          property={property}
          onSave={onSave}
          setShowCompleteMessage={setShowCompleteMessage}
        />
      )}
    </Dialog>
  );
};

export default PropertyComboPrincipalDialog;
