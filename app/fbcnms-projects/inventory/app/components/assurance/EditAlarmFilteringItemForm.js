/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

import TextInput from '@symphony/design-system/components/Input/TextInput';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

import type {EditAlarmFilterMutationVariables} from '../../mutations/__generated__/EditAlarmFilterMutation.graphql';

import Switch from '@symphony/design-system/components/switch/Switch';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';

import type {RemoveAlarmFilterMutationVariables} from '../../mutations/__generated__/RemoveAlarmFilterMutation.graphql';

import EditAlarmFilterMutation from '../../mutations/EditAlarmFilterMutation';

import RemoveAlarmFilterMutation from '../../mutations/RemoveAlarmFilterMutation';
import {AlarmFilteringStatus} from './AlarmFilteringStatus';
import {DARK} from '@symphony/design-system/theme/symphony';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px',
  },
  header: {
    marginBottom: '1rem',
  },
  gridStyleLeft: {
    paddingRight: '0.5rem',
  },
  gridStyleRight: {
    paddingLeft: '0.5rem',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  calendar: {
    '& .MuiOutlinedInput-input': {
      height: '12px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
    },
  },
}));

type Props = $ReadOnly<{|
  closeEditForm: () => void,
  formValues: {
    item: {
      id: string,
      name: string,
      networkResource: string,
      enable: boolean,
      beginTime: string,
      endTime: string,
      reason: string,
      user: string,
      creationTime: string,
      alarmStatus: {
        id: string,
        name: string,
      },
    },
  },
|}>;

const EditAlarmFilteringItemForm = (props: Props) => {
  const {closeEditForm, formValues} = props;
  const classes = useStyles();
  const id = useFormInput(formValues.item.id);
  const name = useFormInput(formValues.item.name);
  const networkResource = useFormInput(formValues.item.networkResource);
  const beginTime = useFormInput(
    moment(formValues.item.beginTime).format('YYYY-MM-DDThh:mm'),
  );
  const endTime = useFormInput(
    moment(formValues.item.endTime).format('YYYY-MM-DDThh:mm'),
  );
  const reason = useFormInput(formValues.item.reason);
  const creationTime = useFormInput(formValues.item.creationTime);
  const [checked, setChecked] = useState(formValues.item.enable);

  const handleRemove = id => {
    const variables: RemoveAlarmFilterMutationVariables = {
      id: id,
    };
    RemoveAlarmFilterMutation(variables);
  };

  function handleClickEdit() {
    const variables: EditAlarmFilterMutationVariables = {
      input: {
        id: id.value,
        name: name.value,
        networkResource: networkResource.value,
        enable: checked,
        beginTime: moment(beginTime.value).format(),
        endTime: moment(endTime.value).format(),
        reason: reason.value,
      },
    };
    EditAlarmFilterMutation(variables);
  }

  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Grid xs>
            <Text variant="h6" weight="bold">
              {fbt('Edit Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid>
            <IconButton style={{marginRight: '1rem'}}>
              <DeleteOutlinedIcon
                style={{color: DARK.D300}}
                icon={DeleteOutlinedIcon}
                onClick={() => {
                  handleRemove(formValues.item.id);
                  closeEditForm();
                }}
              />
            </IconButton>
          </Grid>
          <Grid>
            <FormField>
              <Button
                style={{marginRight: '1rem'}}
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={() => closeEditForm()}>
                Cancel
              </Button>
            </FormField>
          </Grid>
          <Grid>
            <FormField>
              <Button
                onClick={() => {
                  handleClickEdit();
                  closeEditForm();
                }}
                className={classes.option}
                variant="contained"
                color="primary">
                Save
              </Button>
            </FormField>
          </Grid>
        </Grid>
        <Grid xs>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                <FormField label="Enabled">
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField label="Name">
                  <TextInput {...name} autoComplete="off" name="name" />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={12}>
                  <FormField label="Network Resource">
                    <TextInput
                      {...networkResource}
                      autoComplete="off"
                      name="networkResource"
                    />
                  </FormField>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField label="Reason">
                  <TextInput
                    {...reason}
                    autoComplete="off"
                    type="multiline"
                    rows={4}
                    name="reason"
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField label="Start">
                    <TextField
                      {...beginTime}
                      className={classes.calendar}
                      autoComplete="off"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField label="End">
                    <TextField
                      {...endTime}
                      className={classes.calendar}
                      autoComplete="off"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid
                  item
                  xs={4}
                  lg={3}
                  xl={2}
                  className={classes.gridStyleLeft}
                  style={{marginTop: '25px'}}>
                  <AlarmFilteringStatus
                    creationDate={creationTime.value}
                    beginDate={beginTime.value}
                    endDate={endTime.value}
                  />
                </Grid>
                <Grid
                  item
                  xs={8}
                  lg={9}
                  xl={10}
                  className={classes.gridStyleRight}>
                  <FormField label="ID">
                    <TextInput name="id" disabled {...id} />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default EditAlarmFilteringItemForm;
