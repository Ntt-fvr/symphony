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
import React, {useState} from 'react';
import Strings from '@fbcnms/strings/Strings';
import TextInput from '@symphony/design-system/components/Input/TextInput';
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
  onSave: (newDescription: string) => void,
};

function EditFlowDescriptionDialog(props: Props) {
  const classes = useStyles();
  const {onClose, onSave} = props;
  const [description, setDescription] = useState('');

  const saveFlow = () => {
    onSave(description);
  };

  return (
    <FormContextProvider permissions={{adminRightsRequired: true}}>
      <div className={classes.wrapper}>
        <TextInput
          type="multiline"
          placeholder={fbt('Describe this flow...', '')}
          rows={4}
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <div className={classes.actionButtons}>
          <Button
            className={classes.actionButton}
            onClick={onClose}
            skin="gray">
            {Strings.common.cancelButton}
          </Button>
          <FormAction disableOnFromError={true}>
            <Button className={classes.actionButton} onClick={saveFlow}>
              <fbt desc="">Apply</fbt>
            </Button>
          </FormAction>
        </div>
      </div>
    </FormContextProvider>
  );
}

export default EditFlowDescriptionDialog;
