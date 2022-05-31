/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ArchiveDeleteDialog from '../../view/dialogs/ArchiveDeleteDialog';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditFlowDialog from '../../view/dialogs//EditFlowDialog';
import IconButton from '@symphony/design-system/components/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, {useState} from 'react';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import SingleActionDialog from '../../view/dialogs/SingleActionDialog';
import Text from '@symphony/design-system/components/Text';
import Tooltip from '../widgets/detailsPanel/inputs/Tooltip';
import fbt from 'fbt';
import {BLUE, DARK} from '@symphony/design-system/theme/symphony';
import {Divider} from '@material-ui/core';
import {DuplicateFlowIcon, EditFlowIcon} from '@symphony/design-system/icons';
import {makeStyles} from '@material-ui/styles';
import {withStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
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
}));

const StyledMenu = withStyles({
  paper: {
    background:
      'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
    boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.15)',
    borderRadius: 4,
    padding: '0px 0px',
    minWidth: 172,
    marginTop: 6,
    '& .MuiList-padding': {
      padding: '5px 0',
    },
    '&.MuiPaper-root ': {
      padding: 0,
    },
    '& .MuiDivider-root': {
      margin: '6px 16px',
      backgroundColor: DARK.D50,
    },
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles({
  root: {
    '&:hover': {
      backgroundColor: '#eaedf2',
    },
    '&.MuiMenuItem-root': {
      padding: '8px 16px',
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
    },
    '& .MuiListItemText-root': {
      marginLeft: 12,
    },
    '& .MuiListItemText-primary': {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '14px',
    },
  },
})(MenuItem);

type Props = $ReadOnly<{|
  icon?: any,
  name?: ?string,
  description?: ?string,
  editText?: string,
  duplicateText?: string,
|}>;

export default function CustomizedMenus({
  icon,
  name,
  description,
  editText,
  duplicateText,
}: Props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalConfig, setModalConfig] = useState({
    activeModal: '',
    openModal: false,
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = modal => {
    setAnchorEl(null);
    setModalConfig({
      activeModal: modal,
      openModal: true,
    });
  };

  const handleCLoseModal = () => {
    setModalConfig({openModal: false});
  };

  const {activeModal, openModal} = modalConfig;

  return (
    <div className={classes.root}>
      <Tooltip tooltip={'More Actions'}>
        <IconButton
          skin={'inherit'}
          onClick={handleClick}
          icon={icon ? icon : MoreHorizIcon}
        />
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem onClick={() => handleOpenModal('edit')}>
          <ListItemIcon>
            <EditFlowIcon />
          </ListItemIcon>
          <ListItemText primary="Edit flow" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleOpenModal('duplicate')}>
          <ListItemIcon>
            <DuplicateFlowIcon />
          </ListItemIcon>
          <ListItemText primary="Duplicate flow" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem onClick={() => handleOpenModal('archive')}>
          <ListItemIcon>
            <ArchiveOutlinedIcon color={'secondary'} />
          </ListItemIcon>
          <ListItemText primary="Archive flow" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleOpenModal('delete')}>
          <ListItemIcon>
            <DeleteOutlineIcon color={'secondary'} />
          </ListItemIcon>
          <ListItemText primary="Delete flow" />
        </StyledMenuItem>
      </StyledMenu>
      {activeModal === 'archive' && (
        <ArchiveDeleteDialog
          icon={<ArchiveOutlinedIcon />}
          openModal={() => handleCLoseModal()}
          isOpen={openModal}
          activeModal={activeModal}
          text={
            <Text variant="subtitle1">
              <fbt desc="">
                Are you sure you want to archive the current flow?{' '}
                <span style={{fontWeight: 'bold'}}>
                  The flows that were started will finish running, but new flows
                  can no longer be instantiated.
                </span>
              </fbt>
            </Text>
          }
        />
      )}
      {activeModal === 'delete' && (
        <ArchiveDeleteDialog
          icon={<ReportProblemOutlinedIcon />}
          openModal={() => handleCLoseModal()}
          isOpen={openModal}
          activeModal={activeModal}
          text={
            <Text variant="subtitle1">
              <fbt desc="">
                Are you sure you want to delete the current flow?{' '}
                <span style={{fontWeight: 'bold'}}>
                  This option cannot be undone
                </span>
              </fbt>
            </Text>
          }
        />
      )}
      {activeModal === 'edit' && (
        <EditFlowDialog
          isOpen={openModal}
          openModal={() => handleCLoseModal()}
          text={editText}
          name={name ? name : ''}
          description={description ? description : ''}
        />
      )}
      {activeModal === 'duplicate' && (
        <EditFlowDialog
          isOpen={openModal}
          openModal={() => handleCLoseModal()}
          text={duplicateText}
          name={name ? name : ''}
          description={description ? description : ''}
        />
      )}
    </div>
  );
}
