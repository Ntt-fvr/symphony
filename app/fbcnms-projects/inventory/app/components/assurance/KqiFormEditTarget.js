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

import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import IconButton from '@material-ui/core/IconButton';
import TextInput from '@symphony/design-system/components/Input/TextInput';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import {DARK} from '@symphony/design-system/theme/symphony';
import {MenuItem, Select} from '@material-ui/core';

import classNames from 'classnames';

import Switch from '@symphony/design-system/components/switch/Switch';

import {makeStyles} from '@material-ui/styles';
import moment from 'moment';
import {useFormInput} from './common/useFormInput';
import type {EditKqiTargetMutationVariables} from '../../mutations/__generated__/EditKqiTargetMutation.graphql';
import type {EditKqiTargetMutationResponse} from '../../mutations/__generated__/EditKqiTargetMutation.graphql';
import EditKqiTargetMutation from '../../mutations/EditKqiTargetMutation';
import EditKqiComparatorMutation from '../../mutations/EditKqiComparatorMutation';
import type {EditKqiComparatorMutationVariables} from '../../mutations/__generated__/EditKqiComparatorMutation.graphql';
import type {MutationCallbacks} from '../../mutations/MutationCallbacks';
import type {RemoveKqiTargetMutationVariables} from '../../mutations/__generated__/RemoveKqiTargetMutation.graphql';
import RemoveKqiTargetMutation from '../../mutations/RemoveKqiTargetMutation';


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
    width: 'auto',
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
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
}

type Props = $ReadOnly<{|
  dataComparator: Array<Comparator>,
  returnFormEdit: () => void,
  formValues: {
    item: {
      node:{
        id: string,
        name: string,
        impact: string,
        frame: string,
        alowedValidation: string,
        initTime: string,
        endTime: string,
        status: boolean,
        kqi: {
          id: string,
        },
        kqiComparator:{
          id: string,
          number: Number,
          comparatorType: string,
          kqiTargetFk:{
            name: string,
            id: string,
          },
          comparatorFk:{
            id: string,
            name: string,
          }
        }
      }
    }
  }
|}>;

const KqiFormEditTarget = (props: Props) => {
  const {returnFormEdit, formValues, dataComparator} = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  
  const name = useFormInput(formValues.item.node.name);
  const impact = useFormInput(formValues.item.node.impact);
  const frame = useFormInput(formValues.item.node.frame);
  const alowedValidation = useFormInput(formValues.item.node.alowedValidation);
  const initTime = useFormInput(moment(formValues.item.node.initTime).format("HH"));
  const endTime = useFormInput(moment(formValues.item.node.endTime).format("HH"));

  const comparatorSelect = useFormInput(formValues.item.node.kqiComparator[0].comparatorFk.id);
  const comparatorNumber = useFormInput(formValues.item.node.kqiComparator[0].number);
  
  const warningComparatorSelect = useFormInput(formValues.item.node.kqiComparator[1].comparatorFk.id);
  const warningComparatorNumber = useFormInput(formValues.item.node.kqiComparator[1].number);
  
  const handleRemove = id => {
    const variables: RemoveKqiTargetMutationVariables = {
      id: id,
    };
    RemoveKqiTargetMutation(variables);
  };
  
  const handleClick = () => {
    const variables: EditKqiTargetMutationVariables = {
      input: {
        id: formValues.item.node.id,
        name: name.value,
        impact: impact.value,
        frame: Number(frame.value),
        alowedValidation: Number(alowedValidation.value),
        initTime: moment(initTime.value, "HH"),
        endTime: moment(endTime.value, "HH"),
        status: checked,
        kqi: formValues.item.node.kqi.id,
      },
    };
    
    const variablesUpper: EditKqiComparatorMutationVariables = {
      input: {
        id: formValues.item.node.kqiComparator[0].id,
        number: Number(comparatorNumber.value),
        comparatorType: "COMPARATOR",
        kqiTargetFk: formValues.item.node.kqiComparator[0].kqiTargetFk.id,
        comparatorFk: comparatorSelect.value,
      },
    };
    const variablesLower: EditKqiComparatorMutationVariables = {
      input: {
        id: formValues.item.node.kqiComparator[1].id,
        number: Number(warningComparatorNumber.value),
        comparatorType: 'WARNING_COMPARATOR',
        kqiTargetFk: formValues.item.node.kqiComparator[1].kqiTargetFk.id,
        comparatorFk: warningComparatorSelect.value
      },
    };
    EditKqiComparatorMutation(variablesUpper);
    EditKqiComparatorMutation(variablesLower);  
    EditKqiTargetMutation(variables);
    returnFormEdit()
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <ConfigureTitleSubItem
            title={fbt('KQI Catalog / TINE Retainability /', '')}
            tag={''}
            className={classes.textTitle}
          />
        </Grid>
        <Grid className={classes.delete} item xs={1}>
          <IconButton>
            <DeleteOutlinedIcon
              onClick={() => {
                handleRemove(formValues.item.node.id);
                returnFormEdit()
              }}
              style={{color: DARK.D300}}
            />
          </IconButton>
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
                  onClick={handleClick}
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
                    {...name}
                    autoComplete="off"
                    name="name"
                    className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Comparator" className={classes.formField}>
                    <div className={classes.warningComparator}>
                      <Select
                        {...comparatorSelect}
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="comparatorSelect">
                        {dataComparator?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        {...comparatorNumber}
                        autoComplete="off"
                        name="comparatorNumber"
                        placeholder="Number"
                        className={classes.textIndicator}
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
                        {...warningComparatorSelect}
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="warningComparatorSelect">
                        {dataComparator?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        {...warningComparatorNumber}
                        autoComplete="off"
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
                    {...impact}
                    autoComplete="off"
                    name="Impact"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                  />
                </FormField>
              </Grid>
              <Grid className={classes.sectionSelects} container item xs={6}>
                <FormField className={classes.formField} label="Periods">
                  <div className={classes.contPeriods}>
                    <TextInput
                      {...frame} 
                      autoComplete="off"
                      name="frame"
                      className={classes.periods} type="number" />
                  </div>
                </FormField>

                <FormField
                  className={classes.formField}
                  label="Allowed Variation">
                  <div className={classes.contPeriods}>
                    <TextInput 
                      {...alowedValidation}
                      autoComplete="off"
                      name="allowedVariation"
                      className={classes.periods} type="number" />
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
                        {...initTime}
                        autoComplete="off"
                        name="initTime"
                        suffix={'hrs'}
                        className={classes.activeHours}
                      />
                    </div>
                    <Text variant="caption" className={classes.to}>
                      to
                    </Text>
                    <div className={classes.contHours}>
                      <TextInput
                        {...endTime}
                        autoComplete="off"
                        name="endTime"
                        suffix={'hrs'}
                        className={classes.activeHours}
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
export default KqiFormEditTarget;
