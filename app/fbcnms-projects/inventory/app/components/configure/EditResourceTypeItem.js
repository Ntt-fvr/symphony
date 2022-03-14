/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

import {useFormInput} from '../assurance/common/useFormInput';

import type {DataSelector} from './ResourceTypes';
import type {EditResourceTypeMutationVariables} from '../../mutations/__generated__/EditResourceTypeMutation.graphql';
import type {PropertyType} from '../../common/PropertyType';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';
import Divider from '@material-ui/core/Divider';
import EditResourceTypeMutation from '../../mutations/EditResourceTypeMutation';
import IconButton from '@symphony/design-system/components/IconButton';
import SaveDialogConfirm from './SaveDialogConfirm';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import symphony from '@symphony/design-system/theme/symphony';
import {AddEditResourceSpecification} from './AddEditResourceSpecification';
import {Grid, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from '../assurance/common/useDisabledButton';
import {useValidationEdit} from '../assurance/common/useValidation';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: '24px 25px 34px 34px',
    margin: '0',
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
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  buttons: {
    height: '36px',
    width: '111px',
  },
  iconVisibility: {
    marginRight: '40px',
  },
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: symphony.palette.B50,
    },
  },
}));

type Resource = {
  name: string,
};

export type ResourceSpecifications = {
  id: string,
  name: string,
  resourceType: {
    id: string,
  },
  propertyTypes: Array<PropertyType>,
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    resourceType: {
      id: string,
    },
    resourceTypeBaseType: string,
    resourceTypeClass: string,
    propertyTypes: Array<PropertyType>,
  },
  hideEditResourceTypeForm: void => void,
  isCompleted: void => void,
  resources: Array<Resource>,
  resourceSpecifications: ResourceSpecifications,
  dataSelector: DataSelector,
|}>;

export const EditResourceTypeItem = (props: Props) => {
  const {
    formValues,
    hideEditResourceTypeForm,
    resources,
    isCompleted,
    resourceSpecifications,
    dataSelector,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResourceSpecifications>({});
  const classes = useStyles();

  const name = useFormInput(formValues.name);

  const resourceTypeBaseType = useFormInput(formValues.resourceTypeBaseType);
  const resourceTypeClass = useFormInput(formValues.resourceTypeClass);
  const resourcesNames = resources?.map(item => item.name);

  const dataInputsObject = [
    name.value.trim(),
    resourceTypeBaseType.value,
    resourceTypeClass.value,
  ];

  const inputFilter = () => {
    return (
      resourcesNames?.filter(
        item => item === name.value.trim() && item !== formValues.name.trim(),
      ) || []
    );
  };

  const filterDataById = resourceSpecifications.filter(
    rsData => rsData?.resourceType?.id === formValues.id,
  );

  const showEditFormData = (dataForm: ResourceSpecifications) => {
    setOpenFormEdit(true);
    setDataEdit(dataForm);
  };

  const handleDisable = useDisabledButtonEdit(dataInputsObject, 3, inputFilter);

  const validationName = useValidationEdit(inputFilter, 'Resource type');

  const handleEdit = () => {
    const variables: EditResourceTypeMutationVariables = {
      input: {
        id: formValues.id,
        name: name.value,
        resourceTypeBaseType: resourceTypeBaseType.value,
        resourceTypeClass: resourceTypeClass.value,
      },
    };
    EditResourceTypeMutation(variables, {
      onCompleted: () => {
        isCompleted();
        hideEditResourceTypeForm();
      },
    });
  };

  if (openForm) {
    return (
      <AddEditResourceSpecification
        isCompleted={isCompleted}
        dataForm={resourceSpecifications}
        formValues={formValues}
        filterData={filterDataById}
        editMode={false}
        closeForm={() => setOpenForm(false)}
      />
    );
  }

  if (openFormEdit) {
    return (
      <AddEditResourceSpecification
        isCompleted={isCompleted}
        dataForm={dataEdit.item}
        formValues={dataEdit.item}
        filterData={filterDataById}
        editMode={true}
        closeForm={() => setOpenFormEdit(false)}
      />
    );
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
            title={fbt('Resources/', '')}
            tag={` ${formValues.name}`}
          />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            color="primary"
            className={classes.buttons}
            style={{marginRight: '1rem'}}
            onClick={() => hideEditResourceTypeForm()}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={() => setDialogOpen(true)}
            disabled={handleDisable}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} lg={12} xl={12}>
        <Card margins="none">
          <CardHeader className={classes.cardHeader}>Details</CardHeader>
          <Grid container>
            <Grid item xs={4}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  name="name"
                  fullWidth
                  {...name}
                  {...validationName}
                />
              </form>
            </Grid>
            <Grid item xs={4}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  select
                  label="Class"
                  variant="outlined"
                  name="resourceTypeBaseType"
                  fullWidth
                  {...resourceTypeBaseType}>
                  {dataSelector.resourceTypeBaseType.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name.toLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </form>
            </Grid>
            <Grid item xs={4}>
              <form className={classes.formField} autoComplete="off">
                <TextField
                  required
                  select
                  label="Resource type base type"
                  variant="outlined"
                  name="resourceTypeClass"
                  type="string"
                  fullWidth
                  {...resourceTypeClass}>
                  {dataSelector.resourceTypeClass.map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name.toLowerCase()}
                    </MenuItem>
                  ))}
                </TextField>
              </form>
            </Grid>
          </Grid>
        </Card>
        <Card margins="none">
          <CardHeader className={classes.cardHeader}>
            Resource specification
          </CardHeader>
          <Grid container direction="column" style={{padding: '0 49px'}}>
            <Grid container>
              <Grid item xs={10}>
                <Text
                  style={{padding: '0 0 15px 30px'}}
                  useEllipsis={true}
                  color="primary"
                  variant="subtitle2">
                  Name
                </Text>
              </Grid>
              <Grid
                style={{display: 'flex', justifyContent: 'flex-end'}}
                item
                xs={2}>
                <Text
                  style={{padding: '0 30px 15px 0'}}
                  useEllipsis={true}
                  color="primary"
                  variant="subtitle2">
                  Details
                </Text>
              </Grid>
            </Grid>
            <Divider />
            {filterDataById.map((item, index) => (
              <Grid xs={12} key={index}>
                <Grid
                  style={{
                    margin: '13px 0 ',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      marginLeft: '30px',
                    }}>
                    {item?.name}
                  </Text>

                  <IconButton
                    className={classes.iconVisibility}
                    skin="gray"
                    icon={VisibilityIcon}
                    onClick={() => showEditFormData({item})}
                  />
                </Grid>
                <Divider />
              </Grid>
            ))}
            <Grid item style={{margin: '10px 0 40px 30px'}}>
              <Button
                color="primary"
                disableRipple
                startIcon={<AddIcon />}
                className={classes.buttonAdd}
                onClick={() => setOpenForm(!openForm)}>
                Add Resource Specification
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {dialogOpen && (
        <SaveDialogConfirm
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          saveItem={() => handleEdit()}
          resource={name.value}
          typeAlert={'information'}
          customMessage=""
          customTitle=""
        />
      )}
    </div>
  );
};
