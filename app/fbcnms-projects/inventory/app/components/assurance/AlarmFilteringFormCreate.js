/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState, useRef} from 'react';
import fbt from 'fbt';

import TextInput from '@symphony/design-system/components/Input/TextInput';
import moment from 'moment';

import AlarmFilteringAddDialog from './AlarmFilteringAddDialog';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {AlarmFilteringStatus} from './AlarmFilteringStatus';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';

import Switch from '@symphony/design-system/components/switch/Switch';

import {makeStyles} from '@material-ui/styles';

import type {AddAlarmFilterMutationVariables} from '../../mutations/__generated__/AddAlarmFilterMutation.graphql';

import AddAlarmFilterMutation from '../../mutations/AddAlarmFilterMutation';
import type {AlarmFilteringFormCreateQuery} from './__generated__/AlarmFilteringFormCreateQuery.graphql'

import DateTimeFormat from '../../common/DateTimeFormat.js';
import {useFormInput} from './common/useFormInput';
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import classNames from 'classnames';

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
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  status: {
    paddingTop: '40px',
  },
  time: {
    marginBottom: '13px',
  },
  button: {
    width: '111px',
    height: '36px',
  },
  buttonActive: {
    border: '1px solid #00AF5B',
    color: '#00AF5B',
    fontSize: '14px',
  },
  buttonPending: {
    border: '1px solid #FFB63E',
    color: '#FFB63E',
    fontSize: '14px',
  },
  buttonClosed: {
    border: '1px solid #8895AD',
    color: '#8895AD',
    fontSize: '14px',
  },
  textFieldDate: {
    height: '12px',
    border: '1px solid #D2DAE7',
  }
}));

const AlarmStatusQuery = graphql`
  query AlarmFilteringFormCreateQuery {
    alarmStatus {
      edges {
        node {
          name
          id
        }
      }
    }
  }
`;


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
  alarmStatus: string
};

type Props = $ReadOnly<{|
  returnTableAlarm: () => void,
|}>;

const AlarmFilteringFormCreate = (props: Props) => {
  const {returnTableAlarm} = props;
  const classes = useStyles();
  const [AlarmFilter, setAlarmFilter] = useState<AlarmFilter>({data: {}});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const dataStatus = useLazyLoadQuery<AlarmFilteringFormCreateQuery>( AlarmStatusQuery, {} );
  const dataStatusResponse = dataStatus.alarmStatus?.edges.map((item, index) => item.node)
  const valueId = useRef('')

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
        enable: checked,
        beginTime: moment(AlarmFilter.data.beginTime).format(),
        endTime: moment(AlarmFilter.data.endTime).format(),
        reason: AlarmFilter.data.reason,
        user: 'user',
        creationTime: moment(AlarmFilter.data.creationTime).format(),
        alarmStatus: valueId.current,
      },
    };
    AddAlarmFilterMutation(variables);
    setTimeout(() => returnTableAlarm(), 1000)
  }
  
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container className={classes.titleButtons}>
          <Grid xs={9}>
            <Text className={classes.textTitle} variant="h6">
              {fbt('Create Alarm Filter', ' ')}
            </Text>
          </Grid>
          <Grid xs={2}>
            <Grid container>
              <Grid xs={6}>
                <FormField>
                  <Button
                    className={classes.option}
                    variant="outlined"
                    color="primary"
                    onClick={() => returnTableAlarm()}>
                    Cancel
                  </Button>
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className={classes.option}
                    variant="contained"
                    color="primary">
                    Save
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12}>
          <Card>
            <Grid container>
              <Grid xs={1}>
                <FormField label="Enabled">
                  <Switch
                    title={''}
                    checked={checked}
                    onChange={setChecked}
                    onClick={handleClick}
                  />
                </FormField>
              </Grid>
              <Grid xs={11}>
                <FormField className={classes.formField} label="Name">
                  <TextInput
                    className={classes.textInput}
                    name="name"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid xs={6}>
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
              <Grid xs={6}>
                <FormField className={classes.formField} label="Reason">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={4}
                    name="reason"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container xs={6}>
                <Grid className={classes.time} xs={12}>
                  <Text variant="subtitle1">Exception period</Text>
                </Grid>
                <Grid xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textFieldDate,
                        },
                      }}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="beginTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      InputProps={{
                        classes: {
                          input: classes.textFieldDate,
                        },
                      }}
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      name="endTime"
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid container xs={6} className={classes.status}>
                <Grid xs={3}>
                  <FormField label="Status" className={classes.formField}>
                    {
                      (moment(AlarmFilter.data.creationTime).format() <= moment(AlarmFilter.data.beginTime).format()) ||
                      (moment(AlarmFilter.data.creationTime).format() <= moment(AlarmFilter.data.endTime).format()) &&
                      dataStatusResponse
                      .filter(item => item.name == 'Active')
                      .map(filteredItem => (          
                        <Button 
                          value={valueId.current = filteredItem.id}
                          variant="outlined"
                          weight="bold"
                          name="alarmStatus"
                          className={classNames(classes.button, classes.buttonActive)}
                          onChange={handleChange}
                        >
                        {filteredItem.name}
                      </Button>

                      ))
                    }
                    {
                      moment(AlarmFilter.data.creationTime).format() > moment(AlarmFilter.data.endTime).format()  &&
                      dataStatusResponse
                      .filter(item => item.name == 'Closed')
                      .map(filteredItem => (
                        <Button 
                          value={valueId.current = filteredItem.id}
                          variant="outlined"
                          weight="bold"
                          name="alarmStatus"
                          className={classNames(classes.button, classes.buttonClosed)}
                          onChange={handleChange}
                        >
                        {filteredItem.name}
                      </Button>
                      ))
                    }
                    {
                      moment(AlarmFilter.data.creationTime).format() < moment(AlarmFilter.data.beginTime).format() &&
                      dataStatusResponse
                      .filter(item => item.name == 'Pending')
                      .map(filteredItem => (
                        <Button 
                          value={valueId.current = filteredItem.id}
                          variant="outlined"
                          weight="bold"
                          name="alarmStatus"
                          className={classNames(classes.button, classes.buttonPending)}
                          onChange={handleChange}
                        >
                        {filteredItem.name}
                      </Button>
                      ))
                    }
                  </FormField>
                </Grid>
                <Grid xs={9}>
                  <FormField label="ID" className={classes.formField}>
                    <TextInput
                      className={classes.textInput}
                      name="id"
                      disabled
                    />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      {dialogOpen && (
        <AlarmFilteringAddDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onAlarmSelected={handleClick}
          onAlarmSelectedData={AlarmFilter.data}
        />
      )}
    </div>
  );
};
export default AlarmFilteringFormCreate;
