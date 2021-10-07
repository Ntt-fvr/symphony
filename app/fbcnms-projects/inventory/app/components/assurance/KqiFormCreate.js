/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddKqiMutationVariables} from '../../mutations/__generated__/AddKqiMutation.graphql';
import React, {useState, useMemo} from 'react';
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
import AddKqiMutation from '../../mutations/AddKqiMutation';

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
    paddingRight: '0.5rem'
  },
  gridStyleRight: {
    paddingLeft: '0.5rem'
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  calendar: {
    '& .MuiOutlinedInput-input': {
      height: '12px',
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

type KqiPerspectives = {
  id: string,
  name: string,
};

type KqiSources = {
  id: string,
  name: string,
};

type KqiCategories = {
  id: string,
  name: string,
};

type KqiTemporalFrequency = {
  id: string,
  name: string,
};

type Kqis = {
  name: string,
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
  dataKqi: Array<Kqis>
|}>;

const KqiFormCreate = (props: Props) => {
  const {
    returnTableKqi,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
    dataKqi
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
    returnTableKqi();
  }

  const dataNameKqi = dataKqi.map(item => item.name)

  const validationName = () => {
    if (dataNameKqi?.some(item => item === Kqis.data.name)) {
      return {hasError: true, errorText: 'Kqi name existing'};
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.header} container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid>
            <Text variant="h6" weight={'bold'}>
              {fbt('Create KQI', ' ')}
            </Text>
          </Grid>
          <Grid xs>
            <FormField>
              <Button
                style={{marginRight: '1rem'}}
                className={classes.option}
                variant="outlined"
                color="primary"
                onClick={() => returnTableKqi()}>
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
              <Grid item xs={6}>
                <FormField 
                  label="Name"
                  required
                  {...validationName()}
                >
                  <TextInput
                    autoComplete="off"
                    name="name"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField label="ID">
                  <TextInput
                    autoComplete="off"
                    disabled
                    name="id"
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField label="Category">
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiCategory"
                      onChange={handleChange}>
                      {dataCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField label="Perspective">
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiPerspective"
                      onChange={handleChange}>
                      {dataPerspectives?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={12}>
                  <Text variant="subtitle1">
                    Activation period
                  </Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField label="Description">
                  <TextInput
                    autoComplete="off"
                    name="description"
                    type="multiline"
                    rows={4}
                    onChange={handleChange}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField label="Start">
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
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField label="End">
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
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField label="Source">
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="kqiSource"
                      onChange={handleChange}>
                      {dataSources?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <Grid style={{marginBottom: "6px"}}>
                    <Text style={{fontSize: "14px"}}>Temporal frequency</Text>
                  </Grid>
                  <Grid container alignItems="center">
                    <Grid item xs={5} lg={3}>
                      <Text variant={'caption'}>Repeat every</Text>
                    </Grid>
                    <Grid item xs>
                      <FormField>
                        <Select
                          className={classes.select}
                          disableUnderline
                          name="kqiTemporalFrequency"
                          onChange={handleChange}>
                          {dataTemporalFrequencies.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField label="Formula">
                  <TextInput
                    autoComplete="off"
                    name="formula"
                    type="multiline"
                    rows={10}
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
