/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

// COMPONENTS //
import Button from '@symphony/design-system/components/Button';
import ConfigureTitle from './common/ConfigureTitle';
import ServiceTypeCard from './ServicesTypeCard';
import ServicesTypeCardDetails from './ServicesTypeCardDetails';
import {Grid, List} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '1',
    margin: '30px',
  },
  headerTitle: {
    margin: '0 0 20px 0',
  },
  title: {
    marginLeft: '0.3rem',
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    padding: '0 2rem',
    marginRight: '0.7rem',
  },
}));

const dataObjet = [
  {
    Id: '112',
    Type: 'CFS',
    Description: 'CFS Access',
    AssociatedServices: '2 RFS',
    ExternalId: 'C000000005',
    HasStarted: false,
    IsBundle: false,
    IsServiceEnabled: false,
    IsStateful: false,
    Name: 'CFS_ACC_001',
    SchemaLocation:
      'https://mycsp.com:8080/tmf-api/schema/Service/vCPE.schema.json',
    ServiceDate: '2018-01-15T12:26:11.747Z',
    ServiceState: 'Planned',
    ServiceType: 'BSA',
    State: 'Planned',
  },
  {
    Id: '113',
    Type: 'TFD',
    Description: 'TFD Access',
    AssociatedServices: '3 RFS',
    ExternalId: 'C000000007',
    HasStarted: true,
    IsBundle: false,
    IsServiceEnabled: true,
    IsStateful: false,
    Name: 'TFD_ACC_002',
    SchemaLocation:
      'https://mycsp.com:8080/tmf-api/schema/Service/vCPE.schema.json',
    ServiceDate: '2018-01-15T12:26:11.747Z',
    ServiceState: 'Planned',
    ServiceType: 'ASB',
    State: 'Planned',
  },
];

const ServicesTypes = () => {
  const classes = useStyles();
  const [showEditCard, setShowEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState<any>({});
  const history = useHistory();

  const getHandlerData = (dataObjet: any) => {
    setShowEditCard(true);
    setDataEdit(dataObjet);
  };
  if (showEditCard) {
    return (
      <ServicesTypeCardDetails
        handlerData={dataEdit}
        dataService={dataObjet.map(item => item)}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <ConfigureTitle
            className={classes.title}
            title={fbt('Service', '')}
            subtitle={fbt(
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
              '',
            )}
          />
        </Grid>
        <Grid xs={2} className={classes.containerButton}>
          <Button className={classes.button}>Add Service</Button>
        </Grid>
        <Grid item xs={12}>
          <List disablePadding>
            {dataObjet.map(item => (
              <ServiceTypeCard
                key={item.Id}
                open={() => {
                  getHandlerData({item});
                  history.push(
                    `/fulfillment/fulfillmentCatalog/services?idService=${item.Id}`,
                  );
                }}
                {...item}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServicesTypes;
