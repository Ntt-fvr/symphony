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
import AddResourceInLocation from './AddResourceInLocation';
import Button from '@symphony/design-system/components/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ModalSteper from './ModalSteper';
import React, {useState} from 'react';
import ResourcePropertiesCard from './ResourcePropertiesCard';
import Typography from '@material-ui/core/Typography';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    flexGrow: 1,
    marginBottom: '20px',
  },
}));

type Props = $ReadOnly<{|
  onResourceSelected?: () => void,
  onAddResource?: () => void,
  mode?: string,
|}>;

const ResourceCard = (props: Props) => {
  const {onResourceSelected, onAddResource, mode} = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  switch (mode) {
    case 'add':
      return (
        <AddResourceInLocation closeFormAddEdit={() => setOpenDialog(false)} />
      );
    case 'edit':
      return (
        <AddResourceInLocation closeFormAddEdit={() => setOpenDialog(false)} />
      );
    case 'show':
      return (
        <ResourcePropertiesCard
          onAddResourceSlot={() => {
            onAddResource;
            setOpenDialog(true);
          }}
        />
      );
    default:
      return (
        <div className={classes.root}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Grid item xs>
                <Typography variant="h6">Resources</Typography>
              </Grid>
              <Button
                onClick={() => {
                  onAddResource;
                  setOpenDialog(true);
                }}>
                Add Resource
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography color="primary">Name</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color="primary">Specification</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color="primary">Type</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography color="primary">Delete</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={3}>
                  <Typography color="primary" onClick={onResourceSelected}>
                    OLT_10394
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>OLT_Nokia_H20</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>OLT</Typography>
                </Grid>
                <Grid item xs={3}>
                  <IconButton>
                    <DeleteOutlinedIcon
                      style={{color: symphony.palette.B600}}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          {openDialog && (
            <ModalSteper
              openModal={openDialog}
              onClose={() => setOpenDialog(false)}
              saveModal={onAddResource}
            />
          )}
        </div>
      );
  }
};

export default ResourceCard;
