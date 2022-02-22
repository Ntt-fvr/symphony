/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useMemo, useState} from 'react';

// COMPONENTS //
import AddedSuccessfullyMessage from './../assurance/common/AddedSuccessfullyMessage';

import type {AddResourceTypeMutationVariables} from '../../mutations/__generated__/AddResourceTypeMutation.graphql';

// DESIGN SYSTEM //
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import FormField from '@symphony/design-system/components/FormField/FormField';

import TextField from '@material-ui/core/TextField';
import {MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import AddResourceTypeMutation from '../../mutations/AddResourceTypeMutation';

import type {DataSelector} from './ResourceTypes';
import type {ResourceTypeBaseTypeKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';
import type {ResourceTypeClassKind} from '../../components/configure/__generated__/ResourceTypesQuery.graphql';

import {useDisabledButton} from './../assurance/common/useDisabledButton';

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
  dataSelector: DataSelector,
|}>;

type Resources = {
  data: {
    name: string,
    resourceTypeclass: ResourceTypeClassKind,
    resourceTypeBaseType: ResourceTypeBaseTypeKind,
  },
};

export default function AddResourceTypeForm(props: Props) {
  const {isCompleted, resourceNames, dataSelector} = props;
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
        resourceTypeClass: resources.data.resourceTypeclass,
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
          name="resourceTypeclass"
          variant="outlined"
          defaultValue="">
          {dataSelector.resourceTypeClass.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name.toLowerCase()}
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
          {dataSelector.resourceTypeBaseType.map((item, index) => (
            <MenuItem key={index} value={item.name}>
              {item.name.toLowerCase()}
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
