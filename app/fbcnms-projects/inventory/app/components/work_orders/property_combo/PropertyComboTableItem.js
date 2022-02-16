/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@symphony/design-system/components/IconButton';
import PropertyTypeSelect from '../../form/PropertyTypeSelect';
import PropertyValueInput from '../../form/PropertyValueInput';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import {DeleteIcon} from '@symphony/design-system/icons';
import {PropertyType} from '../../../common/PropertyType';

type Props = $ReadOnly<{|
  dependentProperty: PropertyType,
  classes: any,
  supportMandatory: boolean,
|}>;

const PropertyComboTableItem = (props: Props) => {
  const {dependentProperty, classes, supportMandatory} = props;

  return (
    <TableRow>
      {' '}
      <div />
      <TableCell className={classes.cell} component="div" scope="row">
        <FormField>
          <TextInput
            autoFocus={true}
            placeholder="Name"
            className={classes.input}
            value={dependentProperty.name}
            disabled={true}
          />
        </FormField>
      </TableCell>
      <TableCell className={classes.cell} component="div" scope="row">
        <FormField>
          <PropertyTypeSelect
            propertyType={dependentProperty}
            disabled={true}
          />
        </FormField>
      </TableCell>
      <TableCell className={classes.cell} component="div" scope="row">
        <PropertyValueInput
          label={null}
          className={classes.input}
          inputType="PropertyType"
          property={dependentProperty}
          disabled={true}
          isDependentProperty={true}
        />
      </TableCell>
      <TableCell padding="checkbox" component="div">
        <FormField>
          <Checkbox
            checked={!dependentProperty.isInstanceProperty}
            title={null}
            disabled={true}
          />
        </FormField>
      </TableCell>
      {supportMandatory && (
        <TableCell padding="checkbox" component="div">
          <FormField>
            <Checkbox
              checked={!!dependentProperty.isMandatory}
              title={null}
              disabled={true}
            />
          </FormField>
        </TableCell>
      )}
      <TableCell className={classes.actionsBar} align="right" component="div">
        <FormAction>
          <IconButton skin="primary" icon={DeleteIcon} disabled={true} />
        </FormAction>
      </TableCell>{' '}
    </TableRow>
  );
};

export default PropertyComboTableItem;
