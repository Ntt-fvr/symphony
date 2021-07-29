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
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import {KqiAddItemForm} from './KqiAddItemForm';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '400px',
    height: '360px',
    padding: theme.spacing(0),
    border: '1px solid red',
  },
  header: {
    margin: '20px 0 24px 20px',
  },
  content: {
    width: 'auto',
    height: '220px',
  },
  containerIcon: {
    paddingBottom: '2rem',
  },
  icon: {
    fontSize: '60px',
    color: '#00AF5B',
  },
  addButton: {
    paddingTop: '2rem',
  },
}));

type Props = $ReadOnly<{|
  card_header: string,
  title: string,
  text_button: string,
  data_entry: string,
|}>;

const KqiSourceAddedSuccessfully = (props: Props) => {
  const {card_header, title, text_button, data_entry} = props;
  const classes = useStyles();
  const [returnForm, setReturnForm] = useState(false);

  function handleClick() {
    setReturnForm(true);
  }

  if (returnForm) {
    return (
      <>{data_entry == 'KQI Source' && <KqiAddItemForm dataValues={[]} />}</>
    );
  }
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
          <Clickable onClick={handleClick}>
            <AddButton textButton={text_button} />
          </Clickable>
        </Grid>
      </Grid>
    </Card>
  );
};
export default KqiSourceAddedSuccessfully;
