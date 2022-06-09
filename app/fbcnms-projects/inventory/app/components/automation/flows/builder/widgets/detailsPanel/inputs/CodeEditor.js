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

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools.js';
import 'react-ace-builds/webpack-resolver-min';
import AceEditor from 'react-ace-builds';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  codeEditor: {
    border: `1px ${theme.palette.grey[400]} solid`,
    borderRadius: 4,
  },
  span: {
    fontSize: theme.typography.pxToRem(11),
    color: theme.palette.text.secondary,
  },
}));

type Props = $ReadOnly<{|
  mode: string,
  onChange: () => void,
  rule: RuleType,
  title?: string,
|}>;

const CodeEditor = (props: Props) => {
  const {mode, onChange, rule, title} = props;
  const classes = useStyles();

  return (
    <div>
      <span className={classes.span}>{title || 'Rule'}</span>
      <div className={classes.codeEditor}>
        <AceEditor
          mode={mode}
          value={rule?.value || ''}
          theme="tomorrow"
          onChange={onChange}
          fontSize={14}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={true}
          name="json-input"
          height="80px"
          width="240px"
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
