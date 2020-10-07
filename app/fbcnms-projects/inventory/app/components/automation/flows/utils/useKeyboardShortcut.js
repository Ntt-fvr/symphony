/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import {useCallback, useEffect} from 'react';

export const KEY_CODES = {
  SPACE: 32,
};

export const COMMON_PREDICATES = {
  spaceIsPressed: (args: KeyboardEvent) => args.keyCode === KEY_CODES.SPACE,
};

type KeyboardEvents = 'keydown' | 'keyup';

const useKeyboardShortcut = (
  predicate: KeyboardEvent => boolean,
  callback: () => void,
  event?: KeyboardEvents,
) => {
  const eventName: KeyboardEvents = event ?? 'keyup';
  const documentBody = document.getElementsByTagName('body')[0];

  const checkPredicateAndFire = useCallback(
    (args: KeyboardEvent) => {
      if (predicate(args)) {
        callback();
      }
    },
    [callback, predicate],
  );

  useEffect(() => {
    documentBody.addEventListener(eventName, checkPredicateAndFire);

    return () => {
      documentBody.removeEventListener(eventName, checkPredicateAndFire);
    };
  }, [event, documentBody, checkPredicateAndFire, eventName]);
};

export default useKeyboardShortcut;
