/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from '@symphony/design-system/components/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import {AddIcon} from '@symphony/design-system/icons';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import AddButton from './AddButton'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchLabels from './Switch';


const useStyles = makeStyles(theme => ({
  root: {
    width: "79%",
    "& .MuiExpansionPanelSummary-root:hover": {
      cursor: "default"
    }
  },
  panel: {
    cursor: "default",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  container: {
    borderRadius: '10px',
    marginBottom:'7px',
    marginTop:'7px',
  },
  details:{

  },
  rootGrid: {
    flexGrow: '1',
    alignSelf: 'center',
  },
  nameKpi: {
    fontWeight: 'bold',
  },
  thr: {
    color: '#3984FF',
    fontWeight: 'bold',
  },
  typeRed:{
    marginLeft: '140px',
    color: '#3984FF',
    fontWeight: 'bold',
  },
  edit: {
    flexGrow: '1',
    margin: '10px',
  },
  delete: {
    flexGrow: '1',
    margin: '10px',
  },
  button: {
    marginLeft: '20%',
  },
}));

export default function SimpleExpansionPanel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.container} expanded={open}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          classes={{
            root: classes.panel 
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <FormControlLabel
            aria-label="Acknowledge"
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SwitchLabels />}
          />
          <Grid className={classes.rootGrid}>
            <Text className={classes.nameKpi}>Nombre de KPI/Indicador</Text>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>Tipo de red</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            {/* <Button className={classes.button} leftIcon={AddIcon}>
              Add formula
            </Button> */}
            <AddButton/>
          </Grid>

          <Grid>
            <IconButton className={classes.edit} icon={EditIcon} />
          </Grid>

          <Grid>
            <IconButton className={classes.delete} icon={DeleteIcon} />
          </Grid>
        
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  Associated threshold: 
                  <Button variant="text">
                    <Text className={classes.thr}>DROP_THR</Text>
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
                  Description: : Chips allow users to enter information, make selections, filter content, or trigger actions. While buttons are expected.
                </Grid>
                
              </Grid>
            </Grid>
            <Grid item xs={6}>
              CONTAINS 15 FORMULAS
            </Grid>
          </Grid>

        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
