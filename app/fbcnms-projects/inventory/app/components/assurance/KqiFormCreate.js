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

import TextInput from '@symphony/design-system/components/Input/TextInput';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import {MenuItem, Select} from '@material-ui/core';

import Text from '@symphony/design-system/components/Text';

import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/styles';
import moment from 'moment';
import type {AddKqiMutationVariables} from '../../mutations/__generated__/AddKqiMutation.graphql';
import AddKqiMutation from '../../mutations/AddKqiMutation';
import DateTimeFormat from '../../common/DateTimeFormat.js';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
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
  selectRepeatEvery: {
    width: '75%',
    marginLeft: '1rem',
  },
  insideContainer: {
    paddingTop: '12px',
  },
  formField: {
    margin: '0 1rem 1rem 1rem',
  },
  formFieldTf: {
    width: '24rem',
    height: 'auto',
    margin: '0 1rem 1rem 0',
  },
  formFieldStatus: {
    marginTop: '1rem',
  },
  textInput: {
    minHeight: '36px',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  textTitle: {
    paddingLeft: '3rem',
  },
  reason: {
    minHeight: '100px',
  },
  status: {
    paddingTop: '40px',
  },
  time: {},
  titleTime: {
    marginLeft: '1rem',
  },
  calendar: {
    '& .MuiOutlinedInput-input': {
      height: '17px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(157, 169, 190, 0.49)',
      },
    },
  },
}));
const data = {
  counters: {
    edges: [
      {
        node: {
          id: '244813135872',
          name: 'contador_family_7',
          networkManagerSystem: 'hola bebe',
          externalID: '123456789',
        },
      },
      {
        node: {
          id: '244813135873',
          name: 'contador_family_8',
          networkManagerSystem: 'hola sergio',
          externalID: '987654321',
        },
      },
    ],
  },
};

type KqiPerspectives = {
  id: string,
  name: string
}

type KqiSources = {
  id: string,
  name: string
}

type KqiCategories = {
  id: string,
  name: string
}

type KqiTemporalFrequency = {
  id: string,
  name: string
}

type Kqis = {
  data: {
    id: string,
    name: string,
    description: string,
    formula: string,
    startDateTime: string,
    endDateTime: string,
    kqiCategory: string,
    kqiPerspective: string,
    kqiSource: string,
    kqiTemporalFrequency: string
  }
}

type Props = $ReadOnly<{|
  returnTableKqi: () => void,
  dataPerspectives: Array<KqiPerspectives>,
  dataSources: Array<KqiSources>,
  dataCategories: Array<KqiCategories>,
  dataTemporalFrequencies: Array<KqiTemporalFrequency>,
|}>;

const KqiFormCreate = (props: Props) => {
  const {
    returnTableKqi,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
  } = props;
  const classes = useStyles();
  const [Kqis, setKqis] = useState<Kqis>({data: {}});

  function handleChange({target}) {
    setKqis({
      data: {
        ...Kqis.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddKqiMutationVariables = {
      input: {
        name: Kqis.data.name,
        description: Kqis.data.description,
        formula: Kqis.data.formula,
        startDateTime: moment(Kqis.data.startDateTime).format(),
        endDateTime: moment(Kqis.data.endDateTime).format(),
        kqiCategory: Kqis.data.kqiCategory,
        kqiPerspective: Kqis.data.kqiPerspective,
        kqiSource: Kqis.data.kqiSource,
        kqiTemporalFrequency: Kqis.data.kqiTemporalFrequency,

      },
    };
    AddKqiMutation(variables);
    returnTableKqi()
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          <Text className={classes.textTitle} variant="h6" weight={'bold'}>
            {fbt('Create KQI', ' ')}
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
                  onClick={() => returnTableKqi()}>
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
            <Grid container spacing={1} className={classes.insideContainer}>
              <Grid item xs={6}>
                <FormField label="Name" className={classes.formField}>
                  <TextInput name="name" className={classes.textInput} onChange={handleChange}/>
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="ID">
                  <TextInput disabled name="id" className={classes.textInput} onChange={handleChange}/>
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Category" className={classes.formField}>
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiCategory"
                      onChange={handleChange}
                    >
                      {dataCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Perspective" className={classes.formField}>
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiPerspective"
                      onChange={handleChange}
                    >
                      {dataPerspectives?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid className={classes.time} item xs={12}>
                  <Text className={classes.titleTime} variant="subtitle1">
                    Activation period
                  </Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Description">
                  <TextInput
                    name="description"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      name="startDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      name="endDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Source" className={classes.formField}>
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiSource"
                      onChange={handleChange}
                    >
                      {dataSources?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid container item xs={6}>
                  <FormField
                    label="Temporal frequency"
                    className={classes.formField}>
                    <div className={classes.formFieldTf}>
                      <Text variant={'caption'}>Repeat every</Text>
                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectRepeatEvery,
                        )}
                        disableUnderline
                        name="kqiTemporalFrequency"
                        onChange={handleChange}
                      >
                        {dataTemporalFrequencies.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormField>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField label="Formula" className={classes.formField}>
                  <TextInput
                    name="formula"
                    type="multiline"
                    rows={10}
                    className={classes.textInput}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiFormCreate;
