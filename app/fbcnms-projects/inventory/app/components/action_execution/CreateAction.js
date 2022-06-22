/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Breadcrumbs from '@fbcnms/ui/components/Breadcrumbs';
import ScheduledActionsTypes from './ScheduledActionsTypes';
import StepperAction from './StepperAction';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleModule: {
    margin: '0 0 40px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
export type Props = $ReadOnly<{|
  data?: any,
  closeForm?: () => void,
|}>;

const CreateAction = (props: Props) => {
  const {closeForm} = props;
  const classes = useStyles();
  const [
    returnScheduledActionsTypes,
    setReturnScheduledActionsTypes,
  ] = useState(false);
  const showScheduledActionsTypes = () => {
    setReturnScheduledActionsTypes(prevStateReturn => !prevStateReturn);
  };
  if (returnScheduledActionsTypes) {
    return <ScheduledActionsTypes />;
  }

  return (
    <div>
      <Grid className={classes.root} container spacing={0}>
        <Grid className={classes.titleModule} item xs={12}>
          <Breadcrumbs
            breadcrumbs={[
              {
                id: 'scheduledActions',
                name: fbt('Scheduled Actions', ''),
                onClick: () => showScheduledActionsTypes(),
              },
              true && {
                id: 'data.id',
                name: `${'data.id'}`,
              },
            ]}
            size="large"
          />
        </Grid>
        <Grid item xs={12}>
          <StepperAction
            returnSheduledAction={showScheduledActionsTypes}
            closeForm={closeForm}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export {CreateAction};
