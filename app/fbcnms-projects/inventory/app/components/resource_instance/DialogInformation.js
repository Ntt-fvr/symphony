/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
import type {FlowStartMutationVariables} from '../../mutations/__generated__/FlowStartMutation.graphql';

import FlowStartMutation from '../../mutations/FlowStartMutation';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {graphql} from 'relay-runtime';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  rootCard: {
    '&.root': {
      padding: '0px',
    },
  },
  dialogActions: {
    padding: '0 24px',
    marginBottom: '30px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  option: {
    width: '111px',
    height: '36px',
  },
}));

type Props = $ReadOnly<{|
  open?: boolean,
  onClose: () => void,
|}>;

const DialogInformationQuery = graphql`
  query DialogInformationQuery(
    $filterBy: [FlowFilterInput!]
    $filter: ResourceFilter
  ) {
    flows(filterBy: $filterBy) {
      edges {
        node {
          id
          name
          status
          newInstancesPolicy
          cmType
        }
        cursor
      }
    }
    queryResource(filter: $filter) {
      name
    }
  }
`;

const DialogInformation = (props: Props) => {
  const {onClose} = props;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const createdTime = moment(new Date()).format('YYYY-MM-DD[T]HH:mm:ssZ');
  const resourceId = urlParams.get('resource');

  const flowQuery = useLazyLoadQuery(DialogInformationQuery, {
    filterBy: [
      {
        filterType: 'FLOW_CM_TYPE',
        operator: 'IS',
        cmType: 'SYNC_PARAMETERS',
      },
    ],
    filter: {
      id: resourceId,
    },
  });

  const handleClick = () => {
    const data = {
      flowID: flowQuery.flows.edges[0].node.id,
      params: [
        {
          variableDefinitionKey: 'resourceName',
          value: flowQuery.queryResource[0].name,
        },
      ],
      startDate: createdTime,
    };

    const variables: FlowStartMutationVariables = {
      input: data,
    };
    FlowStartMutation(variables, {
      onCompleted: () => {
        onClose();
      },
    });
  };

  const classes = useStyles();
  return (
    <Dialog
      maxWidth="sm"
      open={true}
      onClose={onClose}
      fullWidth={true}
      className={classes.root}>
      <Card variant={'none'}>
        <Grid>
          <Card variant={'message'} className={classes.rootCard}>
            <Grid container direction="row">
              <Grid item xs={1}>
                <InfoOutlinedIcon color={'primary'} />
              </Grid>
              <Grid item xs={11}>
                <CardHeader>Information</CardHeader>
                <Text>
                  You will create a new version of configuration for this
                  resource. Are you sure you want to proceed?
                </Text>{' '}
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Card>
      <DialogActions className={classes.dialogActions}>
        <Button
          className={classes.option}
          variant="outlined"
          color="primary"
          onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleClick();
            // onClose();
          }}
          className={classes.option}
          variant="contained"
          color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogInformation;
