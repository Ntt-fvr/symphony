/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {AddResourceTypeMutationVariables} from '../../mutations/__generated__/AddResourceTypeMutation.graphql';
import type {DataSelectorsForm} from './ResourceTypes';
import type {ResourceTypeBaseTypeKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';
import type {ResourceTypeClassKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';

import AddResourceTypeMutation from '../../mutations/AddResourceTypeMutation';
import AddedSuccessfullyMessage from './../assurance/common/AddedSuccessfullyMessage';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useMemo, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {camelCase, startCase} from 'lodash';
import {makeStyles} from '@material-ui/styles';
import {useDisabledButton} from '../assurance/common/useDisabledButton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    marginLeft: '14px',
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0 0 0',
    },
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
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
    margin: '20px 0 24px 0',
  },
  addResource: {
    margin: '15px 0',
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
  },
  select: {
    width: '100%',
  },
}));

type Node = {
  node: {
    name: string,
  },
};

type Props = $ReadOnly<{|
  isCompleted: void => void,
  resourceNames?: Array<Node>,
  dataSelectorsForm: DataSelectorsForm,
|}>;

type Resources = {
  data: {
    name: string,
    resourceTypeClass: ResourceTypeClassKind,
    resourceTypeBaseType: ResourceTypeBaseTypeKind,
  },
};

export default function AddResourceTypeForm(props: Props) {
  const {isCompleted, resourceNames, dataSelectorsForm} = props;
  const classes = useStyles();
  const [resources, setResources] = useState<Resources>({data: {}});
  const [showChecking, setShowChecking] = useState(false);

  const names = resourceNames?.map(item => item.node.name);

  const handleDisable = useDisabledButton(resources.data, names, 3);

  const handleHasError = useMemo(
    () => names?.some(item => item === resources.data.name),
    [names, resources.data.name],
  );

  function handleChange({target}) {
    setResources({
      data: {
        ...resources.data,
        [target.name]: target.value,
      },
    });
  }

  function handleClick() {
    const variables: AddResourceTypeMutationVariables = {
      input: {
        name: resources.data.name,
        resourceTypeClass: resources.data.resourceTypeClass,
        resourceTypeBaseType: resources.data.resourceTypeBaseType,
      },
    };
    setShowChecking(true);
    AddResourceTypeMutation(variables, {
      onCompleted: () => {
        isCompleted();
        setResources({data: {}});
      },
    });
  }

  const setReturn = () => {
    setShowChecking(false);
  };

  if (showChecking) {
    return (
      <AddedSuccessfullyMessage
        card_header="Add Resource Type"
        title="Resource"
        text_button="Add new resource"
        setReturn={setReturn}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>Add Resource Type</CardHeader>
      <form className={classes.formField} autoComplete="off">
        <TextField
          required
          className={classes.input}
          id="resource-name"
          label="Resource name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          error={handleHasError}
          helperText={
            names?.some(item => item === resources.data.name)
              ? 'Resource name existing'
              : ''
          }
        />
        <TextField
          required
          id="class"
          select
          className={classes.select}
          label="Class"
          onChange={handleChange}
          name="resourceTypeClass"
          variant="outlined"
          defaultValue="">
          {dataSelectorsForm?.resourceTypeClass?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {startCase(camelCase(item))}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-select-family"
          select
          className={classes.select}
          label="Resource type base type"
          onChange={handleChange}
          name="resourceTypeBaseType"
          variant="outlined"
          defaultValue="">
          {dataSelectorsForm.resourceTypeBaseType.map((item, index) => (
            <MenuItem key={index} value={item}>
              {startCase(camelCase(item))}
            </MenuItem>
          ))}
        </TextField>
      </form>
      <FormField>
        <Button
          className={classes.addResource}
          onClick={handleClick}
          disabled={handleDisable}>
          Add Resource Type
        </Button>
      </FormField>
    </Card>
  );
}
