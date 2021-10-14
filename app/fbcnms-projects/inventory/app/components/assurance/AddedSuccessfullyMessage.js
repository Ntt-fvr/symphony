/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import AddButton from './common/AddButton';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Clickable from '@symphony/design-system/components/Core/Clickable';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '400px',
    height: '611px',
    padding: theme.spacing(0),
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  content: {
    width: 'auto',
    height: '450px',
  },
  containerIcon: {
    paddingBottom: '2rem',
  },
  icon: {
    fontSize: '60px',
    color: '#00AF5B',
  },
  addButton: {
    paddingTop: '9rem',
  },
}));

type Props = $ReadOnly<{|
  card_header: string,
  title: string,
  text_button: string,
  setReturn: void => void,
|}>;

const AddedSuccessfullyMessage = (props: Props) => {
  const {card_header, title, text_button, setReturn} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}>{card_header}</CardHeader>
      <Grid
        container
        className={classes.content}
        direction="column"
        justify="center"
        alignItems="center">
        <Grid className={classes.containerIcon}>
          <CheckCircleOutlineOutlinedIcon className={classes.icon} />
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Text variant="h6">{title} added</Text>
          <Grid>
            <Text variant="h6">successfully</Text>
          </Grid>
        </Grid>
        <Grid className={classes.addButton}>
          <Clickable onClick={setReturn}>
            <AddButton textButton={text_button} disabled={false} />
          </Clickable>
        </Grid>
      </Grid>
    </Card>
  );
};
export default AddedSuccessfullyMessage;
