/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {EditCounterMutationVariables} from '../../mutations/__generated__/EditCounterMutation.graphql';

import EditCounterMutation from '../../mutations/EditCounterMutation';

import type {EditCounterItemFormQuery} from './__generated__/EditCounterItemFormQuery.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import React from 'react';

import TextField from '@material-ui/core/TextField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from './common/useDisabledButton';
import {useFormInput} from './common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';

const EditCountersQuery = graphql`
  query EditCounterItemFormQuery {
    vendors {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 30px',
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
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  textInput: {
    minHeight: '36px',
  },
  action: {
    paddingRight: '1.3rem',
  },
  addCounter: {
    marginRight: '1rem',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    padding: '20px 0 0 30px',
  },
}));

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    externalID: string,
    networkManagerSystem: string,
    counterFamily: {
      name: string,
    },
    vendorFk: {
      id: string,
      name: string,
    },
  },
  hideEditCounterForm: void => void,
  isCompleted: void => void,
  counterNames: Array<string>,
|}>;

const EditCounterItemForm = (props: Props) => {
  const {formValues, hideEditCounterForm, counterNames, isCompleted} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name.trim());
  const networkManagerSystem = useFormInput(formValues.networkManagerSystem);
  const counterID = useFormInput(formValues.externalID);
  const counterFamily = useFormInput(formValues.counterFamily.name);
  const vendor = useFormInput(formValues.vendorFk.id);

  const data = useLazyLoadQuery<EditCounterItemFormQuery>(
    EditCountersQuery,
    {},
  );

  const dataInputsObject = [
    name.value.trim(),
    networkManagerSystem.value,
    counterID.value,
    counterFamily.value,
    vendor.value,
  ];

  const inputFilter = () => {
    return (
      counterNames?.filter(
        item => item === name.value.trim() && item !== formValues.name.trim(),
      ) || []
    );
  };

  const validationName = () => {
    if (inputFilter().length > 0) {
      return {error: true, helperText: 'Counter name existing'};
    }
  };

  const handleDisable = useDisabledButtonEdit(dataInputsObject, 5, inputFilter);

  const handleClick = () => {
    const variables: EditCounterMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value.trim(),
        externalID: counterID.value,
        networkManagerSystem: networkManagerSystem.value,
        vendorFk: vendor.value,
      },
    };
    EditCounterMutation(variables, {
      onCompleted: () => {
        isCompleted();
        hideEditCounterForm();
      },
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Counters Catalog/', 'Counters Catalog')}
            tag={` ${formValues.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              Edit container detail
            </CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.input}
                    id="counter-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    fullWidth
                    {...name}
                    {...validationName()}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    disabled
                    className={classes.input}
                    id="counter-name"
                    label="Counter Family"
                    variant="outlined"
                    name="counterFamily"
                    fullWidth
                    {...counterFamily}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.input}
                    id="counter-name"
                    label="Network Manager System"
                    variant="outlined"
                    name="NetworkManagerSystem"
                    fullWidth
                    {...networkManagerSystem}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.input}
                    label="Counter ID"
                    variant="outlined"
                    name="CounterID"
                    fullWidth
                    {...counterID}
                  />
                </form>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} xl={4}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  id="outlined-select-vendor"
                  select
                  label="Vendor name*"
                  fullWidth
                  name="vendor"
                  variant="outlined">
                  {data.vendors.edges.map((item, index) => (
                    <MenuItem key={index} value={item.node?.id}>
                      {item.node?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </form>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addCounter}
                    onClick={() => {
                      handleClick();
                    }}
                    disabled={handleDisable}>
                    Save
                  </Button>
                </FormField>
              </Grid>
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addCounter}
                    skin="brightGray"
                    onClick={() => {
                      hideEditCounterForm();
                    }}>
                    Cancel
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditCounterItemForm;
