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
import AddCounterItemForm from './AddCounterItemForm';
import AddKpiItemForm from './AddKpiItemForm';
import AddThresholdItemForm from './AddThresholdItemForm';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Clickable from '@symphony/design-system/components/Core/Clickable';
import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
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

type Node = {
  node: {
    name: string,
  },
};

type Kpi = {
  node: {
    name: string,
    kpi: {
      name: string,
      id: string,
    },
  },
};

type Props = $ReadOnly<{|
  card_header: string,
  title: string,
  text_button: string,
  data_entry: string,
  names?: Array<Node>,
  thresholdNames?: Array<Kpi>,
|}>;

const AddedSuccessfullyMessage = (props: Props) => {
  const {
    card_header,
    title,
    text_button,
    data_entry,
    names,
    thresholdNames,
  } = props;
  const classes = useStyles();
  const [returnForm, setReturnForm] = useState(false);

  function handleClick() {
    setReturnForm(true);
  }

  if (returnForm) {
    return (
      <>
        {(data_entry === 'kpi' && <AddKpiItemForm kpiNames={names} />) ||
          (data_entry === 'threshold' && (
            <AddThresholdItemForm thresholdNames={thresholdNames} />
          )) ||
          (data_entry === 'counter' && (
            <AddCounterItemForm counterNames={names} />
          ))}
      </>
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
            <AddButton textButton={text_button} disabled={false} />
          </Clickable>
        </Grid>
      </Grid>
    </Card>
  );
};
export default AddedSuccessfullyMessage;
