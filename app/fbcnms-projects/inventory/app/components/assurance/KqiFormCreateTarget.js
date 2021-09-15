/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddKqiComparatorMutationVariables} from '../../mutations/__generated__/AddKqiComparatorMutation.graphql';
import type {AddKqiTargetMutationResponse} from '../../mutations/__generated__/AddKqiTargetMutation.graphql';
import type {AddKqiTargetMutationVariables} from '../../mutations/__generated__/AddKqiTargetMutation.graphql';
import type {MutationCallbacks} from '../../mutations/MutationCallbacks';

import AddKqiComparatorMutation from '../../mutations/AddKqiComparatorMutation';
import AddKqiTargetMutation from '../../mutations/AddKqiTargetMutation';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import classNames from 'classnames';
import fbt from 'fbt';
import moment from 'moment';
import {MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '0 0 0 9px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  selectWarningComparator: {
    width: '25%',
    margin: '0 2rem 0 0',
  },
  formField: {
    margin: '0 1rem 1rem 1rem',
  },
  formFieldHours: {
    margin: '0 1rem 1rem 10rem',
  },
  warningComparator: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    margin: '0 1rem 1rem 0',
  },
  contPeriods: {
    width: '97px',
  },
  periods: {
    width: '100%',
    '& .clickable': {
      width: '25px',
    },
  },
  contHours: {
    width: '60px',
  },
  hours: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem 1rem 0',
  },
  activeHours: {
    width: '100%',
    '& .clickable': {
      width: '25px',
    },
    '& .inputContainer': {
      padding: '0px 7px',
    },
  },
  from: {
    margin: '0 0.5rem 0 0',
  },
  to: {
    margin: '0 0.5rem 0 0.5rem',
  },
  textInput: {
    minHeight: '36px',
  },
  textIndicator: {
    width: '25%',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
    marginRight: '3px',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textTitle: {
    paddingLeft: '3rem',
  },
  sectionSelects: {
    display: 'flex',
  },
}));

type Comparator = {
  id: string,
  name: string,
};

type Props = $ReadOnly<{|
  idKqi: string,
  returnFormEdit: () => void,
  dataComparator: Array<Comparator>,
|}>;

const KqiFormCreateTarget = (props: Props) => {
  const {returnFormEdit, idKqi, dataComparator} = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [KqiTarget, setKqiTarget] = useState<KqiTarget>({data: {}});

  function handleChange({target}) {
    setKqiTarget({
      data: {
        ...KqiTarget.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddKqiTargetMutationVariables = {
      input: {
        name: KqiTarget.data.name,
        impact: KqiTarget.data.impact,
        period: KqiTarget.data.period,
        allowedVariation: KqiTarget.data.allowedVariation,
        initTime: moment(KqiTarget.data.initTime, 'HH'),
        endTime: moment(KqiTarget.data.endTime, 'HH'),
        status: checked,
        kqi: idKqi,
      },
    };
    const response: MutationCallbacks<AddKqiTargetMutationResponse> = {
      onCompleted: response => {
        const variablesUpper: AddKqiComparatorMutationVariables = {
          input: {
            number: Number(KqiTarget.data.comparatorNumber),
            comparatorType: 'COMPARATOR',
            kqiTargetFk: response.addKqiTarget.id,
            comparatorFk: KqiTarget.data.comparatorSelect,
          },
        };
        const variablesLower: AddKqiComparatorMutationVariables = {
          input: {
            number: Number(KqiTarget.data.warningComparatorNumber),
            comparatorType: 'WARNING_COMPARATOR',
            kqiTargetFk: response.addKqiTarget.id,
            comparatorFk: KqiTarget.data.warningComparatorSelect,
          },
        };
        AddKqiComparatorMutation(variablesUpper);
        AddKqiComparatorMutation(variablesLower);
      },
    };
    AddKqiTargetMutation(variables, response);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Text className={classes.textTitle} variant="h6" weight={'bold'}>
            {fbt('Create target', ' ')}
          </Text>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid xs={6}>
              <FormField>
                <Button
                  className={classes.option}
                  variant="outlined"
                  color="primary"
                  onClick={() => returnFormEdit()}>
                  Cancel
                </Button>
              </FormField>
            </Grid>
            <Grid xs={6}>
              <FormField>
                <Button
                  onClick={() => {
                    handleClick();
                    returnFormEdit();
                  }}
                  className={classes.option}
                  variant="contained"
                  color="primary">
                  Save
                </Button>
              </FormField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch checked={checked} title={''} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField className={classes.formField} label="Target name">
                  <TextInput
                    name="name"
                    className={classes.textInput}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Comparator" className={classes.formField}>
                    <div className={classes.warningComparator}>
                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="comparatorSelect"
                        onChange={handleChange}>
                        {dataComparator.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        name="comparatorNumber"
                        placeholder="Number"
                        className={classes.textIndicator}
                        onChange={handleChange}
                      />
                    </div>
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    label="Warning comparator"
                    className={classes.formField}>
                    <div className={classes.warningComparator}>
                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="warningComparatorSelect"
                        onChange={handleChange}>
                        {dataComparator.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        onChange={handleChange}
                        name="warningComparatorNumber"
                        placeholder="Number"
                        className={classes.textIndicator}
                      />
                    </div>
                  </FormField>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Impact">
                  <TextInput
                    name="impact"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid className={classes.sectionSelects} container item xs={6}>
                <FormField className={classes.formField} label="Periods">
                  <div className={classes.contPeriods}>
                    <TextInput
                      name="period"
                      className={classes.periods}
                      type="number"
                      onChange={handleChange}
                    />
                  </div>
                </FormField>

                <FormField
                  className={classes.formField}
                  label="Allowed Variation">
                  <div className={classes.contPeriods}>
                    <TextInput
                      name="allowedVariation"
                      className={classes.periods}
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </FormField>

                <FormField
                  className={classes.formFieldHours}
                  label="Active Hours">
                  <div className={classes.hours}>
                    <Text variant="caption" className={classes.from}>
                      From
                    </Text>
                    <div className={classes.contHours}>
                      <TextInput
                        name="initTime"
                        suffix={'hrs'}
                        className={classes.activeHours}
                        onChange={handleChange}
                      />
                    </div>
                    <Text variant="caption" className={classes.to}>
                      to
                    </Text>
                    <div className={classes.contHours}>
                      <TextInput
                        name="endTime"
                        suffix={'hrs'}
                        className={classes.activeHours}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiFormCreateTarget;
