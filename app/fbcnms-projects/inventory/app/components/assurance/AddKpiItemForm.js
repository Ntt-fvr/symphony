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
import AddedSuccessfullyMessage from './AddedSuccessfullyMessage';

// MUTATIONS //
import type {AddKpiMutationVariables} from '../../mutations/__generated__/AddKpiMutation.graphql';

import AddKpiMutation from '../../mutations/AddKpiMutation';

// DESIGN SYSTEM //
import type {AddKpiItemFormQuery} from './__generated__/AddKpiItemFormQuery.graphql';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

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
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  formField: {
    margin: '0 20px 22px 20px',
  },
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '20px',
    width: '111px',
    alignSelf: 'flex-end',
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
    backgroundColor: '#FFFFFF',
  },
}));

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  kpiNames?: Array<Node>,
|}>;

type Kpis = {
  data: {
    id: string,
    name: string,
    status: boolean,
    domain: string,
    description: string,
  },
};

export default function AddKpiItemForm(props: Props) {
  const {kpiNames} = props;
  const classes = useStyles();

  const [kpis, setKpis] = useState<Kpis>({data: {}});
  const [showChecking, setShowChecking] = useState(false);
  const names = kpiNames?.map(item => item.node.name);

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
      },
    };
    setShowChecking(true);
    AddKpiMutation(variables);
  }

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        data_entry="kpi"
        card_header="Add Kpi"
        title="Kpi"
        text_button="Add new Kpi"
        names={kpiNames}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add KPI</CardHeader>
      <FormField
        className={classes.formField}
        label="Kpi name"
        hasError={names?.some(item => item === kpis.data.name)}
        errorText={
          names?.some(item => item === kpis.data.name)
            ? 'KPI name existing'
            : ''
        }
        required>
        <TextInput
          autoComplete="off"
          className={classes.textInput}
          name="name"
          type="string"
          onChange={handleChange}
        />
      </FormField>
      <FormField label="Status" className={classes.formField}>
        <Select
          className={classes.select}
          disableUnderline
          name="status"
          onChange={handleChange}>
          <MenuItem value={true}>Enabled</MenuItem>
          <MenuItem value={false}>Disabled</MenuItem>
        </Select>
      </FormField>
      <FormField label="Domain" className={classes.formField}>
        <Select
          className={classes.select}
          disableUnderline
          name="domain"
          onChange={handleChange}>
          {data.domains.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Description" required>
        <TextInput
          autoComplete="off"
          className={classes.textInput}
          name="description"
          type="multiline"
          rows={4}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={handleClick}
          disabled={
            !(
              Object.values(kpis.data).length === 4 &&
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
