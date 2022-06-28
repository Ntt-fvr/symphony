/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import ButtonAlarmStatus from './common/ButtonAlarmStatus';
import ButtonSaveDelete from './common/ButtonSaveDelete';
import CommentsActivitiesBox from '../comments/CommentsActivitiesBox';
import ConfigureTitle from './common/ConfigureTitle';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {CardAccordion} from './common/CardAccordion';
import {CardSuggested} from './common/CardSuggested';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {TableResource} from './common/TableResource';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from '../assurance/common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';

const valuesTable = [
  {
    resource: 'RNCellDU_Nokia_MLN1_3132331',
    parameter: 'arfcndu1',
    currentValue: '3960001',
    newValue: '183001',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132332',
    parameter: 'arfcndu2',
    currentValue: '3960002',
    newValue: '183002',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu3',
    currentValue: '3960003',
    newValue: '183003',
  },
  {
    resource: 'RNCellDU_Nokia_MLN1_3132333',
    parameter: 'arfcndu4',
    currentValue: '3960004',
    newValue: '183004',
  },
];

const status = ['Approve', 'Reject'];

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
  buttonDelete: {
    marginRight: '24px',
  },
  buttonStatus: {
    height: '38px',
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '0 16px 0px ',
    },
  },
  listComment: {
    '& .MuiAccordionDetails-root': {
      padding: '0 0 16px 0',
      width: '100%',
    },
  },
  inExpandingPanelFix: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  commentsLog: {
    maxHeight: '400px',
  },
}));

const ChangeRequest = graphql`
  query ChangeRequestDetailsQuery(
    $filterBy: [ResourceSpecificationFilterInput!]
    $filter: ChangeRequestFilter
  ) {
    queryChangeRequest(filter: $filter) {
      description
      id
      source
      status
      type
      requester
      items {
        id
        parameterType {
          id
          name
          stringValue
          type
          resourceSpecification
          parameters {
            id
            stringValue
            intValue
          }
        }
        resource {
          id
          name
          resourceSpecification
        }
        stringValue
      }
    }
    resourceSpecifications(filterBy: $filterBy) {
      edges {
        node {
          id
          name
          resourceType {
            id
            name
          }
        }
      }
    }
  }
`;

export type Props = $ReadOnly<{|
  setOpenDetails: any,
  idChangeRequest: string,
|}>;

const ChangeRequestDetails = (props: Props) => {
  const {setOpenDetails, idChangeRequest} = props;

  const stringCapitalizeFisrt = string => {
    const convertString = string.toLowerCase();

    return convertString.charAt(0).toUpperCase() + convertString.slice(1);
  };
  const classes = useStyles();
  const response = useLazyLoadQuery<ChangeRequestDetailsQuery>(ChangeRequest, {
    filter: {
      id: idChangeRequest,
    },
  });

  const filterChangeRequest = response?.queryChangeRequest?.find(
    itemChRq => itemChRq?.id === idChangeRequest,
  );

  const rs = filterChangeRequest?.items.map(
    itemRS => itemRS?.parameterType?.resourceSpecification,
  );
  const te = rs[0].toString();

  const response2 = useLazyLoadQuery<ChangeRequestDetailsQuery>(ChangeRequest, {
    filterBy: [
      {
        filterType: 'ID',
        operator: 'IS_ONE_OF',
        idSet: [te],
      },
    ],
    filter: {
      id: idChangeRequest,
    },
  });
  const CHRQ = response2?.queryChangeRequest?.find(
    chRq => chRq?.id === idChangeRequest,
  );
  const RT = response2?.resourceSpecifications?.edges?.find(
    chRq => chRq?.node?.id === te,
  );
  console.log('RES2', response2, CHRQ);
  const resourceType = useFormInput(RT.node.resourceType.name);
  const changeSource = useFormInput(CHRQ.source);
  const description = useFormInput(CHRQ.description);

  return (
    <div>
      <Grid className={classes.root} container spacing={0}>
        <Grid className={classes.titleModule} item xs={12}>
          <ConfigureTitle
            title={fbt('Change Request', '')}
            subtitle={fbt('', '  ')}
          />
          <Grid>
            <ButtonSaveDelete
              onClick={() => setOpenDetails()}
              className={classes.buttonDelete}
              variant="outlined">
              Cancel
            </ButtonSaveDelete>
            <ButtonSaveDelete onClick={() => setOpenDetails()}>
              Save
            </ButtonSaveDelete>
          </Grid>
        </Grid>
        <Grid style={{display: 'flex'}}>
          <ButtonAlarmStatus
            className={classes.buttonStatus}
            skin={CHRQ.status}>
            Status: {stringCapitalizeFisrt(CHRQ.status)}
          </ButtonAlarmStatus>
          <FormField>
            <TextField
              required
              id="outlined-select-action"
              select
              style={{
                padding: '0',
                marginLeft: '40px',
                width: '250px',
              }}
              label="Action"
              name="action"
              defaultValue=""
              variant="outlined">
              {status.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </FormField>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CardAccordion
              className={classes.accordionDetails}
              title={'Details'}>
              <FormField>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      style={{width: '100%'}}
                      id="id"
                      label="Id"
                      variant="outlined"
                      name="ID"
                      value={CHRQ.id}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      style={{width: '100%'}}
                      id="resource_type"
                      label="Resource type"
                      variant="outlined"
                      name="resourceType"
                      disabled
                      {...resourceType}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      style={{width: '100%'}}
                      id="change_source"
                      label="Change source"
                      variant="outlined"
                      name="changeSource"
                      disabled
                      {...changeSource}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      style={{width: '100%'}}
                      id="description"
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      name="description"
                      disabled
                      {...description}
                    />
                  </Grid>
                </Grid>
              </FormField>
            </CardAccordion>
            <CardAccordion title={'Target parameters'}>
              <TableResource valuesTable={CHRQ} />
            </CardAccordion>
            <CardAccordion title={'Suggested change request schedule'}>
              <CardSuggested />
            </CardAccordion>
          </Grid>
          <Grid item xs={4}>
            <CardAccordion
              className={classes.listComment}
              title={'Activity & Comments'}>
              <Grid item xs={12}>
                <CommentsActivitiesBox
                  boxElementsClass={classes.inExpandingPanelFix}
                  commentsLogClass={classes.commentsLog}
                  relatedEntityId={''}
                  relatedEntityType="%future added value"
                  // $FlowFixMe[incompatible-type] $FlowFixMe T74239404 Found via relay types
                  activities={[]}
                  comments={[]}
                />
              </Grid>
            </CardAccordion>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export {ChangeRequestDetails};
