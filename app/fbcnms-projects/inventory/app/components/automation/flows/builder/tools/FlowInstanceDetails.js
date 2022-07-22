import React, {useState} from "react";
import ButtonFlowStatus from '../../../common/ButtonFlowStatus';
import IconButton from '@symphony/design-system/components/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Grid} from '@material-ui/core';
import {IconButton as MatIconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FlowStatus} from '../../../common/FlowStatusEnums'


const useStyles = makeStyles(() => ({ 
  center: {
    alignSelf: 'center',
  },
}))

const toPascalCase = name => {
  return name.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};
export default function FlowInstanceDetails(){
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(null);
  const data ={status: FlowStatus.paused}
   const handleClick = event => {
    setMenuOpen(event.currentTarget);
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

    return (
        <div>
          <Grid container spacing={0}>
            <Grid item container xs={12}>
              <Grid item xs={5} className={classes.center}>
                <b>Status</b>
              </Grid>
              <Grid item xs={7}>
                <ButtonFlowStatus
                  className={data.status}
                  skin={toPascalCase(data.status)}>
                  {data.status}
                </ButtonFlowStatus>
                <MatIconButton
                  skin={'inherit'}
                  icon={MoreVertIcon}
                  onClick={e => {
                    e.preventDefault();
                    handleClick(e);
                  }}
                  disabled={
                    data.status != FlowStatus.paused &&
                    data.status != FlowStatus.running &&
                    data.status != FlowStatus.failing
                  }>
                  <MoreVertIcon />
                </MatIconButton>
                <Menu
                  anchorEl={menuOpen}
                  keepMounted
                  open={Boolean(menuOpen)}
                  onClose={() => handleClose()}>
                  <MenuItem onClick={() => handleClose()}>{'Resume'}</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}>
                    Cancel{' '}
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <b>Flow template</b>
              </Grid>
              <Grid item xs={6}>
                Flow 1
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <b>Date created</b>
              </Grid>
              <Grid item xs={6}>
                {''}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={6}>
                <b>Author</b>
              </Grid>
              <Grid item xs={6}>
                {''}
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
}