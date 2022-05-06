/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools.js';
import 'react-ace-builds/webpack-resolver-min';
import AceEditor from 'react-ace-builds';
import React from 'react';

type Props = $ReadOnly<{|
  mode: string,
|}>;

const CodeEditor = (props: Props) => {
  const {mode} = props;
  const onChange = newValue => {
    console.log('newValue', newValue);
  };

  return (
    <>
      <AceEditor
        mode={mode}
        theme="tomorrow"
        onChange={onChange}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        name="json-input"
        height="100px"
        width="200px"
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </>
  );
};
export default CodeEditor;
