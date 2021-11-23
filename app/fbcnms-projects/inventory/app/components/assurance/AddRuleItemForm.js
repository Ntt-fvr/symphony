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
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, {useState} from 'react';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import moment from 'moment';
import symphony from '@symphony/design-system/theme/symphony';
import {MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButton} from './common/useDisabledButton';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useValidation} from './common/useValidation';

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
  header: {
    margin: '0 0 1rem 1.4rem',
  },
  headerCardEdit: {
    padding: '17px 22px 17px 0',
  },
  formField: {
    width: '100%',
    padding: '0 12px',
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
      marginBottom: '36px',
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
    margin: '20px 43px 22px 40px',
  },
  containerEnabled: {
    display: 'flex',
    alignItems: 'center',
  },
  EnabledName: {
    paddingRight: '7px',
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
    width: '100%',
    // border: '1px solid #D2DAE7',
    color: 'white',
    fontWeight: '700',
    borderRadius: '4px',
    // backgroundColor: '#556072',
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
  // icon: {
  //   fill: 'white',
  // },
}));

type Props = $ReadOnly<{|
  threshold: {
    id: string,
    name: string,
  },
  hideAddRuleForm: void => void,
  isCompleted: void => void,
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
  const classes = useStyles();
  const {threshold, hideAddRuleForm, isCompleted} = props;

  const [rule, setRule] = useState<Rule>({data: {}});
  const [checked, setChecked] = useState(true);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const data = useLazyLoadQuery<AddRuleItemFormQuery>(AddRuleQuery, {});
  const ruleTypeId = data.ruleTypes?.edges[0].node?.id;

  const namesRules = threshold?.rule.map(item => item.name);

  const FIELD_MIN = 10;
  const FIELD_MAX = 12;

  const validationField = () => {
    const comparison = checkedCheckbox === false ? FIELD_MIN : FIELD_MAX;
    return comparison;
  };

  const numberFields = validationField();

  const handleDisable = useDisabledButton(rule.data, namesRules, numberFields);

  const validationName = useValidation(rule.data.name, namesRules, 'Rule');

  function handleChange({target}) {
    setRule({
      data: {
        ...rule.data,
        [target.name]: target.value.trim(),
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
        AddRuleLimitMutation(variablesUpper, {
          onCompleted: () => isCompleted(),
        });
        AddRuleLimitMutation(variablesLower, {
          onCompleted: () => isCompleted(),
        });
        isCompleted();
      },
    };

    AddRuleMutation(variables, response);
  }

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
          <Grid>
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
              <Grid className={classes.containerEnabled}>
                <Text
                  className={classes.EnabledName}
                  color={'primary'}
                  variant={'caption'}>
                  Enabled
                </Text>
                <Switch
                  title={''}
                  checked={checked}
                  onChange={setChecked}
                  onClick={handleClick}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={12} sm={12} lg={11} xl={11}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    {...validationName}
                    required
                    className={classes.textInput}
                    label="Rule Name"
                    type="string"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    disabled
                    className={classes.textInput}
                    name="id"
                    label="ID"
                    variant="outlined"
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.textInput}
                    label="Grace period"
                    type="number"
                    name="gracePeriod"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={2} xl={2}>
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
                      <form
                        // className={classes.formField}
                        autoComplete="off"
                        className={classes.limitRangeSelect}>
                        <TextField
                          className={classes.selectUpper}
                          disableUnderline
                          select
                          name="upperTarget"
                          onChange={handleChange}>
                          {data.comparators.edges.map((item, index) => (
                            <MenuItem key={index} value={item.node?.id}>
                              {item.node?.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </form>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={6} xl={6}>
                      <form
                        // className={classes.formField}
                        autoComplete="off"
                        className={classes.limitRangeInputs}>
                        <TextField
                          label="Upper limit"
                          variant="outlined"
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.green}`}
                          name="upperLimit"
                          onChange={handleChange}
                        />
                      </form>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Text className={classes.titleLimit}>Lower limit</Text>
                    </Grid>
                    <Grid item xs={8} sm={8} lg={6} xl={6}>
                      <form
                        autoComplete="off"
                        className={classes.limitRangeSelect}>
                        <TextField
                          required
                          select
                          className={classes.selectLower}
                          disableUnderline
                          name="lowerTarget"
                          onChange={handleChange}>
                          {data.comparators.edges.map((item, index) => (
                            <MenuItem key={index} value={item.node?.id}>
                              {item.node?.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </form>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={6} xl={6}>
                      <form
                        autoComplete="off"
                        className={classes.limitRangeInputs}>
                        <TextField
                          type="number"
                          placeholder="Number"
                          className={`${classes.textInput} ${classes.red}`}
                          name="lowerLimit"
                          onChange={handleChange}
                        />
                      </form>
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
                <form className={classes.formField}>
                  <TextField
                    label="Start"
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="startTime"
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
                  />
                </form>
                <form className={classes.formField}>
                  <TextField
                    label="End"
                    variant="outlined"
                    id="datetime-local"
                    type="datetime-local"
                    name="endTime"
                    disabled={!checkedCheckbox}
                    onChange={handleChange}
                  />
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddRuleItemForm;

/**
<Grid item xs={12} sm={12} lg={2} xl={2}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    select
                    className={classes.selectAlarm}
                    label="Alarm severity"
                    variant="outlined"
                    name="alarmSeverities"
                    onChange={handleChange}
                    inputProps>
                    {data.eventSeverities.edges.map((item, index) => (
                      <MenuItem key={index} value={item.node?.id}>
                        {item.node?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    variant="outlined"
                    label="Alarm type name"
                    autoComplete="off"
                    className={classes.textInput}
                    name="alarmType"
                    onChange={handleChange}
                  />
                </form>
              </Grid>


              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <form className={classes.formField}>
                  <TextField
                    variant="outlined"
                    label="Specific problem"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    name="specificProblem"
                    onChange={handleChange}
                  />
                </form>
                <form className={classes.formField}>
                  <TextField
                    variant="outlined"
                    label="Additional info"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    name="additionalInfo"
                    onChange={handleChange}
                  />
                </form>
              </Grid>


 */
