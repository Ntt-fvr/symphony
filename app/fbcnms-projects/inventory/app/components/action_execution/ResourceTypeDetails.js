/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import ConfigureTitle from './common/ConfigureTitle';
import React from 'react';
import fbt from 'fbt';
import {Grid} from '@material-ui/core';
import {TableAffectedResources} from './common/TableAffectedResources';
import {TableDetails} from './common/TableDetails';
import {TableLogs} from './common/TableLogs';
import {makeStyles} from '@material-ui/styles';

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
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '0 16px 0px ',
    },
  },
}));
export type Props = $ReadOnly<{|
  setOpenDetails: any,
  data: any,
|}>;

const ResourceTypeDetails = (props: Props) => {
  const {data} = props;
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.root} container spacing={0}>
        <Grid className={classes.titleModule} item xs={12}>
          <ConfigureTitle
            title={fbt('Execution/', '')}
            subtitle={fbt('', '  ')}
          />
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card className={classes.accordionDetails}>
              <CardHeader>Details</CardHeader>
              <TableDetails valuesTable={data} />
            </Card>
            <Card>
              <CardHeader>Logs</CardHeader>
              <TableLogs valuesTable={data} />
            </Card>
            <Card>
              <CardHeader>Affected Resources</CardHeader>
              <TableAffectedResources valuesTable={data} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export {ResourceTypeDetails};
