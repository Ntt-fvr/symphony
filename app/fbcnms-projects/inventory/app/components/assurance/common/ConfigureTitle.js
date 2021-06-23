import type {WithStyles} from '@material-ui/core';
import React from 'react';
import Text from '@symphony/design-system/components/Text';
import {D500} from '@symphony/design-system/theme/symphony';
import {withStyles} from '@material-ui/core/styles';
type Props = {
  title: string,
  subtitle: ?string,
  className?: string,
} & WithStyles<typeof styles>;
const styles = _theme => ({
  title: {
    display: 'block',
    marginBottom:'9px',
  },
  subtitle: {
    color: D500,
  },
});
const ConfigureTitle = (props: Props) => {
  const {title, subtitle, classes, className} = props;
  return (
    <div className={className}>
      <Text className={classes.title} variant="h6">
        {title}
      </Text>
      <Text className={classes.subtitle} variant="subtitle2">
        {subtitle}
      </Text>
    </div>
  );
};
export default withStyles(styles)(ConfigureTitle);