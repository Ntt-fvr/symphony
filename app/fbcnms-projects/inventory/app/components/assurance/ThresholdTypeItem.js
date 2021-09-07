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
import EditTresholdMutation from '../../mutations/EditThresholdMutation';
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
    paddingLeft: '15px',
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
  table: {
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
    handleRemove,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(status);

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
          classes={{
            root: classes.panel,
          }}
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
              Description: {description}
            </Grid>
            <Grid className={classes.table} xs={10}>
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
    </div>
  );
}
