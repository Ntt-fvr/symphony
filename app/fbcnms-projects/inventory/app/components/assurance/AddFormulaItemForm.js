/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';

import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';

import type {AddFormulaItemFormQuery} from './__generated__/AddFormulaItemFormQuery.graphql';

import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useState} from 'react';

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
  },
}));

const AddFormulaQuery = graphql`
  query AddFormulaItemFormQuery {
    kpis {
      edges {
        node {
          id
          name
        }
      }
    }
    vendors {
      edges {
        node {
          id
          name
        }
      }
    }
    techs {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Props = $ReadOnly<{|
  handleClick: any,
  parentCallback: any,
|}>;

type Formula = {
  kpi: string,
  vendors: string,
  technology: string,
};

export default function AddFormulaItemForm(props: Props) {
  const {handleClick, parentCallback} = props;
  const [formula, setFormula] = useState<Formula>({});
  const data = useLazyLoadQuery<AddFormulaItemFormQuery>(AddFormulaQuery, {});
  const classes = useStyles();

  function handleChange({target}) {
    setFormula({
      ...formula,
      [target.name]: target.value,
    });
  }

  function handleCallback() {
    parentCallback(formula);
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add formula</CardHeader>
      <FormField className={classes.formField} label="KPI" required>
        <Select
          className={classes.select}
          disableUnderline
          name="kpi"
          type="reset"
          onChange={handleChange}>
          {data.kpis?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Vendors" required>
        <Select
          className={classes.select}
          disableUnderline
          name="vendors"
          type="reset"
          onChange={handleChange}>
          {data.vendors?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField className={classes.formField} label="Technology" required>
        <Select
          className={classes.select}
          disableUnderline
          name="technology"
          type="reset"
          onChange={handleChange}>
          {data.techs?.edges.map((item, index) => (
            <MenuItem key={index} value={item.node?.id}>
              {item.node?.name}
            </MenuItem>
          ))}
        </Select>
      </FormField>
      <FormField>
        <Button
          className={classes.addCounter}
          onClick={() => {
            handleCallback();
            handleClick();
          }}
          disabled={
            !(
              Object.values(formula).length === 3 &&
              !Object.values(formula).some(item => item === '')
            )
          }>
          Build formula
        </Button>
      </FormField>
    </Card>
  );
}
