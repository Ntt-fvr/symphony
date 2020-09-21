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
import DetailsView, {getDetailsTitle} from './DetailsView';
import emptyFunction from '@fbcnms/util/emptyFunction';
import {POSITION} from '@symphony/design-system/components/Dialog/DialogFrame';
import {makeStyles} from '@material-ui/styles';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useDialogShowingContext} from '@symphony/design-system/components/Dialog/DialogShowingContext';
import {useGraph} from '../../canvas/graph/GraphContext';
import {useGraphSelection} from '../selection/GraphSelectionContext';

const useStyles = makeStyles(() => ({
  detailsContainer: {
    marginRight: '16px',
    marginTop: '64px',
    marginBottom: '16px',
  },
}));

export type DetailsPanelContextType = {
  isShown: boolean,
  show: () => void,
  hide: () => void,
  toggle: () => void,
};

const DetailsPanelContextDefaults = {
  isShown: false,
  show: emptyFunction,
  hide: emptyFunction,
  toggle: emptyFunction,
};

const DetailsPanelContext = React.createContext<DetailsPanelContextType>(
  DetailsPanelContextDefaults,
);

type Props = {|
  children: React.Node,
|};

export function DetailsPanelContextProvider(props: Props) {
  const classes = useStyles();
  const flow = useGraph();
  const selection = useGraphSelection();
  const dialogShowingContext = useDialogShowingContext();

  const [isShown, setIsShown] = useState(false);

  const show = useCallback(() => {
    setIsShown(true);
  }, []);
  const hide = useCallback(() => {
    setIsShown(false);
  }, []);
  const toggle = useCallback(() => {
    setIsShown(isShownValue => !isShownValue);
  }, []);

  useEffect(() => {
    if (selection.selectedElements.length === 0) {
      hide();
    } else {
      show();
    }
  }, [selection.selectedElements, show, hide]);

  useEffect(() => {
    if (isShown) {
      dialogShowingContext.showDialog(
        {
          title: getDetailsTitle(selection),
          className: classes.detailsContainer,
          children: <DetailsView flowSelection={selection} />,
          showCloseButton: false,
          position: POSITION.right,
          isModal: false,
        },
        true,
      );
    } else {
      if (dialogShowingContext.isShown) {
        dialogShowingContext.hideDialog();
      }
    }
  }, [
    classes.detailsContainer,
    dialogShowingContext,
    isShown,
    flow,
    selection,
  ]);

  return (
    <DetailsPanelContext.Provider
      value={{
        isShown,
        show,
        hide,
        toggle,
      }}>
      {props.children}
    </DetailsPanelContext.Provider>
  );
}

export function useDetailsPane() {
  return useContext(DetailsPanelContext);
}

export default DetailsPanelContext;
