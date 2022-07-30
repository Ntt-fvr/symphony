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
import CardPorts from './ResourceCardPorts';
import Grid from '@material-ui/core/Grid';
import InventoryQueryRenderer from '../InventoryQueryRenderer';
import ModalSteper from './ModalSteper';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, {useState} from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {Configuration} from '../resource_instance/Configuration';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {ResourceNetworkCard} from './ResourceNetworkCard';
import {camelCase, startCase} from 'lodash';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

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
  resourceDetails: {
    color: '#73839E',
    marginLeft: '7px',
  },
}));

const ResourceCardListQuery = graphql`
  query ResourcePropertiesCardQuery($filterResource: ResourceFilter) {
    queryResource(filter: $filterResource) {
      id
      name
      locatedIn
      resourceSpecification
      isDeleted
      lifecycleStatus
      typePlanningSubStatus
      planningSubStatus
      usageSubStatus
      operationalSubStatus
    }
    resourceSpecifications {
      edges {
        node {
          id
          name
          resourceType {
            id
            name
          }
        }
      }
    }
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
        parameterType {
          id
          name
          resourceSpecification
          stringValue
          floatValue
          intValue
          type
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

type Props = $ReadOnly<{|
  onAddResourceSlot: (selectedResourceType: {}) => void,
  onEditResource: void => void,
  dataListStepper: any,
  selectedResourceId: ?string,
|}>;

const ResourcePropertiesCard = (props: Props) => {
  const {
    onAddResourceSlot,
    onEditResource,
    dataListStepper,
    selectedResourceId,
  } = props;
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('details');
  const [openDialog, setOpenDialog] = useState(false);

  const validateForm = data => {
    return (
      <span className={classes.resourceDetails}>
        {data !== null ? startCase(camelCase(data)) : startCase('empty')}
      </span>
    );
  };
 
  return (
    <InventoryQueryRenderer
      query={ResourceCardListQuery}
      variables={{
        filterResource: {
          id: selectedResourceId,
        },
      }}
      render={resourceData => {
        return (
          <div className={classes.root}>
            {resourceData.queryResource.map(item => (
              
              <>
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
                        name: item.name,
                      },
                    ]}
                    size="large"
                  />
                  <Button onClick={() => onEditResource(item)}>
                    Edit Resource
                  </Button>
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
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Resource Type:
                            {validateForm(null)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Resource Specification:
                            {validateForm(null)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Lifecycle Status:
                            {validateForm(item.lifecycleStatus)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Planning Status:
                            {validateForm(item.typePlanningSubStatus)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Administrative Status:
                            {validateForm(item.planningSubStatus)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Operational Status:
                            {validateForm(item.operationalSubStatus)}
                          </Typography>
                          <Typography style={{lineHeight: 2}} variant="body2">
                            Usage Status:
                            {validateForm(item.usageSubStatus)}
                          </Typography>
                          <Typography
                            style={{lineHeight: 3, fontWeight: 'bold'}}
                            variant="h6">
                            Properties
                          </Typography>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                ID:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Model:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Serving Area:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Last Config Date:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Administrative Substate:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Serial:
                                {validateForm(null)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Vendor:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                IP:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Instalation date:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Lifesycle state:
                                {validateForm(null)}
                              </Typography>
                              <Typography
                                style={{lineHeight: 2}}
                                variant="body2">
                                Operational substate:
                                {validateForm(null)}
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
                    {selectedTab === 'ports' ? <CardPorts /> : null}
                    {selectedTab === 'network' ? (
                      <ResourceNetworkCard
                        onAddResourceSlot={onAddResourceSlot}
                        dataListStepper={dataListStepper}
                      />
                    ) : null}
                    {selectedTab === 'configuration' ? (
                      <Configuration
                        resource={item}
                        cmVersion={resourceData.queryCMVersion.find(
                          cm => {
                            cm.resource.id === item.id &&
                            cm.status === 'CURRENT'},
                        )}
                      />
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
              </>
            ))}
          </div>
        );
      }}
    />
  );
};

export default ResourcePropertiesCard;
