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
import {DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import {Link, Route, BrowserRouter as Router, Switch} from 'react-router-dom';
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
  inline: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  iconContainer: {
    color: symphony.palette.B600,
    display: 'flex',
    flexShrink: 0,
    width: '6px',
    justifyContent: 'center',
    alignItems: 'center',
    ...symphony.typography,
  },

  boldText: {
    fontWeight: 'bold',
  },
  text: {
    color: '#4d4d4e',
  },
  network: {
    color: '#3984FF',
  },
  vendor: {
    color: '#4d4d4e',
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flexGrow: 1,
    marginRight: '30px',
  },
}));

function ConfigureAccordion(props: Props) {
  const {
    icon,
    entityName,
    instanceCount,
    instanceNamePlural,
    instanceNameSingular,
    name,
    onEdit,
    allowDelete,
    onDelete,
  } = props;
  const classes = useStyles();

  const editButtonPermissions: InventoryActionPermission = {
    entity: entityName,
    action: 'update',
  };

  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      justify="space-between"
      alignItems="center">
      <Grid>
        <div className={classes.inline}>
          <Text
            className={classNames(classes.text, classes.boldText)}
            variant="subtitle1">
            {name}
          </Text>
        </div>
      </Grid>
      <Grid className={classes.network}>
        <h3>Gestor_manager</h3>
      </Grid>
      <Grid className={classes.vendor}>
        <h3>Vendor_name</h3>
      </Grid>
      <Grid>
        <a href="https://www.youtube.com" className={classes.iconContainer}>
          {icon}
        </a>
      </Grid>
      <Grid>
        <div className={classes.actionButtons}>
          <DeleteButton />
        </div>
      </Grid>
    </Grid>
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
