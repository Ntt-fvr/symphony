
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function SwitchLabels() {
  const [state, setState] = React.useState({
    checked: true,
    
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      
      <FormControlLabel
        control={
          <Switch
            checked={state.checked}
            onChange={handleChange}
            name="checked"
            color="primary"
          />
        }
      />

    </FormGroup>
  );
}
export default  SwitchLabels