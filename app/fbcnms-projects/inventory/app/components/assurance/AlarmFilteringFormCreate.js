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

import AlarmFilteringAddDialog from './AlarmFilteringAddDialog';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import InventorySuspense from '../../common/InventorySuspense';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {StatusActive} from './AlarmFilteringStatus';

import Switch from './Switch';

import {makeStyles} from '@material-ui/styles';

import type {AddAlarmFilterMutationVariables} from '../../mutations/__generated__/AddAlarmFilterMutation.graphql';

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 0',
  },
  formFieldStatus: {
    marginTop: '1rem',
  },
  textInput: {
    minHeight: '36px',
  },
  addKpi: {
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '2rem',
  },
  titleButtons: {
    padding: '1rem 1rem 0 1rem',
    alignItems: 'center',
  },
  reason: {
    minHeight: '100px',
  },
}));


type Props = $ReadOnly<{|
  dataValues: Array<string>,
|}>;

type AlarmFilter = {
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
  }
}


const AlarmFilteringFormCreate = (props: Props) => {
  const {dataValues} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(1);


  function handleChange({target}) {
    setAlarmFilter({
      data: {
        ...AlarmFilter.data,
        [target.name]: target.value,
      },
    });
  }
  
  function handleClick() {
    const variables: AddAlarmFilterMutationVariables = {
      input: {
        name: AlarmFilter.data.name,
        networkResource: AlarmFilter.data.networkResource,
        enable: true,
        beginTime: AlarmFilter.data.beginTime,
        endTime: AlarmFilter.data.endTime,
        reason: AlarmFilter.data.reason,
        user: "roman",
        creationTime: "2021-07-16T00:00:00Z",
        alarmStatus:  8589934592,
      },
    };
    AddAlarmFilterMutation(variables);
  }
  const showDialog = () => {
    setDialogOpen(true);
    setDialogKey(dialogKey + 1);
  };
  const hideDialog = () => setDialogOpen(false);

  // if (dialogOpen) {
  //   return (
  //     <InventorySuspense permissions={{entity: 'workorder'}}>
  //       <AlarmFilteringFormCreate />
  //       >
  //       <AlarmFilteringAddDialog
  //         key={`new_work_order_${dialogKey}`}
  //         open={dialogOpen}
  //         onClose={hideDialog}
  //         onWorkOrderTypeSelected={typeId => {
  //           setDialogOpen(false);
  //         }}
  //       />
  //     </InventorySuspense>
  //   );
  // }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid item xs={10}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Create Alarm Filtering', ' ')}
            </Text>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.addKpi}
                    variant="outlined"
                    color="primary">
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    onClick={handleClick}
                    // onClick={showDialog}
                    className={classes.addKpi}
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item xs={1}>
                <FormField label="Enabled">
                  <Switch
                    name="enable"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput
                    className={classes.textInput}
                    name="name"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label="Network Resource"
                  className={classes.formField}>
                  <TextInput
                    className={classes.textInput}
                    name="networkResource"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={5}
                    name="reason"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      name="beginTime"
                      onChange={handleChange}
                      className={''}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      name="endTime"
                      onChange={handleChange}
                      className={''}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    <StatusActive className={classes.formFieldStatus} name="alarmStatus"/>
                  </FormField>
                </Grid>
                <Grid item xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput className={classes.textInput} disabled />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default AlarmFilteringFormCreate;
