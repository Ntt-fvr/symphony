/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  AddServiceEndpointMutationResponse,
  AddServiceEndpointMutationVariables,
} from '../../mutations/__generated__/AddServiceEndpointMutation.graphql';
import type {
  AddServiceLinkMutationResponse,
  AddServiceLinkMutationVariables,
} from '../../mutations/__generated__/AddServiceLinkMutation.graphql';
import type {
  AddServicePortMutationResponse,
  AddServicePortMutationVariables,
} from '../../mutations/__generated__/AddServicePortMutation.graphql';
import type {EquipmentPort, Link} from '../../common/Equipment';
import type {MutationCallbacks} from '../../mutations/MutationCallbacks.js';
import type {
  RemoveServiceEndpointMutationResponse,
  RemoveServiceEndpointMutationVariables,
} from '../../mutations/__generated__/RemoveServiceEndpointMutation.graphql';
import type {
  RemoveServiceLinkMutationResponse,
  RemoveServiceLinkMutationVariables,
} from '../../mutations/__generated__/RemoveServiceLinkMutation.graphql';
import type {
  RemoveServicePortMutationResponse,
  RemoveServicePortMutationVariables,
} from '../../mutations/__generated__/RemoveServicePortMutation.graphql';
import type {ServiceEndpoint, ServiceStatus} from '../../common/Service';
import type {ServicePanel_service} from './__generated__/ServicePanel_service.graphql';

import AddServiceEndpointMutation from '../../mutations/AddServiceEndpointMutation';
import AddServiceLinkMutation from '../../mutations/AddServiceLinkMutation';
import AddServicePortMutation from '../../mutations/AddServicePortMutation';
import Button from '@symphony/design-system/components/Button';
import EditServiceMutation from '../../mutations/EditServiceMutation';
import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import React, {useState} from 'react';
import RemoveServiceEndpointMutation from '../../mutations/RemoveServiceEndpointMutation';
import RemoveServiceLinkMutation from '../../mutations/RemoveServiceLinkMutation';
import RemoveServicePortMutation from '../../mutations/RemoveServicePortMutation';
import Select from '@symphony/design-system/components/Select/Select';
import ServiceEndpointsMenu from './ServiceEndpointsMenu';
import ServiceEndpointsView from './ServiceEndpointsView';
import ServiceLinksAndPortsView from './ServiceLinksAndPortsView';
import ServiceLinksSubservicesMenu from './ServiceLinksSubservicesMenu';
import Text from '@symphony/design-system/components/Text';
import symphony from '@fbcnms/ui/theme/symphony';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {createFragmentContainer, graphql} from 'react-relay';
import {fbt} from 'fbt';
import {makeStyles} from '@material-ui/styles';
import {
  serviceStatusToColor,
  serviceStatusToVisibleNames,
} from '../../common/Service';

type Props = {
  service: ServicePanel_service,
  onOpenDetailsPanel: () => void,
};

const useStyles = makeStyles(() => ({
  root: {
    overflowY: 'auto',
    height: '100%',
  },
  contentRoot: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'auto',
    backgroundColor: symphony.palette.white,
  },
  detailsCard: {
    padding: '32px 32px 12px 32px',
    position: 'relative',
  },
  expanded: {},
  panel: {
    '&$expanded': {
      margin: '0px 0px',
      padding: '24px 0px 18px 0px',
    },
    boxShadow: 'none',
  },
  separator: {
    borderBottom: `1px solid ${symphony.palette.separator}`,
    margin: 0,
  },
  detailValue: {
    color: symphony.palette.D500,
    display: 'block',
  },
  detail: {
    paddingBottom: '12px',
  },
  text: {
    display: 'block',
  },
  expansionPanel: {
    '&&': {
      padding: '0px 20px 0px 32px',
    },
  },
  addButton: {
    marginRight: '8px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  dialog: {
    width: '80%',
    maxWidth: '1280px',
    height: '90%',
    maxHeight: '800px',
  },
  edit: {
    position: 'absolute',
    bottom: '24px',
    right: '24px',
  },
  editText: {
    color: symphony.palette.B500,
  },
  select: {
    marginBottom: '24px',
  },
  detailsPanel: {
    padding: '0px',
  },
}));

/* $FlowFixMe - Flow doesn't support typing when using forwardRef on a
 * funcional component
 */
const ServicePanel = React.forwardRef((props: Props, ref) => {
  const classes = useStyles();
  const {service, onOpenDetailsPanel} = props;
  const [endpointsExpanded, setEndpointsExpanded] = useState(false);
  const [linksExpanded, setLinksExpanded] = useState(false);

  const hideEditButtons = service.serviceType?.discoveryMethod != 'MANUAL';

  const addPortToServiceEnabled = useFeatureFlag('add_port_to_service');

  const linkHeading = addPortToServiceEnabled
    ? fbt('Links/Ports', 'Add Link or Ports Menu Label')
    : fbt('Links', 'Add Links Menu Label');

  const onAddEndpoint = (port: EquipmentPort, endpointDefinition: string) => {
    const variables: AddServiceEndpointMutationVariables = {
      input: {
        id: service.id,
        portId: port.id,
        equipmentID: port.parentEquipment.id,
        definition: endpointDefinition,
      },
    };
    const callbacks: MutationCallbacks<AddServiceEndpointMutationResponse> = {
      onCompleted: () => {
        setEndpointsExpanded(true);
      },
    };
    AddServiceEndpointMutation(variables, callbacks);
  };

  const onAddLink = (link: Link) => {
    return new Promise<void>(resolve => {
      const variables: AddServiceLinkMutationVariables = {
        id: service.id,
        linkId: link.id,
      };
      const callbacks: MutationCallbacks<AddServiceLinkMutationResponse> = {
        onCompleted: (_: AddServiceLinkMutationResponse) => {
          setLinksExpanded(true);
          resolve();
        },
      };
      AddServiceLinkMutation(variables, callbacks);
    });
  };

  const onAddPort = (port: EquipmentPort) => {
    return new Promise<void>(resolve => {
      const variables: AddServicePortMutationVariables = {
        id: service.id,
        portId: port.id,
      };
      const callbacks: MutationCallbacks<AddServicePortMutationResponse> = {
        onCompleted: (_: AddServicePortMutationResponse) => {
          setLinksExpanded(true);
          resolve();
        },
      };
      AddServicePortMutation(variables, callbacks);
    });
  };

  const onDeletePort = (port: EquipmentPort) => {
    const variables: RemoveServicePortMutationVariables = {
      id: service.id,
      portId: port.id,
    };
    const callbacks: MutationCallbacks<RemoveServicePortMutationResponse> = {
      onCompleted: () => {
        setLinksExpanded(true);
      },
    };
    RemoveServicePortMutation(variables, callbacks);
  };
  const onDeleteLink = (link: Link) => {
    const variables: RemoveServiceLinkMutationVariables = {
      id: service.id,
      linkId: link.id,
    };
    const callbacks: MutationCallbacks<RemoveServiceLinkMutationResponse> = {
      onCompleted: () => {
        setLinksExpanded(true);
      },
    };
    RemoveServiceLinkMutation(variables, callbacks);
  };

  const onDeleteEndpoint = (endpoint: ServiceEndpoint) => {
    const variables: RemoveServiceEndpointMutationVariables = {
      serviceEndpointId: endpoint.id,
    };
    const callbacks: MutationCallbacks<RemoveServiceEndpointMutationResponse> = {
      onCompleted: () => {
        setEndpointsExpanded(true);
      },
    };
    RemoveServiceEndpointMutation(variables, callbacks);
  };

  const onStatusChange = (status: ServiceStatus) => {
    EditServiceMutation({
      data: {
        id: service.id,
        status: status,
      },
    });
  };

  const getValidServiceStatus = (type: string): ServiceStatus => {
    if (
      type === 'DISCONNECTED' ||
      type === 'IN_SERVICE' ||
      type === 'MAINTENANCE' ||
      type === 'PENDING'
    ) {
      return type;
    }

    return 'PENDING';
  };

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.detailsCard}>
        <div className={classes.detail}>
          <Text variant="h6" className={classes.text}>
            {service.name}
          </Text>
          <Text
            variant="subtitle2"
            weight="regular"
            className={classes.detailValue}>
            {service.externalId}
          </Text>
        </div>
        <Select
          className={classes.select}
          label="Status"
          options={Object.entries(serviceStatusToVisibleNames).map(entry => {
            // $FlowFixMe - Flow doesn't value type well from object
            return {value: entry[0], label: entry[1]};
          })}
          selectedValue={service.status}
          onChange={value => onStatusChange(getValidServiceStatus(value))}
          skin={serviceStatusToColor[getValidServiceStatus(service.status)]}
        />
        <div className={classes.detail}>
          <Text variant="subtitle2" className={classes.text}>
            Service Type
          </Text>
          <Text variant="body2" className={classes.detailValue}>
            {service.serviceType.name}
          </Text>
        </div>
        {service.customer && (
          <div className={classes.detail}>
            <Text variant="subtitle2" className={classes.text}>
              Client
            </Text>
            <Text variant="body2" className={classes.detailValue}>
              {service.customer.name}
            </Text>
          </div>
        )}
        <div className={classes.edit}>
          <Button variant="text" onClick={onOpenDetailsPanel}>
            <Text variant="body2" className={classes.editText}>
              View<FormAction> & Edit</FormAction> Details
            </Text>
          </Button>
        </div>
      </div>
      <>
        <div className={classes.separator} />
        <ExpandingPanel
          title="Endpoints"
          defaultExpanded={false}
          expandedClassName={classes.expanded}
          className={classes.panel}
          expansionPanelSummaryClassName={classes.expansionPanel}
          detailsPaneClass={classes.detailsPanel}
          expanded={endpointsExpanded}
          onChange={expanded => setEndpointsExpanded(expanded)}
          rightContent={
            hideEditButtons ? null : (
              <ServiceEndpointsMenu
                service={service}
                onAddEndpoint={onAddEndpoint}
              />
            )
          }>
          <ServiceEndpointsView
            // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
            endpoints={service.endpoints}
            onDeleteEndpoint={hideEditButtons ? null : onDeleteEndpoint}
          />
        </ExpandingPanel>
      </>
      <div className={classes.separator} />
      <ExpandingPanel
        title={linkHeading}
        defaultExpanded={false}
        expandedClassName={classes.expanded}
        className={classes.panel}
        expansionPanelSummaryClassName={classes.expansionPanel}
        detailsPaneClass={classes.detailsPanel}
        expanded={linksExpanded}
        onChange={expanded => setLinksExpanded(expanded)}
        rightContent={
          hideEditButtons ? null : (
            <ServiceLinksSubservicesMenu
              service={{id: service.id, name: service.name}}
              onAddLink={onAddLink}
              onAddPort={onAddPort}
            />
          )
        }>
        <ServiceLinksAndPortsView
          // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
          links={service.links}
          // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
          ports={service.ports}
          onDeleteLink={hideEditButtons ? null : onDeleteLink}
          onDeletePort={hideEditButtons ? null : onDeletePort}
        />
      </ExpandingPanel>
      <div className={classes.separator} />
    </div>
  );
});

export default createFragmentContainer(ServicePanel, {
  service: graphql`
    fragment ServicePanel_service on Service {
      id
      name
      externalId
      status
      customer {
        name
      }
      serviceType {
        name
        discoveryMethod
        endpointDefinitions {
          id
          name
          role
          equipmentType {
            id
            name
          }
        }
      }
      links {
        id
        ...ServiceLinksAndPortsView_links
      }
      ports {
        id
        ...ServiceLinksAndPortsView_ports
      }
      endpoints {
        id
        definition {
          id
          name
        }
        ...ServiceEndpointsView_endpoints
      }
    }
  `,
});
