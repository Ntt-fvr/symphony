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
import {DARK} from '@symphony/design-system/theme/symphony';
import IconButton from '@material-ui/core/IconButton'

import {makeStyles} from '@material-ui/styles';
import type {EditKqiMutationVariables} from '../../mutations/__generated__/EditKqiMutation.graphql';

import EditKqiMutation from '../../mutations/EditKqiMutation';
import type {RemoveKqiMutationVariables} from '../../mutations/__generated__/RemoveKqiMutation.graphql';

import RemoveKqiMutation from '../../mutations/RemoveKqiMutation';
import {graphql} from 'relay-runtime';
import {useLazyLoadQuery} from 'react-relay/hooks';
import moment from 'moment';
import {useFormInput} from './common/useFormInput';

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
    margin: '0 3px 0 0 ',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  target: {
    margin: '2rem 2px 3rem 2px',
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
    },
  },
  
  dataKqiTargets: any,
  dataPerspectives: Array<KqiPerspectives>,
  dataSources: Array<KqiSources>,
  dataCategories: Array<KqiCategories>,
  dataTemporalFrequencies: Array<KqiTemporalFrequency>,
  returnTableKqi: () => void,
|}>;


const KqiFormEdit = (props: Props) => {
  const {
    formValues,
    dataKqiTargets,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
    returnTableKqi
  } = props;
  const classes = useStyles();
  const [showCreateTarget, setShowCreateTarget] = useState(false);
  const [showEditTarget, setShowEditTarget] = useState(false);
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
  const kqiTemporalFrequency = useFormInput(
    formValues.item.kqiTemporalFrequency.id,
  );
  
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
  };

  const showFormCreateTarget = () => {
    setShowCreateTarget(true);
  };

  if (showCreateTarget) {
    return (
      <KqiFormCreateTarget returnFormEdit={() => setShowCreateTarget(false)} />
    );
  }
  const showFormEditTarget = () => {
    setShowEditTarget(true);
  };

  if (showEditTarget) {
    return (
      <KqiFormEditTarget returnFormEdit={() => setShowEditTarget(false)} />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <ConfigureTitleSubItem
            title={fbt('KQI catalog/', 'nameKqi')}
            tag={''}
            className={classes.textTitle}
          />
        </Grid>
        <Grid item xs={1} className={classes.delete}>
          <IconButton>
            <DeleteOutlinedIcon
              onClick={() => {
                handleRemove(formValues.item.id)
                returnTableKqi()
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
                  <TextInput
                    {...name}
                    name="name"
                    className={classes.textInput}
                  />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="ID">
                  <TextInput
                    value={formValues.item.id}
                    name="id"
                    disabled
                    className={classes.textInput}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Category" className={classes.formField}>
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
                  <FormField label="Perspective" className={classes.formField}>
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
                <Grid className={classes.time} item xs={12}>
                  <Text className={classes.titleTime} variant="subtitle1">
                    Activation period
                  </Text>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Description">
                  <TextInput
                    {...description}
                    name="description"
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Start" className={classes.formField}>
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
                  <FormField label="End" className={classes.formField}>
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
                  <FormField label="Source" className={classes.formField}>
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
                <Grid container item xs={6}>
                  <FormField
                    label="Temporal frequency"
                    className={classes.formField}>
                    <div className={classes.formFieldTf}>
                      <Text variant={'caption'}>Repeat every</Text>

                      <Select
                        {...kqiTemporalFrequency}
                        className={classNames(
                          classes.select,
                          classes.selectRepeatEvery,
                        )}
                        disableUnderline
                        name="kqiTemporalFrequency">
                        {dataTemporalFrequencies?.map((item, index) => (
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
                    {...formula}
                    name="formula"
                    type="multiline"
                    rows={10}
                    className={classes.textInput}
                  />
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid className={classes.target} item xs={12}>
        <KqiTableAssociatedTarget
          dataTableTargets={dataKqiTargets}
          create={() => showFormCreateTarget()}
          edit={() => showFormEditTarget()}
        />
      </Grid>
    </div>
  );
};
export default KqiFormEdit;
