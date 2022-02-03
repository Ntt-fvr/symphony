/*[object Object]*/
// eslint-disable-next-line header/header

const DependentPropertyTypesReducerTypes = {
  updateDependenceProperty: 'update_dependence_property',
  updatePropertyTypesValue: 'update_property_types_value',
};
const DependentPropertyTypesReducerInit: function = ({
  propertyTypeValues,
  dependentProperty,
}) => {
  return {
    ...dependentProperty,
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
      return {...state, ...action.payload};
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
