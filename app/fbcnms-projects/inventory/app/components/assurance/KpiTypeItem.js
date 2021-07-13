/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React from 'react';

// COMPONENTS //
import Table from './Table';
import AddButton from './AddButton';
import SwitchLabels from './Switch';

// DESING SYSTEM //
import Button from '@symphony/design-system/components/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {DARK} from '@symphony/design-system/theme/symphony';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    marginLeft: '140px',
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

type Props = $ReadOnly<{|
  kpi: Object,
  edit: void,
  onChange: void,
|}>;

export default function KpiTypeItem(props: Props) {
  const {kpi, edit, onChange} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SwitchLabels />}
          />
          <Grid className={classes.rootGrid}>
            <Text className={classes.nameKpi}>{kpi.name}</Text>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>{kpi.domainFk.name}</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            <AddButton textButton={'Add formula'} />
          </Grid>

          <Grid>
            <IconButton className={classes.editIcon} icon={EditIcon} onClick={edit}/>
          </Grid>

          <Grid>
            <DeleteOutlinedIcon className={classes.deleteIcon} onClick={onChange}/>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Associated threshold:
                  <Button variant="text">
                    <Text className={classes.threshold}>DROP_THR</Text>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  Category: Text
                </Grid>
                <Grid item xs={12}>
                  Maturity: : Text
                </Grid>
                <Grid item xs={12}>
                  Unit: : Text
                </Grid>
                <Grid item xs={12}>
                  ID: Text
                </Grid>
                <Grid item xs={12}>
                  Last modification:: Text
                </Grid>
                <Grid item xs={12}>
                  Description: : Chips allow users to enter information, make
                  selections, filter content, or trigger actions. While buttons
                  are expected.
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>              
              <Table item xs={12} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
