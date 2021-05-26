/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Button from '@symphony/design-system/components/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import {EditCounterItemForm} from './EditCounterItemForm';
import {Link} from 'react-router-dom';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {makeStyles} from '@material-ui/core/styles';

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

export default function CounterTypeItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [showAddEditCard, setShowAddEditCard] = useState(false);

  const showEditCounterItemForm = () => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
  };

  if (showAddEditCard) {
    return <EditCounterItemForm />;
  }

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid className={classes.rootGrid}>
            <Text className={classes.nameKpi}>
              L_E_RAB_SESSIONTIME_HIGHPRECISION_QCI1
            </Text>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>Gestor_manager</Text>
            </Button>
          </Grid>

          <Grid className={classes.rootGrid}>
            <Button variant="text">
              <Text>Vendor name</Text>
            </Button>
          </Grid>

          <Grid>
            <Link onClick={showEditCounterItemForm}>
              <IconButton className={classes.edit} icon={EditIcon} />
            </Link>
          </Grid>

          <Grid>
            <IconButton className={classes.delete} icon={DeleteIcon} />
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid xs="6" className={classes.sectionId}>
              <p>
                Counter ID:<span>40</span>
              </p>
            </Grid>
            <Grid xs="6" className={classes.sectionFamily}>
              <p>
                Family Name:
                <span>Throughput and Data Volume Measurement</span>
              </p>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
