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
  CUDPermissions,
  LocationCUDPermissions,
  InventoryPolicy,
  DocumentCRUDPermissions,
} from '../data/PermissionsPolicies';
import type {PermissionsPolicyRulesSectionDisplayProps} from './PermissionsPolicyRulesSection';

import React from 'react';
import PermissionsPolicyLocationSelectRulesSpecification from './PermissionsPolicyLocationSelectRulesSpecification';
import PermissionsPolicySelectRulesSection from './PermissionsPolicySelectRulesSection';
import symphony from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';
import {useCallback, useMemo} from 'react';

const useStyles = makeStyles(() => ({
  secondLevelBox: {
    backgroundColor: symphony.palette.background,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: symphony.palette.D100,
    borderLeftWidth: '2px',
    borderLeftColor: symphony.palette.primary,
    paddingLeft: '22px',
    paddingTop: '16px',
    paddingBottom: '10px',
    borderRadius: '2px',
    marginTop: '8px',
  },
}));

type Props = $ReadOnly<{|
  ...PermissionsPolicyRulesSectionDisplayProps,
  locationRule: LocationCUDPermissions,
  documentRule: DocumentCRUDPermissions,
  onChange?: DocumentCRUDPermissions => void,
|}>;

const PermissionsPolicyLocationDocumentCategoryRulesSection = (
  props: Props,
) => {
  const {
    locationRule,
    onChange,
    documentRule,
    disabled,
    ...permissionsPolicyRulesSectionDisplayProps
  } = props;
  const classes = useStyles();

  const rule: DocumentCRUDPermissions = useMemo(
    () => ({
      locationTypeID: documentRule.locationTypeID,
      create: documentRule.create,
      read: documentRule.read,
      update: documentRule.update,
      delete: documentRule.delete,
    }),
    [
      documentRule.create,
      documentRule.delete,
      documentRule.update,
      documentRule.locationTypeID,
      documentRule.read?.isAllowed,
    ],
  );

  //TODO: verificar si es update rule o read rule
  const callOnChange = useCallback(
    (updatedRule: DocumentCRUDPermissions) => {
      if (onChange == null) {
        return;
      }
      onChange(updatedRule);
    },
    [onChange],
  );

  // const callOnChangeWithCUDPermissions = useCallback(
  //   (readRule: DocumentCRUDPermissions) => {
  //     callOnChange({
  //       ...documentRule,
  //       ...readRule,
  //       locationTypeID: readRule.locationTypeID,
  //       read: {
  //         ...documentRule.update,
  //         ...readRule.update,
  //       },
  //     });
  //   },
  //   [documentRule, callOnChange],
  // );
  const callOnChangeWithCUDPermissions = useCallback(
    (readRule: DocumentCRUDPermissions) => {
      console.log('pepe');
      console.log(readRule);
    },
    [documentRule, callOnChange],
  );

  return (
    <PermissionsPolicySelectRulesSection
      rule={rule}
      onChange={callOnChangeWithCUDPermissions}
      secondLevelRulesClassName={classes.secondLevelBox}
      policySpecifications={
        <PermissionsPolicyLocationSelectRulesSpecification
          locationRule={locationRule}
          documentRule={documentRule}
          onChange={callOnChange}
          disabled={disabled}
          className={classes.secondLevelBox}
        />
      }
      // disabled={disabled}
      {...permissionsPolicyRulesSectionDisplayProps}
    />
  );
};

export default PermissionsPolicyLocationDocumentCategoryRulesSection;
