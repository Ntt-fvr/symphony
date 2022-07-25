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
import ButtonFlowStatus from '../../../common/ButtonFlowStatus';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DialogModal from '../../view/dialogs/DialogModal';
import FlowHeader from './FlowHeader';
import IconButton from '@symphony/design-system/components/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuTopBar from './MenuTopBar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React, {useCallback, useState} from 'react';
import Strings from '@fbcnms/strings/Strings';
import ToolsBar from './ToolsBar';
import Tooltip from '../widgets/detailsPanel/inputs/Tooltip';
import fbt from 'fbt';
import {BLUE, DARK, GREEN} from '@symphony/design-system/theme/symphony';
import {
  CheckIcon,
  DuplicateFlowIcon,
  GridIcon,
  RedoIcon,
  UndoIcon,
} from '@symphony/design-system/icons';
import {TYPE as ForEachLoopType} from '../canvas/graph/facades/shapes/vertexes/logic/ForEachLoop';
import {Grid} from '@material-ui/core';
import {IconButton as MatIconButton} from '@material-ui/core';
import {POSITION} from '@symphony/design-system/components/Dialog/DialogFrame';
import {
  PREDICATES,
  useKeyboardShortcut,
} from '../widgets/keyboardShortcuts/KeyboardShortcutsContext';
import {TYPE as ParallelType} from '../canvas/graph/facades/shapes/vertexes/logic/Parallel';
import {makeStyles} from '@material-ui/styles';
import {resizeValidator} from './utils/helpers';
import {useCopyPaste} from '../widgets/copyPaste/CopyPasteContext';
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
  iconroot: {
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
  detailsContainer: {
    marginRight: '64px',
    marginLeft: '65px',
    marginTop: '64px',
    marginBottom: '250px',
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
  const [openModal, setOpenModal] = useState(false);

  const deleteSelected = useCallback(() => {
    if (selection.selectedLink) {
      return flow.removeConnector(selection.selectedLink);
    } else {
      const isCoupledBlocks = [...selection.selectedElements].find(
        block =>
          block.model.attributes.type === ParallelType ||
          block.model.attributes.type === ForEachLoopType,
      );
      if (isCoupledBlocks) {
        toggleModal();
      } else {
        const idParent = selection.selectedElements[0].model.idParent;
        if (idParent) {
          flow.removeBlocks([...selection.selectedElements]);
          resizeValidator(flow, idParent);
        } else {
          return flow.removeBlocks([...selection.selectedElements]);
        }
      }
    }
  }, [flow, selection]);
  useKeyboardShortcut(PREDICATES.del, deleteSelected);

  const deleteBlocks = useCallback(() => {
    const blockList = flow.getBlocks();
    const coupleBlockList = [...selection.selectedElements].filter(
      block =>
        block.model.attributes.type === ParallelType ||
        block.model.attributes.type === ForEachLoopType,
    );

    const isChildrenBlockList = blockList.filter(block =>
      coupleBlockList.find(
        coupleBlock => coupleBlock.id === block.model.attributes.parent,
      ),
    );

    const selectedElementList = [
      ...selection.selectedElements,
      ...isChildrenBlockList,
    ];

    toggleModal();
    flow.removeBlocks([...selectedElementList]);

    return enqueueSnackbar(`${fbt('The block has been removed!', '')}`, {
      variant: 'success',
    });
  }, [flow, selection, openModal]);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

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
    <>
      <ToolsBar className={classes.root}>
        <div className={classes.left}>
          <Tooltip tooltip={'Show Grid'}>
            <IconButton
              className={!isGrid ? classes.blue : null}
              skin={'inherit'}
              onClick={() => handleShowGrid()}
              icon={GridIcon}
            />
          </Tooltip>
          <Tooltip tooltip={'Undo'}>
            <IconButton
              className={classes.marginLeft}
              skin={'inherit'}
              icon={UndoIcon}
            />
          </Tooltip>
          <Tooltip tooltip={'Redo'}>
            <IconButton tooltip={'Redo'} skin={'inherit'} icon={RedoIcon} />
          </Tooltip>
        </div>
        <div className={classes.left}>
          {copyPaste.allowDuplicate && (
            <Tooltip tooltip={'Duplicate'}>
              <IconButton
                skin={'inherit'}
                icon={DuplicateFlowIcon}
                onClick={copyPaste.duplicate}
                disabled={!copyPaste.allowDuplicate}
              />
            </Tooltip>
          )}
          {!(
            selection.selectedElements.length === 0 && !selection.selectedLink
          ) && (
            <Tooltip tooltip={'Delete block'}>
              <IconButton
                skin={'inherit'}
                icon={DeleteOutlineIcon}
                onClick={deleteSelected}
                disabled={
                  selection.selectedElements.length === 0 &&
                  !selection.selectedLink
                }
              />
            </Tooltip>
          )}
        </div>

        <div className={classes.right}>
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
          <MenuTopBar
            name={flowData.flowDraft?.name || ''}
            description={flowData.flowDraft?.name || ''}
            editText="Here you can change the name and description of your workflow"
            duplicateText="Duplicating this workflow saves the same settings as the current workflow and will be available in the general list of workflows as a draft. Please assign a new name and description."
          />
          <Tooltip tooltip={'publish last saved version'}>
            <Button
              onClick={publish}
              disabled={isSaved() && flowData.hasPublish}
              className={flowData.hasPublish ? classes.publish : null}>
              {flowData.hasPublish ? 'Published' : 'Publish'}
            </Button>
          </Tooltip>
        </div>
      </ToolsBar>

      <DialogModal
        alertType={'info'}
        isOpen={openModal}
        handleOpenModal={toggleModal}
        handleBtnConfirmClicked={deleteBlocks}
        btnConfirmText={fbt('Continue', '')}
        title={fbt('Delete a complex block', '')}
        description={fbt(
          'All blocks it contains will also be deleted. Are you sure you want to continue?',
          '',
        )}
      />
    </>
  );
}

function ViewerTopBar() {
  const classes = useStyles();
  const selection = useGraphSelection();
  const selectionCount = selection.selectedElements.length;

  return (
    <ToolsBar className={classes.root}>
      <div className={classes.left}>
      <div className={classes.iconroot}>
          <Tooltip tooltip={``}>
            <IconButton skin={'inherit'} icon={ArrowBackIcon} />
          </Tooltip>
        </div>
        <div className={classes.iconroot}>
          <Tooltip tooltip={`View ${selectionCount == 0? 'Workflow' : 'Block'} Logs`}>
            <IconButton skin={'inherit'} icon={ListAltIcon} />
          </Tooltip>
        </div>
      </div>
      <div className={classes.right}>
        <Tooltip tooltip={'Edit flow status'}>
          <Button
            onClick={e => {
              e.preventDefault();
            }}>
            {'Edit Flow'}
          </Button>
        </Tooltip>
      </div>
    </ToolsBar>
  );
}
