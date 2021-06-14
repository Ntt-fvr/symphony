/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {
  InventoryActionPermission,
  InventoryEntName,
} from '../admin/userManagement/utils/usePermissions';

import * as React from 'react';
import FormActionWithPermissions from '../../common/FormActionWithPermissions';
import Grid from '@material-ui/core/Grid';
import IconButton from '@symphony/design-system/components/IconButton';
import Text from '@symphony/design-system/components/Text';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import fbt from 'fbt';
import symphony from '@symphony/design-system/theme/symphony';
import {DeleteIcon} from '@symphony/design-system/icons';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/styles';

type Props = $ReadOnly<{|
  icon: React.Node,
  entityName: InventoryEntName,
  instanceCount: number,
  instanceNamePlural: string,
  instanceNameSingular: string,
  name: string,
  onDelete: () => void,
  onEdit?: ?() => void,
  allowDelete?: ?boolean,
|}>;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin:'5px',
  },

  boldText: {
    fontWeight: 'bold',
  },
  text: {
    color: '#4d4d4e',
  },
  manager: {
    display: 'flex',
    justifyContent:'center',
    marginRigth:'50px',
  },
  vendor: {
    display: 'flex',
    justifyContent:'flex-end',
  },
  edit: {
    marginLeft:'50%',
    color: symphony.palette.B600,
    display: 'flex',
    justifyContent:'flex-end',
    flexShrink: 0,
  },
  delete:{
    display: 'flex',
    marginLeft:'30%',
  },  
}));

function ConfigureAccordion(props: Props) {
  const {icon, entityName, name} = props;
  const classes = useStyles();

  const editButtonPermissions: InventoryActionPermission = {
    entity: entityName,
    action: 'update',
  };

  return (
    <div className={classes.root}>
    <Grid
      className={classes.container}
      container spacing={3}
      alignItems="center">
      <Grid xs='5'>        
          <Text
            className={classNames(classes.text, classes.boldText)}
            variant="subtitle1">
            {name}
          </Text>        
      </Grid>
      <Grid xs='3'>
        <Text
          color='primary'
          weight='bold'
          className={classes.manager}
          variant="body1">
          {'Gestor_manager'}
        </Text> 
      </Grid>
      <Grid xs='2'>
        <Text
          weight='bold'
          className={classes.vendor}
          variant="body1">
          {'Vendor_name'}
        </Text>
      </Grid>
      <Grid>
        <Link className={classes.edit}>{icon}</Link>
      </Grid>
      <Grid xs='1'>
        <div className={classes.delete}>
          <DeleteButton />
        </div>      
      </Grid>
    </Grid>
    </div>
  );
}

type DeleteButtonProps = $ReadOnly<{|
  entityName: InventoryEntName,
  instanceCount: number,
  allowDelete?: ?boolean,
  onDelete: () => void,
|}>;

function DeleteButton(props: DeleteButtonProps) {
  const {entityName, instanceCount, allowDelete, onDelete} = props;
  const classes = useStyles();

  const disabled =
    allowDelete !== undefined && allowDelete !== null
      ? !allowDelete
      : instanceCount > 0;

  const deleteButtonPermissions: InventoryActionPermission = {
    entity: entityName,
    action: 'delete',
  };

  const deleteButton = (
    <FormActionWithPermissions permissions={deleteButtonPermissions}>
      <IconButton
        className={classes.iconButton}
        skin="primary"
        disabled={disabled}
        onClick={onDelete}
        icon={DeleteIcon}
      />
    </FormActionWithPermissions>
  );
  const tooltip = fbt('Cannot delete a type that is in use', '');

  return disabled ? (
    <Tooltip title={tooltip}>{deleteButton}</Tooltip>
  ) : (
    deleteButton
  );
}

export default ConfigureAccordion;
