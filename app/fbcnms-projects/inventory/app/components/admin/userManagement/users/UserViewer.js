/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import type {User, UserBase} from '../utils/UserManagementUtils';

import * as React from 'react';
import Text from '@symphony/design-system/components/Text';
import classNames from 'classnames';
import moment from 'moment';
import symphony from '@symphony/design-system/theme/symphony';
import {USER_ROLES, userFullName} from '../utils/UserManagementUtils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  photoContainer: {
    borderRadius: '50%',
    marginRight: '8px',
    backgroundColor: symphony.palette.D100,
    width: '48px',
    height: '48px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    margin: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flexShrink: 1,
    overflow: 'hidden',
  },
  metaData: {
    display: 'flex',
    whiteSpace: 'nowrap',
    '& span': {
      marginRight: '2px',
    },
  },
}));

type Props = $ReadOnly<{|
  user: User | UserBase,
  highlightName?: ?boolean,
  showPhoto?: ?boolean,
  showRole?: ?boolean,
  className?: ?string,
  showTimeAvailability?: ?boolean,
|}>;

export default function UserViewer(props: Props) {
  const {
    user,
    highlightName = false,
    showPhoto = false,
    showRole = false,
    className,
    showTimeAvailability = false,
  } = props;
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      {showPhoto ? (
        <div className={classes.photoContainer}>
          <Text variant="h5" color="light">
            {`${user.firstName}${user.lastName}${user.authID}`
              .charAt(0)
              .toUpperCase()}
          </Text>
        </div>
      ) : null}
      <div className={classes.details}>
        <Text
          variant="subtitle2"
          useEllipsis={true}
          color={highlightName ? 'primary' : undefined}>
          {userFullName(user)}
        </Text>
        <div className={classes.metaData}>
          <Text variant="caption" color="gray" useEllipsis={true}>
            {user.authID}
          </Text>
          {showRole ? (
            <Text variant="caption" color="gray">
              {` • ${USER_ROLES[user.role].value}`}
            </Text>
          ) : null}
        </div>
        <div className={classes.metaData}>
          {showTimeAvailability ? (
            <Text variant="caption" color="gray">
              {moment(user.timeAvailability).format('YYYY-MM-DD HH:mm')}
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  );
}
