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

// DESING SYSTEM //

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Text from '@symphony/design-system/components/Text';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from './../assurance/common/useFormInput';
const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
  },
  container: {
    '& .MuiAccordionSummary-root': {
      padding: '5px 15px',
    },
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  familyName: {
    marginLeft: '-16px',
    paddingBottom: '12px',
  },
  detailHeader: {
    color: DARK.D500,
  },
  detailsRoot: {
    marginLeft: '11px',
  },
  deleteIcon: {
    marginRight: '1rem',
    color: DARK.D300,
  },
  saveResource: {
    margin: '15px 0',
  },
  settingsIcon: {
    marginRight: '1rem',
    color: DARK.D300,
    borderRadius: '100%',
    padding: '5.5px',
  },
}));

type Props = $ReadOnly<{|
  name: string,
  formValues: {
    id: string,
    name: string,
    resourceTypeClassFk: {
      name: string,
    },
    resourceTypeBaseTypeFk: {
      name: string,
    },
  },
  edit: () => void,
  handleRemove: void => void,
  resourceNames: Array<string>,
|}>;

export default function ResourceTypeItem(props: Props) {
  const {edit, handleRemove, formValues} = props;
  const classes = useStyles();
  const name = useFormInput(formValues.name.trim());
  const resourceTypeBaseTypeFk = useFormInput(
    formValues.resourceTypeBaseTypeFk.name.trim(),
  );
  const resourceTypeClassFk = useFormInput(
    formValues.resourceTypeClassFk.name.trim(),
  );
  const [open, setOpen] = useState(false);

  function handleOpen(event) {
    event.stopPropagation();
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <Accordion
        className={classes.container}
        expanded={open}
        onChange={handleOpen}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container item xs={12}>
            <Grid
              item
              xs={10}
              container
              justify="flex-start"
              alignItems="center">
              <IconButton
                icon={SettingsIcon}
                variant="contained"
                className={classes.settingsIcon}
                skin="secondaryGray"
                aria-label="upload picture"
              />
              <Text useEllipsis={true} weight="bold">
                {formValues.name}
              </Text>
            </Grid>
            <Grid item xs={2} container justify="flex-end" alignItems="center">
              <DeleteOutlinedIcon
                className={classes.deleteIcon}
                onClick={handleRemove}
              />
              <IconButton icon={EditIcon} onClick={edit} />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails className={classes.detailsRoot}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>Resource name: </span>
              <br />
              <strong>{name.value}</strong>
            </Grid>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>Class: </span>
              <br />
              <strong>{resourceTypeBaseTypeFk.value}</strong>
            </Grid>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>
                Resource type class:{' '}
              </span>
              <br />
              <strong>{resourceTypeClassFk.value}</strong>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
