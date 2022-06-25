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
import Button from '@symphony/design-system/components/Button';

import ActionButton from '@fbcnms/ui/components/ActionButton';
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import Card from '@symphony/design-system/components/Card/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ModalSteper from './ModalSteper';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {Configuration} from '../resource_instance/Configuration';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {ResourceNetworkCard} from './ResourceNetworkCard';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useHistory} from 'react-router';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100% - 92px)',
  },
  tabsContainer: {
    marginBottom: '16px',
    backgroundColor: 'white',
  },
  gridContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDF0F9',
    borderRadius: '4px',
    padding: '14px 22px',
    marginRight: '30px',
    '&:hover': {
      backgroundColor: theme.palette.grey[50],
      boxShadow: theme.shadows[1],
    },
  },
  equipmentDetails: {
    marginTop: '20px',
  },
}));

type Props = $ReadOnly<{|
  onAddResourceSlot: (selectedResourceType: {}) => void,
  onEditResource: () => void,
  dataListStepper: any,
|}>;

const getResourceQuery = graphql`
  query ResourcePropertiesCardResourceQuery($getResourceId: ID) {
    getResource(id: $getResourceId) {
      id
      name
      resourceSpecification
      locatedIn
      isDelete
    }
  }
`;

const getAllCmVersion = graphql`
  query ResourcePropertiesCardGetAllCmVersionsQuery {
    queryCMVersion {
      id
      parameters {
        id
        stringValue
        rangeToValue
        rangeFromValue
        floatValue
        intValue
        booleanValue
        latitudeValue
        longitudeValue
        versionCM {
          id
        }
        parameterType {
          id
          name
          resourceSpecification
          stringValue
          floatValue
          intValue
        }
      }
      status
      resource {
        id
        name
        resourceProperties {
          id
          resourcePropertyType
        }

        locatedIn
      }
    }
  }
`;

const ResourcePropertiesCard = (props: Props) => {
  const {onAddResourceSlot, onEditResource, dataListStepper} = props;
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('details');
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();
  const urlParams = new URLSearchParams(history.location.search);
  const resourceId = urlParams.get('resource');

  const resource = useLazyLoadQuery<ResourcePropertiesCardQuery>(
    getResourceQuery,
    {
      getResourceId: resourceId,
    },
  ).getResource;

  const cmVersion = useLazyLoadQuery<ResourcePropertiesCardGetAllCmVersions>(
    getAllCmVersion,
  ).queryCMVersion.find(
    cm => cm.resource.id === resource.id && cm.status === 'CURRENT',
  );
  console.log(cmVersion);
  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{marginBottom: '16px'}}>
        <Breadcrumbs
          breadcrumbs={[
            {
              id: 'Location',
              name: 'Location',
            },
            {
              id: `OLT_1212323434`,
              name: 'OLT_1212323434',
            },
          ]}
          size="large"
        />
        <Button onClick={onEditResource}>Edit Resource</Button>
      </Grid>
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
                        setOpenDialog(true);
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
                        setOpenDialog(true);
                      }}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ) : null}
          {selectedTab === 'ports' ? <div>soy ports</div> : null}
          {selectedTab === 'network' ? (
            <ResourceNetworkCard
              onAddResourceSlot={onAddResourceSlot}
              dataListStepper={dataListStepper}
            />
          ) : null}
          {selectedTab === 'configuration' ? (
            <Configuration cmVersion={cmVersion} resource={resource} />
          ) : null}
          {selectedTab === 'services' ? <div>Services</div> : null}
        </PerfectScrollbar>
        {openDialog && (
          <ModalSteper
            openModal={openDialog}
            onClose={() => setOpenDialog(false)}
            saveModal={onAddResourceSlot}
            titleSteps={['Resource specification']}
            dataListStepper={dataListStepper}
          />
        )}
      </>
    </div>
  );
};

export default ResourcePropertiesCard;
