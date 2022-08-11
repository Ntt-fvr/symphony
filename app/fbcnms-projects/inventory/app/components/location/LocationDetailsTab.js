/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {Equipment} from '../../common/Equipment';
import type {Location} from '../../common/Location.js';

import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import DynamicPropertyCategoriesTable from '../DynamicPropertyCategoriesTable';
import LocationDetailsCard from './LocationDetailsCard';
import LocationEquipmentCard from './LocationEquipmentCard';
import React from 'react';
import ResourceCard from '../resource/ResourceCard';
import useFeatureFlag from '@fbcnms/ui/context/useFeatureFlag';
import {makeStyles} from '@material-ui/styles';
type Props = $ReadOnly<{|
  location: Location,
  locationId: string,
  selectedWorkOrderId: ?string,
  onEquipmentSelected: Equipment => void,
  onWorkOrderSelected: (workOrderId: string) => void,
  onResourceSelected: () => void,
  onAddEquipment: () => void,
  onAddResource: (selectedResourceType: {}) => void,
|}>;

const useStyles = makeStyles(_theme => ({
  card: {
    marginBottom: '16px',
  },
}));

const LocationDetailsTab = (props: Props) => {
  const classes = useStyles();
  const {
    location,
    locationId,
    selectedWorkOrderId,
    onEquipmentSelected,
    onWorkOrderSelected,
    onResourceSelected,
    onAddEquipment,
    onAddResource,
  } = props;
  const resourceCardFlag = useFeatureFlag('resource_inventory');
  const EquipmentCardFlag = useFeatureFlag('equipment_&_ports_module');
  return (
    <div>
      <LocationDetailsCard className={classes.card} location={location} />
      <Card className={classes.card}>
        <CardHeader>Properties</CardHeader>
        <DynamicPropertyCategoriesTable />
      </Card>
      {EquipmentCardFlag && (
        <LocationEquipmentCard
          className={classes.card}
          equipments={location.equipments}
          selectedWorkOrderId={selectedWorkOrderId}
          onEquipmentSelected={onEquipmentSelected}
          onWorkOrderSelected={onWorkOrderSelected}
          onAddEquipment={onAddEquipment}
        />
      )}

      {resourceCardFlag && (
        <ResourceCard
          selectedLocationId={locationId}
          onResourceSelected={onResourceSelected}
          onAddResource={onAddResource}
        />
      )}
    </div>
  );
};

export default LocationDetailsTab;
