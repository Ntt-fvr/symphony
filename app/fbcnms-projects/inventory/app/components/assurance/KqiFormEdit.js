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

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Select} from '@material-ui/core';

import DialogConfirmDelete from './DialogConfirmDelete';

import KqiFormCreateTarget from './KqiFormCreateTarget';
import KqiFormEditTarget from './KqiFormEditTarget';
import KqiTableAssociatedTarget from './KqiTableAssociatedTarget';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import {DARK} from '@symphony/design-system/theme/symphony';

import type {EditKqiMutationVariables} from '../../mutations/__generated__/EditKqiMutation.graphql';
import type {Kqis} from './KqiTypes';

import {makeStyles} from '@material-ui/styles';

import type {RemoveKqiMutationVariables} from '../../mutations/__generated__/RemoveKqiMutation.graphql';

import EditKqiMutation from '../../mutations/EditKqiMutation';

import RemoveKqiMutation from '../../mutations/RemoveKqiMutation';
import moment from 'moment';
import {useDisabledButtonEdit} from './common/useDisabledButton';
import {useFormInput} from './common/useFormInput';
import {useValidationEdit} from './common/useValidation';

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

export type KqiTarget = {
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
};

type Comparator = {
  id: string,
  name: string,
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
    },
  },

  dataPerspectives: Array<KqiPerspectives>,
  dataSources: Array<KqiSources>,
  dataCategories: Array<KqiCategories>,
  dataTemporalFrequencies: Array<KqiTemporalFrequency>,
  returnTableKqi: () => void,
  dataKqiTarget: Array<KqiTarget>,
  dataComparator: Array<Comparator>,
  dataKqi: Array<Kqis>,
  isCompleted: void => void,
|}>;

const KqiFormEdit = (props: Props) => {
  const {
    dataKqi,
    dataKqiTarget,
    formValues,
    dataComparator,
    dataPerspectives,
    dataSources,
    dataCategories,
    dataTemporalFrequencies,
    returnTableKqi,
    isCompleted,
  } = props;
  const classes = useStyles();
  const [showCreateTarget, setShowCreateTarget] = useState(false);
  const [showEditTarget, setShowEditTarget] = useState(false);
  const [dataEdit, setDataEdit] = useState<KqiTarget>({});
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const filterKqiTargetsById = dataKqiTarget?.filter(
    kqiData => kqiData?.kqi?.id === formValues.item.id,
  );
  const dataNameKqi = dataKqi.map(item => item.name);

  const dataInputsObject = [
    name.value.trim(),
    description.value.trim(),
    formula.value.trim(),
    kqiCategory.value,
    kqiPerspective.value,
    endDateTime.value,
    kqiSource.value,
    kqiTemporalFrequency.value,
  ];

  const inputFilter = () => {
    return (
      dataNameKqi?.filter(
        item =>
          item === name.value.trim() && item !== formValues.item.name.trim(),
      ) || []
    );
  };

  const handleDisable = useDisabledButtonEdit(dataInputsObject, 8, inputFilter);

  const validationName = useValidationEdit(inputFilter, 'Kqi');

  const handleRemove = id => {
    const variables: RemoveKqiMutationVariables = {
      id: id,
    };
    RemoveKqiMutation(variables, {onCompleted: () => isCompleted()});
  };

  const handleClick = () => {
    const variables: EditKqiMutationVariables = {
      input: {
        id: formValues.item.id,
        name: name.value.trim(),
        description: description.value.trim(),
        formula: formula.value.trim(),
        startDateTime: moment(startDateTime.value).format(),
        endDateTime: moment(endDateTime.value).format(),
        kqiCategory: kqiCategory.value,
        kqiPerspective: kqiPerspective.value,
        kqiSource: kqiSource.value,
        kqiTemporalFrequency: kqiTemporalFrequency.value,
      },
    };
    EditKqiMutation(variables, {onCompleted: () => isCompleted()});
    returnTableKqi();
  };

  const showFormCreateTarget = () => {
    setShowCreateTarget(true);
  };

  if (showCreateTarget) {
    return (
      <KqiFormCreateTarget
        isCompleted={isCompleted}
        dataTarget={filterKqiTargetsById}
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
        isCompleted={isCompleted}
        formValues={dataEdit}
        dataTarget={filterKqiTargetsById}
        nameKqi={formValues.item.name.trim()}
        dataComparatorSelect={dataComparator}
        returnFormEdit={() => setShowEditTarget(false)}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.header}>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Grid xs>
            <ConfigureTitleSubItem
              title={fbt('KQI catalog/', 'KQI catalog')}
              tag={` ${formValues.item.name}`}
            />
          </Grid>
          <Grid style={{marginRight: '1rem'}}>
            <IconButton>
              <DeleteOutlinedIcon
                onClick={() => setDialogOpen(true)}
                style={{color: DARK.D300}}
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
                    {...name}
                    {...validationName}
                  />
                </form>
              </Grid>
              <Grid item xs={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    disabled
                    required
                    className={classes.textInput}
                    label="ID"
                    variant="outlined"
                    name="id"
                    value={formValues.item.id}
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
                      variant="outlined"
                      {...kqiCategory}>
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
                      variant="outlined"
                      {...kqiPerspective}>
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
                    {...description}
                  />
                </form>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6} className={classes.gridStyleLeft}>
                  <FormField className={classes.formField}>
                    <TextField
                      required
                      name="startDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      label="Start"
                      className={classes.calendar}
                      InputLabelProps={{ shrink: true }}
                      {...startDateTime}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6} className={classes.gridStyleRight}>
                  <FormField className={classes.formField}>
                    <TextField
                      required
                      name="endDateTime"
                      variant="outlined"
                      id="datetime-local"
                      type="datetime-local"
                      label="End"
                      InputLabelProps={{ shrink: true }}
                      className={classes.calendar}
                      {...endDateTime}
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
                      variant="outlined"
                      {...kqiSource}
                    >
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
                          required
                          select
                          label="Temporal frequency"
                          fullWidth
                          name="kqiTemporalFrequency"
                          variant="outlined"
                          {...kqiTemporalFrequency}
                        >
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
                    {...formula}
                  />
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <KqiTableAssociatedTarget
          isCompleted={isCompleted}
          tableTargets={filterKqiTargetsById}
          create={() => showFormCreateTarget()}
          edit={showFormEditTarget}
        />
      </Grid>
      {dialogOpen && (
        <DialogConfirmDelete
          name={'kqi'}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          deleteItem={() => {
            handleRemove(formValues.item.id);
            returnTableKqi();
          }}
        />
      )}
    </div>
  );
};
export default KqiFormEdit;
