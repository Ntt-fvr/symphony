/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {EditRuleItemFormQuery} from './__generated__/EditRuleItemFormQuery.graphql';

import type {EditRuleLimitMutationVariables} from '../../mutations/__generated__/EditRuleLimitMutation.graphql';
import type {EditRuleMutationVariables} from '../../mutations/__generated__/EditRuleMutation.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import EditRuleLimitMutation from '../../mutations/EditRuleLimitMutation';
import EditRuleMutation from '../../mutations/EditRuleMutation';
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
import {useFormInput} from './common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useStore} from './ThresholdProvider';

const EditRuleQuery = graphql`
  query EditRuleItemFormQuery {
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
  titleLimit: {
    marginLeft: '26px',
  },
  limitRangeSelect: {
    margin: '0 20px 20px 26px',
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
  hideAddRuleForm: void => void,
|}>;

const EditRuleItemForm = (props: Props) => {
  const {rule} = useStore();
  const {hideAddRuleForm} = props;

  const [ruleData, setRuleData] = useState({data: {}});
  const [checked, setChecked] = useState(rule.status);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const data = useLazyLoadQuery<EditRuleItemFormQuery>(EditRuleQuery, {});

  const nameRule = useFormInput(rule.name);
  const gracePeriodRule = useFormInput(rule.gracePeriod);
  const additionalInfoRule = useFormInput(rule.additionalInfo);
  const specificProblemRule = useFormInput(rule.specificProblem);
  const eventTypeRule = useFormInput(rule.eventTypeName);
  const eventSeverityRules = useFormInput(rule.eventSeverityId);
  const comparatorUpper = useFormInput(rule.ruleLimit[0]?.comparator.id);
  const comparatorLower = useFormInput(rule.ruleLimit[1]?.comparator.id);
  const upper = useFormInput(rule.ruleLimit[0]?.number);
  const lower = useFormInput(rule.ruleLimit[1]?.number);

  function handleChange({target}) {
    setRuleData({
      data: {
        ...ruleData.data,
        [target.name]: target.value,
      },
    });
  }

  const handleClick = () => {
    const variables: EditRuleMutationVariables = {
      input: {
        id: rule.id,
        name: nameRule.value,
        gracePeriod: Number(gracePeriodRule.value),
        startDateTime: moment(ruleData.data.startTime).format(),
        endDateTime: moment(ruleData.data.endTime).format(),
        ruleType: data.ruleTypes.edges[0].node.id,
        eventTypeName: eventTypeRule.value,
        specificProblem: specificProblemRule.value,
        additionalInfo: additionalInfoRule.value,
        status: checked,
        eventSeverity: eventSeverityRules.value,
        threshold: rule.thresholdId,
      },
    };
    const variablesUpper: EditRuleLimitMutationVariables = {
      input: {
        id: rule.ruleLimit[0]?.id,
        number: Number(upper.value),
        limitType: 'UPPER',
        comparator: comparatorUpper.value,
        rule: rule.id,
      },
    };
    const variablesLower: EditRuleLimitMutationVariables = {
      input: {
        id: rule.ruleLimit[1]?.id,
        number: Number(lower.value),
        limitType: 'LOWER',
        comparator: comparatorLower.value,
        rule: rule.id,
      },
    };
    EditRuleMutation(variables);
    EditRuleLimitMutation(variablesUpper);
    EditRuleLimitMutation(variablesLower);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Threshold Catalog/', 'Threshold Catalog')}
            tag={` ${rule.thresholdName}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>Edit Rule</CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={11} xl={11}>
                <FormField
                  className={classes.formField}
                  label="Rule Name"
                  required>
                  <TextInput
                    {...nameRule}
                    type="string"
                    autoComplete="off"
                    className={classes.textInput}
                    name="name"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField className={classes.formField} label="ID" required>
                  <TextInput
                    value={rule.id}
                    className={classes.textInput}
                    name="id"
                    disabled
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <FormField
                  className={classes.formField}
                  label="Grace period"
                  required>
                  <TextInput
                    {...gracePeriodRule}
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
                    {...eventSeverityRules}
                    className={classes.selectAlarm}
                    disableUnderline
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    name="eventSeverities">
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
                    {...eventTypeRule}
                    className={classes.textInput}
                    name="alarmType"
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
                          {...comparatorUpper}
                          className={classes.selectUpper}
                          disableUnderline
                          name="upperTarget">
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
                          {...upper}
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.green}`}
                          name="upperLimit"
                        />
                      </FormField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Text className={classes.titleLimit}>Upper limit</Text>
                    </Grid>
                    <Grid item xs={8} sm={8} lg={6} xl={6}>
                      <FormField className={classes.limitRangeSelect}>
                        <Select
                          {...comparatorLower}
                          className={classes.selectLower}
                          disableUnderline
                          name="lowerTarget">
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
                          {...lower}
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.red}`}
                          name="lowerLimit"
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
                    defaultValue={moment(rule.startDateTime).format(
                      'YYYY-MM-DDThh:mm',
                    )}
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
                    defaultValue={moment(rule.endDateTime).format(
                      'YYYY-MM-DDThh:mm',
                    )}
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
                    {...specificProblemRule}
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
                    {...additionalInfoRule}
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

export default EditRuleItemForm;
