/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Text from '@symphony/design-system/components/Text';
// import symphony from '@symphony/design-system/theme/symphony';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: '10px',
  },
  accordionSummary: {
    '& .MuiAccordionSummary-root': {
      padding: '5px 16px',
    },
  },
}));

export type Props = $ReadOnly<{|
  className?: string,
  children?: React.Node,
  title: string,
|}>;

const CardAccordion = (props: Props) => {
  const {children, title, className} = props;
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, classes.accordionSummary, className)}>
      <Accordion className={className}>
        <AccordionSummary className={className} expandIcon={<ExpandMoreIcon />}>
          <Text variant={'subtitle1'} weight={'bold'}>
            {title}
          </Text>
        </AccordionSummary>
        <AccordionDetails className={className}>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};
export {CardAccordion};
