/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddEditParametersCatalogType_editingParametersCatalogType} from './__generated__/AddEditParametersCatalogType_editingParametersCatalogType.graphql';

import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithSnackbarProps} from 'notistack';
import type {WithStyles} from '@material-ui/core';
import type {ParametersCatalogType} from '../types';

import type {PayloadError} from 'relay-runtime';

import React, {useState} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import {withSnackbar} from 'notistack';
import {withStyles} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withAlert from '@fbcnms/ui/components/Alert/withAlert';
import update from 'immutability-helper';

import EditLocationTypeMutation from '../mutations/EditParametersCatalogTypeMutation';

import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@symphony/design-system/components/Button';
import PageFooter from '@fbcnms/ui/components/PageFooter';

import {getGraphError} from '../../../../common/EntUtils';

import PropertyCategories from '../components/PropertyCategories.js';
import DraggableTableRow from '../../../draggable/DraggableTableRow';

const styles = theme => ({
  draggableRow: {
    display: 'flex',
    paddingLeft: '10px',
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    borderRadius: 4,
  },
  cell: {
    border: 'none',
    paddingLeft: '10px',
  },
  panel: {
    width: '100%',
    boxShadow: 'none',
  },
  row: {
    flexGrow: 1,
  },
  properties: {
    marginBottom: '24px',
    width: '100%',
  },
  savebtn: {
    marginRight: '20px',
  }
});

type Props = WithSnackbarProps &
  WithStyles<typeof styles> &
  WithAlert & {|
    editingPropertyCatergoryType?: AddEditParametersCatalogType_editingParametersCatalogType,
  |};

type State = {
  error: string,
  editingPropertyCategoryType: ParametersCatalogType,
  isSaving: boolean,
};

const sortByIndex = (
  a: $ReadOnly<{index?: ?number}>,
  b: $ReadOnly<{index?: ?number}>,
) => (a.index ?? 0) - (b.index ?? 0);

class AddEditParametersCatalogType extends React.Component<Props, State> {
  state = {
    error: '',
    editingPropertyCategoryType: this.getEditingLocationType(),
    isSaving: false,
  };

  render() {
    const {classes} = this.props;
    const {
      editingPropertyCategoryType: editingPropertyCatergoryType,
    } = this.state;

    const editPropertyCatalog = editingPropertyCatergoryType;
    const propertyCategoriesTypes = editingPropertyCatergoryType?.propertyCategories
      .slice()
      .sort(sortByIndex);

    return (
      <DraggableTableRow
        className={classes.draggableRow}
        draggableCellClassName={classes.cell}
        id={'id-a-cambiar'}
        index={0}>
        <Accordion className={classes.panel}>
          <AccordionSummary
            className={classes.row}
            expandIcon={<ExpandMoreIcon />}>
            {editPropertyCatalog?.name}
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.properties}>
              <PropertyCategories
                state={this.setState}
                propertyTypes={propertyCategoriesTypes}
                onPropertiesChanged={this._documentCategoryChangedHandler}
              />
            </div>
            <div className={classes.savebtn}>
              <Button onClick={this.onSave}>Save</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </DraggableTableRow>
    );
  }
  _documentCategoryChangedHandler = categories => {
    console.log('Categorias \n', categories);
    this.setState(prevState => {
      return {
        error: '',
        editingPropertyCategoryType: update(
          prevState.editingPropertyCategoryType,
          {
            propertyCategories: {$set: categories},
          },
        ),
      };
    });
  };

  onSave = () => {
    if (this.props.editingPropertyCatergoryType) {
      this.editParametersCatalogType();
    }
  };

  editParametersCatalogType = () => {
    const onError = (error: PayloadError) => {
      this.setState({isSaving: false});
      const errorMessage = getGraphError(error);
      this.props.enqueueSnackbar(errorMessage, {
        children: key => (
          <SnackbarItem id={key} message={errorMessage} variant="error" />
        ),
      });
    };

    const handleErrors = errors => {
      if (errors && errors[0]) {
        onError(errors[0]);
      }
    };

    // eslint-disable-next-line max-len
    const variables = this.buildEditLocationTypeMutationVariables();
    EditLocationTypeMutation(variables, {
      onError,
      onCompleted: (response, errors) => {
        if (!handleErrors(errors)) {
          const exito = response.editPropertyCategories;
        }
        this.props.enqueueSnackbar('saved', {
        children: key => (
          <SnackbarItem id={key} message={'saved'} variant="success" />
        ),
      });
      },
    });
  };

  buildEditLocationTypeMutationVariables = () => {
    const {id, propertyCategories} = this.state.editingPropertyCategoryType;
    const parameterCatalogId = this.props.editingPropertyCatergoryType?.id;

    return {
      propertyCategories: propertyCategories
        .filter(propType => !!propType.name)
        .map(cat => {
          console.log('cattttttttt', cat, this.props);
          const categoryID = cat.id.includes('@tmp') ? null : cat.id
          return {
            id: categoryID,
            name: cat.name,
            index: categoryID == null ? (cat.index + 1) : cat.index || 0,
            parameterCatalogId: String(parameterCatalogId),
          };
        }),
    };
  };

  deleteTempId = (definition: any) => {
    const newDef = {...definition};
    if (definition.id && definition.id.includes('@tmp')) {
      newDef['id'] = undefined;
    }
    return newDef;
  };

  withoutProperty = (obj, property) => {
    const {[property]: unused, ...rest} = obj;
    return rest;
  };

  getEditingLocationType(): ParametersCatalogType {
    const {editingPropertyCatergoryType} = this.props;
    console.log(editingPropertyCatergoryType);

    const propertyCategories = (
      editingPropertyCatergoryType?.propertyCategories || []
    )
      .filter(Boolean)
      .map(property => ({
        id: property.id,
        name: property.name,
        index: property.index,
        parameterCatalogId: editingPropertyCatergoryType.id,
      }));

    return {
      id: editingPropertyCatergoryType?.id ?? 'ParametersCatalogType@tmp0',
      name: editingPropertyCatergoryType?.name ?? '',
      index: editingPropertyCatergoryType?.length ?? 0,
      propertyCategories:
        propertyCategories.length > 0
          ? propertyCategories
          : [
              {
                id: 'PropertyCategories@tmp',
                name: '',
                index:
                  editingPropertyCatergoryType?.propertyCategories?.length ?? 0,
                numberOfProperties: 0,
              },
            ],
    };
  }
}

export default withStyles(styles)(
  withAlert(
    withSnackbar(
      createFragmentContainer(AddEditParametersCatalogType, {
        editingPropertyCatergoryType: graphql`
          fragment AddEditParametersCatalogType_editingParametersCatalogType on ParameterCatalog {
            id
            name
            index
            isDisabled
            propertyCategories {
              id
              name
              index
              numberOfProperties
            }
          }
        `,
      }),
    ),
  ),
);
