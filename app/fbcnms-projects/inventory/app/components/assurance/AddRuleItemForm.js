/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddRuleLimitMutationVariables} from '../../mutations/__generated__/AddRuleLimitMutation.graphql';
import type {AddRuleMutationResponse} from '../../mutations/__generated__/AddRuleMutation.graphql';
import type {AddRuleMutationVariables} from '../../mutations/__generated__/AddRuleMutation.graphql';

import type {AddRuleItemFormQuery} from './__generated__/AddRuleItemFormQuery.graphql';

import type {MutationCallbacks} from '../../mutations/MutationCallbacks';

import AddRuleLimitMutation from '../../mutations/AddRuleLimitMutation';
import AddRuleMutation from '../../mutations/AddRuleMutation';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, {useState} from 'react';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import moment from 'moment';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const AddRuleQuery = graphql`
  query AddRuleItemFormQuery {
    eventSeverities {
      edges {
        node {
          id
          name
        }
      }
    }
    comparators {
      edges {
        node {
          id
          name
        }
      }
    }
    ruleTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

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
  paper: {
    height: '240px',
    margin: '0 43px 22px 43px',
    backgroundColor: '#F5F7FC',
  },
  selectUpper: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #00AF5B',
    fontWeight: '700',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  selectLower: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #FA383E',
    fontWeight: '700',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  limitRange: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  limitRangeInputs: {
    margin: '0px 26px 20px 0',
  },
  limitRangeSelect: {
    margin: '0 20px 20px 26px',
  },
  titleLimit: {
    marginLeft: '26px',
  },
  red: {
    border: '1px solid #FA383E',
    borderRadius: '4px',
  },
  green: {
    border: '1px solid #00AF5B',
    borderRadius: '4px',
  },
  icon: {
    fill: 'white',
  },
}));

type Props = $ReadOnly<{|
  threshold: {
    id: string,
    name: string,
  },
  hideAddRuleForm: void => void,
|}>;

type Rule = {
  data: {
    id: string,
    name: string,
    status: boolean,
    gracePeriod: number,
    specificProblem: string,
    additionalInfo: string,
    alarmSeverities: string,
    alarmType: string,
    upperTarget: string,
    upperLimit: string,
    lowerTarget: string,
    lowerLimit: string,
    startTime: string,
    endTime: string,
  },
};

const AddRuleItemForm = (props: Props) => {
  const {threshold, hideAddRuleForm} = props;

  const [rule, setRule] = useState<Rule>({data: {}});
  const [checked, setChecked] = useState(true);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const data = useLazyLoadQuery<AddRuleItemFormQuery>(AddRuleQuery, {});
  const ruleTypeId = data.ruleTypes?.edges[0].node?.id;

  function handleChange({target}) {
    setRule({
      data: {
        ...rule.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddRuleMutationVariables = {
      input: {
        name: rule.data.name,
        status: checked,
        gracePeriod: rule.data.gracePeriod,
        startDateTime: moment(rule.data.startTime).format(),
        endDateTime: moment(rule.data.endTime).format(),
        ruleType: ruleTypeId,
        eventTypeName: rule.data.alarmType,
        specificProblem: rule.data.specificProblem,
        additionalInfo: rule.data.additionalInfo,
        eventSeverity: rule.data.alarmSeverities,
        threshold: threshold.id,
      },
    };

    const response: MutationCallbacks<AddRuleMutationResponse> = {
      onCompleted: response => {
        const variablesUpper: AddRuleLimitMutationVariables = {
          input: {
            number: Number(rule.data.upperLimit),
            limitType: 'UPPER',
            comparator: rule.data.upperTarget,
            rule: response.addRule.id,
          },
        };
        const variablesLower: AddRuleLimitMutationVariables = {
          input: {
            number: Number(rule.data.lowerLimit),
            limitType: 'LOWER',
            comparator: rule.data.lowerTarget,
            rule: response.addRule.id,
          },
        };
        AddRuleLimitMutation(variablesUpper);
        AddRuleLimitMutation(variablesLower);
      },
    };

    AddRuleMutation(variables, response);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Threshold Catalog/', 'Threshold Catalog')}
            tag={` ${threshold.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>Build Rule</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch
                    title={''}
                    checked={checked}
                    onChange={setChecked}
                    onClick={handleClick}
                  />
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    name="alarmSeverities"
                    onChange={handleChange}>
                    {data.eventSeverities.edges.map((item, index) => (
                      <MenuItem key={index} value={item.node?.id}>
                        {item.node?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  className={classes.formField}
                  label="Alarm type name"
                  required>
                  <TextInput
                    autoComplete="off"
                    className={classes.textInput}
                    name="alarmType"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <Paper elevation={0} className={classes.paper}>
                  <Grid container>
                    <Grid className={classes.limitRange} item xs={12} sm={12}>
                      <Text weight="bold" variant="h6">
                        Limits Range
                      </Text>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Text className={classes.titleLimit}>Upper limit</Text>
                    </Grid>
                    <Grid item xs={8} sm={8} lg={6} xl={6}>
                      <FormField className={classes.limitRangeSelect}>
                        <Select
                          className={classes.selectUpper}
                          disableUnderline
                          name="upperTarget"
                          onChange={handleChange}>
                          {data.comparators.edges.map((item, index) => (
                            <MenuItem key={index} value={item.node?.id}>
                              {item.node?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={6} xl={6}>
                      <FormField className={classes.limitRangeInputs}>
                        <TextInput
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.green}`}
                          name="upperLimit"
                          onChange={handleChange}
                        />
                      </FormField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Text className={classes.titleLimit}>Lower limit</Text>
                    </Grid>
                    <Grid item xs={8} sm={8} lg={6} xl={6}>
                      <FormField className={classes.limitRangeSelect}>
                        <Select
                          className={classes.selectLower}
                          disableUnderline
                          name="lowerTarget"
                          onChange={handleChange}>
                          {data.comparators.edges.map((item, index) => (
                            <MenuItem key={index} value={item.node?.id}>
                              {item.node?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={6} xl={6}>
                      <FormField className={classes.limitRangeInputs}>
                        <TextInput
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.red}`}
                          name="lowerLimit"
                          onChange={handleChange}
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField className={classes.formField}>
                  <Checkbox
                    checked={checkedCheckbox}
                    title="Definite time period"
                    onChange={selection =>
                      setCheckedCheckbox(selection === 'checked')
                    }
                  />
                </FormField>
                <FormField label="Start" className={classes.formField}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="startTime"
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="End" className={classes.formField}>
                  <TextField
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="endTime"
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item xs={2} sm={2} lg={1} xl={1}>
                  <FormField>
                    <Button
                      className={classes.addRule}
                      onClick={() => {
                        handleClick();
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

export default AddRuleItemForm;
