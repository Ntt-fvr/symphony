/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {
  BasicPermissionRule,
  CUDPermissions,
  DocumentCRUDPermissions,
} from '../data/PermissionsPolicies';

import * as React from 'react';
import HierarchicalCheckbox, {
  HIERARCHICAL_RELATION,
} from '../utils/HierarchicalCheckbox';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import fbt from 'fbt';
import {
  bool2PermissionRuleValue,
  permissionRuleValue2Bool,
} from '../data/PermissionsPolicies';
import {makeStyles} from '@material-ui/styles';
import {useCallback, useEffect, useState} from 'react';

const useStyles = makeStyles(() => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: '4px',
    marginLeft: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  rule: {
    marginTop: '8px',
    marginLeft: '4px',
  },
  dependantRules: {
    marginLeft: '34px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

type CUDPermissionsKey = $Keys<CUDPermissions>;
type DocumentCRUDPermissionsKey = $Keys<DocumentCRUDPermissions>;

type InventoryDataRuleProps = $ReadOnly<{|
  title: React.Node,
  rule: DocumentCRUDPermissions,
  cudAction: string & DocumentCRUDPermissionsKey,
  disabled: boolean,
  onChange: BasicPermissionRule => void,
  children?: React.Node,
  childrenClassName?: ?string,
|}>;

function InventoryDataRule(props: InventoryDataRuleProps) {
  const {
    title,
    rule,
    cudAction,
    disabled,
    onChange,
    childrenClassName,
    children,
  } = props;
  const classes = useStyles();

  if (rule == null) {
    return null;
  }

  return (
    <HierarchicalCheckbox
      id={cudAction}
      title={title}
      disabled={disabled}
      value={permissionRuleValue2Bool(rule[cudAction].isAllowed)}
      onChange={checked =>
        onChange({
          isAllowed: bool2PermissionRuleValue(checked),
        })
      }
      hierarchicalRelation={HIERARCHICAL_RELATION.PARENT_REQUIRED}
      className={classes.rule}
      childrenClassName={childrenClassName}>
      {children}
    </HierarchicalCheckbox>
  );
}

type DataRuleTitleProps = $ReadOnly<{|
  children: React.Node,
|}>;

export function DataRuleTitle(props: DataRuleTitleProps) {
  const {children} = props;
  return (
    <Text variant="subtitle2" color="inherit">
      {children}
    </Text>
  );
}

export type PermissionsPolicyRulesSectionDisplayProps = $ReadOnly<{|
  title?: React.Node,
  subtitle?: React.Node,
  mainCheckHeaderPrefix?: React.Node,
  disabled?: ?boolean,
  className?: ?string,
  secondLevelRulesClassName?: ?string,
  children?: React.Node,
|}>;

type Props = $ReadOnly<{|
  ...PermissionsPolicyRulesSectionDisplayProps,
  rule: DocumentCRUDPermissions,
  onChange?: DocumentCRUDPermissions => void,
  secondLevelRulesClassName?: ?string,
  policySpecifications?: React.Node,
|}>;

export default function PermissionsPolicySelectRulesSection(props: Props) {
  const {
    title,
    subtitle,
    mainCheckHeaderPrefix,
    rule: ruleProp,
    policySpecifications,
    disabled,
    className,
    secondLevelRulesClassName,
    onChange,
    children,
  } = props;
  const classes = useStyles();
  const [rule, setRule] = useState<DocumentCRUDPermissions>(ruleProp);
  useEffect(() => setRule(ruleProp), [ruleProp]);

  if (rule == null) {
    return null;
  }
  return (
    <div className={classNames(classes.section, className)}>
      <div className={classes.header}>
        <Text variant="subtitle1">{title}</Text>
        <Text variant="body2" color="gray">
          {subtitle}
        </Text>
      </div>
      {policySpecifications}
    </div>
  );
}
