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

// COMPONENTS //
import {useFormInput} from './common/useFormInput';

// MUTATIONS //
import type {EditKpiMutationVariables} from '../../mutations/__generated__/EditKpiMutation.graphql';

import EditKpiMutation from '../../mutations/EditKpiMutation';
import TextInput from '@symphony/design-system/components/Input/TextInput';

// DESIGN SYSTEM //
import type {EditKpiItemFormQuery} from './__generated__/EditKpiItemFormQuery.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Switch from '@symphony/design-system/components/switch/Switch';
import TableFormulas from './TableFormulas';
import {Grid, MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const EditKpiQuery = graphql`
  query EditKpiItemFormQuery {
    domains {
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
  description: {
    minHeight: '60px',
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
    '& .MuiSelect-select': {
      padding: '9px 0 0 10px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}));

type KpiThreshold = {
  node: {
    name: string,
    kpi: {
      name: string,
    },
  },
};

type Kpi = {
  name: string,
  domainFk: {
    id: string,
    name: string,
  },
};

type Formula = {
  id: string,
  textFormula: string,
  status: true,
  techFk: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    domainFk: {
      id: string,
      name: string,
    },
    status: boolean,
    description: string,
    formulaFk: Array<Formula>,
  },
  hideEditKpiForm: void => void,
  kpi: Array<Kpi>,
  threshold: Array<KpiThreshold>,
|}>;

export const EditKpiItemForm = (props: Props) => {
  const {kpi, formValues, hideEditKpiForm, threshold} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const domainFk = useFormInput(formValues.domainFk.id);
  const description = useFormInput(formValues.description);
  const [checked, setChecked] = useState(formValues.status);

  const data = useLazyLoadQuery<EditKpiItemFormQuery>(EditKpiQuery, {});

  const thresholdFromKpi = threshold.find(
    ({node}) => node.kpi?.name === formValues.name,
  );

  const kpiNames = kpi?.map(item => item.name);

  const handleClick = () => {
    const variables: EditKpiMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        domainFk: domainFk.value,
        status: checked,
        description: description.value,
      },
    };
    EditKpiMutation(variables);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <ConfigureTitleSubItem
            title={fbt('KPI Catalog/', 'KPI Catalog')}
            tag={` ${formValues.name}`}
          />
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Card>
            <CardHeader className={classes.cardHeader}>
              Edit Kpi detail
            </CardHeader>
            <Grid container>
              <Grid item xs={12} sm={12} lg={1} xl={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch title={''} checked={checked} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={8} xl={8}>
                <FormField
                  className={classes.formField}
                  label="Name"
                  hasError={kpiNames?.some(
                    item => item === name.value && item !== formValues.name,
                  )}
                  errorText={
                    kpiNames?.some(
                      item => item === name.value && item !== formValues.name,
                    )
                      ? 'Kpi name existing'
                      : ''
                  }
                  required>
                  <TextInput
                    {...name}
                    className={classes.textInput}
                    name="name"
                    type="string"
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField className={classes.formField} label="ID">
                  <TextInput
                    value={formValues.id}
                    className={classes.textInput}
                    name="Id"
                    type="string"
                    disabled
                  />
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  label="Domain"
                  className={classes.formField}
                  required>
                  <Select
                    {...domainFk}
                    className={classes.select}
                    disableUnderline
                    name="domains">
                    {data.domains.edges.map((item, index) => (
                      <MenuItem key={index} value={item.node?.id}>
                        {item.node?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormField>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <FormField
                  label="Associated Threshold"
                  className={classes.formField}
                  required>
                  <TextInput
                    value={
                      thresholdFromKpi === undefined
                        ? 'none'
                        : thresholdFromKpi.node.name
                    }
                    className={classes.textInput}
                    name="threshold"
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
                      hideEditKpiForm();
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
                      hideEditKpiForm();
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
            <TableFormulas formulas={formValues.formulaFk} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
