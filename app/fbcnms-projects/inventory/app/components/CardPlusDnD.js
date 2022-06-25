/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DraggableTableRow from './draggable/DraggableTableRow';
import DroppableTableBody from './draggable/DroppableTableBody';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@material-ui/core/IconButton';
import ParameterValueInput from './form/ParameterValueInput';
import Select from '@symphony/design-system/components/Select/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import fbt from 'fbt';
import inventoryTheme from '../common/theme';
import {Grid} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {generateTempId} from '../common/EntUtils';
import {makeStyles} from '@material-ui/styles';
import {useMemo} from 'react';

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'auto',
  },
  cardHeader: {
    margin: '20px 43px 22px 30px',
  },
  root: {
    marginBottom: '12px',
    maxWidth: '100%',
  },
  input: {
    ...inventoryTheme.textField,
    marginTop: '0px',
    marginBottom: '0px',
    width: '100%',
  },
  checkbox: {
    textAlign: 'center',
    '& div': {
      justifyContent: 'center',
    },
  },
}));

type Props = $ReadOnly<{||}>;

const DEFAULT_PARAM_GENERATED = {
  propertyType: {type: 'string'},
  current: {
    propertyType: {type: 'string'},
  },
};

const CardPlusDnD = (props: Props) => {
  const {parameters, onChange, cmVersionParams} = props;

  const classes = useStyles();

  const cmParamsOptions = useMemo(() => {
    const options = cmVersionParams.map(cmParam => {
      return {
        key: cmParam.id,
        label: cmParam.parameterType?.name,
        value: cmParam.id,
        selected: !!parameters.find(param => param.id === cmParam.id),
        ...cmParam,
      };
    });

    return options;
  }, [cmVersionParams, parameters]);

  const handleDeleteParameter = index => {
    const oldParams = [...parameters];
    oldParams.splice(index, 1);
    onChange(oldParams);
  };

  const handleAddParameters = () => {
    onChange([
      ...parameters,
      {...DEFAULT_PARAM_GENERATED, id: generateTempId()},
    ]);
  };
  const onNewValueChange = (index, param, value) => {
    const oldParams = [...parameters];

    oldParams[index] = value;
    onChange(oldParams);
  };
  const onParamSelect = (index, value) => {
    const oldParams = [...parameters];
    const selectedParam = cmVersionParams.find(cmParam => cmParam.id === value);
    if (
      !cmParamsOptions.find(cmParam => cmParam.id === selectedParam.id).selected
    ) {
      oldParams[index] = {
        ...selectedParam,
        current: {...selectedParam, propertyType: selectedParam.parameterType},
        propertyType: selectedParam.parameterType,
      };
      onChange(oldParams);
    }
  };

  return (
    <div className={classes.container}>
      <Card margins="none">
        <CardHeader className={classes.cardHeader}>
          Parameters to changed
        </CardHeader>
        <Grid
          container
          direction="column"
          style={{padding: '0 49px 35px 49px'}}>
          <Table component="div" className={classes.root}>
            <TableHead component="div">
              <TableRow component="div">
                <TableCell component="div">
                  <fbt desc="">Parameter name</fbt>
                </TableCell>
                <TableCell component="div">
                  <fbt desc="">Current value</fbt>
                </TableCell>
                <TableCell component="div">
                  <fbt desc="">New Value</fbt>
                </TableCell>
                <TableCell className={classes.checkbox} component="div">
                  <fbt desc="">Delete</fbt>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parameters.map((item, i) => (
                <TableRow id={item.id} index={i} key={`${i}.${item.id}`}>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <Select
                        placeholder={'Parameter name'}
                        disabled={props.disabled}
                        options={cmParamsOptions}
                        selectedValue={item.id}
                        size="full"
                        onChange={selected => onParamSelect(i, selected)}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <ParameterValueInput
                        disabled
                        label="Current value"
                        className={classes.input}
                        inputType="PropertyType"
                        property={item.current}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell style={{width: '30%'}} component="div" scope="row">
                    <FormField>
                      <ParameterValueInput
                        label="New value"
                        className={classes.input}
                        inputType="PropertyType"
                        property={item}
                        onChange={value => onNewValueChange(i, item, value)}
                      />
                    </FormField>
                  </TableCell>
                  <TableCell className={classes.checkbox} component="div">
                    <FormAction>
                      <IconButton aria-label="delete">
                        <DeleteOutlinedIcon
                          color="primary"
                          onClick={() => handleDeleteParameter(i)}
                        />
                      </IconButton>
                    </FormAction>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <FormAction>
            <Button
              variant="text"
              onClick={handleAddParameters}
              leftIcon={PlusIcon}>
              <fbt desc="">Add Property</fbt>
            </Button>
          </FormAction>
        </Grid>
      </Card>
    </div>
  );
};

export default CardPlusDnD;
