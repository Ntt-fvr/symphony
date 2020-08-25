/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {TextCommentPost_comment} from './__generated__/TextCommentPost_comment.graphql.js';
import type {WithAlert} from '@fbcnms/ui/components/Alert/withAlert';
import type {WithSnackbarProps} from 'notistack';

import ActivityCommentsIcon from './ActivityCommentsIcon';
import DateTimeFormat from '../../common/DateTimeFormat.js';
import React from 'react';
import Text from '@symphony/design-system/components/Text';

import symphony from '@fbcnms/ui/theme/symphony';
import withAlert from '@fbcnms/ui/components/Alert/withAlert';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {withSnackbar} from 'notistack';

type Props = {
  comment: TextCommentPost_comment,
} & WithAlert &
  WithSnackbarProps;

const useStyles = makeStyles(() => ({
  textCommentPost: {
    minHeight: '24px',
    padding: '8px 4px 8px 0px',
    display: 'flex',
    flexDirection: 'row',
  },
  commentBody: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentContent: {
    flexGrow: 1,
    backgroundColor: symphony.palette.D50,
    borderRadius: '4px',
    padding: '4px 8px',
  },
  commentTime: {
    paddingTop: '4px',
    color: symphony.palette.D300,
  },
}));

const TextCommentPost = (props: Props) => {
  const classes = useStyles();
  const {comment} = props;

  return (
    <div className={classes.textCommentPost}>
      <ActivityCommentsIcon field="COMMENT" />
      <div className={classes.commentBody}>
        <Text variant="body2" className={classes.commentContent}>
          <span className={classes.commentAuthor}>
            {comment.author.email + ' '}
          </span>
          <span>{comment.text}</span>
        </Text>
        <Text color="light" variant="subtitle2" className={classes.commentTime}>
          {DateTimeFormat.commentTime(comment.createTime)}
        </Text>
      </div>
    </div>
  );
};

export default withAlert(
  withSnackbar(
    createFragmentContainer(TextCommentPost, {
      comment: graphql`
        fragment TextCommentPost_comment on Comment {
          id
          author {
            email
          }
          text
          createTime
        }
      `,
    }),
  ),
);
