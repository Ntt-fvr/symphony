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
import ResourceMenudots from './ResourceMenudots';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {ResourceNetworkCard} from './ResourceNetworkCard';
import {camelCase, startCase} from 'lodash';
import {getPropertyValue} from '../../common/Property';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useHistory} from 'react-router-dom';
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
      externalId
      resourceSpecification
      isDeleted
      lifecycleStatus
      typePlanningSubStatus
      planningSubStatus
      usageSubStatus
      operationalSubStatus
      belongsTo {
        id
      }
      resourceProperties {
        booleanValue
        floatValue
        id
        intValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        stringValue
        resourcePropertyType
        isMandatory
        isInstanceProperty
      }
    }
    resourceSpecifications {
      edges {
        node {
          id
          name
          resourceType {
            id
            name
            resourceTypeClass
          }
          resourcePropertyTypes {
            id
            name
            type
            stringValue
            intValue
            booleanValue
            floatValue
            latitudeValue
            longitudeValue
            rangeFromValue
            rangeToValue
            isMandatory
            isInstanceProperty
          }
        }
      }
    }
    locations {
      edges {
        node {
          id
          name
        }
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
  const history = useHistory();
  const PortsTabFlag = useFeatureFlag('resource_port_management');

  const onClickHistory = id => {
    history.push(`/inventory/inventory?location=${id}`);
  };

  const validateForm = (title, data) => {
    return (
      <>
        {data !== null ? (
          <Typography style={{lineHeight: 2}} variant="body2">
            {startCase(title) + ':'}
            <span className={classes.resourceDetails}>
              {startCase(camelCase(data))}
            </span>
          </Typography>
        ) : null}
      </>
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
        const getResourceData = resourceData.queryResource[0];

        const filterLocationById = resourceData.locations.edges
          .map(item => item.node)
          .filter(item => item.id === getResourceData.locatedIn);

        const filterSpecificationById = resourceData.resourceSpecifications.edges
          .map(item => item?.node)
          .filter(item => item.id === getResourceData.resourceSpecification);

        const filterSlots = dataListStepper.queryResource
          ?.flatMap(item => item)
          .filter(item => item?.belongsTo?.id === getResourceData.id);

        const propertySpecification = filterSpecificationById.flatMap(
          item => item.resourcePropertyTypes,
        );

        const propertyResource = getResourceData.resourceProperties.map(
          item => item,
        );

        const spliceProperties = propertySpecification.map((item, index) => {
          return {
            ...propertyResource[index],
            propertyType: item,
            name: item.name,
            type: item.type,
          };
        });

        const selecTedResourceData = propertyResource.map((item, index) => {
          return {
            ...item,
            propertyType: propertySpecification[index],
          };
        });

        const convertParametersMap = resourceData.queryResource.flatMap(
          (item, index) => {
            return {
              ...item,
              location: filterLocationById[index],
              resourceTypeName:
                filterSpecificationById[index].resourceType.name,
              resourceSName: filterSpecificationById[index].name,
              resourceProperties: spliceProperties,
            };
          },
        );

        return (
          <div className={classes.root}>
            {convertParametersMap.map(item => (
              <>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{marginBottom: '16px'}}>
                  <Breadcrumbs
                    breadcrumbs={[
                      {
                        id: item.location.id,
                        name: item.location.name,
                        onClick: () => onClickHistory(item.location.id),
                      },
                      {
                        id: item.id,
                        name: item.name,
                      },
                    ]}
                    size="large"
                  />
                  <ResourceMenudots item={item} />
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
                  {PortsTabFlag && <Tab label="Ports" value="ports" />}
                  <Tab label="Network" value="network" />
                </Tabs>
                <>
                  <PerfectScrollbar>
                    {selectedTab === 'details' ? (
                      <Card>
                        <CardContent>
                          {validateForm(
                            'Resource Type:',
                            item.resourceTypeName,
                          )}
                          {validateForm(
                            'Resource Specification:',
                            item.resourceSName,
                          )}
                          {validateForm(
                            'Lifecycle Status:',
                            item.lifecycleStatus,
                          )}
                          {validateForm(
                            'Planning Status:',
                            item.typePlanningSubStatus,
                          )}
                          {validateForm(
                            'Administrative Status:',
                            item.planningSubStatus,
                          )}
                          {validateForm(
                            'Operational Status:',
                            item.operationalSubStatus,
                          )}
                          {validateForm('Usage Status:', item.usageSubStatus)}

                          <Typography
                            style={{lineHeight: 3, fontWeight: 'bold'}}
                            variant="h6">
                            Properties
                          </Typography>
                          <Grid container>
                            {selecTedResourceData.map(item => (
                              <Grid item xs={6}>
                                {validateForm(
                                  item.propertyType.name,
                                  getPropertyValue(item),
                                )}
                              </Grid>
                            ))}
                          </Grid>
                        </CardContent>
                        <CardActions>
                          <Grid container>
                            {filterSlots?.map(item => (
                              <Grid item xs={3} className={classes.gridContent}>
                                {item.name + ':'}
                                <br /> AquiTa
                                <ActionButton
                                  action={'add'}
                                  onClick={() => {
                                    onAddResourceSlot;
                                    setOpenDialog(true);
                                  }}
                                />
                              </Grid>
                            ))}
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
                    {selectedTab === 'services' ? (
                      <div>soy services</div>
                    ) : null}
                  </PerfectScrollbar>
                  {openDialog && (
                    <ModalSteper
                      openModal={openDialog}
                      onClose={() => setOpenDialog(false)}
                      saveModal={onAddResourceSlot}
                      titleSteps={['Resource specification']}
                      dataListStepper={resourceData}
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
