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
import TextInput from '@symphony/design-system/components/Input/TextInput';
import fbt from 'fbt';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
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
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    padding: '20px 0 0 30px',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    borderRadius: '4px',
    fontSize: '14px',
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
  counterNames: Array<string>,
|}>;

const EditCounterItemForm = (props: Props) => {
  const {formValues, hideEditCounterForm, counterNames} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const networkManagerSystem = useFormInput(formValues.networkManagerSystem);
  const counterID = useFormInput(formValues.externalID);
  const counterFamily = useFormInput(formValues.counterFamily.name);
  const vendor = useFormInput(formValues.vendorFk.id);

  const data = useLazyLoadQuery<EditCounterItemFormQuery>(
    EditCountersQuery,
    {},
  );

  const inputFilter = () => {
    return (
      counterNames?.filter(
        item => item === name.value && item !== formValues.name,
      ) || []
    );
  };

  const validationName = () => {
    if (inputFilter().length > 0) {
      return {hasError: true, errorText: 'Counter name existing'};
    }
  };

  const handleClick = () => {
    const variables: EditCounterMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        externalID: counterID.value,
        networkManagerSystem: networkManagerSystem.value,
        vendorFk: vendor.value,
      },
    };

    EditCounterMutation(variables);
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
                <FormField
                  className={classes.formField}
                  label="Name"
                  required
                  {...validationName()}>
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
                    autoComplete="off"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Counter Family"
                  disabled>
                  <TextInput
                    {...counterFamily}
                    className={classes.textInput}
                    name="counterFamily"
                    autoComplete="off"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Network Manager System"
                  required>
                  <TextInput
                    {...networkManagerSystem}
                    className={classes.textInput}
                    name="NetworkManagerSystem"
                    autoComplete="off"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={4} xl={4}>
                <FormField
                  className={classes.formField}
                  label="Counter ID"
                  required>
                  <TextInput
                    {...counterID}
                    className={classes.textInput}
                    name="CounterID"
                    autoComplete="off"
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={4} xl={4}>
              <FormField label="Domain" className={classes.formField}>
                <Select
                  {...vendor}
                  className={classes.select}
                  disableUnderline
                  name="vendor">
                  {data.vendors.edges.map((item, index) => (
                    <MenuItem key={index} value={item.node?.id}>
                      {item.node?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormField>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addCounter}
                    onClick={() => {
                      handleClick();
                      hideEditCounterForm();
                    }}>
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
