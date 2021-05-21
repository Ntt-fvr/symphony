import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  button: {}
}));

function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add formula
      </Button>
    </div>
  );
}
export default AddButton