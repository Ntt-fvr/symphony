/*[object Object]*/
// eslint-disable-next-line header/header
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    padding: '0 9px',
    with: '121px',
    height: '32px',
  },
  label: {
    marginLeft: '10px',
    padding: '0px',
    fontSize: '14px',
  },
  icon: {
    paddingLeft: '0px',
    margin: '0px',
  },
});

function AddButton({textButton}) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        weight="bold"
        className={classes.button}
        startIcon={<AddCircleOutlineIcon className={classes.icon} />}>
        <Text className={''} color="primary" variant="subtitle2">
          {textButton}
        </Text>
      </Button>
    </div>
  );
}
export default AddButton;
