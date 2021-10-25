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

// COMPONENTS //
import AddedSuccessfullyMessage from './common/AddedSuccessfullyMessage';

// MUTATIONS //
import type {AddKpiMutationVariables} from '../../mutations/__generated__/AddKpiMutation.graphql';

import AddKpiMutation from '../../mutations/AddKpiMutation';

// DESIGN SYSTEM //
import type {AddKpiItemFormQuery} from './__generated__/AddKpiItemFormQuery.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  header: {
    margin: '20px 0 24px 0',
  },
  formField: {
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
  input: {
    width: '100%',
  },
  select: {
    width: '100%',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
  },
}));

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
  kpiNames?: Array<Node>,
|}>;

type Kpis = {
  data: {
    id: string,
    name: string,
    status: boolean,
    domain: string,
    description: string,
    category: string,
  },
};

const AddDomainsKpiQuery = graphql`
  query AddKpiItemFormQuery {
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

export default function AddKpiItemForm(props: Props) {
  const {kpiNames, isCompleted} = props;
  const classes = useStyles();

  const [kpis, setKpis] = useState<Kpis>({data: {}});
  const [showChecking, setShowChecking] = useState(false);
  const names = kpiNames?.map(item => item?.node.name);

  const data = useLazyLoadQuery<AddKpiItemFormQuery>(AddDomainsKpiQuery, {});

  function handleChange({target}) {
    setKpis({
      data: {
        ...kpis.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddKpiMutationVariables = {
      input: {
        name: kpis.data.name,
        status: kpis.data.status,
        domainFk: kpis.data.domain,
        description: kpis.data.description,
        kpiCategoryFK: kpis.data.category,
      },
    };
    setShowChecking(true);
    AddKpiMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setKpis({data: {}});
      },
    });
  }

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        data_entry="KPI"
        card_header="Add KPI"
        title="KPI"
        text_button="Add new KPI"
        names={kpiNames}
        setReturn={setReturn}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add KPI</CardHeader>
      <form className={classes.formField} autoComplete="off">
        <TextField
          required
          className={classes.input}
          id="kpi-name"
          label="Kpi name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          error={names?.some(item => item === kpis.data.name)}
          helperText={
            names?.some(item => item === kpis.data.name)
              ? 'Kpi name existing'
              : ''
          }
        />
        <TextField
          required
          id="outlined-select-status"
          select
          className={classes.select}
          label="Status"
          onChange={handleChange}
          name="status"
          variant="outlined">
          <MenuItem value={true}>Enabled</MenuItem>
          <MenuItem value={false}>Disabled</MenuItem>
        </TextField>
        <TextField
          required
          id="outlined-select-domain"
          select
          className={classes.select}
          label="Domain"
          onChange={handleChange}
          name="domain"
          variant="outlined">
          {data?.domains.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-select-category"
          select
          className={classes.select}
          label="Category"
          onChange={handleChange}
          name="category"
          variant="outlined">
          {data?.kpiCategories.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          multiline
          required
          className={classes.input}
          id="description"
          label="Description"
          variant="outlined"
          name="description"
          minRows={10}
          inputProps={{maxLength: 120}}
          onChange={handleChange}
        />
      </form>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={
            !(
              Object.values(kpis.data).length === 5 &&
              !Object.values(kpis.data).some(item => item === '') &&
              !names?.some(item => item === kpis.data.name)
            )
          }>
          Add KPI
        </Button>
      </FormField>
    </Card>
  );
}
