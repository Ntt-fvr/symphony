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
import AddEditResourceInLocation from './AddEditResourceInLocation';
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
    marginBottom: '20px',
    '& .MuiAccordionSummary-root': {
      padding: '0 26px',
    },
  },
}));

type Props = $ReadOnly<{|
  mode?: string,
  onAddResource?: () => void,
  onAddResourceSlot: () => void,
  onEditResource: () => void,
  onResourceSelected: (selectedResourceId: string) => void,
  onCancel: () => void,
|}>;

const ResourceCard = (props: Props) => {
  const {
    mode,
    onAddResource,
    onEditResource,
    onResourceSelected,
    onAddResourceSlot,

    onCancel,
  } = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  switch (mode) {
    case 'add':
      return <AddEditResourceInLocation closeFormAddEdit={onCancel} />;
    case 'edit':
      return <AddEditResourceInLocation closeFormAddEdit={onCancel} />;
    case 'show':
      return (
        <ResourcePropertiesCard
          onAddResourceSlot={onAddResourceSlot}
          onEditResource={onEditResource}
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
                  <Divider variant="middle" style={{margin: 0}} />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="text"
                    onClick={() => onResourceSelected('123456')}>
                    <Typography>OLT_1212323434</Typography>
                  </Button>
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
              titleSteps={['Resource type', 'Resource specification']}
            />
          )}
        </div>
      );
  }
};

export default ResourceCard;
