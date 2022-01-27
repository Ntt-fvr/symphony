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

import EditResourceTypeMutation from '../../mutations/EditResourceTypeMutation';
import type {EditResourceTypeItemQuery} from './__generated__/EditResourceTypeItemQuery.graphql';
import type {EditResourceTypeMutationVariables} from '../../mutations/__generated__/EditResourceTypeMutation.graphql';
import AddIcon from '@material-ui/icons/Add';
import symphony from '@symphony/design-system/theme/symphony';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitleSubItem from '../assurance/common/ConfigureTitleSubItem';
import Divider from '@material-ui/core/Divider';
import SaveDialogConfirm from './SaveDialogConfirm';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {Grid, MenuItem} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButtonEdit} from '../assurance/common/useDisabledButton';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useValidationEdit} from '../assurance/common/useValidation';
import {AddEditResourceSpecification} from './AddEditResourceSpecification';
import type {PropertyType} from '../../common/PropertyType';

const useStyles = makeStyles(() => ({
  root: {
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
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: symphony.palette.B50,
    },
  },
  buttonEdit: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
      color: symphony.palette.B600,
    },
  },
}));

const EditResourceTypeQuery = graphql`
  query EditResourceTypeItemQuery {
    resourceTypeClasses {
      edges {
        node {
          id
          name
        }
      }
    }
    resourceTypeBaseTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

type Resource = {
  name: string,
};

export type ResourceSpecifications = {
  id: string,
  name: string,
  resourceTypeFk: {
    id: string,
  },
  propertyTypes: Array<PropertyType>,
};

type Props = $ReadOnly<{|
  formValues: {
    id: string,
    name: string,
    resourceTypeFk: {
      id: string,
    },
    resourceTypeBaseTypeFk: {
      id: string,
      name: string,
    },
    resourceTypeClassFk: {
      id: string,
      name: string,
    },
    propertyTypes: Array<PropertyType>,
  },
  hideEditResourceTypeForm: void => void,
  isCompleted: void => void,
  resources: Array<Resource>,
  resourceSpecifications: ResourceSpecifications,
|}>;

export const EditResourceTypeItem = (props: Props) => {
  const {
    formValues,
    hideEditResourceTypeForm,
    resources,
    isCompleted,
    resourceSpecifications,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<ResourceSpecifications>({});
  const classes = useStyles();

  const name = useFormInput(formValues.name);

  const resourceTypeBaseTypeFk = useFormInput(
    formValues.resourceTypeBaseTypeFk.id,
  );
  const resourceTypeClassFk = useFormInput(formValues.resourceTypeClassFk.id);
  const data = useLazyLoadQuery<EditResourceTypeItemQuery>(
    EditResourceTypeQuery,
    {},
  );

  const resourcesNames = resources?.map(item => item.name);

  const dataInputsObject = [
    name.value.trim(),
    resourceTypeBaseTypeFk.value,
    resourceTypeClassFk.value,
  ];

  const inputFilter = () => {
    return (
      resourcesNames?.filter(
        item => item === name.value.trim() && item !== formValues.name.trim(),
      ) || []
    );
  };

  const filterDataById = resourceSpecifications.filter(
    rsData => rsData?.resourceTypeFk?.id === formValues.id,
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
        resourceTypeBaseTypeFk: resourceTypeBaseTypeFk.value,
        resourceTypeClassFk: resourceTypeClassFk.value,
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
                  name="resourceTypeBaseTypeFk"
                  fullWidth
                  {...resourceTypeBaseTypeFk}>
                  {data.resourceTypeBaseTypes.edges.map((item, index) => (
                    <MenuItem key={index} value={item.node?.id}>
                      {item.node?.name}
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
                  name="resourceTypeClassFk"
                  type="string"
                  fullWidth
                  {...resourceTypeClassFk}>
                  {data.resourceTypeClasses.edges.map((item, index) => (
                    <MenuItem key={index} value={item.node?.id}>
                      {item.node?.name}
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
            <Text
              style={{padding: '0 0 15px 15px'}}
              color="primary"
              variant="body2">
              Name
            </Text>
            <Divider />
            {filterDataById.map((item, index) => (
              <Grid item key={index}>
                <Button
                  className={classes.buttonEdit}
                  disableRipple
                  style={{padding: '11px'}}
                  onClick={() => showEditFormData({item})}>
                  {item?.name}
                </Button>
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
