/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import useKeyboardShortcut from './useKeyboardShortcut';

const useKeyboardToggle = (
  predicate: KeyboardEvent => boolean,
  callbackOn: () => void,
  callbackOff: () => void,
) => {
  useKeyboardShortcut(predicate, callbackOn, 'keydown');
  useKeyboardShortcut(predicate, callbackOff);
};

export default useKeyboardToggle;
