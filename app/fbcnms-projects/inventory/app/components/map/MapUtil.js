/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import symphony from '@fbcnms/ui/theme/symphony';
import {
  blockedStatus,
  closedStatus,
  doneStatus,
  inProgressStatus,
  pendingStatus,
  plannedStatus,
  submittedStatus,
} from '../../common/FilterTypes';
import type {BasicLocation} from '../../common/Location';
import type {CustomGeoJSONFeature} from './MapView';
import type {GeoJSONFeatureCollection} from '@mapbox/geojson-types';
import type {GeoJSONSource} from './MapView';
import type {Location} from '../../common/Location.js';
import type {ShortUser} from '../../common/EntUtils';
import type {WorkOrder} from '../../common/WorkOrder';
import type {
  WorkOrderPriority,
  WorkOrderStatus,
} from '../../mutations/__generated__/EditWorkOrderMutation.graphql';

export type CoordProps = {|
  color: string,
  id: string,
  signalStrength?: number,
  strength?: number,
|};
export type CoordsWithProps = {
  latitude: number,
  longitude: number,
  properties: CoordProps,
};

export type WorkOrderLocation = BasicLocation & {
  id: string,
  randomizedLatitude: number,
};

export type WorkOrderWithLocation = {
  workOrder: WorkOrder,
  location: WorkOrderLocation,
};

export const locationsToGeoJSONSource = (
  key: string,
  locations: Array<Location>,
  properties: Object,
): GeoJSONSource<*> => {
  return {
    key: key,
    data: {
      type: 'FeatureCollection',
      features: locations.map(location =>
        locationToGeoFeature(location, properties),
      ),
    },
  };
};

export const workOrderToGeoJSONSource = <T: {}>(
  key: string,
  workOrders: Array<WorkOrderWithLocation>,
  properties: T,
): GeoJSONSource<T & WorkOrderProperties> => {
  return {
    key: key,
    data: {
      type: 'FeatureCollection',
      features: workOrders.map(workOrder =>
        workOrderToGeoFeature(workOrder, properties),
      ),
    },
  };
};

export type WorkOrderProperties = {
  id: string,
  name: string,
  description: string,
  status: WorkOrderStatus,
  priority: WorkOrderPriority,
  projectId: ?string,
  owner: ShortUser,
  assignedTo: ?ShortUser,
  installDate: string,
  location: WorkOrderLocation,
  iconStatus: string,
  iconTech: string,
  text: string,
  textColor: string,
  ...
};

export type WorkOrderGeoJSONFeature = CustomGeoJSONFeature<WorkOrderProperties>;

export const workOrderToGeoFeature = <T: {}>(
  workOrder: WorkOrderWithLocation,
  properties: T,
): CustomGeoJSONFeature<*> => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        workOrder.location.longitude,
        workOrder.location.randomizedLatitude,
      ],
    },
    properties: {
      ...properties,
      id: workOrder.workOrder.id,
      name: workOrder.workOrder.name,
      description: workOrder.workOrder.description,
      status: workOrder.workOrder.status,
      priority: workOrder.workOrder.priority,
      owner: workOrder.workOrder.owner,
      assignedTo: workOrder.workOrder.assignedTo,
      installDate: workOrder.workOrder.installDate,
      location: workOrder.workOrder.location,
      projectId: workOrder.workOrder.project?.id,
      iconStatus: getWorkOrderStatusIcon(workOrder.workOrder.status),
      iconTech: workOrder.workOrder.assignedTo
        ? 'icon_pin'
        : 'unassignedActive',
      text: workOrder.workOrder.assignedTo
        ? workOrder.workOrder.assignedTo.email.slice(0, 2)
        : '',
      textColor: getWorkOrderIconTextColor(workOrder.workOrder.status),
    },
  };
};

const getWorkOrderStatusIcon = (status: WorkOrderStatus) => {
  switch (status) {
    case doneStatus.value:
    case closedStatus.value:
      return 'doneActive';
    case pendingStatus.value:
    case inProgressStatus.value:
      return 'pendingActive';
    default:
      return 'plannedActive';
  }
};

const getWorkOrderIconTextColor = (status: WorkOrderStatus) => {
  switch (status) {
    case plannedStatus.value:
      return symphony.palette.primary;
    case pendingStatus.value:
    case inProgressStatus.value:
      return symphony.palette.Y600;
    case submittedStatus.value:
    case doneStatus.value:
      return symphony.palette.G600;
    case blockedStatus.value:
      return symphony.palette.R600;
    case closedStatus.value:
      return symphony.palette.D200;
    default:
      return symphony.palette.D300;
  }
};

export const locationToGeoFeature = (
  location: {
    id: string,
    name: string,
    latitude: number,
    longitude: number,
  },
  properties: Object,
) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude],
    },
    properties: {
      id: location.id,
      title: location.name,
      description: '',
      ...properties,
    },
  };
};

export const locationToGeoJson = (location: {
  id: string,
  name: string,
  latitude: number,
  longitude: number,
}) => {
  return {
    type: 'FeatureCollection',
    features: [locationToGeoFeature(location)],
  };
};

export const coordsToGeoJson = (
  lat: number,
  long: number,
): GeoJSONFeatureCollection => {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
        properties: {},
      },
    ],
  };
};

export const coordsToGeoJSONSource = (
  key: string,
  coordsWithProps: Array<CoordsWithProps>,
): GeoJSONSource<CoordProps> => {
  const features = coordsWithProps.map(coords => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [coords.longitude, coords.latitude],
    },
    properties: coords.properties,
  }));
  return {
    key: key,
    data: {
      type: 'FeatureCollection',
      features: features,
    },
  };
};

export const polygonToGeoJSONSource = (
  key: string,
  coords: Array<{latitude: number, longitude: number}>,
): GeoJSONSource<{}> => {
  const coordinates = [coords.map(coord => [coord.longitude, coord.latitude])];
  return {
    key: key,
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: coordinates,
          },
          properties: null,
        },
      ],
    },
  };
};
