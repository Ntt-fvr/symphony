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
import Card from '@symphony/design-system/components/Card/Card';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import TableConfigurtionParameter from './TableConfigurtionParameter';
import Text from '@symphony/design-system/components/Text';
import {StepperName} from './StepperName';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    padding: '0',
  },
  dialogActions: {
    padding: '0 24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  option: {
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose: () => void,
  isEdit?: boolean,
  actionDetails?: {},
  setIsDialogConfirmChange: any,
  activeStep: any,
  handleBackStep: any,
  resourceSpecification: string,
  handleSave: () => void,
|}>;

const DialogConfigurationParameter = (props: Props) => {
  const {
    onClose,
    isEdit,
    actionDetails,
    setIsDialogConfirmChange,
    activeStep,
    handleBackStep,
    resourceSpecification,
    handleSave,
    handleUpdate,
  } = props;
  const [actionItems, setActionItems] = useState(
    isEdit ? actionDetails.actionTemplateItem : [],
  );

  const handleDisabled = () => {
    return !(
      actionItems.filter(item => !item.isDeleted).length > 0 &&
      actionItems
        .filter(item => !item.isDeleted)
        .every(item => !!(item.parameters.id && item.value.stringValue))
    );
  };

  const classes = useStyles();
  const handleBack = () => {
    setIsDialogConfirmChange(prev => !prev);
  };
  return (
    <div>
      <Grid container justify={'center'} style={{background: '#F5F7FC'}}>
        <StepperName activeStep={activeStep} />
      </Grid>
      <Card className={classes.title} margins="none" variant={'none'}>
        <Grid container justify={'center'} style={{margin: '10px 0 0 0'}}>
          <Text variant={'h6'} weight={'bold'}>
            Configuration Parameter
          </Text>
        </Grid>
      </Card>
      <Grid style={{margin: '20px 30px 20px 30px'}} item xs={12}>
        <TableConfigurtionParameter
          resourceSpecification={resourceSpecification}
          actionItems={actionItems}
          setActionItems={setActionItems}
        />
      </Grid>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={() => {
            onClose();
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleBack();
            handleBackStep();
          }}
          style={{height: '36px'}}
          variant="contained"
          color="primary">
          Back
        </Button>
        <Button
          onClick={() => {
            if (isEdit) {
              handleUpdate(actionItems);
            } else {
              handleSave(actionItems);
            }
            onClose();
          }}
          style={{height: '36px'}}
          variant="contained"
          disabled={handleDisabled()}
          color="primary">
          {isEdit ? 'update' : 'save'}
        </Button>
      </DialogActions>
    </div>
  );
};

export default DialogConfigurationParameter;
