/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {FragmentReference} from 'relay-runtime';
import type {PropertyFormField_property} from '../components/form/__generated__/PropertyFormField_property.graphql';
import type {PropertyType} from './PropertyType';

import type {
  PropertyByCategoriesQuery,
  PropertyByCategoriesQueryResponse,
  PropertyByCategoriesQueryVariables,
} from './__generated__/PropertyByCategoriesQuery.graphql';

import DateTimeFormat from './DateTimeFormat.js';
import RelayEnvironment from './RelayEnvironment';
import {fetchQuery, graphql} from 'relay-runtime';
import {toMutablePropertyType} from './PropertyType';
import {useLazyLoadQuery} from 'react-relay/hooks';

export type Property = {|
  id?: ?string,
  propertyType: PropertyType,

  // one or more of the following potential value fields will have actual data,
  // depending on the property type selected for this property.
  // e.g. for 'email' the stringValue field will be populated
  booleanValue?: ?boolean,
  stringValue?: ?string,
  intValue?: ?number,
  floatValue?: ?number,
  latitudeValue?: ?number,
  longitudeValue?: ?number,
  rangeFromValue?: ?number,
  rangeToValue?: ?number,
  nodeValue?: ?{id: string, name: string},
|};

export const sortPropertiesByIndex = (a: Property, b: Property) =>
  (a.propertyType.index ?? 0) - (b.propertyType.index ?? 0);

export const getNonInstancePropertyTypes = (
  properties: Array<Property>,
  propertyTypes: Array<PropertyType>,
): Array<PropertyType> => {
  properties = properties || [];
  const propIds = properties.map(x => x.propertyType.id);
  return propertyTypes.filter(type => !propIds.includes(type.id));
};

export const getPropertyValue = (property: Property | PropertyType) => {
  {
    const type = property.propertyType
      ? property.propertyType.type
      : property.type;
    switch (type) {
      case 'date':
      case 'email':
      case 'enum':
      case 'string':
        return property.stringValue;
      case 'datetime_local':
        return DateTimeFormat.dateTime(property.stringValue);
      case 'bool':
        return property.booleanValue != undefined
          ? property.booleanValue.toString()
          : '';
      case 'int':
        return property.intValue;
      case 'float':
        return property.floatValue;
      case 'range':
        return property.rangeFromValue !== null &&
          property.rangeToValue !== null
          ? (property.rangeFromValue ?? '') +
              ' - ' +
              (property.rangeToValue ?? '')
          : '';
      case 'gps_location':
        return property.latitudeValue !== null &&
          property.longitudeValue !== null
          ? (property.latitudeValue ?? '') +
              ', ' +
              (property.longitudeValue ?? '')
          : '';
      /**
       * Since this function accepts either property or property type,
       * we need to check which one we recieved.
       * In the case of PropertyType, there isn't an equipment/location value.
       */
      case 'node':
        return property.propertyType ? property.nodeValue?.name : null;
    }
  }
};

export const toPropertyInput = (properties: Array<Property>): Array<any> => {
  return properties
    .map(property => ({
      ...property,
      propertyTypeID: property.propertyType.id,
      propertyTypeValue: undefined,
    }))
    .map(propInput => {
      const {propertyType: _, ...newPropInput} = propInput;
      return newPropInput;
    })
    .map(property => {
      if ((property.id && property.id.includes('@tmp')) || property.id == '0') {
        const {id: _, ...newProp} = property;
        return newProp;
      }
      return property;
    })
    .map(property => ({
      ...property,
      nodeValue: undefined,
      nodeIDValue: property.nodeValue?.id ?? null,
    }));
};

export const toMutableProperty = (
  immutableProperty: $ReadOnly<
    $Diff<PropertyFormField_property, {$refType: FragmentReference, ...}>,
  >,
): Property => ({
  id: immutableProperty.id,
  propertyType: toMutablePropertyType(immutableProperty.propertyType),
  booleanValue: immutableProperty.booleanValue,
  stringValue: immutableProperty.stringValue,
  intValue: immutableProperty.intValue,
  floatValue: immutableProperty.floatValue,
  latitudeValue: immutableProperty.latitudeValue,
  longitudeValue: immutableProperty.longitudeValue,
  rangeFromValue: immutableProperty.rangeFromValue,
  rangeToValue: immutableProperty.rangeToValue,
  propertyTypeValue: immutableProperty.propertyTypeValue,
  nodeValue:
    immutableProperty.nodeValue != null
      ? {
          id: immutableProperty.nodeValue.id,
          name: immutableProperty.nodeValue.name,
        }
      : null,
});

const propertyByCategoriesQuery = graphql`
  query PropertyByCategoriesQuery(
    $filters: [PropertiesByCategoryFilterInput!]!
  ) {
    propertiesByCategories(filterBy: $filters) {
      __typename
      id
      name
      properties {
        id
        stringValue
        intValue
        floatValue
        booleanValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        nodeValue {
          __typename
          id
          name
        }
        propertyType {
          id
          name
          type
          nodeType
          index
          stringValue
          intValue
          booleanValue
          floatValue
          latitudeValue
          longitudeValue
          rangeFromValue
          rangeToValue
          isEditable
          isInstanceProperty
          isMandatory
          category
          isDeleted
          propertyCategory {
            id
            name
            index
          }
        }
      }
      propertyType {
        id
        name
        type
        nodeType
        index
        stringValue
        intValue
        booleanValue
        floatValue
        latitudeValue
        longitudeValue
        rangeFromValue
        rangeToValue
        isEditable
        isInstanceProperty
        isMandatory
        category
        isDeleted
        propertyCategory {
          id
          name
          index
        }
      }
    }
  }
`;

export function usePropertyByCategoriesNodes(
  input: PropertyByCategoriesQueryVariables,
): PropertyByCategoriesQueryResponse {
  const response = useLazyLoadQuery<PropertyByCategoriesQuery>(
    propertyByCategoriesQuery,
    input,
  );
  return response;
}

export function fetchPropertyByCategories(
  input: PropertyByCategoriesQueryVariables,
) {
  return fetchQuery<PropertyByCategoriesQuery>(
    RelayEnvironment,
    propertyByCategoriesQuery,
    input,
  );
}
