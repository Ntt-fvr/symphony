/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import 'react-perfect-scrollbar/dist/css/styles.css';
import Button from '@material-ui/core/Button';

import ActionButton from '@fbcnms/ui/components/ActionButton';
import Card from '@symphony/design-system/components/Card/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Grid from '@material-ui/core/Grid';
import ModalSteper from './ModalSteper';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  tabsContainer: {
    marginBottom: '16px',
    backgroundColor: 'white',
  },
  gridContent: {
    backgroundColor: '#EDF0F9',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      boxShadow: theme.shadows[1],
    },
    padding: '10px',
    marginRight: '30px',
  },
  equipmentDetails: {
    marginTop: '20px',
  },
}));

type Props = $ReadOnly<{|
  onAddResourceSlot: () => void,
|}>;

const ResourcePropertiesCard = (props: Props) => {
  const {onAddResourceSlot} = props;
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('details');
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Tabs
        className={classes.tabsContainer}
        value={selectedTab}
        onChange={(_e, selectedTab) => {
          ServerLogger.info(LogEvents.EQUIPMENT_CARD_TAB_CLICKED, {
            tab: selectedTab,
          });
          setSelectedTab(selectedTab);
        }}
        indicatorColor="primary"
        textColor="primary">
        <Tab label="Details" value="details" />
        <Tab label="Ports" value="ports" />
        <Tab label="Network" value="network" />
        <Tab label="Configuration" value="configuration" />
        <Tab label="Services" value="services" />
      </Tabs>
      <>
        <PerfectScrollbar>
          {selectedTab === 'details' ? (
            <Card>
              <CardContent>
                <Typography variant="body2">Resource Type</Typography>
                <Typography variant="body2">Resource Specification</Typography>
                <Typography variant="h6" style={{fontWeight: 'bold'}}>
                  Properties
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body2">ID</Typography>
                    <Typography variant="body2">Model</Typography>
                    <Typography variant="body2">Serving Area</Typography>
                    <Typography variant="body2">Last Config Date</Typography>
                    <Typography variant="body2">
                      Administrative Substate
                    </Typography>
                    <Typography variant="body2">Serial</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">Vendor</Typography>
                    <Typography variant="body2">IP</Typography>
                    <Typography variant="body2">Instalation date</Typography>
                    <Typography variant="body2">Lifesycle state</Typography>
                    <Typography variant="body2">
                      Operational substate
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid item xs className={classes.gridContent}>
                    Slot 1: <br /> Available
                    <ActionButton
                      action={'add'}
                      onClick={() => {
                        onAddResourceSlot;
                        setOpenDialog(true);
                      }}
                    />
                  </Grid>
                  <Grid item xs className={classes.gridContent}>
                    Slot 2: <br /> Available
                    <ActionButton
                      action={'add'}
                      onClick={() => {
                        onAddResourceSlot;
                        setOpenDialog(true);
                      }}
                    />
                  </Grid>
                  <Grid item xs className={classes.gridContent}>
                    Slot 3: <br /> Available
                    <ActionButton
                      action={'add'}
                      onClick={() => {
                        onAddResourceSlot;
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs
                    className={classes.gridContent}
                    style={{marginRight: '0'}}>
                    Slot 4: <br /> Available
                    <ActionButton
                      action={'add'}
                      onClick={() => {
                        onAddResourceSlot;
                      }}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ) : null}
          {selectedTab === 'ports' ? <div>soy ports</div> : null}
          {selectedTab === 'network' ? <div>soy network</div> : null}
          {selectedTab === 'configuration' ? (
            <div>soy configuration</div>
          ) : null}
          {selectedTab === 'services' ? <div>soy services</div> : null}
        </PerfectScrollbar>
        {openDialog && (
          <ModalSteper
            openModal={openDialog}
            onClose={() => setOpenDialog(false)}
            saveModal={onAddResourceSlot}
          />
        )}
      </>
    </>
  );
};

export default ResourcePropertiesCard;
