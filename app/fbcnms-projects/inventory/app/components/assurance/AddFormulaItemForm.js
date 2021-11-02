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

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormField from '@symphony/design-system/components/FormField/FormField';

import type {AddFormulaItemFormQuery} from './__generated__/AddFormulaItemFormQuery.graphql';

import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {MenuItem, Select} from '@material-ui/core';
import {graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useState} from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    borderRadius: '4px',
    boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    '&::before': {
      display: 'none',
    },
  },
  header: {
    margin: '20px 0 24px 0',
  },
  accordionSummary: {
    marginLeft: '12px',
  },
  formField: {
    width: '100%',
    padding: '0 12px',
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
  textInput: {
    minHeight: '36px',
  },
  addCounter: {
    margin: '15px 0',
    width: '111px',
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
  },
  select: {
    width: '100%',
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
    networkTypes {
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
  networkTypes: string,
};

export default function AddFormulaItemForm(props: Props) {
  const {handleClick, parentCallback} = props;
  const [formula, setFormula] = useState<Formula>({});
  const [open, setOpen] = useState(false);
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
    <Accordion className={classes.root} expanded={open}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
        aria-controls="panel1a-content"
        className={classes.accordionSummary}
        id="panel1a-header">
        <Text useEllipsis={true} variant="h6" weight="bold">
          Add formula
        </Text>
      </AccordionSummary>
      <AccordionDetails>
        <form className={classes.formField} autoComplete="off">
          <TextField
            required
            id="outlined-select-kpi"
            select
            className={classes.select}
            label="KPI"
            onChange={handleChange}
            name="kpi"
            variant="outlined">
            {data.kpis?.edges.map((item, index) => (
              <MenuItem key={index} value={item.node?.id}>
                {item.node?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-select-vendors"
            select
            className={classes.select}
            label="Vendors"
            onChange={handleChange}
            name="vendors"
            variant="outlined">
            {data.vendors?.edges.map((item, index) => (
              <MenuItem key={index} value={item.node?.id}>
                {item.node?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-select-technology"
            select
            className={classes.select}
            label="Technology"
            onChange={handleChange}
            name="technology"
            variant="outlined">
            {data.techs?.edges.map((item, index) => (
              <MenuItem key={index} value={item.node?.id}>
                {item.node?.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="outlined-select-vendors"
            select
            className={classes.select}
            label="Network Type"
            onChange={handleChange}
            name="networkTypes"
            variant="outlined">
            {data.networkTypes?.edges.map((item, index) => (
              <MenuItem key={index} value={item.node?.id}>
                {item.node?.name}
              </MenuItem>
            ))}
          </TextField>
          <FormField>
            <Button
              className={classes.addCounter}
              onClick={() => {
                handleCallback();
                handleClick();
              }}
              disabled={
                !(
                  Object.values(formula).length === 4 &&
                  !Object.values(formula).some(item => item === '')
                )
              }>
              Build formula
            </Button>
          </FormField>
        </form>
      </AccordionDetails>
    </Accordion>
  );
}
