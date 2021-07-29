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
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Select} from '@material-ui/core';

import KqiFormCreateTarget from './KqiFormCreateTarget';
import KqiFormEditTarget from './KqiFormEditTarget';
import KqiTableAssociatedTarget from './KqiTableAssociatedTarget';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';

import {makeStyles} from '@material-ui/styles';

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
    width: '67%',
    marginLeft: '1rem',
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

const handleRemove = () => {
  console.log('remove');
};

const KqiFormEdit = props => {
  const classes = useStyles();
  const [showCreateTarget, setShowCreateTarget] = useState(false);
  const [showEditTarget, setShowEditTarget] = useState(false);

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
          <Text className={classes.textTitle} variant="h6">
            {fbt('KQI catalog/ nameKqi', ' ')}
          </Text>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className={classes.delete}
            skin={'gray'}
            icon={DeleteOutlinedIcon}
            onClick={handleRemove}
          />
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid xs={6}>
              <FormField>
                <Button
                  className={classes.option}
                  variant="outlined"
                  color="primary"
                  onClick={props.returnTableKqi}>
                  Cancel
                </Button>
              </FormField>
            </Grid>
            <Grid xs={6}>
              <FormField>
                <Button
                  onClick={props.returnTableKqi}
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
              <Grid item xs={6}>
                <FormField label="Name" className={classes.formField}>
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="ID">
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Category" className={classes.formField}>
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="family">
                      {data.counters.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
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
                      name="family">
                      {data.counters.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormField>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Description">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                  />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid className={classes.time} item xs={12}>
                  <Text className={classes.titleTime} variant="subtitle1">
                    Activation period
                  </Text>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Start" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={''}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="End" className={classes.formField}>
                    <TextField
                      id="datetime-local"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={''}
                    />
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField label="Source" className={classes.formField}>
                    <Select
                      className={classes.select}
                      disableUnderline
                      name="family">
                      {data.counters.edges.map((item, index) => (
                        <MenuItem key={index} value={item.node?.id}>
                          {item.node?.name}
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
                      <Text>Repeat every</Text>

                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectRepeatEvery,
                        )}
                        disableUnderline
                        name="family">
                        {data.counters.edges.map((item, index) => (
                          <MenuItem key={index} value={item.node?.id}>
                            {item.node?.name}
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
          create={() => showFormCreateTarget()}
          edit={() => showFormEditTarget()}
        />
      </Grid>
    </div>
  );
};
export default KqiFormEdit;
