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

// DESIGN SYSTEM //
import type {EditKpiItemFormQuery} from './__generated__/EditKpiItemFormQuery.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Switch from '@symphony/design-system/components/switch/Switch';
import TableFormulas from './TableFormulas';
import TextField from '@material-ui/core/TextField';
import {Grid, MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from './common/useDisabledButton';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useValidationEdit} from './common/useValidation';

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
  description: {
    '& textarea': {
      height: '100%',
      overflow: 'auto',
      lineHeight: '1.5',
    },
  },
  addKpi: {
    marginRight: '1rem',
    width: '111px',
    alignSelf: 'flex-end',
  },
  action: {
    paddingRight: '1.3rem',
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
    kpiCategories {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

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
    kpiCategoryFK: {
      id: string,
      name: string,
    },
    status: boolean,
    description: string,
    formulaFk: Array<Formula>,
  },
  hideEditKpiForm: void => void,
  isCompleted: void => void,
  kpi: Array<Kpi>,
  threshold: Array<KpiThreshold>,
|}>;

export const EditKpiItemForm = (props: Props) => {
  const {kpi, formValues, hideEditKpiForm, threshold, isCompleted} = props;
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const domainFk = useFormInput(formValues.domainFk.id);
  const description = useFormInput(formValues.description);
  const kpiCategoryFK = useFormInput(formValues.kpiCategoryFK.id);
  const [checked, setChecked] = useState(formValues.status);

  const data = useLazyLoadQuery<EditKpiItemFormQuery>(EditKpiQuery, {});

  const thresholdFromKpi = threshold.find(
    ({node}) => node.kpi?.name === formValues.name,
  );

  const kpiNames = kpi?.map(item => item.name);

  const dataInputsObject = [
    name.value.trim(),
    domainFk.value,
    description.value.trim(),
    kpiCategoryFK.value,
  ];

  const inputFilter = () => {
    return (
      kpiNames?.filter(
        item => item === name.value.trim() && item !== formValues.name.trim(),
      ) || []
    );
  };

  const handleDisable = useDisabledButtonEdit(dataInputsObject, 4, inputFilter);

  const validationName = useValidationEdit(inputFilter, 'Kpi');

  const handleClick = () => {
    const variables: EditKpiMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        domainFk: domainFk.value,
        status: checked,
        description: description.value,
        kpiCategoryFK: kpiCategoryFK.value,
      },
    };
    EditKpiMutation(variables, {
      onCompleted: () => {
        isCompleted();
        hideEditKpiForm();
      },
    });
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
              <Grid item xs={12} sm={12} lg={5} xl={5}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    className={classes.textInput}
                    id="kpi-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    fullWidth
                    {...name}
                    {...validationName}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    id="outlined-select-vendor"
                    select
                    required
                    label="Network Type"
                    fullWidth
                    name="network"
                    variant="outlined"
                    {...kpiCategoryFK}>
                    {data.kpiCategories.edges.map((item, index) => (
                      <MenuItem key={index} value={item.node?.id}>
                        {item.node?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    disabled
                    className={classes.textInput}
                    label="ID"
                    variant="outlined"
                    name="Id"
                    fullWidth
                    value={formValues.id}
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    select
                    required
                    label="Domain"
                    fullWidth
                    name="domains"
                    variant="outlined"
                    {...domainFk}>
                    {data.domains.edges.map((item, index) => (
                      <MenuItem key={index} value={item.node?.id}>
                        {item.node?.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={3} xl={3}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    required
                    disabled
                    className={classes.textInput}
                    label="Associated Threshold"
                    variant="outlined"
                    name="threshold"
                    fullWidth
                    value={
                      thresholdFromKpi === undefined
                        ? 'none'
                        : thresholdFromKpi.node.name
                    }
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <form className={classes.formField} autoComplete="off">
                  <TextField
                    multiline
                    rows={3}
                    required
                    className={classes.description}
                    label="Description"
                    variant="outlined"
                    name="description"
                    inputProps={{maxLength: 120}}
                    fullWidth
                    {...description}
                  />
                </form>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item xs={2} sm={2} lg={1} xl={1}>
                <FormField>
                  <Button
                    className={classes.addKpi}
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
