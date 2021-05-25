
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
label:{
    margin:'0px',
    padding:'100%',
  },

})

function SwitchLabels() {
  const [state, setState] = React.useState({
    checked: true,
    
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

    const classes= useStyles();
  return (     
    <Switch
      checked={state.checked}
      onChange={handleChange}
      name="checked"
      color="primary"
    />    
  );
}
export default  SwitchLabels