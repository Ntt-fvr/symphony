/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {InventoryPolicy} from '../data/PermissionsPolicies';

import * as React from 'react';
import AppContext from '@fbcnms/ui/context/AppContext';
import PermissionsPolicyLocationDocumentCategoryRulesSection from './PermissionsPolicyLocationDocumentCategoryRulesSection';
// import PermissionsPolicyRulesSection from './PermissionsPolicyRulesSection';
import Switch from '@symphony/design-system/components/switch/Switch';
import classNames from 'classnames';
import fbt from 'fbt';
import {
  bool2PermissionRuleValue,
  permissionRuleValue2Bool,
} from '../data/PermissionsPolicies';
import {useCallback, useMemo, useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import RadioGroup from '@symphony/design-system/components/RadioGroup/RadioGroup';
import Select from '@symphony/design-system/components/Select/Select';
import Tokenizer from '@symphony/design-system/components/Token/Tokenizer';
import {makeStyles} from '@material-ui/styles';
import {useContext} from 'react';

export const ALL_TOKENS = [
  {key: '0', label: 'ATP'},
  {key: '1', label: 'Topología'},
  {key: '2', label: 'Site Folder'},
  {key: '3', label: 'Correo de notificación'},
  {key: '4', label: 'Archivos de TSS'},
  {key: '5', label: 'Archivos de simulación'},
];

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: '4px',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  readRule: {
    marginLeft: '4px',
  },
  section: {
    marginTop: '32px',
  },
  radioGroup: {
    marginLeft: '4px',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  radioGroupInline: {
    display: 'flex',
  },
  radioGroupInlineItem: {
    '&:nth-of-type(even)': {
      marginLeft: '8px',
    },
  },
  sectionHeader: {
    paddingTop: '16px',
    marginBottom: '16px',
    '&>span': {
      display: 'block',
    },
  },
  select: {
    maxWidth: '350px',
  },
}));

type Props = $ReadOnly<{|
  policy: ?InventoryPolicy,
  onChange?: InventoryPolicy => void,
  className?: ?string,
|}>;

export default function PermissionsPolicyInventoryDocumentRulesTab(
  props: Props,
) {
  const {policy, onChange, className} = props;
  const classes = useStyles();
  const {isFeatureEnabled} = useContext(AppContext);
  const userManagementDevMode = isFeatureEnabled('user_management_dev');

  if (policy == null) {
    return null;
  }

  const readAllowed = permissionRuleValue2Bool(policy.read.isAllowed);
  const isDisabled = onChange == null;

  const [selectedLocationValue, setSelectedLocationValue] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [tokens, setTokens] = useState([
    {
      key: '0',
      label: 'ATP',
    },
    {
      key: '1',
      label: 'Topología',
    },
    {
      key: '2',
      label: 'Site Folder',
    },
  ]);

  return (
    <div className={classNames(classes.root, className)}>
      {userManagementDevMode ? (
        <Switch
          className={classes.readRule}
          title={fbt('View inventory data', '')}
          checked={readAllowed}
          disabled={isDisabled}
          onChange={
            onChange != null
              ? checked =>
                  onChange({
                    ...policy,
                    read: {
                      isAllowed: bool2PermissionRuleValue(checked),
                    },
                  })
              : undefined
          }
        />
      ) : null}
      <PermissionsPolicyLocationDocumentCategoryRulesSection
        title={fbt('Locations', '')}
        subtitle={fbt(
          'Location data includes location details, properties, floor plans and coverage maps.',
          '',
        )}
        disabled={isDisabled || !readAllowed}
        locationRule={policy.location}
        documentRule={policy.documentCategory}
        className={classes.section}
        onChange={
          onChange != null
            ? documentCategory =>
                onChange({
                  ...policy,
                  documentCategory,
                })
            : undefined
        }
      />

      {/* <div className={classes.radioGroup}>
        <RadioGroup
          options={options}
          value={selectedValue}
          onChange={value => setSelectedValue(value)}
          className={classes.radioGroupInline}
          optionClassName={classes.radioGroupInlineItem}
        />
      </div>
      <div className={classes.radioGroup}>
        <Select
          className={classes.select}
          disabled={selectedValue == 'all' ? true : false}
          label="Location"
          options={locationTypes.map(location => ({
            key: location.id,
            label: location.name,
            value: location.id,
          }))}
          selectedValue={selectedLocationValue}
          size="full"
          onChange={value => setSelectedLocationValue(value)}
        />
      </div>
      <div className={classes.sectionHeader}>
        <Text variant="subtitle1">
          <fbt desc="">Documents</fbt>
        </Text>
        <Text variant="subtitle2" color="gray">
          <fbt desc="">
            Mauris vel turpis felis. Integer viverra ac lorem et rutrum.
          </fbt>
        </Text>
      </div>
      <div className="classes">
        <Tokenizer
          tokens={tokens}
          onTokensChange={setTokens}
          queryString={queryString}
          onQueryStringChange={setQueryString}
          dataSource={{
            fetchNetwork: _searchTerm => Promise.resolve(ALL_TOKENS),
          }}
        />
      </div> */}
    </div>
  );
}
