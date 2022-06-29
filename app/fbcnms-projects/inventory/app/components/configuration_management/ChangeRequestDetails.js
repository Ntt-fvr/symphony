/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {EditScheduleChangeRequestMutationVariables} from '../../mutations/__generated__/EditScheduleChangeRequestMutation.graphql';

import ButtonAlarmStatus from './common/ButtonAlarmStatus';
import ButtonSaveDelete from './common/ButtonSaveDelete';
import CommentsActivitiesBox from '../comments/CommentsActivitiesBox';
import ConfigureTitle from './common/ConfigureTitle';
import EditScheduleChangeRequestMutation from '../../mutations/EditScheduleChangeRequestMutation';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import fbt from 'fbt';
import {CardAccordion} from './common/CardAccordion';
import {CardChangeRequestSchedule} from './common/CardChangeRequestSchedule';
import {FormField} from './common/FormField';
import {Grid} from '@material-ui/core';
import {TableResource} from './common/TableResource';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useFormInput} from '../assurance/common/useFormInput';
import {useLazyLoadQuery} from 'react-relay/hooks';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    padding: '30px',
    margin: '0',
  },
  titleModule: {
    margin: '0 0 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonDelete: {
    marginRight: '24px',
  },
  buttonStatus: {
    height: '38px',
    margin: '0 0 30px 0',
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
      #
      scheduler {
        time
        type
        weekDay
      }
      #
      items {
        id
        stringValue
        intValue
        floatValue
        #
        parameterType {
          id
          name
          stringValue
          intValue
          floatValue
          type
          resourceSpecification
          parameters {
            id
            stringValue
            intValue
            floatValue
          }
        }
        #
        resource {
          id
          name
          resourceSpecification
        }
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
  const dataChRq = useLazyLoadQuery<ChangeRequestDetailsQuery>(ChangeRequest, {
    filter: {
      id: idChangeRequest,
    },
  });

  const filterChangeRequest = dataChRq?.queryChangeRequest?.find(
    itemChRq => itemChRq?.id === idChangeRequest,
  );

  const rs = filterChangeRequest?.items.map(
    itemRS => itemRS?.parameterType?.resourceSpecification,
  );
  const idRS = rs[0].toString();

  const dataQuery = useLazyLoadQuery<ChangeRequestDetailsQuery>(ChangeRequest, {
    filterBy: [
      {
        filterType: 'ID',
        operator: 'IS_ONE_OF',
        idSet: [idRS],
      },
    ],
    filter: {
      id: idChangeRequest,
    },
  });

  const changeRequest = dataQuery?.queryChangeRequest?.find(
    chRq => chRq?.id === idChangeRequest,
  );

  const dateSchedule = changeRequest?.scheduler;

  const [schedule, setSchedule] = useState(dateSchedule);
  console.log('FRIST ', schedule, changeRequest);

  const resourceTypeFilter = dataQuery?.resourceSpecifications?.edges?.find(
    chRq => chRq?.node?.id === idRS,
  );

  const resourceType = useFormInput(resourceTypeFilter.node.resourceType.name);
  const changeSource = useFormInput(changeRequest.source);
  const description = useFormInput(changeRequest.description);

  const editSchedule = () => {
    const variables: EditScheduleChangeRequestMutationVariables = {
      input: {
        filter: {
          id: changeRequest.id,
        },
        set: {
          scheduler: {
            time: schedule.time,
            type: schedule.type,
            weekDay: schedule.weekDay,
          },
        },
      },
    };
    EditScheduleChangeRequestMutation(variables, {
      onCompleted: () => isCompleted(),
    });
  };

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
            <ButtonSaveDelete
              onClick={() => {
                setOpenDetails(), editSchedule();
              }}>
              Save
            </ButtonSaveDelete>
          </Grid>
        </Grid>
        <Grid style={{}}>
          <ButtonAlarmStatus
            className={classes.buttonStatus}
            skin={changeRequest.status}>
            Status: {stringCapitalizeFisrt(changeRequest.status)}
          </ButtonAlarmStatus>
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
                      value={changeRequest.id}
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
              <TableResource valuesTable={changeRequest} />
            </CardAccordion>
            <CardAccordion title={'Change request schedule'}>
              <CardChangeRequestSchedule
                setSchedule={setSchedule}
                schedule={schedule}
              />
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
