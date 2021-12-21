// /**
//  * Copyright 2004-present Facebook. All Rights Reserved.
//  *
//  * This source code is licensed under the BSD-style license found in the
//  * LICENSE file in the root directory of this source tree.
//  *
//  * @flow strict-local
//  * @format
//  */

// import type {AddEditParametersCatalogType_editingParametersCatalogType} from './__generated__/AddEditParametersCatalogType_editingParametersCatalogType.graphql';

// import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
// import type {WithSnackbarProps} from 'notistack';
// import type {WithStyles} from '@material-ui/core';
// import type {ParametersCatalogType} from '../types';

// import type {PayloadError} from 'relay-runtime';

// import React, {useState} from 'react';
// import {createFragmentContainer, graphql} from 'react-relay';
// import {withSnackbar} from 'notistack';
// import {withStyles} from '@material-ui/core/styles';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import withAlert from '@fbcnms/ui/components/Alert/withAlert';
// import update from 'immutability-helper';

// import EditLocationTypeMutation from '../mutations/EditParametersCatalogTypeMutation';

// import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Button from '@symphony/design-system/components/Button';
// import PageFooter from '@fbcnms/ui/components/PageFooter';

// import {getGraphError} from '../../../../common/EntUtils';

// import PropertyCategories from '../components/PropertyCategories.js';
// import DraggableTableRow from '../../../draggable/DraggableTableRow';

// const styles = theme => ({
//   draggableRow: {
//     display: 'flex',
//     paddingLeft: '10px',
//     alignItems: 'center',
//     boxShadow: theme.shadows[1],
//     borderRadius: 4,
//   },
//   cell: {
//     border: 'none',
//     paddingLeft: '10px',
//   },
//   panel: {
//     width: '100%',
//     boxShadow: 'none',
//   },
//   row: {
//     flexGrow: 1,
//   },
//   properties: {
//     marginBottom: '24px',
//     width: '100%',
//   },
// });

// type Props = WithSnackbarProps &
//   WithStyles<typeof styles> &
//   WithAlert & {|
//     editingParametersCatalogType?: AddEditParametersCatalogType_editingParametersCatalogType,
//   |};

// type State = {
//   error: string,
//   editingParametersCatalogType: ParametersCatalogType,
//   isSaving: boolean,
// };

// const sortByIndex = (
//   a: $ReadOnly<{index?: ?number}>,
//   b: $ReadOnly<{index?: ?number}>,
// ) => (a.index ?? 0) - (b.index ?? 0);

// export function AddEditParametersCatalogType(props: Props) {
//   const {classes} = props;
//   const editPropertyCatalog = props.editingParametersCatalogType;

//   const [state, setState] = useState<State>({
//     error: '',
//     editingParametersCatalogType: getEditingLocationType(),
//     isSaving: false,
//   });
//   const {editingParametersCatalogType} = state;
//   const propertyCategoriesTypes = editingParametersCatalogType.propertyCategories
//     .slice()
//     .sort(sortByIndex);

//   const propertyCategoryChangedHandler = categories => {
//     console.log('categories', categories);
//     console.log('de estado prevstate', editingParametersCatalogType);
//     setState(prevState => {
//       console.log('estado previo', prevState);
//       return {
//         error: '',
//         editingParametersCatalogType: update(
//           prevState.editingParametersCatalogType,
//           {
//             propertyCategories: {$set: categories},
//           },
//         ),
//         isSaving: false,
//       };
//     });
//   };

//   const onSave = () => {
//     if (props.editingParametersCatalogType) {
//       editParametersCatalogType();
//     } else {
//       addNewLocationType();
//     }
//   };

//   const editParametersCatalogType = () => {
//     const onError = (error: PayloadError) => {
//       const errorMessage = getGraphError(error);
//       props.enqueueSnackbar(errorMessage, {
//         children: key => (
//           <SnackbarItem id={key} message={errorMessage} variant="error" />
//         ),
//       });
//     };

//     const handleErrors = errors => {
//       if (errors && errors[0]) {
//         onError(errors[0]);
//       }
//     };

//     // eslint-disable-next-line max-len
//     const variables = buildEditParametersCatalogTypeMutationVariables();
//     EditLocationTypeMutation(variables, {
//       onError,
//       onCompleted: (response, errors) => {
//         if (!handleErrors(errors)) {
//           const exito = response.editPropertyCategories;
//           console.log(exito);
//         }
//       },
//     });
//   };

//   const addNewLocationType = () => {
//     console.log('pt');
//   };

//   const buildEditParametersCatalogTypeMutationVariables = () => {
//     const {id, propertyCategories} = editingParametersCatalogType;

//     return {
//       propertyCategories: propertyCategories
//         .filter(propType => !!propType.name)
//         .map(cat => {
//           const category = cat.id.includes('@tmp')
//             ? {
//                 ['numberOfProperties']: cat.numberOfProperties,
//                 ...this.deleteTempId(cat),
//                 parameterCatalogId: id,
//               }
//             : withoutProperty(cat, 'numberOfProperties');

//           return category;
//         }),
//     };
//   };

//   const deleteTempId = (definition: any) => {
//     const newDef = {...definition};
//     if (definition.id && definition.id.includes('@tmp')) {
//       newDef['id'] = undefined;
//     }
//     return newDef;
//   };

//   const withoutProperty = (obj, property) => {
//     const {[property]: unused, ...rest} = obj;
//     return rest;
//   };

//   function getEditingLocationType(): ParametersCatalogType {
//     const {editingParametersCatalogType} = props;

//     const propertyCategories = (
//       editingParametersCatalogType?.propertyCategories || []
//     )
//       .filter(Boolean)
//       .map(property => ({
//         id: property.id,
//         name: property.name,
//         index: property.index,
//         numberOfDocuments: property.numberOfDocuments,
//         parameterCatalogId: editingParametersCatalogType.id,
//       }));

//     return {
//       id: editingParametersCatalogType?.id ?? 'ParametersCatalogType@tmp0',
//       name: editingParametersCatalogType?.name ?? '',
//       index: editingParametersCatalogType?.length ?? 0,
//       propertyCategories:
//         propertyCategories.length > 0
//           ? propertyCategories
//           : [
//               {
//                 id: 'PropertyCategories@tmp',
//                 name: '',
//                 index:
//                   editingParametersCatalogType?.propertyCategories?.length ?? 0,
//                 numberOfProperties: 0,
//               },
//             ],
//     };
//   }
//   return (
//     <DraggableTableRow
//       className={classes.draggableRow}
//       draggableCellClassName={classes.cell}
//       id={'id-a-cambiar'}
//       index={0}>
//       <Accordion className={classes.panel}>
//         <AccordionSummary
//           className={classes.row}
//           expandIcon={<ExpandMoreIcon />}>
//           {editPropertyCatalog?.name}
//         </AccordionSummary>
//         <AccordionDetails>
//           <div className={classes.properties}>
//             <PropertyCategories
//               propertyTypes={propertyCategoriesTypes}
//               onPropertiesChanged={propertyCategoryChangedHandler}
//             />
//           </div>
//         </AccordionDetails>
//         <PageFooter>
//           <Button onClick={onSave}>Save</Button>
//         </PageFooter>
//       </Accordion>
//     </DraggableTableRow>
//   );
// }

// export default withStyles(styles)(
//   withAlert(
//     withSnackbar(
//       createFragmentContainer(AddEditParametersCatalogType, {
//         editingParametersCatalogType: graphql`
//           fragment AddEditParametersCatalogType_editingParametersCatalogType on ParameterCatalog {
//             id
//             name
//             index
//             isDisabled
//             propertyCategories {
//               id
//               name
//               index
//               numberOfProperties
//             }
//           }
//         `,
//       }),
//     ),
//   ),
// );
