/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import Button from '@symphony/design-system/components/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FlowBuilderButton from '../../utils/FlowBuilderButton';
import FlowHeader from './FlowHeader';
import IconButton from '@symphony/design-system/components/IconButton';
import MenuTopBar from './MenuTopBar';
import React, {useCallback, useState} from 'react';
import Strings from '@fbcnms/strings/Strings';
import ToolsBar from './ToolsBar';
import fbt from 'fbt';
import {BLUE, DARK, GREEN} from '@symphony/design-system/theme/symphony';
import {
  CheckIcon,
  DuplicateFlowIcon,
  GridIcon,
  RedoIcon,
  UndoIcon,
} from '@symphony/design-system/icons';
import {
  PREDICATES,
  useKeyboardShortcut,
} from '../widgets/keyboardShortcuts/KeyboardShortcutsContext';
import {SettingsIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {useCopyPaste} from '../widgets/copyPaste/CopyPasteContext';
import {useDetailsPane} from '../widgets/detailsPanel/DetailsPanelContext';
import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
import {useFlowData} from '../../data/FlowDataContext';
import {useGraph} from '../canvas/graph/graphAPIContext/GraphContext';
import {useGraphSelection} from '../widgets/selection/GraphSelectionContext';
import {useReadOnlyMode} from '../widgets/readOnlyModeContext';

const useStyles = makeStyles(() => ({
  root: {
    top: 0,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    zIndex: 1,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 8,
    '& div[class*="textVariant"]': {
      height: 'auto',
    },
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 8,
    '& div[class*="textVariant"]': {
      minHeight: 36,
      minWidth: 36,
      background:
        'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
      borderRadius: 4,
      color: DARK.D900,
      fill: DARK.D900,
      '&:hover': {
        color: BLUE.B600,
        fill: BLUE.B600,
        '& svg': {
          color: BLUE.B600,
        },
      },
    },
    '& span[class*="buttonText"]': {
      padding: 4,
    },
  },
  marginLeft: {
    marginLeft: '32px !important',
  },
  textVariant: {
    padding: '0 8px',
    color: DARK.D900,
    fill: DARK.D900,
    '&:hover': {
      color: BLUE.B600,
      fill: BLUE.B600,
      '& span': {
        color: BLUE.B600,
      },
    },
    width: 92,
    justifyContent: 'right',
    backgroundColor: 'rgb(210, 218, 231)',
  },
  blue: {
    color: BLUE.B600 + ' !important',
    fill: BLUE.B600 + ' !important',
  },
  publish: {
    backgroundColor: `${GREEN.G600} !important`,
  },
}));

export default function TopBar() {
  const {isReadOnly} = useReadOnlyMode();
  return isReadOnly ? ViewerTopBar() : BuilderTopBar();
}

function BuilderTopBar() {
  const classes = useStyles();
  const [isGrid, setIsGrid] = useState(false);

  const flow = useGraph();
  const selection = useGraphSelection();
  const flowData = useFlowData();
  const enqueueSnackbar = useEnqueueSnackbar();
  const copyPaste = useCopyPaste();
  const detailsPane = useDetailsPane();

  const deleteSelected = useCallback(() => {
    if (selection.selectedLink) {
      return flow.removeConnector(selection.selectedLink);
    } else {
      return flow.removeBlocks([...selection.selectedElements]);
    }
  }, [flow, selection]);
  useKeyboardShortcut(PREDICATES.del, deleteSelected);

  const save = useCallback(() => {
    flowData
      .save()
      .then(() => {
        enqueueSnackbar(`${fbt('Flow draft has been saved!', '')}`, {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(
          `${fbt(
            'There was an error when trying to save the flow draft.',
            '',
          )}`,
          {
            variant: 'error',
          },
        );
      });
  }, [enqueueSnackbar, flowData]);
  useKeyboardShortcut(PREDICATES.key('s'), save);

  const publish = useCallback(() => {
    flowData
      .publish()
      .then(() => {
        enqueueSnackbar(`${fbt('Flow has been published!', '')}`, {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar(
          `${fbt('There was an error when trying to publish the flow.', '')}`,
          {
            variant: 'error',
          },
        );
      });
  }, [enqueueSnackbar, flowData]);

  const handleShowGrid = () => {
    !isGrid ? flow.showGrid() : flow.hiddenGrid();
    setIsGrid(prev => {
      return !prev;
    });
  };

  const isSaved = () => !flowData.flowDraft?.id || !flowData.hasChanges;

  return (
    <ToolsBar className={classes.root}>
      <div className={classes.left}>
        <IconButton
          className={!isGrid ? classes.blue : null}
          tooltip={'Show Grid'}
          skin={'inherit'}
          onClick={() => handleShowGrid()}
          icon={GridIcon}
        />
        <IconButton
          className={classes.marginLeft}
          tooltip={'Undo'}
          skin={'inherit'}
          icon={UndoIcon}
        />
        <IconButton tooltip={'Redo'} skin={'inherit'} icon={RedoIcon} />
      </div>
      <div className={classes.left}>
        {copyPaste.allowDuplicate && (
          <IconButton
            tooltip={'Duplicate'}
            skin={'inherit'}
            icon={DuplicateFlowIcon}
            onClick={copyPaste.duplicate}
            disabled={!copyPaste.allowDuplicate}
          />
        )}
        {!(
          selection.selectedElements.length === 0 && !selection.selectedLink
        ) && (
          <IconButton
            tooltip={'Delete block'}
            skin={'inherit'}
            icon={DeleteOutlineIcon}
            onClick={deleteSelected}
            disabled={
              selection.selectedElements.length === 0 && !selection.selectedLink
            }
          />
        )}
      </div>

      <div className={classes.right}>
        <FlowBuilderButton icon={SettingsIcon} onClick={detailsPane.toggle} />
        <Button
          className={classes.textVariant}
          variant={'text'}
          skin={'inherit'}
          color={'secondary'}
          leftIcon={isSaved() ? CheckIcon : null}
          disabled={isSaved()}
          onClick={save}>
          {isSaved() ? 'Saved' : Strings.common.saveButton}
        </Button>
        <MenuTopBar />
        <Button
          onClick={publish}
          tooltip="publish last saved version"
          disabled={isSaved() && flowData.hasPublish}
          className={flowData.hasPublish ? classes.publish : null}>
          {flowData.hasPublish ? 'Published' : 'Publish'}
        </Button>
      </div>
    </ToolsBar>
  );
}

function ViewerTopBar() {
  const classes = useStyles();
  const detailsPane = useDetailsPane();

  return (
    <ToolsBar className={classes.root}>
      <div className={classes.left}>
        <FlowHeader />
      </div>
      <div className={classes.center} />
      <div className={classes.right}>
        <FlowBuilderButton icon={SettingsIcon} onClick={detailsPane.toggle} />
      </div>
    </ToolsBar>
  );
}
