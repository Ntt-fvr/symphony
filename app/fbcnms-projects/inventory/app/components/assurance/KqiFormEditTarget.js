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
    padding: '40px',
  },
  header: {
    marginBottom: '1rem'
  },
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
      width: '100%'
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
option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
}));

type Comparator = {
  id: string,
  name: string,
}

type Props = $ReadOnly<{|
  dataTarget: any,
  nameKqi: string,
  dataComparatorSelect: Array<Comparator>,
  returnFormEdit: () => void,
  formValues: {
    item: {
        id: string,
        name: string,
        impact: string,
        period: number,
        allowedVariation: number,
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
|}>;

const KqiFormEditTarget = (props: Props) => {
  const {returnFormEdit, formValues, dataComparatorSelect, nameKqi, dataTarget} = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(formValues.item.status);
  
  const name = useFormInput(formValues.item.name);
  const impact = useFormInput(formValues.item.impact);
  const period = useFormInput(formValues.item.period);
  const allowedVariation = useFormInput(formValues.item.allowedVariation);
  const initTime = useFormInput(moment(formValues.item.initTime).format("HH"));
  const endTime = useFormInput(moment(formValues.item.endTime).format("HH"));

  const comparatorSelect = useFormInput(formValues.item.kqiComparator[0].comparatorFk.id);
  const comparatorNumber = useFormInput(formValues.item.kqiComparator[0].number);
  
  const warningComparatorSelect = useFormInput(formValues.item.kqiComparator[1].comparatorFk.id);
  const warningComparatorNumber = useFormInput(formValues.item.kqiComparator[1].number);
  
  const handleRemove = id => {
    const variables: RemoveKqiTargetMutationVariables = {
      id: id,
    };
    RemoveKqiTargetMutation(variables);
  };
  
  const handleClick = () => {
    const variables: EditKqiTargetMutationVariables = {
      input: {
        id: formValues.item.id,
        name: name.value,
        impact: impact.value,
        period: Number(period.value),
        allowedVariation: Number(allowedVariation.value),
        initTime: moment(initTime.value, "HH"),
        endTime: moment(endTime.value, "HH"),
        status: checked,
        kqi: formValues.item.kqi.id,
      },
    };
    
    const variablesUpper: EditKqiComparatorMutationVariables = {
      input: {
        id: formValues.item.kqiComparator[0].id,
        number: Number(comparatorNumber.value),
        comparatorType: "COMPARATOR",
        kqiTargetFk: formValues.item.kqiComparator[0].kqiTargetFk.id,
        comparatorFk: comparatorSelect.value,
      },
    };
    const variablesLower: EditKqiComparatorMutationVariables = {
      input: {
        id: formValues.item.kqiComparator[1].id,
        number: Number(warningComparatorNumber.value),
        comparatorType: 'WARNING_COMPARATOR',
        kqiTargetFk: formValues.item.kqiComparator[1].kqiTargetFk.id,
        comparatorFk: warningComparatorSelect.value
      },
    };
    EditKqiComparatorMutation(variablesUpper);
    EditKqiComparatorMutation(variablesLower);  
    EditKqiTargetMutation(variables);
    returnFormEdit()
  };

  const dataNameKqi = dataTarget.map(item => item.name)
  
  const inputFilter = () => {
      return (
        dataNameKqi?.filter(
          item => item === name.value && item !== formValues.item.name,
        ) || []
      );
    };

  const validationName = () => {
    if (inputFilter().length > 0) {
      return {hasError: true, errorText: 'Kqi Target name existing'};
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.header} container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid xs>
            <ConfigureTitleSubItem
              title={fbt('KQI Catalog/', '') + ` ${nameKqi}/`}
              tag={` ${formValues.item.name}`}
            />
          </Grid>
          <Grid style={{marginRight: '1rem'}}>
            <IconButton>
              <DeleteOutlinedIcon
                onClick={() => {
                  handleRemove(formValues.item.id);
                  returnFormEdit()
                }}
                style={{color: DARK.D300}}
              />
            </IconButton>
          </Grid>          
          <Grid style={{marginRight: '1rem'}}>
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
          <Grid>
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
        <Grid xs>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                <FormField  label="Enabled">
                  <Switch checked={checked} title={''} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField  
                  {...validationName()}
                  label="Target name">
                  <TextInput
                    {...name}
                    autoComplete="off"
                    name="name"
                  />
                </FormField>
              </Grid>
              <Grid container item xs={7}>
                <Grid item xs={6}>
                  <Grid style={{marginBottom: "6px"}}>
                    <Text style={{fontSize: "14px"}}>Comparator</Text>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      <FormField>
                        <Select
                          {...comparatorSelect}
                          className={classes.select}
                          disableUnderline
                          name="comparatorSelect"
                          >
                          {dataComparatorSelect?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={6}>
                      <FormField>
                        <TextInput
                          {...comparatorNumber}
                          autoComplete="off"
                          name="comparatorNumber"
                          placeholder="Number"
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid style={{marginBottom: "6px"}}>
                    <Text style={{fontSize: "14px"}}>Warning comparator</Text>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6}>
                      <FormField>
                        <Select
                          {...warningComparatorSelect}
                          className={classes.select}
                          disableUnderline
                          name="warningComparatorSelect"
                          >
                          {dataComparatorSelect?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={6}>
                      <FormField>
                        <TextInput
                          {...warningComparatorNumber}
                          autoComplete="off"
                          name="warningComparatorNumber"
                          placeholder="Number"
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={5}>
                <FormField  label="Impact">
                  <TextInput
                    {...impact}
                    autoComplete="off"
                    name="impact"
                    type="multiline"
                    rows={4}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={7}>
                <Grid container item xs={6}>
                  <Grid item xs={6}>
                    <FormField  label="Periods">
                        <TextInput
                          {...period}
                          autoComplete="off"
                          name="period"
                          type="number"
                        />
                    </FormField>
                  </Grid>
                  <Grid item xs={6}>
                    <FormField label="Allowed Variation">
                        <TextInput
                          {...allowedVariation}
                          autoComplete="off"
                          name="allowedVariation"
                          type="text"
                        />
                    </FormField>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid style={{marginBottom: "6px"}}>
                    <Text style={{fontSize: "14px"}}>Active Hours</Text>
                  </Grid>
                  <Grid container>
                    <Grid container item xs={6} alignItems="center">  
                      <Grid item xs={2}>
                        <Text variant="caption">From</Text>
                      </Grid>
                      <Grid item xs={10}>
                        <FormField >
                          <TextInput
                            {...initTime}
                            autoComplete="off"
                            name="initTime"
                            suffix={'hrs'}
                          />
                        </FormField>
                      </Grid>
                    </Grid>
                    <Grid container item xs={6} alignItems="center">  
                      <Grid item xs={2}>
                        <Text variant="caption">to</Text>
                      </Grid>
                      <Grid item xs={10}>
                        <FormField >
                          <TextInput
                            {...endTime}
                            autoComplete="off"
                            name="endTime"
                            suffix={'hrs'}
                          />
                        </FormField>
                      </Grid>
                    </Grid>
                  </Grid> 
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiFormEditTarget;
