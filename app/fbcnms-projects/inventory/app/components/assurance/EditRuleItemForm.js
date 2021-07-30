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
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import LimitRange from './LimitRange';
import React from 'react';
import SwitchLabels from './common/Switch';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  cardHeader: {
    margin: '20px 43px 22px 40px',
  },
  textInput: {
    minHeight: '36px',
  },
  addRule: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  selectAlarm: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #D2DAE7',
    color: 'white',
    fontWeight: '700',
    borderRadius: '4px',
    backgroundColor: '#556072',
  },
  icon: {
    fill: 'white',
  },
}));

type Props = $ReadOnly<{|
  hideAddRuleForm: void => void,
|}>;

const EditRuleItemForm = (props: Props) => {
  const {hideAddRuleForm} = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Threshold Catalog/', 'Threshold Catalog')}
            tag={''}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>Build Rule</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <SwitchLabels status={true} />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={11} xl={11}>
                <FormField
                  className={classes.formField}
                  label="Rule Name"
                  required>
                  <TextInput
                    type="string"
                    autoComplete="off"
                    className={classes.textInput}
                    name="name"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField className={classes.formField} label="ID" required>
                  <TextInput className={classes.textInput} name="id" disabled />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <FormField
                  className={classes.formField}
                  label="Grace period"
                  required>
                  <TextInput
                    className={classes.textInput}
                    type="number"
                    name="gracePeriod"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <FormField
                  className={classes.formField}
                  label="Type of Rule"
                  required>
                  <TextInput
                    value="Simple"
                    className={classes.textInput}
                    name="TypeOfRule"
                    disabled
                  />
                </FormField>
              </Grid>

              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <FormField className={classes.formField} label="Alarm severity">
                  <Select
                    className={classes.selectAlarm}
                    disableUnderline
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    name="status">
                    <MenuItem value={true}>Indeterminate</MenuItem>
                    <MenuItem value={false}>Determinate</MenuItem>
                  </Select>
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  className={classes.formField}
                  label="Alarm type name"
                  required>
                  <TextInput className={classes.textInput} name="alarmType" />
                </FormField>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <LimitRange />
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField className={classes.formField}>
                  <Checkbox checked={true} title="Definite time period" />
                </FormField>
                <FormField label="Start" className={classes.formField}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2021-07-02T11:30"
                    name="startTime"
                  />
                </FormField>
                <FormField label="End" className={classes.formField}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue="2021-07-02T11:30"
                    name="endTime"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <FormField
                  className={classes.formField}
                  label="Specific problem">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    name="specificProblem"
                  />
                </FormField>
                <FormField
                  className={classes.formField}
                  label="Additional info">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    name="additionalInfo"
                  />
                </FormField>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item xs={2} sm={2} lg={1} xl={1}>
                  <FormField>
                    <Button
                      className={classes.addRule}
                      onClick={() => {
                        hideAddRuleForm();
                      }}>
                      Save
                    </Button>
                  </FormField>
                </Grid>
                <Grid item xs={2} sm={2} lg={1} xl={1}>
                  <FormField>
                    <Button
                      className={classes.addRule}
                      onClick={() => {
                        hideAddRuleForm();
                      }}
                      skin="brightGray">
                      Cancel
                    </Button>
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

export default EditRuleItemForm;
