/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import ActionTypesTableDispactcher from './context/ActionTypesTableDispactcher';
import AddActionTemplateItemMutation from '../../mutations/AddActionTemplateItem';
import AddActionTemplateMutation from '../../mutations/AddActionTemplate';
import Button from '@material-ui/core/Button';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogConfigurationParameter from './DialogConfigurationParameter';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import React, {useContext, useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import inventoryTheme from '../../common/theme';
import {StepperName} from './StepperName';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    padding: '30px',
  },
  nameTypeAction: {
    '& .MuiInputBase-input:invalid': {
      height: '20px',
    },
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '50%',
  },
  subtitle: {
    margin: '50px 0 20px 0',
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
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose: () => void,
  isDialogSelectDate: boolean,
  resourceSpecification: string,
|}>;

const DialogSelectName = (props: Props) => {
  const {onClose, isDialogSelectDate, resourceSpecification} = props;
  const [isDialogConfirmChange, setIsDialogConfirmChange] = useState(
    isDialogSelectDate,
  );
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const {dispatch} = useContext(ActionTypesTableDispactcher);

  const [activeStep, setActiveStep] = useState(0);
  const [checkedHidden, setCheckedHidden] = useState(false);
  const handleConfirmDate = () => {
    setActiveStep(2);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleClickOpenConfirmChange = () => {
    setIsDialogConfirmChange(prev => !prev);
  };
  const handleChecked = e => {
    setType(e.target.value);
    setCheckedHidden(prevStateChecked => !prevStateChecked);
  };
  const handleName = e => {
    setName(e.target.value);
  };

  const saveAction = items => {
    const itemVariables = {
      input: items.map(i => {
        return {parameters: i.parameters, value: i.value};
      }),
    };
    const response = {
      onCompleted: responsedata => {
        const templateVariables = {
          input: {
            name: name,
            type: type,
            resourceSpecifications: resourceSpecification,
            actionTemplateItem:
              responsedata.addActionTemplateItem.actionTemplateItem,
          },
        };
        AddActionTemplateMutation(templateVariables, {
          onCompleted: templateResponse => {
            dispatch({
              type: 'ADD_ACTION_TYPE',
              value: templateResponse.addActionTemplate.actionTemplate,
            });
          },
        });
      },
    };
    AddActionTemplateItemMutation(itemVariables, response);
  };

  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="md"
        open={true}
        onClose={onClose}
        fullWidth={true}
        className={classes.root}>
        {isDialogConfirmChange ? (
          <div>
            <Grid style={{background: '#F5F7FC'}} container justify={'center'}>
              <StepperName activeStep={activeStep} />
            </Grid>
            <Grid className={classes.title}>
              <CardHeader>Name and Type action</CardHeader>
              <Grid item xs={6}>
                <FormField>
                  <TextField
                    className={classes.nameTypeAction}
                    required
                    label="Name"
                    variant="outlined"
                    name="name"
                    size="small"
                    value={name}
                    onChange={handleName}
                  />
                </FormField>
              </Grid>
              <Grid className={classes.subtitle}>
                <Text variant={'subtitle2'}>Select Type Action</Text>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  style={{paddingBottom: '20px'}}
                  checked={checkedHidden}
                  onClick={handleChecked}
                  value="CONFIGURATION_PARAMETER"
                  control={<Radio color="primary" />}
                  label="Configuration parameter"
                />
                <Divider />
              </Grid>
            </Grid>
            <DialogActions className={classes.dialogActions}>
              <Button
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={() => {
                  onClose();
                  handleBack();
                }}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClickOpenConfirmChange();
                  handleConfirmDate();
                }}
                className={classes.option}
                variant="contained"
                color="primary">
                Next
              </Button>
            </DialogActions>
          </div>
        ) : (
          <DialogConfigurationParameter
            handleBackStep={handleBack}
            activeStep={activeStep}
            onClose={onClose}
            resourceSpecification={resourceSpecification}
            handleSave={items => {
              saveAction(items);
            }}
            setIsDialogConfirmChange={setIsDialogConfirmChange}
          />
        )}
      </Dialog>
    </div>
  );
};

export default DialogSelectName;
