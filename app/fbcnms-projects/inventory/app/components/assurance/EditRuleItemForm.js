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
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import EditRuleLimitMutation from '../../mutations/EditRuleLimitMutation';
import EditRuleMutation from '../../mutations/EditRuleMutation';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import symphony from '@symphony/design-system/theme/symphony';

import fbt from 'fbt';
import moment from 'moment';
import {MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from './common/useDisabledButton';
import {useFormInput} from './common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useStore} from './ThresholdProvider';
import {useValidationEdit} from './common/useValidation';

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
  header: {
    margin: '0 17px 0px 36px',
  },
  headerCardEdit: {
    padding: '17px 10px 17px 0',
  },
  checkFecha: {
    padding: '0 0 7px 7px',
  },
  fieldSelectLimitUpper: {
    '& .MuiSelect-select:focus': {
      borderRadius: '4px',
      background: '#FFFFFF',
      border: '2px solid #00AF5B',
    },
    fontWeight: '700',
  },
  fieldSelectLimitLower: {
    '& .MuiSelect-select:focus': {
      borderRadius: '4px',
      background: '#FFFFFF',
      border: '2px solid #FA383E',
    },
    fontWeight: '700',
  },
  formFieldUpper: {
    padding: '0 10px ',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#00AF5B',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      width: '100%',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00AF5B',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '6px 0 6px 10px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '4px',
      border: '2px solid #00AF5B',
    },
  },
  formFieldLower: {
    padding: '0 10px ',
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FA383E',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      width: '100%',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FA383E',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '6px 0 6px 10px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '4px',
      border: '2px solid #FA383E',
    },
  },
  formField: {
    padding: '0 10px 36px 10px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  cardHeader: {
    margin: '0px 0px 0px 10px',
  },
  titleSwitch: {
    '& .followingText': {
      color: '#3984FF',
    },
  },
  textInput: {
    width: '100%',
    minHeight: '36px',
  },
  actionAddRule: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  selectAlarm: {
    '& .MuiOutlinedInput-root ': {
      color: '#FFFFFF',
      height: '38px',
    },
    '& .MuiSelect-iconOutlined': {
      color: '#FFFFFF',
    },
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    width: '100%',
    fontWeight: '700',
    borderRadius: '4px',
    background: '#556072',
  },
  secondSection: {
    marginTop: '20px',
    borderTop: '1px solid #D2DAE7',
  },
  sectionAlarm: {
    paddingTop: '10px',
  },
  fieldAlarmSeverity: {
    padding: '0 10px 0 10px',
  },
  titleLimit: {
    padding: '0 0 5px 10px',
  },
}));

type Props = $ReadOnly<{|
  hideAddRuleForm: void => void,
  isCompleted: void => void,
  threshold: {
    id: string,
    name: string,
  },
|}>;

const EditRuleItemForm = (props: Props) => {
  const classes = useStyles();
  const {rule} = useStore();
  const {hideAddRuleForm, isCompleted, threshold} = props;

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

  const namesRules = threshold.rule.map(item => item.name);

  const dataInputsObject = [
    nameRule.value.trim(),
    gracePeriodRule.value,
    additionalInfoRule.value.trim(),
    specificProblemRule.value.trim(),
    eventTypeRule.value,
    eventSeverityRules.value,
    comparatorUpper.value,
    comparatorLower.value,
    upper.value,
    lower.value,
  ];
  const inputFilter = () => {
    return (
      namesRules?.filter(
        item => item === nameRule.value.trim() && item !== rule.name.trim(),
      ) || []
    );
  };
  const handleDisable = useDisabledButtonEdit(
    dataInputsObject,
    10,
    inputFilter,
  );

  const validationName = useValidationEdit(inputFilter, 'Rule');

  function handleChange({target}) {
    setRuleData({
      data: {
        ...ruleData.data,
        [target.name]: target.value.trim(),
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
    EditRuleMutation(variables, {onCompleted: () => isCompleted()});
    EditRuleLimitMutation(variablesUpper, {onCompleted: () => isCompleted()});
    EditRuleLimitMutation(variablesLower, {onCompleted: () => isCompleted()});
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Grid xs>
            <ConfigureTitleSubItem
              title={fbt('Threshold Catalog/', 'Threshold Catalog')}
              tag={` ${threshold.name}`}
            />
          </Grid>
          <Grid>
            <FormField>
              <Button
                className={classes.actionAddRule}
                onClick={() => {
                  handleClick();
                  hideAddRuleForm();
                }}
                disabled={handleDisable}>
                Save
              </Button>
            </FormField>
          </Grid>
          <Grid>
            <FormField>
              <Button
                className={classes.actionAddRule}
                onClick={() => {
                  hideAddRuleForm();
                }}
                skin="brightGray">
                Cancel
              </Button>
            </FormField>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <Grid
              className={classes.headerCardEdit}
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center">
              <Grid xs>
                <Text
                  weight={'bold'}
                  variant={'h6'}
                  className={classes.cardHeader}>
                  Build Rule
                </Text>
              </Grid>
              <Grid>
                <Switch
                  className={classes.titleSwitch}
                  title={'Enabled'}
                  checked={checked}
                  onChange={setChecked}
                />
              </Grid>
            </Grid>

            <Grid container xs={12}>
              <Grid container item xs={12} sm={12} md={8}>
                <Grid xs={12} sm={12} md={6}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      {...validationName}
                      {...nameRule}
                      required
                      className={classes.textInput}
                      label="Rule Name"
                      type="string"
                      variant="outlined"
                      name="name"
                      // onChange={handleChange}
                    />
                  </form>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <FormField className={classes.formField}>
                    <TextField
                      required
                      disabled
                      value={rule.id}
                      className={classes.textInput}
                      name="id"
                      label="ID"
                      variant="outlined"
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    {...gracePeriodRule}
                    className={classes.textInput}
                    label="Grace period"
                    type="number"
                    name="gracePeriod"
                    variant="outlined"
                    // onChange={handleChange}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    variant="outlined"
                    label="Type of Rule"
                    value="Simple"
                    className={classes.textInput}
                    name="TypeOfRule"
                    disabled
                  />
                </form>
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={12} md={8} lg={8} xl={8}>
              <Grid className={classes.checkFecha} xs={12}>
                <Checkbox
                  checked={checkedCheckbox}
                  title="Definite time period"
                  onChange={selection =>
                    setCheckedCheckbox(selection === 'checked')
                  }
                />
              </Grid>
              <Grid xs={6}>
                <FormField className={classes.formField}>
                  <TextField
                    label="Start"
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="startTime"
                    InputLabelProps={{shrink: true}}
                    defaultValue={moment(rule.startDateTime).format(
                      'YYYY-MM-DDThh:mm',
                    )}
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
                  />{' '}
                </FormField>
              </Grid>
              <Grid xs={6}>
                <FormField className={classes.formField}>
                  <TextField
                    label="End"
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="endTime"
                    InputLabelProps={{shrink: true}}
                    defaultValue={moment(rule.endDateTime).format(
                      'YYYY-MM-DDThh:mm',
                    )}
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
            </Grid>

            <Grid container xs={12} sm={12} md={8}>
              <Grid className={classes.titleLimit} xs={12}>
                <Text weight="bold" variant="h6">
                  Limits Range
                </Text>
              </Grid>

              <Grid container item xs={6} sm={6} lg={6} xl={6}>
                <Grid className={classes.titleLimit} xs={12}>
                  <Text weight="medium" variant="subtitle2">
                    Upper target
                  </Text>
                </Grid>
                <Grid xs>
                  <FormField className={classes.formFieldUpper}>
                    <TextField
                      {...comparatorUpper}
                      disableUnderline
                      select
                      name="upperTarget"
                      variant="outlined"
                      // onChange={handleChange}
                      className={classes.fieldSelectLimitUpper}>
                      {data.comparators.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormField>
                </Grid>
                <Grid xs>
                  <FormField className={classes.formFieldUpper}>
                    <TextField
                      {...upper}
                      variant="outlined"
                      type="number"
                      placeholder="Number"
                      className={`${classes.textInput}`}
                      name="upperLimit"
                      // onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>

              <Grid container item xs={6} sm={6} lg={6} xl={6}>
                <Grid className={classes.titleLimit} xs={12}>
                  <Text weight="medium" variant="subtitle2">
                    Lower limit
                  </Text>
                </Grid>
                <Grid xs>
                  <FormField className={classes.formFieldLower}>
                    <TextField
                      {...comparatorLower}
                      required
                      select
                      className={classes.fieldSelectLimitLower}
                      disableUnderline
                      variant="outlined"
                      // onChange={handleChange}
                      name="lowerTarget">
                      {data.comparators.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormField>
                </Grid>
                <Grid xs>
                  <FormField className={classes.formFieldLower}>
                    <TextField
                      {...lower}
                      type="number"
                      variant="outlined"
                      placeholder="Number"
                      className={`${classes.textInput}`}
                      name="lowerLimit"
                      // onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={classes.secondSection}>
              <Grid
                className={classes.sectionAlarm}
                container
                xs={12}
                sm={12}
                md={8}>
                <Grid className={classes.titleLimit} xs={12}>
                  <Text weight="medium" variant="subtitle2">
                    Alarm severity
                  </Text>
                </Grid>
                <Grid xs={6} className={classes.fieldAlarmSeverity}>
                  <FormField className={classes.selectAlarm}>
                    <TextField
                      {...eventSeverityRules}
                      required
                      select
                      variant="outlined"
                      name="alarmSeverities"
                      // onChange={handleChange}
                      inputProps>
                      {data.eventSeverities.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormField>
                </Grid>
                <Grid xs={6}>
                  <FormField className={classes.formField}>
                    <TextField
                      {...eventTypeRule}
                      required
                      variant="outlined"
                      label="Alarm type name"
                      autoComplete="off"
                      className={classes.textInput}
                      name="alarmType"
                      // onChange={handleChange}
                    />
                  </FormField>
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <form className={classes.formField}>
                    <TextField
                      {...specificProblemRule}
                      variant="outlined"
                      label="Specific problem"
                      className={classes.textInput}
                      multiline
                      rows={3}
                      name="specificProblem"
                      // onChange={handleChange}
                    />
                  </form>
                </Grid>
                <Grid>
                  <form className={classes.formField}>
                    <TextField
                      {...additionalInfoRule}
                      variant="outlined"
                      label="Additional info"
                      className={classes.textInput}
                      multiline
                      rows={3}
                      name="additionalInfo"
                      // onChange={handleChange}
                    />
                  </form>
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
/**

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
                  {...validationName}
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
                      }}
                      disabled={handleDisable}>
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

 */
