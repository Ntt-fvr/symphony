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
import SwitchLabels from './common/Switch';

// DESING SYSTEM //
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
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

type Props = $ReadOnly<{|
  id: string,
  name: string,
  status: boolean,
  domainFk: {
    name: string,
  },
  description: string,
  threshold: Array<KpiThreshold>,
  edit: void,
  onChange: void,
|}>;

export default function KpiTypeItem(props: Props) {
  const {
    id,
    name,
    status,
    domainFk,
    description,
    threshold,
    edit,
    onChange,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const thresholdFromKpi = threshold.find(({node}) => node.kpi?.name === name);

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <FormControlLabel
            label=""
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SwitchLabels status={status} />}
          />
          <Grid xs={3} container alignItems="center">
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
            <AddButton textButton={'Add formula'} disabled={true} />
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
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {`Associated threshold: `}
                  <Button variant="text">
                    <Text className={classes.threshold}>
                      {thresholdFromKpi === undefined
                        ? 'none'
                        : thresholdFromKpi.node.name}
                    </Text>
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  {`Description: ${
                    description === '' ? 'No description' : description
                  }`}
                </Grid>
                <Grid item xs={12}>
                  {`ID: ${id}`}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
