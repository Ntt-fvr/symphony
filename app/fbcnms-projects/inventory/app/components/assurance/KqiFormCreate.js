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

import AddKqiMutation from '../../mutations/AddKqiMutation';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import moment from 'moment';
import {MenuItem, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButton} from './common/useDisabledButton';
import {useValidation} from './common/useValidation';

const useStyles = makeStyles(() => ({
  root: {
    padding: '40px',
  },
  header: {
    marginBottom: '1rem',
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '7px',
      width: '100%',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
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
  textarea: {
    minHeight: '60px',
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
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
  calendar: {
    '& .MuiOutlinedInput-input': {
      height: '24px',
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
    kqiTemporalFrequency: string,
  },
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
  returnTableKqi: () => void,
  dataPerspectives: Array<KqiPerspectives>,
  dataSources: Array<KqiSources>,
  dataCategories: Array<KqiCategories>,
  dataTemporalFrequencies: Array<KqiTemporalFrequency>,
  dataKqi: Array<Kqis>,
|}>;

const KqiFormCreate = (props: Props) => {
  const {
    returnTableKqi,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
    dataKqi,
    isCompleted,
  } = props;
  const classes = useStyles();
  const [Kqis, setKqis] = useState<Kqis>({data: {}});
  function handleChange({target}) {
    setKqis({
      data: {
        ...Kqis.data,
        [target.name]: target.value.trim(),
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
    AddKqiMutation(variables, {onCompleted: () => isCompleted()});
    returnTableKqi();
  }

  const dataNameKqi = dataKqi.map(item => item.name);

  const handleDisable = useDisabledButton(Kqis.data, dataNameKqi, 9);

  const validationName = useValidation(Kqis.data.name, dataNameKqi, 'Kqi');

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center">
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
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullwidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    {...validationName}
                  />
                </form>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    disabled
                    className={classes.textInput}
                    label="ID"
                    variant="outlined"
                    name="id"
                  />
                </form>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      select
                      required
                      label="Category"
                      fullWidth
                      name="kqiCategory"
                      onChange={handleChange}
                      variant="outlined">
                      {dataCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      select
                      required
                      label="Perspective"
                      fullWidth
                      name="kqiPerspective"
                      onChange={handleChange}
                      variant="outlined">
                      {dataPerspectives?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                </Grid>
                <Grid style={{marginBottom: '-21px'}} item xs={12}>
                  <Text variant="subtitle1">Activation period</Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullwidth
                    multiline
                    rows={2}
                    label="Description"
                    variant="outlined"
                    name="description"
                    className={classes.textarea}
                    inputProps={{maxLength: 200}}
                    onChange={handleChange}
                  />
                </form>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField className={classes.formField}>
                    <TextField
                      name="startDateTime"
                      variant="outlined"
                      label="Start"
                      InputLabelProps={{ shrink: true }}
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField className={classes.formField}>
                    <TextField
                      name="endDateTime"
                      variant="outlined"
                      label="End"
                      InputLabelProps={{ shrink: true }}
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                      onChange={handleChange}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <form className={classes.formField} autoComplete="off">
                    <TextField
                      select
                      required
                      label="Source"
                      fullWidth
                      name="kqiSource"
                      onChange={handleChange}
                      variant="outlined">
                      {dataSources?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <Grid container alignItems="center">
                    <Grid style={{marginBottom: '7px'}} item xs={5} lg={4}>
                      <Text variant={'caption'}>Repeat every</Text>
                    </Grid>
                    <Grid item xs lg={8}>
                      <form className={classes.formField} autoComplete="off">
                        <TextField
                          select
                          required
                          label="Temporal frequency"
                          fullWidth
                          name="kqiTemporalFrequency"
                          onChange={handleChange}
                          variant="outlined">
                          {dataTemporalFrequencies.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </form>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    fullwidth
                    multiline
                    rows={7}
                    label="Formula"
                    variant="outlined"
                    name="formula"
                    className={classes.textarea}
                    inputProps={{maxLength: 1000}}
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
export default KqiFormCreate;
