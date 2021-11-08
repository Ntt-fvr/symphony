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
import React, {useState, useMemo} from 'react';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import moment from 'moment';
import {MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

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
  idKqi: string,
  returnFormEdit: () => void,
  dataComparatorSelect: Array<Comparator>,
  dataTarget: any,
  isCompleted: void => void,
|}>;

const KqiFormCreateTarget = (props: Props) => {
  const {
    returnFormEdit,
    idKqi,
    dataComparatorSelect,
    dataTarget,
    isCompleted,
  } = props;
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
        AddKqiComparatorMutation(variablesUpper, {
          onCompleted: () => isCompleted(),
        });
        AddKqiComparatorMutation(variablesLower, {
          onCompleted: () => isCompleted(),
        });
      },
    };
    AddKqiTargetMutation(variables, response);
  }

  const dataNameTarget = dataTarget?.map(item => item?.name);

  const handleDisable = useMemo(
    () =>
      !(
        Object.values(KqiTarget.data).length === 10 &&
        !Object.values(KqiTarget.data).some(item => item === '') &&
        !dataNameTarget?.some(item => item === KqiTarget.data.name)
      ),
    [KqiTarget.data, dataNameTarget],
  );

  const handleHasError = useMemo(() => {
    if (dataNameTarget?.some(item => item === KqiTarget.data.name)) {
      return {hasError: true, errorText: 'Kqi Target name existing'};
    }
  }, [dataNameTarget, KqiTarget.data.name]);

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
            <Text variant="h6" weight={'bold'}>
              {fbt('Create target', ' ')}
            </Text>
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
                onClick={() => {
                  handleClick();
                  returnFormEdit();
                }}
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
                <FormField {...handleHasError} required label="Target name">
                  <TextInput
                    autoComplete="off"
                    name="name"
                    onChange={handleChange}
                  />
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
                          className={classes.select}
                          disableUnderline
                          name="comparatorSelect"
                          onChange={handleChange}>
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
                          autoComplete="off"
                          name="comparatorNumber"
                          placeholder="Number"
                          type="number"
                          onChange={handleChange}
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
                          className={classes.select}
                          disableUnderline
                          name="warningComparatorSelect"
                          onChange={handleChange}>
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
                          autoComplete="off"
                          name="warningComparatorNumber"
                          placeholder="Number"
                          type="number"
                          onChange={handleChange}
                        />
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} lg={5}>
                <FormField label="Impact">
                  <TextInput
                    autoComplete="off"
                    name="impact"
                    type="multiline"
                    rows={4}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={8} lg={7}>
                <Grid container item xs={6} style={{paddingRight: '1.3rem'}}>
                  <Grid item xs={6} className={classes.gridStyleLeft}>
                    <FormField label="Periods">
                      <TextInput
                        autoComplete="off"
                        name="period"
                        placeholder="Number"
                        type="number"
                        onChange={handleChange}
                      />
                    </FormField>
                  </Grid>
                  <Grid item xs={6} className={classes.gridStyleRight}>
                    <Grid style={{marginBottom: '6px'}}>
                      <Text style={{fontSize: '14px'}}>Allowed Variation</Text>
                    </Grid>
                    <FormField>
                      <TextInput
                        autoComplete="off"
                        name="allowedVariation"
                        placeholder="Number"
                        type="number"
                        onChange={handleChange}
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
                            autoComplete="off"
                            name="initTime"
                            placeholder="Number"
                            type="number"
                            onChange={handleChange}
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
                            autoComplete="off"
                            name="endTime"
                            placeholder="Number"
                            type="number"
                            onChange={handleChange}
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
export default KqiFormCreateTarget;
