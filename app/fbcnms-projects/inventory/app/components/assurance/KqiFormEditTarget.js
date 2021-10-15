/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState, useMemo} from 'react';
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

import Switch from '@symphony/design-system/components/switch/Switch';

import type {EditKqiComparatorMutationVariables} from '../../mutations/__generated__/EditKqiComparatorMutation.graphql';
import type {EditKqiTargetMutationVariables} from '../../mutations/__generated__/EditKqiTargetMutation.graphql';
import type {RemoveKqiTargetMutationVariables} from '../../mutations/__generated__/RemoveKqiTargetMutation.graphql';
import type {KqiTarget} from './KqiFormEdit';
import EditKqiComparatorMutation from '../../mutations/EditKqiComparatorMutation';
import EditKqiTargetMutation from '../../mutations/EditKqiTargetMutation';
import RemoveKqiTargetMutation from '../../mutations/RemoveKqiTargetMutation';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './common/useFormInput';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px',
  },
  header: {
    marginBottom: '1rem',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
      width: '100%',
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
  gridStyleLeft: {
    paddingRight: '0.5rem',
  },
  gridStyleRight: {
    paddingLeft: '0.5rem',
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
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
  dataTarget: Array<KqiTarget>,
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
      kqiComparator: {
        id: string,
        number: Number,
        comparatorType: string,
        kqiTargetFk: {
          name: string,
          id: string,
        },
        comparatorFk: {
          id: string,
          name: string,
        },
      },
    },
  },
|}>;

const KqiFormEditTarget = (props: Props) => {
  const {
    returnFormEdit,
    formValues,
    dataComparatorSelect,
    nameKqi,
    dataTarget,
    isCompleted,
  } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(formValues.item.status);

  const name = useFormInput(formValues.item.name);
  const impact = useFormInput(formValues.item.impact);
  const period = useFormInput(formValues.item.period);
  const allowedVariation = useFormInput(formValues.item.allowedVariation);
  const initTime = useFormInput(moment(formValues.item.initTime).format('HH'));
  const endTime = useFormInput(moment(formValues.item.endTime).format('HH'));

  const comparatorSelect = useFormInput(
    formValues.item.kqiComparator[0].comparatorFk.id,
  );
  const comparatorNumber = useFormInput(
    formValues.item.kqiComparator[0].number,
  );

  const warningComparatorSelect = useFormInput(
    formValues.item.kqiComparator[1].comparatorFk.id,
  );
  const warningComparatorNumber = useFormInput(
    formValues.item.kqiComparator[1].number,
  );

  const handleRemove = id => {
    const variables: RemoveKqiTargetMutationVariables = {
      id: id,
    };
    RemoveKqiTargetMutation(variables, {onCompleted: () => isCompleted()});
  };

  const handleClick = () => {
    const variables: EditKqiTargetMutationVariables = {
      input: {
        id: formValues.item.id,
        name: name.value,
        impact: impact.value,
        period: Number(period.value),
        allowedVariation: Number(allowedVariation.value),
        initTime: moment(initTime.value, 'HH'),
        endTime: moment(endTime.value, 'HH'),
        status: checked,
        kqi: formValues.item.kqi.id,
      },
    };

    const variablesUpper: EditKqiComparatorMutationVariables = {
      input: {
        id: formValues.item.kqiComparator[0].id,
        number: Number(comparatorNumber.value),
        comparatorType: 'COMPARATOR',
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
        comparatorFk: warningComparatorSelect.value,
      },
    };
    EditKqiComparatorMutation(variablesUpper, {
      onCompleted: () => isCompleted(),
    });
    EditKqiComparatorMutation(variablesLower, {
      onCompleted: () => isCompleted(),
    });
    EditKqiTargetMutation(variables, {onCompleted: () => isCompleted()});
    returnFormEdit();
  };

  const dataNameKqi = dataTarget.map(item => item.name);

  const inputFilter = () => {
    return (
      dataNameKqi?.filter(
        item => item === name.value && item !== formValues.item.name,
      ) || []
    );
  };

  const dataInputsObject = [
    name.value,
    impact.value,
    period.value,
    allowedVariation.value,
    initTime.value,
    endTime.value,
    comparatorNumber.value,
    warningComparatorNumber.value,
  ];

  const handleDisable = useMemo(
    () =>
      !(
        dataInputsObject.length === 8 &&
        !dataInputsObject.some(item => item === '') &&
        !inputFilter().length > 0
      ),
    [dataInputsObject, dataNameKqi],
  );

  const handleHasError = useMemo(() => {
    if (inputFilter().length > 0) {
      return {hasError: true, errorText: 'Kqi Target name existing'};
    }
  }, [dataNameKqi]);

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
              title={fbt('KQI Catalog/', '') + ` ${nameKqi}/`}
              tag={` ${formValues.item.name}`}
            />
          </Grid>
          <Grid style={{marginRight: '1rem'}}>
            <IconButton>
              <DeleteOutlinedIcon
                onClick={() => {
                  handleRemove(formValues.item.id);
                  returnFormEdit();
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
                color="primary"
                disabled={handleDisable}>
                Save
              </Button>
            </FormField>
          </Grid>
        </Grid>
        <Grid xs>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                <FormField label="Enabled">
                  <Switch checked={checked} title={''} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField {...handleHasError} label="Target name">
                  <TextInput {...name} autoComplete="off" name="name" />
                </FormField>
              </Grid>
              <Grid container item xs={8} lg={7}>
                <Grid item xs={6} style={{paddingRight: '1.3rem'}}>
                  <Grid style={{marginBottom: '6px'}}>
                    <Text style={{fontSize: '14px'}}>Comparator</Text>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6} className={classes.gridStyleLeft}>
                      <FormField>
                        <Select
                          {...comparatorSelect}
                          className={classes.select}
                          disableUnderline
                          name="comparatorSelect">
                          {dataComparatorSelect?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyleRight}>
                      <FormField>
                        <TextInput
                          {...comparatorNumber}
                          autoComplete="off"
                          name="comparatorNumber"
                          placeholder="Number"
                          type="number"
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: '1.3rem'}}>
                  <Grid style={{marginBottom: '6px'}}>
                    <Text style={{fontSize: '14px'}}>Warning comparator</Text>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6} className={classes.gridStyleLeft}>
                      <FormField>
                        <Select
                          {...warningComparatorSelect}
                          className={classes.select}
                          disableUnderline
                          name="warningComparatorSelect">
                          {dataComparatorSelect?.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                    <Grid item xs={6} className={classes.gridStyleRight}>
                      <FormField>
                        <TextInput
                          {...warningComparatorNumber}
                          autoComplete="off"
                          name="warningComparatorNumber"
                          placeholder="Number"
                          type="number"
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} lg={5}>
                <FormField label="Impact">
                  <TextInput
                    {...impact}
                    autoComplete="off"
                    name="impact"
                    type="multiline"
                    rows={4}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={8} lg={7}>
                <Grid container item xs={6} style={{paddingRight: '1.3rem'}}>
                  <Grid item xs={6} className={classes.gridStyleLeft}>
                    <FormField label="Periods">
                      <TextInput
                        {...period}
                        autoComplete="off"
                        name="period"
                        placeholder="Number"
                        type="number"
                      />
                    </FormField>
                  </Grid>
                  <Grid item xs={6} className={classes.gridStyleRight}>
                    <Grid style={{marginBottom: '6px'}}>
                      <Text style={{fontSize: '14px'}}>Allowed Variation</Text>
                    </Grid>
                    <FormField>
                      <TextInput
                        {...allowedVariation}
                        autoComplete="off"
                        name="allowedVariation"
                        placeholder="Number"
                        type="number"
                      />
                    </FormField>
                  </Grid>
                </Grid>
                <Grid item xs={6} style={{paddingLeft: '1.3rem'}}>
                  <Grid style={{marginBottom: '6px'}}>
                    <Text style={{fontSize: '14px'}}>Active Hours</Text>
                  </Grid>
                  <Grid container>
                    <Grid
                      container
                      item
                      xs={6}
                      alignItems="center"
                      className={classes.gridStyleLeft}>
                      <Grid item xs={4} lg={3} xl={2}>
                        <Text variant="caption">From</Text>
                      </Grid>
                      <Grid item xs={8} lg={9} xl={10}>
                        <FormField>
                          <TextInput
                            {...initTime}
                            autoComplete="off"
                            name="initTime"
                            placeholder="Number"
                            type="number"
                            suffix="hrs"
                          />
                        </FormField>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={6}
                      alignItems="center"
                      className={classes.gridStyleRight}>
                      <Grid item xs={2} xl={1}>
                        <Text variant="caption">to</Text>
                      </Grid>
                      <Grid item xs={10} xl={11}>
                        <FormField>
                          <TextInput
                            {...endTime}
                            autoComplete="off"
                            name="endTime"
                            suffix="hrs"
                            placeholder="Number"
                            type="number"
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
