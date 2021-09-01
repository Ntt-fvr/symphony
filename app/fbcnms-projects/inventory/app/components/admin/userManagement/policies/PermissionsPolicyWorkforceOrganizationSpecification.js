/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import FormField from '@symphony/design-system/components/FormField/FormField';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import fbt from 'fbt';
import {Chip, FormControl, Select} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import type {Organization} from '../data/Organizations';

import {
  PERMISSION_RULE_VALUES,
  WorkforcePolicy,
} from '../data/PermissionsPolicies';

import symphony from '@symphony/design-system/theme/symphony';
import {Checkbox, ListItemText, MenuItem} from '@material-ui/core';
import {useOrganizations} from '../data/Organizations';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    paddingBottom: '8px',
    backgroundColor: symphony.palette.background,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: symphony.palette.D100,
    borderLeftWidth: '2px',
    borderLeftColor: symphony.palette.primary,
    borderRadius: '2px',
    marginTop: '12px',
  },
  methodSelectionBox: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    marginBottom: '16px',
    '& > *': {
      marginBottom: '4px',
    },
  },
  orgSelection: {
    borderWidth: '1px !important',
    borderStyle: 'solid',
    borderColor: symphony.palette.D100,
    backgroundColor: symphony.palette.white,
    borderRadius: '5px',
    boxShadow: 'none',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 2,
  },
}));

type Props = $ReadOnly<{|
  policy: ?WorkforcePolicy,
  defaultOrganization?: Organization,
  disabled?: ?boolean,
  onChange?: WorkforcePolicy => void,
|}>;

const PermissionsPolicyWorkforceOrganizationSpecification = (props: Props) => {
  const {disabled, onChange, policy} = props;
  const organizationOptions = useOrganizations().map((org: Organization) => ({
    value: org.id,
    label: org.name,
    key: org.id,
  }));

  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setSelectedOrganizations(policy?.read.organizationIds || []);
  }, [policy]);

  const handleOnChange = useCallback(event => {
    const newOrganization = event.target.value;
    updateReadRuleOrganization(newOrganization);
  });

  const updateReadRuleOrganization = organizationIds => {
    policy &&
      onChange({
        ...policy,
        read: {
          ...policy.read,
          organizationIds,
        },
      });
  };
  return (
    <div className={classes.container}>
      <div className={classes.methodSelectionBox}>
        <Text>
          {
            <fbt desc="">
              Select different organizations from whick you can view work orders
            </fbt>
          }
        </Text>
        <FormField>
          <FormControl variant="outlined">
            <Select
              displayEmpty={true}
              disabled={disabled}
              className={classes.orgSelection}
              multiple
              value={selectedOrganizations}
              onChange={handleOnChange}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => {
                    const selectedOption = organizationOptions.find(
                      opt => opt.value === value,
                    );

                    return (
                      <Chip
                        key={value}
                        label={selectedOption?.label}
                        className={classes.chip}
                      />
                    );
                  })}
                </div>
              )}>
              {organizationOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Checkbox
                    checked={selectedOrganizations.includes(opt.value)}
                  />
                  <ListItemText primary={opt.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormField>
      </div>
    </div>
  );
};

export default PermissionsPolicyWorkforceOrganizationSpecification;
