/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import Text from '@symphony/design-system/components/Text';
import {DARK} from '@symphony/design-system/theme/symphony';
import {EditIcon} from '@symphony/design-system/icons';
import {camelCase, startCase} from 'lodash';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '12px',
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
  detailHeader: {
    color: DARK.D500,
  },
  deleteIcon: {
    marginRight: '1rem',
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
  dataForm: {
    id: string,
    name: string,
    resourceTypeClass: string,
    resourceTypeBaseType: string,
    resourceSpecification: string,
  },
  edit: () => void,
  handleRemove: void => void,
|}>;

export default function ResourceTypeItem(props: Props) {
  const {edit, handleRemove, dataForm} = props;
  const classes = useStyles();

  const handleDelete = event => {
    event.stopPropagation();
    handleRemove();
  };

  return (
    <div className={classes.root}>
      <Accordion className={classes.container}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Grid container item xs={12}>
            <Grid item xs container justify="flex-start" alignItems="center">
              <IconButton
                icon={SettingsIcon}
                variant="contained"
                className={classes.settingsIcon}
                skin="secondaryGray"
                aria-label="upload picture"
              />
              <Text useEllipsis={true} weight="bold">
                {dataForm.name}
              </Text>
            </Grid>
            <Grid
              item
              xs
              container
              alignItems="center"
              className={classes.detailHeader}>
              {dataForm.resourceSpecification.length} Resource specification
              instances of the type
            </Grid>
            <Grid item xs={2} container justify="flex-end" alignItems="center">
              <IconButton
                className={classes.deleteIcon}
                disabled={!!dataForm.resourceSpecification.length}
                icon={DeleteOutlinedIcon}
                onClick={handleDelete}
              />
              <IconButton icon={EditIcon} onClick={edit} />
            </Grid>
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container style={{textAlign: 'center'}}>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>Resource name: </span>
              <br />
              <strong>{dataForm.name}</strong>
            </Grid>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>Class: </span>
              <br />
              <strong>
                {startCase(camelCase(dataForm.resourceTypeClass))}
              </strong>
            </Grid>
            <Grid item xs={4}>
              <span className={classes.detailHeader}>Resource type class:</span>
              <br />
              <strong>
                {startCase(camelCase(dataForm.resourceTypeBaseType))}
              </strong>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
