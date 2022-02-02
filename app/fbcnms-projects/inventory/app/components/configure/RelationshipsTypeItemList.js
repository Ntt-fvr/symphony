/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React from 'react';

// DESING SYSTEM //

import Card from '@symphony/design-system/components/Card/Card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import Grid from '@material-ui/core/Grid';
import SettingsIcon from '@material-ui/icons/Settings';
import Text from '@symphony/design-system/components/Text';
import symphony from '@symphony/design-system/theme/symphony';
import {DARK} from '@symphony/design-system/theme/symphony';
import {makeStyles} from '@material-ui/styles';

// import {SettingsIcon} from '@symphony/design-system/icons/Actions/SettingsIcon';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '7px',
    '& .cardContainer': {
      height: '70px',
      padding: '11px',
    },
  },
  container: {
    '& .MuiAccordionSummary-root': {
      padding: '5px 15px',
    },
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
  },
  detailHeader: {
    color: DARK.D500,
  },
  deleteIcon: {
    // marginRight: '1rem',
    color: DARK.D300,
  },
  settingsIcon: {
    marginRight: '1rem',
    color: DARK.D300,
    borderRadius: '100%',
    padding: '5.5px',
  },
  inside: {
    // border: '1px solid red',
    // display: 'flex',
    // alignItems: 'center',
  },
  containerInner: {
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 0 15px',
  },
  containerDelete: {
    // border: '1px solid red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: '50%',
    marginRight: '10px',
    backgroundColor: symphony.palette.D50,
    color: symphony.palette.D500,
    width: '48px',
    height: '48px',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...symphony.typography.h5,
  },
}));

type Node = {
  node: {
    resourceTypeFk: {
      id: string,
    },
  },
};

type Props = $ReadOnly<{|
  // name: string,
  // formValues: {
  //   id: string,
  //   name: string,
  //   resourceTypeClassFk: {
  //     name: string,
  //   },
  //   resourceTypeBaseTypeFk: {
  //     name: string,
  //   },
  // },
  // edit: () => void,
  // handleRemove: void => void,
  // resourceDataLenght: Array<Node>,
  item: {
    id: string,
    name: string,
  },
|}>;

const RelationshipsTypeItemList = (props: Props) => {
  // const {edit, handleRemove, formValues, resourceDataLenght} = props;
  const {...item} = props;

  const classes = useStyles();

  // const filterDataById = resourceDataLenght
  //   .map(item => item.node)
  //   .filter(rsData => rsData?.resourceTypeFk?.id === formValues.id);

  // function handleOpen(event) {
  //   event.stopPropagation();
  //   setOpen(!open);
  // }

  return (
    <div className={classes.root}>
      <Card>
        <Grid container>
          <Grid sm={4} className={classes.inside}>
            <div className={classes.inline}>
              <div className={classes.iconContainer}>
                <SettingsIcon />
              </div>
              <Text useEllipsis={true} weight={'bold'}>
                {item.resourceTypeA.name}
              </Text>
            </div>
          </Grid>
          <Grid sm={2} className={classes.containerInner}>
            <Text useEllipsis={true}>
              {item.resourceRelationshipType.toLowerCase()}
            </Text>
          </Grid>
          <Grid sm={2} className={classes.containerInner}>
            <Text useEllipsis={true}>
              {item.resourceRelationshipMultiplicity.toLowerCase()}
            </Text>
          </Grid>
          <Grid sm={3} md={3} lg={3} className={classes.containerInner}>
            <Text useEllipsis={true} weight={'bold'}>
              {item.resourceTypeB.name}
            </Text>
          </Grid>
          <Grid sm={1} className={classes.containerDelete}>
            <DeleteOutlinedIcon className={classes.deleteIcon} />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
export {RelationshipsTypeItemList};
