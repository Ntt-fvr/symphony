/*[object Object]*/
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: '10px',
    padding: '5px',
    marginRight: '50px',
    marginLeft: '40px',
    with: '114px',
    height: '28px',
  },
  label: {
    margin: '0px',
    padding: '0px',
    fontSize: '14px',
  },
  icon: {
    paddingLeft: '5px',
  },
});

function AddButton({textButton}) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleOutlineIcon className={classes.icon} />}>
        <h3 className={classes.label}>{textButton}</h3>
      </Button>
    </div>
  );
}
export default AddButton;
