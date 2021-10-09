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
import TableThreshold from './TableThreshold';

// DESING SYSTEM //
import type {EditThresholdMutationVariables} from '../../mutations/__generated__/EditThresholdMutation.graphql';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DialogConfirmDelete from './DialogConfirmDelete';
import EditTresholdMutation from '../../mutations/EditThresholdMutation';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Switch from '@symphony/design-system/components/switch/Switch';
import Text from '@symphony/design-system/components/Text';
import {BLUE, DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  container: {
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  switchButton: {
    flexWrap: 'nowrap',
  },
  nameThreshold: {
    fontWeight: 'bold',
    paddingLeft: '0.25rem',
  },
  kpiAssociated: {
    color: BLUE.B600,
    fontWeight: 'bold',
  },
  editIconButton: {
    flexGrow: '1',
  },
  deleteIcon: {
    flexGrow: '1',
    color: DARK.D300,
  },
  rulesContained: {
    margin: '10px 0',
  },
  descriptionKpi: {
    marginBottom: '20px',
  },
  tableRules: {
    marginBottom: '30px',
  },
}));

type RuleLimit = {
  id: string,
  name: string,
  limitType: string,
  comparator: {
    id: string,
    name: string,
  },
};

type Rule = {
  id: string,
  name: string,
  gracePeriod: string,
  additionalInfo: string,
  specificProblem: string,
  eventTypeName: string,
  startDateTime: string,
  endDateTime: string,
  threshold: {
    id: string,
    name: string,
  },
  ruleLimit: Array<RuleLimit>,
  ruleType: {
    name: string,
  },
  eventSeverity: {
    id: string,
    name: string,
  },
  status: boolean,
};

type Props = $ReadOnly<{|
  id: string,
  name: string,
  description: string,
  kpi: {
    name: string,
  },
  deleteItem: string,
  edit: void,
  status: boolean,
  addRule: void => void,
  editRule: void => void,
  handleRemove: void => void,
  rule: Array<Rule>,
|}>;

export default function ThresholdTypeItem(props: Props) {
  const {
    name,
    description,
    kpi,
    id,
    edit,
    status,
    addRule,
    editRule,
    rule,
    deleteItem,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    const variables: EditThresholdMutationVariables = {
      input: {
        id: id,
        name: name,
        status: !checked,
        description: description,
      },
    };
    EditTresholdMutation(variables);
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.container} expanded={open}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={() => setOpen(!open)} />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid
            className={classes.switchButton}
            xs={2}
            md={3}
            container
            alignItems="center">
            <Switch
              title={''}
              checked={status}
              onChange={setChecked}
              onClick={handleClick}
            />
            <Text useEllipsis={true} className={classes.nameThreshold}>
              {name}
            </Text>
          </Grid>

          <Grid
            xs={2}
            md={3}
            container
            alignItems="center"
            justifyContent="flex-start">
            <Button variant="text">
              <Text useEllipsis={true}>{id}</Text>
            </Button>
          </Grid>

          <Grid
            xs={3}
            md={2}
            container
            alignItems="center"
            justifyContent="flex-start">
            <Button variant="text">
              <Text useEllipsis={true} className={classes.kpiAssociated}>
                {kpi?.name}
              </Text>
            </Button>
          </Grid>

          <Grid
            xs={3}
            md={2}
            lg={2}
            xl={3}
            container
            justify="center"
            alignItems="center">
            <AddButton
              disabled={false}
              textButton={'Add rule'}
              onClick={addRule}
            />
          </Grid>
          <Grid
            xs={2}
            md={2}
            lg={2}
            xl={1}
            container
            justifyContent="space-evenly"
            alignItems="center">
            <DeleteOutlinedIcon
              className={classes.deleteIcon}
              onClick={() => setDialogOpen(true)}
            />
            <IconButton
              className={classes.editIconButton}
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
            <Grid xs={10} className={classes.descriptionKpi}>
              Description: {description}
            </Grid>
            <Grid className={classes.tableRules} xs={10}>
              <Text
                className={classes.rulesContained}
                weight="bold"
                variant="subtitle1">
                {'Rules contained'}
              </Text>
              <TableThreshold rule={rule} editRule={editRule} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {dialogOpen && (
        <DialogConfirmDelete
          name={'threshold'}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          deleteItem={deleteItem}
        />
      )}
    </div>
  );
}
