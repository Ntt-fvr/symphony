/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {DataSelectorsForm} from './ResourceTypes';
import type {EditResourceTypeMutationVariables} from '../../mutations/__generated__/EditResourceTypeMutation.graphql';
import type {PropertyType} from '../../common/PropertyType';
import type {RemoveResourceSpecificationMutationVariables} from '../../mutations/__generated__/RemoveResourceSpecificationMutation.graphql';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Divider from '@material-ui/core/Divider';
import EditResourceTypeMutation from '../../mutations/EditResourceTypeMutation';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useState} from 'react';
import RemoveResourceSpecificationMutation from '../../mutations/RemoveResourceSpecificationMutation';
import SaveDialogConfirm from './SaveDialogConfirm';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import inventoryTheme from '../../common/theme';
import symphony from '@symphony/design-system/theme/symphony';
import {AddEditResourceSpecification} from './AddEditResourceSpecification';
import {Grid, MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from '../assurance/common/useDisabledButton';
import {useFormInput} from '../assurance/common/useFormInput';
import {useValidationEdit} from '../assurance/common/useValidation';

const useStyles = makeStyles(() => ({
  root: {
    padding: '24px 25px 34px 34px',
    margin: '0',
  },
  formField: {
    margin: '0 22px 41px 22px',
    ...inventoryTheme.formField,
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
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: symphony.palette.B50,
    },
  },
}));

export type ResourceSpecifications = {
  id: string,
  name: string,
  resourceType: {
    id: string,
    resourceTypeClass: string,
  },
  resourcePropertyTypes: Array<PropertyType>,
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    resourceType: {
      id: string,
      resourceTypeClass: string,
    },
    resourceTypeBaseType: string,
    resourceTypeClass: string,
    resourcePropertyTypes: Array<PropertyType>,
  },
  hideEditResourceTypeForm: void => void,
  isCompleted: void => void,
  dataFormQuery: any,
  dataSelectorsForm: DataSelectorsForm,
|}>;

export const EditResourceTypeItem = (props: Props) => {
  const {
    formValues,
    hideEditResourceTypeForm,
    dataFormQuery,
    isCompleted,
    dataSelectorsForm,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResourceSpecifications>({});
  const classes = useStyles();

  const name = useFormInput(formValues.name);
  const resourceTypeBaseType = useFormInput(formValues.resourceTypeBaseType);
  const resourceTypeClass = useFormInput(formValues.resourceTypeClass);

  const resourcesNames = dataFormQuery?.resourceTypes?.edges.map(
    item => item.node.name,
  );

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

  const dataResourceSpecifications = dataFormQuery.resourceSpecifications?.edges.map(
    item => item.node,
  );
  const filterDataById = dataResourceSpecifications.filter(
    rsData => rsData?.resourceType?.id === formValues.id,
  );

  const dataResource = dataFormQuery.queryResource.map(
    item => item.resourceSpecification,
  );

  const spliceSpecification = filterDataById.map(item => {
    return {
      ...item,
      disableButton: dataResource.includes(item.id),
    };
  });

  const handleRemove = id => {
    const variables: RemoveResourceSpecificationMutationVariables = {
      id: id,
    };
    RemoveResourceSpecificationMutation(variables, {
      onCompleted: () => isCompleted(),
    });
  };

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
        dataForm={''}
        formValues={formValues}
        filterData={filterDataById}
        vendorData={dataFormQuery.vendors?.edges.map(item => item.node)}
        editMode={false}
        closeForm={() => setOpenForm(false)}
      />
    );
  }

  if (openFormEdit) {
    return (
      <AddEditResourceSpecification
        isCompleted={isCompleted}
        dataForm={dataEdit}
        formValues={dataEdit}
        filterData={filterDataById}
        vendorData={dataFormQuery.vendors?.edges.map(item => item.node)}
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
          <ConfigureTitleSubItem title={''} tag={` ${formValues.name}`} />
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
                  name="resourceTypeClass"
                  fullWidth
                  {...resourceTypeClass}>
                  {dataSelectorsForm.resourceTypeClass.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {startCase(camelCase(item))}
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
                  name="resourceTypeBaseType"
                  type="string"
                  fullWidth
                  {...resourceTypeBaseType}>
                  {dataSelectorsForm.resourceTypeBaseType.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {startCase(camelCase(item))}
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
            <Grid
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 0 15px 15px',
              }}>
              <Text color="primary" variant="body2">
                Name
              </Text>
              <Grid>
                <Grid container>
                  <Grid style={{marginRight: '1rem'}}>
                    <Text color="primary" variant="body2">
                      Edit
                    </Text>
                  </Grid>
                  <Grid>
                    <Text color="primary" variant="body2">
                      Delete
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            {spliceSpecification.map((item, index) => (
              <Grid xs={12} key={index}>
                <Grid
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '11px',
                  }}>
                  <Text>{item?.name}</Text>
                  <Grid>
                    <Grid container>
                      <Grid style={{marginRight: '1rem'}}>
                        <IconButton
                          skin="gray"
                          icon={VisibilityIcon}
                          onClick={() => showEditFormData(item)}
                        />
                      </Grid>
                      <Grid>
                        <IconButton
                          disabled={item.disableButton}
                          icon={DeleteOutlinedIcon}
                          onClick={() => handleRemove(item.id)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            ))}
            <Grid item style={{marginTop: '10px', marginBottom: '40px'}}>
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
