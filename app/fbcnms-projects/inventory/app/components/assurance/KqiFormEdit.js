/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import {fetchQuery, graphql} from 'relay-runtime';

import fbt from 'fbt';

import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Select} from '@material-ui/core';

import KqiFormCreateTarget from './KqiFormCreateTarget';
import KqiFormEditTarget from './KqiFormEditTarget';
import KqiTableAssociatedTarget from './KqiTableAssociatedTarget';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {DARK} from '@symphony/design-system/theme/symphony';

import type {EditKqiMutationVariables} from '../../mutations/__generated__/EditKqiMutation.graphql';

import {makeStyles} from '@material-ui/styles';

import type {RemoveKqiMutationVariables} from '../../mutations/__generated__/RemoveKqiMutation.graphql';

import EditKqiMutation from '../../mutations/EditKqiMutation';

import RemoveKqiMutation from '../../mutations/RemoveKqiMutation';
import moment from 'moment';

import {useFormInput} from './common/useFormInput';

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

type KqiTarget = {
  id: string,
  name: string,
  impact: string,
  period: number,
  allowedVariation: number,
  initTime: string,
  endTime: string,
  status: boolean,
  kqi: string,
};

type Props = $ReadOnly<{|
  formValues: {
    item: {
      id: string,
      name: string,
      description: string,
      formula: string,
      startDateTime: string,
      endDateTime: string,
      kqiCategory: {
        id: string,
        name: string,
      },
      kqiPerspective: {
        id: string,
        name: string,
      },
      kqiSource: {
        id: string,
        name: string,
      },
      kqiTemporalFrequency: {
        id: string,
        name: string,
      },
      kqiTarget: {
        id: string,
      }
    },
  },

  dataPerspectives: Array<KqiPerspectives>,
  dataSources: Array<KqiSources>,
  dataCategories: Array<KqiCategories>,
  dataTemporalFrequencies: Array<KqiTemporalFrequency>,
  returnTableKqi: () => void,
  dataValues: any,
  dataComparator: any,
  dataKqi: any
|}>;

const KqiFormEdit = (props: Props) => {
  const {
    dataKqi,
    dataValues,
    formValues,
    dataComparator,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
    returnTableKqi,
  } = props;
  const classes = useStyles();
  const [showCreateTarget, setShowCreateTarget] = useState(false);
  const [showEditTarget, setShowEditTarget] = useState(false);
  const [dataEdit, setDataEdit] = useState({});


  const name = useFormInput(formValues.item.name);
  const description = useFormInput(formValues.item.description);
  const formula = useFormInput(formValues.item.formula);
  const startDateTime = useFormInput(
    moment(formValues.item.startDateTime).format('YYYY-MM-DDThh:mm'),
  );
  const endDateTime = useFormInput(
    moment(formValues.item.endDateTime).format('YYYY-MM-DDThh:mm'),
  );
  
  const kqiCategory = useFormInput(formValues.item.kqiCategory.id);
  const kqiPerspective = useFormInput(formValues.item.kqiPerspective.id);
  const kqiSource = useFormInput(formValues.item.kqiSource.id);
  const kqiTemporalFrequency = useFormInput(formValues.item.kqiTemporalFrequency.id,);

  const filterKqiTargetsById = dataValues?.filter(
    kqiData => kqiData?.kqi?.id === formValues.item.id,
  );
  const dataNameKqi = dataKqi.map(item => item.name)
  
  const inputFilter = () => {
      return (
        dataNameKqi?.filter(
          item => item === name.value && item !== formValues.item.name,
        ) || []
      );
    };

  const validationName = () => {
    if (inputFilter().length > 0) {
      return {hasError: true, errorText: 'Kqi name existing'};
    }
  };

  const handleRemove = id => {
    const variables: RemoveKqiMutationVariables = {
      id: id,
    };
    RemoveKqiMutation(variables);
  };

  const handleClick = () => {
    const variables: EditKqiMutationVariables = {
      input: {
        id: formValues.item.id,
        name: name.value,
        description: description.value,
        formula: formula.value,
        startDateTime: moment(startDateTime.value).format(),
        endDateTime: moment(endDateTime.value).format(),
        kqiCategory: kqiCategory.value,
        kqiPerspective: kqiPerspective.value,
        kqiSource: kqiSource.value,
        kqiTemporalFrequency: kqiTemporalFrequency.value,
      },
    };
    EditKqiMutation(variables);
    returnTableKqi();
  };

  const showFormCreateTarget = () => {
    setShowCreateTarget(true);
  };

  if (showCreateTarget) {
    return (
      <KqiFormCreateTarget
        idKqi={formValues.item.id}
        dataComparatorSelect={dataComparator}
        returnFormEdit={() => setShowCreateTarget(false)}
      />
    );
  }
  const showFormEditTarget = (kqiTarget: KqiTarget) => {
    setShowEditTarget(true);
    setDataEdit(kqiTarget);
  };

  if (showEditTarget) {
    return (
      <KqiFormEditTarget
        formValues={dataEdit}
        nameKqi={formValues.item.name}
        dataComparatorSelect={dataComparator}
        returnFormEdit={() => setShowEditTarget(false)}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <Grid className={classes.header} container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid xs>
            <ConfigureTitleSubItem
              title={fbt('KQI catalog/', 'KQI catalog')}
              tag={` ${formValues.item.name}`}
            />
          </Grid>
          <Grid style={{marginRight: '1rem'}}>
            <IconButton>
              <DeleteOutlinedIcon
                onClick={() => {
                  handleRemove(formValues.item.id);
                  returnTableKqi();
                }}
                style={{color: DARK.D300,}}
              />
            </IconButton>
          </Grid>
          <Grid>
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
                    {...name}
                    autoComplete="off"
                    name="name"
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField label="ID">
                  <TextInput
                    value={formValues.item.id}
                    autoComplete="off"
                    name="id"
                    disabled
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Category" >
                    <Select
                      {...kqiCategory}
                      className={classes.select}
                      disableUnderline
                      name="kqiCategory">
                      {dataCategories?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Perspective" >
                    <Select
                      {...kqiPerspective}
                      className={classes.select}
                      disableUnderline
                      name="kqiPerspective">
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
                <FormField  label="Description">
                  <TextInput
                    {...description}
                    autoComplete="off"
                    name="description"
                    type="multiline"
                    rows={4}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Start" >
                    <TextField
                      {...startDateTime}
                      disabled
                      name="startDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="End" >
                    <TextField
                      {...endDateTime}
                      name="endDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      className={classes.calendar}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Source" >
                    <Select
                      {...kqiSource}
                      className={classes.select}
                      disableUnderline
                      name="kqiSource">
                      {dataSources?.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
                <Grid item xs={6}>
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
                          {...kqiTemporalFrequency}
                          className={classes.select}
                          disableUnderline
                          name="kqiTemporalFrequency">
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
                    {...formula}
                    autoComplete="off"
                    name="formula"
                    type="multiline"
                    rows={10}
                  />
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid className={classes.target} item xs={12}>
        <KqiTableAssociatedTarget
          tableTargets={filterKqiTargetsById}
          create={() => showFormCreateTarget()}
          edit={showFormEditTarget}
        />
      </Grid>
    </div>
  );
};
export default KqiFormEdit;
