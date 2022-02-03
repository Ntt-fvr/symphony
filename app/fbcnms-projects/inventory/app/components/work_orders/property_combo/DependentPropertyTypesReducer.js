/*[object Object]*/
// eslint-disable-next-line header/header
import {isTempId} from '../../../common/EntUtils';

const DependentPropertyTypesReducerTypes = {
  updateDependenceProperty: 'update_dependence_property',
  updatePropertyTypesValue: 'update_property_types_value',
};
const DependentPropertyTypesReducerInit: function = propertyTypeValues => {
  return {
    type: 'enum',
    propertyTypeValues:
      propertyTypeValues?.map(propertyTypeValue => ({
        name: propertyTypeValue,
      })) || [],
  };
};

const DependentPropertyTypesReducer = (state, action) => {
  switch (action.type) {
    case DependentPropertyTypesReducerTypes.updateDependenceProperty:
      if (isTempId(action.payload.id)) {
        const tempId = action.payload.id;
        return {...state, ...action.payload, tempId, id: undefined};
      } else {
        return {...state, ...action.payload};
      }
    case DependentPropertyTypesReducerTypes.updatePropertyTypesValue:
      return {...state, propertyTypeValues: action.payload};
    default:
      throw new Error();
  }
};

export {
  DependentPropertyTypesReducerTypes,
  DependentPropertyTypesReducerInit,
  DependentPropertyTypesReducer,
};
