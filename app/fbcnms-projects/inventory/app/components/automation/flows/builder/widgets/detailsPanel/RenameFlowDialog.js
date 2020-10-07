/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import NameInput from '@fbcnms/ui/components/design-system/Form/NameInput';
import React, {useState} from 'react';
import Strings from '@fbcnms/strings/Strings';
import {FormContextProvider} from '../../../../../../common/FormContext';
import {fbt} from 'fbt';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '480px',
  },
  actionButtons: {
    padding: '24px 0',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  actionButton: {
    '&:not(:last-child)': {
      marginRight: '8px',
    },
  },
}));

type Props = {
  onClose: () => void,
  onSave: (newName: string) => void,
};

function RenameFlowDialog(props: Props) {
  const [name, setName] = useState('');
  const classes = useStyles();
  const {onClose, onSave} = props;
  const saveFlow = () => {
    onSave(name);
  };

  return (
    <FormContextProvider permissions={{adminRightsRequired: true}}>
      <div className={classes.wrapper}>
        <NameInput
          value={name}
          title={fbt('Flow Name', '')}
          onChange={event => setName(event.target.value)}
        />
        <div className={classes.actionButtons}>
          <Button
            className={classes.actionButton}
            onClick={onClose}
            skin="gray">
            {Strings.common.cancelButton}
          </Button>
          <FormAction disabled={!name} disableOnFromError={true}>
            <Button className={classes.actionButton} onClick={saveFlow}>
              <fbt desc="">Apply</fbt>
            </Button>
          </FormAction>
        </div>
      </div>
    </FormContextProvider>
  );
}

export default RenameFlowDialog;
