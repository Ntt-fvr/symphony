/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';
import Grid from '@material-ui/core/Grid';

import React, {useMemo, useState} from 'react';
import RelationshipTypeItem from './RelationshipTypeItem';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {makeStyles} from '@material-ui/styles';

import type {AddResourceSpecificationMutationVariables} from '../../mutations/__generated__/AddResourceSpecificationMutation.graphql';
import type {EditResourceSpecificationMutationVariables} from '../../mutations/__generated__/EditResourceSpecificationMutation.graphql';
import type {ResourceSpecifications} from './EditResourceTypeItem';

import AddResourceSpecificationMutation from '../../mutations/AddResourceSpecificationMutation';
import EditResourceSpecificationMutation from '../../mutations/EditResourceSpecificationMutation';
import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import ExperimentalPropertyTypesTable from '../form/ExperimentalPropertyTypesTable';
import PropertyTypesTableDispatcher from '../form/context/property_types/PropertyTypesTableDispatcher';
import SaveDialogConfirm from './SaveDialogConfirm';
import {convertPropertyTypeToMutationInput} from '../../common/PropertyType';
import {toMutablePropertyType} from '../../common/PropertyType';
import {useDisabledButton} from './../assurance/common/useDisabledButton';
import {useDisabledButtonEdit} from './../assurance/common/useDisabledButton';
import {useFormInput} from '../assurance/common/useFormInput';
import {usePropertyTypesReducer} from '../form/context/property_types/PropertyTypesTableState';
import {useValidationEdit} from './../assurance/common/useValidation';

const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 25px 34px 34px',
    margin: '0',
  },
  relationship: {
    margin: '32px 0',
  },
  formField: {
    margin: '0 22px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '41px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  header: {
    marginBottom: '1rem',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
}));

type ResourceSpecification = {
  data: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  dataForm: ResourceSpecifications,
  formValues: ResourceSpecifications,
  editMode: boolean,
  closeForm: () => void,
  isCompleted: () => void,
  filterData: Array<ResourceSpecifications>,
|}>;

export const AddEditResourceSpecification = (props: Props) => {
  const {
    dataForm,
    closeForm,
    formValues,
    isCompleted,
    editMode,
    filterData,
  } = props;
  const [dialogSaveForm, setDialogSaveForm] = useState(false);
  const [dialogCancelForm, setDialogCancelForm] = useState(false);
  const classes = useStyles();

  const [
    resourceSpecification,
    setResourceSpecification,
  ] = useState<ResourceSpecification>({data: {}});
  const [propertyTypes, propertyTypesDispatcher] = usePropertyTypesReducer(
    (dataForm?.propertyTypes ?? []).filter(Boolean).map(toMutablePropertyType),
  );

  const nameEdit = useFormInput(dataForm.name);

  const namesFilter = filterData?.map(item => item.name);

  const inputFilter = () => {
    return (
      namesFilter?.filter(
        item => item === nameEdit.value && item !== formValues.name,
      ) || []
    );
  };
  const handleDisable = useDisabledButton(
    resourceSpecification.data,
    namesFilter,
    1,
  );
  const dataInputsObject = [nameEdit.value];

  const handleDisableEdit = useDisabledButtonEdit(
    dataInputsObject,
    1,
    inputFilter,
  );

  const validationName = useValidationEdit(
    inputFilter,
    'Resource Specification',
  );

  const handleHasError = useMemo(
    () => namesFilter?.some(item => item === resourceSpecification.data.name),
    [namesFilter, resourceSpecification.data.name],
  );

  function handleChange({target}) {
    setResourceSpecification({
      data: {
        ...resourceSpecification.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddResourceSpecificationMutationVariables = {
      input: {
        name: resourceSpecification.data.name,
        resourceType: formValues.id,
        propertyTypes: convertPropertyTypeToMutationInput(propertyTypes),
      },
    };
    AddResourceSpecificationMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setResourceSpecification({data: {}});
        closeForm();
      },
    });
  }

  function handleClickEdit() {
    const variables: EditResourceSpecificationMutationVariables = {
      input: {
        id: dataForm.id,
        name: nameEdit.value,
        resourceType: dataForm.resourceType.id,
        propertyTypes: convertPropertyTypeToMutationInput(propertyTypes),
      },
    };
    EditResourceSpecificationMutation(variables, {
      onCompleted: () => {
        isCompleted();
        closeForm();
      },
    });
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.header}
        container
        direction="row"
        justify="flex-end"
        alignItems="center">
        <Grid item xs>
          <ConfigureTitleSubItem
            title={fbt('Resources/', '') + ` ${dataForm.name}/`}
            tag={' Resource specification'}
          />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttons}
            style={{marginRight: '1rem'}}
            onClick={() => setDialogCancelForm(true)}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            disabled={editMode ? handleDisableEdit : handleDisable}
            onClick={() => setDialogSaveForm(true)}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Card margins="none">
        <CardHeader className={classes.cardHeader}>Details</CardHeader>
        <Grid container>
          <Grid item xs={4}>
            <form className={classes.formField} autoComplete="off">
              {editMode ? (
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  {...nameEdit}
                  {...validationName}
                />
              ) : (
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  error={handleHasError}
                  onChange={handleChange}
                  helperText={
                    handleHasError ? 'Resource Specification name existing' : ''
                  }
                />
              )}
            </form>
          </Grid>
        </Grid>
      </Card>
      <Card margins="none">
        <ExpandingPanel title="Properties">
          <PropertyTypesTableDispatcher.Provider
            value={propertyTypesDispatcher}>
            <ExperimentalPropertyTypesTable
              supportDelete={true}
              propertyTypes={propertyTypes}
            />
          </PropertyTypesTableDispatcher.Provider>
        </ExpandingPanel>
      </Card>
      {dialogSaveForm && (
        <SaveDialogConfirm
          open={dialogSaveForm}
          onClose={() => setDialogSaveForm(false)}
          saveItem={editMode ? handleClickEdit : handleClick}
          resource={editMode ? nameEdit.value : resourceSpecification.data.name}
          typeAlert={'information'}
          customTitle={
            editMode
              ? 'Are you sure to save your changes?'
              : 'The changes will be saved'
          }
          customMessage={
            editMode
              ? 'The resource specification will be saved as:'
              : 'The resource specification will be saved as:'
          }
        />
      )}
      {dialogCancelForm && (
        <SaveDialogConfirm
          open={dialogCancelForm}
          onClose={() => setDialogCancelForm(false)}
          saveItem={closeForm}
          resource={editMode ? nameEdit.value : resourceSpecification.data.name}
          typeAlert={'warning'}
          customTitle={
            editMode
              ? 'Are you sure you don´t want to keep changes'
              : 'Are you sure you don´t want to save the Resource'
          }
          customMessage={
            editMode
              ? 'The changes on the resource specification won´t be changed:'
              : 'The resource specification won´t be saved'
          }
        />
      )}
      <Grid className={classes.relationship} item xs={12}>
        <Text weight={'bold'} variant={'h6'}>
          Relationship types definition
        </Text>
      </Grid>
      <RelationshipTypeItem dataForm={dataForm} />
    </div>
  );
};