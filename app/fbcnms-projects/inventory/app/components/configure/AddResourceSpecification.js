/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import ExperimentalPropertyTypesTable from '../form/ExperimentalPropertyTypesTable';
import PropertyTypesTableDispatcher from '../form/context/property_types/PropertyTypesTableDispatcher';
import {toMutablePropertyType} from '../../common/PropertyType';
import {usePropertyTypesReducer} from '../form/context/property_types/PropertyTypesTableState';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 22px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
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
  header: {
    marginBottom: '1rem',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
}));

type Props = $ReadOnly<{|
  dataRS: any,
  formValues: any,
  closeForm: () => void,
|}>;

export const AddResourceSpecification = (props: Props) => {
  const {dataRS, closeForm, formValues} = props;
  const classes = useStyles();

  const [propertyTypes, propertyTypesDispatcher] = usePropertyTypesReducer(
    (dataRS?.propertyTypes ?? []).filter(Boolean).map(toMutablePropertyType),
  );

  return (
    <div className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="flex-end"
        alignItems="center">
        <Grid item xs>
          <ConfigureTitleSubItem
            title={fbt('Resources/', '') + ` ${formValues.name}/`}
            tag={' Resource specification'}
          />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttons}
            style={{marginRight: '1rem'}}
            onClick={closeForm}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Card margins="none">
        <CardHeader className={classes.cardHeader}>Details</CardHeader>
        <Grid container>
          <Grid item xs={4}>
            <form className={classes.formField} autoComplete="off">
              <TextField
                required
                label="Resource Specification Name"
                variant="outlined"
                name="name"
                fullWidth
              />
            </form>
          </Grid>
        </Grid>
      </Card>
      <Card margins="none">
        <ExpandingPanel title="Properties">
          <PropertyTypesTableDispatcher.Provider
            value={propertyTypesDispatcher}>
            <ExperimentalPropertyTypesTable
              supportDelete={true}
              propertyTypes={propertyTypes}
            />
          </PropertyTypesTableDispatcher.Provider>
        </ExpandingPanel>
      </Card>
    </div>
  );
};
