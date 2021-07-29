/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React from 'react';
import fbt from 'fbt';

// COMPONENTS //
import SwitchLabels from './common/Switch';
import Table from './Table';
import {useFormInput} from './common/useFormInput';

// MUTATIONS //
import type {EditTresholdMutationVariables} from '../../mutations/__generated__/EditTresholdMutation.graphql';

import EditTresholdMutation from '../../mutations/EditTresholdMutation';
import TextInput from '@symphony/design-system/components/Input/TextInput';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  formField: {
    margin: '0 43px 22px 43px',
  },
  cardHeader: {
    margin: '20px 43px 22px 40px',
  },
  textInput: {
    minHeight: '36px',
  },
  addKpi: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
  title: {
    marginLeft: '10px',
  },
  select: {
    paddingTop: '10px',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}));

type Rule = {
  id: string,
  name: string,
  ruleType: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    description: string,
    status: boolean,
    kpi: {
      id: string,
      name: string,
    },
    rule: Array<Rule>,
  },
  hideEditThresholdForm: void => void,
|}>;

export const EditThresholdItemForm = (props: Props) => {
  const {formValues, hideEditThresholdForm} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const description = useFormInput(formValues.description);

  const handleClick = () => {
    const variables: EditTresholdMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        description: description.value,
        status: true,
      },
    };
    EditTresholdMutation(variables);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('Threshold Catalog/', 'Threshold Catalog')}
            tag={` ${formValues.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              Edit container detail
            </CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <SwitchLabels status={formValues.status} />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={11} xl={11}>
                <FormField className={classes.formField} label="Name" required>
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField className={classes.formField} label="ID" required>
                  <TextInput
                    value={formValues?.id}
                    className={classes.textInput}
                    name="id"
                    type="string"
                    disabled
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField className={classes.formField} label="Associated KPI">
                  <TextInput
                    value={formValues.kpi?.name}
                    className={classes.textInput}
                    name="kpi"
                    type="string"
                    disabled
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <FormField
                  className={classes.formField}
                  label="Description"
                  required>
                  <TextInput
                    {...description}
                    type="multiline"
                    name="description"
                    rows={3}
                  />
                </FormField>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addKpi}
                    onClick={() => {
                      handleClick();
                      hideEditThresholdForm();
                    }}>
                    Save
                  </Button>
                </FormField>
              </Grid>
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addKpi}
                    onClick={() => {
                      hideEditThresholdForm();
                    }}
                    skin="brightGray">
                    Cancel
                  </Button>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader>Formulas contained</CardHeader>
            <Table rule={formValues.rule} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
