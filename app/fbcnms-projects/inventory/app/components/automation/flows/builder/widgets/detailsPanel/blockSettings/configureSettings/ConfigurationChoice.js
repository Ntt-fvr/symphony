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
import FormAction from '@symphony/design-system/components/Form/FormAction';
import RulesList from '../../inputs/RulesList';
import RulesTableDispatcher from '../../inputs/context/rules/RulesTableDispatcher';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {PlusIcon} from '@symphony/design-system/icons';
import {useRulesReducer} from '../../inputs/context/rules/RulesTableState';

const ConfigurationChoice = (props: Props) => {
  const {block} = props;
  const [rules, rulesDispatcher] = useRulesReducer([]);

  return (
    <Grid container xs={12} spacing={2}>
      <RulesTableDispatcher.Provider value={rulesDispatcher}>
        <RulesList rules={rules} />
      </RulesTableDispatcher.Provider>
      <Grid item xs={12}>
        <FormAction>
          <Button
            variant="text"
            onClick={() => rulesDispatcher({type: 'ADD_PROPERTY_TYPE'})}
            leftIcon={PlusIcon}>
            <fbt desc="add rule">Add Rule</fbt>
          </Button>
          <Button
            variant="text"
            onClick={() => block.setConfiguration('holaaaaaaaa')}
            leftIcon={PlusIcon}>
            <fbt desc="save configuration">Save configuration</fbt>
          </Button>
        </FormAction>
      </Grid>
    </Grid>
  );
};

export default ConfigurationChoice;
