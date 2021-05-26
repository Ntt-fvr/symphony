import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Text from '@symphony/design-system/components/Text';

const useStyles = makeStyles({
  button: {
    padding:'0 9px',
    with:'121px',
    height:'32px',
  },
  label:{
    marginLeft:'10px',
    padding: '0px',
    fontSize:'14px',
  },
  icon:{
    paddingLeft:'0px',
    margin:'0px'
  },

});


function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        weight='bold'
        className={classes.button}
        startIcon={<AddCircleOutlineIcon className={classes.icon} />}
      >
      <Text
          className={''}
          color='primary'
          variant='subtitle2'>
          {'Add formula'}
        </Text>
        
      </Button>
    </div>
  );
};
export default AddButton;


