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
import AddButton from './common/AddButton';
import SwitchLabels from './common/Switch';
import Table from './Table';

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
  panel: {
    cursor: 'default',
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
  details: {},
  rootGrid: {
    flexGrow: '1',
    alignSelf: 'center',
  },
  nameThreshold: {
    fontWeight: 'bold',
  },
  thr: {
    color: '#3984FF',
    fontWeight: 'bold',
  },
  typeRed: {
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
  rulesContained: {
    margin: '10px 0',
  },
  description: {
    marginBottom: '20px',
  },
}));

type Rule = {
  id: string,
  name: string,
  ruleType: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  id: string,
  name: string,
  description: string,
  kpi: {
    name: string,
  },
  edit: void,
  addRule: void => void,
  handleRemove: void => void,
  rule: Array<Rule>,
|}>;

export default function ThresholdTypeItem(props: Props) {
  const {name, description, kpi, id, edit, addRule, rule, handleRemove} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          classes={{
            root: classes.panel,
          }}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <FormControlLabel
            label=""
            onClick={event => event.stopPropagation()}
            onFocus={event => event.stopPropagation()}
            control={<SwitchLabels status={true} />}
          />
          <Grid xs={2} container alignItems="center">
            <Text className={classes.nameThreshold}>{name}</Text>
          </Grid>

          <Grid xs={3} container alignItems="center">
            <Button variant="text">
              <Text>{id}</Text>
            </Button>
          </Grid>

          <Grid xs={3} container className={classes.rootGrid}>
            <Button variant="text">
              <Text className={classes.typeRed}>{kpi?.name}</Text>
            </Button>
          </Grid>

          <Grid xs={3} container className={classes.rootGrid}>
            <AddButton
              disabled={false}
              textButton={'Add rule'}
              onClick={addRule}
            />
          </Grid>
          <Grid xs={1} container justify="flex-end" alignItems="center">
            <DeleteOutlinedIcon
              className={classes.deleteIcon}
              onClick={handleRemove}
            />
            <IconButton
              className={classes.editIcon}
              icon={EditIcon}
              onClick={edit}
            />
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid
            container
            spacing={3}
            item
            xs={12}
            justify="center"
            alignItems="center">
            <Grid xs={10} className={classes.description}>
              Description:{description}
            </Grid>
            <Grid xs={10}>
              <Text
                className={classes.rulesContained}
                weight="bold"
                variant="subtitle1">
                {'Rules contained'}
              </Text>
              <Table rule={rule} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
