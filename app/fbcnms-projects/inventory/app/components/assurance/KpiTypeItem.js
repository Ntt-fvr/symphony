/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React, {useState} from 'react';

// COMPONENTS //
import AddButton from './common/AddButton';
import TableFormulas from './TableFormulas';

// DESIGN SYSTEM //
import type {EditKpiMutationVariables} from '../../mutations/__generated__/EditKpiMutation.graphql';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import EditKpiMutation from '../../mutations/EditKpiMutation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  rootGrid: {
    flexGrow: '1',
    alignSelf: 'center',
  },
  nameKpi: {
    fontWeight: 'bold',
    paddingLeft: '15px',
  },
  threshold: {
    color: '#3984FF',
    fontWeight: 'bold',
  },
  typeRed: {
    marginLeft: '60px',
    color: '#3984FF',
    fontWeight: 'bold',
  },
  editIcon: {
    flexGrow: '1',
    margin: '10px',
  },
  deleteIcon: {
    flexGrow: '1',
    margin: '10px',
    color: DARK.D300,
  },
  button: {
    marginLeft: '20%',
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

type Formula = {
  id: string,
  textFormula: string,
  status: true,
  techFk: {
    id: string,
    name: string,
  },
};

type Props = $ReadOnly<{|
  id: string,
  name: string,
  status: boolean,
  domainFk: {
    id: string,
    name: string,
  },
  formulaFk: Array<Formula>,
  description: string,
  threshold: Array<KpiThreshold>,
  edit: void,
  onChange: void,
  handleFormulaClick: void => void,
  parentCallback: any,
  handleEditFormulaClick: void => void,
  parentEditCallback: any,
|}>;

export default function KpiTypeItem(props: Props) {
  const {
    id,
    name,
    status,
    domainFk,
    description,
    formulaFk,
    threshold,
    edit,
    onChange,
    handleFormulaClick,
    parentCallback,
    handleEditFormulaClick,
    parentEditCallback,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);

  const thresholdFromKpi = threshold.find(({node}) => node.kpi?.name === name);

  const handleClick = () => {
    const variables: EditKpiMutationVariables = {
      input: {
        id: id,
        name: name,
        domainFk: domainFk.id,
        status: !checked,
        description: description,
      },
    };
    EditKpiMutation(variables);
  };

  function handleCallback() {
    parentCallback({
      kpi: id,
      technology: formulaFk[0]?.techFk?.id,
    });
  }

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid xs={3} container alignItems="center">
            <FormField label="">
              <Switch
                title={''}
                checked={status}
                onChange={setChecked}
                onClick={handleClick}
              />
            </FormField>
            <Text className={classes.nameKpi}>{name}</Text>
          </Grid>

          <Grid
            xs={3}
            container
            alignItems="center"
            justifyContent="flex-start">
            <Button variant="text">
              <Text className={classes.typeRed}>{domainFk.name}</Text>
            </Button>
          </Grid>

          <Grid xs={5} container justify="center" alignItems="center">
            <AddButton
              disabled={false}
              textButton={'Add formula'}
              onClick={() => {
                handleCallback();
                handleFormulaClick();
              }}
            />
          </Grid>

          <Grid xs={1} container justify="flex-end" alignItems="center">
            <DeleteOutlinedIcon
              className={classes.deleteIcon}
              onClick={onChange}
            />
            <IconButton
              className={classes.editIcon}
              icon={EditIcon}
              onClick={edit}
            />
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {`Associated threshold: `}
                  <Button variant="text">
                    <Text className={classes.threshold}>
                      {thresholdFromKpi === undefined
                        ? 'none'
                        : thresholdFromKpi.node.name}
                    </Text>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {`ID: ${id}`}
                </Grid>
                <Grid item xs={12}>
                  {`Description: ${
                    description === '' ? 'No description' : description
                  }`}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <TableFormulas
                formulas={formulaFk}
                handleEditFormulaClick={handleEditFormulaClick}
                parentEditCallback={parentEditCallback}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
