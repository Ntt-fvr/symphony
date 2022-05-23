/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {RuleType} from './context/rules/RuleType';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CodeEditor from './CodeEditor';
import FormAction from '@symphony/design-system/components/Form/FormAction';
import FormField from '@symphony/design-system/components/FormField/FormField';
import IconButton from '@symphony/design-system/components/IconButton';
import React, {useContext, useState} from 'react';
import RulesTableDispatcher from './context/rules/RulesTableDispatcher';
import TableCell from '@material-ui/core/TableCell';
import TextFieldCustom from './TextField';
import {CloseIcon, DeleteIcon, EditIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  row: {
    borderBottom: '0px',
    padding: '4px',
  },
  accordionDetails: {
    padding: '0px 16px',
  },
}));

type Props = $ReadOnly<{|
  rule: RuleType,
  label?: string,
|}>;

const Rule = (props: Props) => {
  const classes = useStyles();
  const {rule, label} = props;

  const [expand, setExpand] = useState(false);
  const dispatch = useContext(RulesTableDispatcher);
  const toggleAccordion = () => {
    setExpand(prev => !prev);
  };

  const getExpandIcon = () => {
    return <IconButton skin="primary" icon={expand ? CloseIcon : EditIcon} />;
  };

  return (
    <Accordion expanded={expand}>
      <AccordionSummary
        expandIcon={getExpandIcon()}
        aria-controls="panel1a-content"
        IconButtonProps={{
          onClick: toggleAccordion,
        }}>
        <FormField>
          <TextFieldCustom
            label={label}
            value={rule.name}
            handleInputChange={({target}) =>
              dispatch({
                type: 'UPDATE_RULE_NAME',
                id: rule.id,
                name: target.value,
              })
            }
          />
        </FormField>
        {!rule.isDefault && (
          <TableCell align="center" component="div" className={classes.row}>
            <FormAction>
              <IconButton
                skin="primary"
                icon={DeleteIcon}
                onClick={() =>
                  dispatch({
                    type: 'DELETE_RULE',
                    id: rule.id,
                  })
                }
              />
            </FormAction>
          </TableCell>
        )}
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <CodeEditor
          mode="javascript"
          rule={rule}
          onChange={newRule =>
            dispatch({
              type: 'UPDATE_RULE_VALUE',
              id: rule.id,
              rule: newRule,
            })
          }
        />
      </AccordionDetails>
    </Accordion>
  );
};
export default Rule;
