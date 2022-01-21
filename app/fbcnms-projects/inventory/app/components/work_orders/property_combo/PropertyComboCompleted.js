/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Text from '@symphony/design-system/components/Text';

type Props = $ReadOnly<{|
  open: boolean,
  onClose: () => void,
|}>;

const PropertyComboCompleted = (props: Props) => {
  const {classes} = props;

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.completedContent}>
      <Grid className={classes.containerIcon}>
        <CheckCircleOutlineOutlinedIcon className={classes.icon} />
      </Grid>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.center}>
        <Text className={classes.dialogTitleText} color={'inherit'}>
          Properties have been unlinked
        </Text>

        <Text variant="body2" color={'inherit'}>
          Dependent properties will reappear in the main listing as primary
          properties, but will lose their values
        </Text>
        <Text className={classes.dialogItalicText} color={'inherit'}>
          You must save the template to confirm the changes
        </Text>
      </Grid>
    </Grid>
  );
};

export default PropertyComboCompleted;
