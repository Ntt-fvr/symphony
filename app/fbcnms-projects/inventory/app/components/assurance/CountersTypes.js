/*[object Object]*/

// eslint-disable-next-line header/header
import AddCounterItemForm from './AddCounterItemForm';
import CounterTypeItem from './CounterTypeItem';
import React, {useState} from 'react';
import Text from '@symphony/design-system/components/Text';
import {EditCounterItemForm} from './EditCounterItemForm';
import {Grid, List} from '@material-ui/core/';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    margin: '40px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  listCarCounter: {
    listStyle: 'none',
  },
}));

const stateInitial = [
  {
    id: '2de30c42-9deb-40fc-a41f-05e62b5939a7',
    Counter_name: 'Freda',
    Network_Manager_System: 'Grady',
    Vendor_name: 'Ericsson',
    Counter_ID: '10',
    Family_Name: 'FredaGrady22221-7573',
  },
  {
    id: 'd00d3614-101a-44ca-b6c2-0be075aeed3d',
    Counter_name: 'Major',
    Network_Manager_System: 'Rodriguez',
    Vendor_name: 'Ericsson',
    Counter_ID: '20',
    Family_Name: 'MajorRodriguez61545',
  },
  {
    id: '63c03386-33a2-4512-9ac1-354ad7bec5e9',
    Counter_name: 'Daphney',
    Network_Manager_System: 'Torphy',
    Vendor_name: 'Ericsson',
    Counter_ID: '30',
    Family_Name: 'DaphneyTorphy96105',
  },
  {
    id: '63c03386-33a2-4512-9ac1-354ad7bec5x9',
    Counter_name: 'Leonore',
    Network_Manager_System: 'Morphy',
    Vendor_name: 'Ericsson',
    Counter_ID: '40',
    Family_Name: 'LeonoreMorphy12345',
  },
  {
    id: 'a9748581-dfdc-4a78-930d-5205a2ccef48',
    Counter_name: 'Tatyana',
    Network_Manager_System: 'Von',
    Vendor_name: 'Huawei',
    Counter_ID: '50',
    Family_Name: 'TatyanaVon35871-3686',
  },
  {
    id: '1921a734-cc05-4f71-a677-ffe38dda6958',
    Counter_name: 'Maude',
    Network_Manager_System: 'Effertz',
    Vendor_name: 'Huawei',
    Counter_ID: '60',
    Family_Name: 'MaudeEffertz73114',
  },
  {
    id: '3629db36-14f9-4f24-b139-200f3a1b9af7',
    Counter_name: 'Breanna',
    Network_Manager_System: 'Runolfsdottir',
    Vendor_name: 'Parallel Wireless',
    Counter_ID: '70',
    Family_Name: 'BreannaRunolfsdottir70705-1477',
  },
];

const CountersTypes = () => {
  const classes = useStyles();

  const [state, setState] = useState(stateInitial);

  const handleRemove = id => {
    const newList = state.filter(item => item.id !== id);
    setState(newList);
  };

  const [showAddEditCard, setShowAddEditCard] = useState(false);

  const showEditCounterItemForm = () => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
  };

  if (showAddEditCard) {
    return <EditCounterItemForm />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Text variant="h5">Cards Container</Text>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <List disablePadding="true">
            {state.map(item => (
              <li className={classes.listCarCounter} key={item.id}>
                <CounterTypeItem
                  CounterName={item.Counter_name}
                  NetworkManagerSystem={item.Network_Manager_System}
                  VendorName={item.Vendor_name}
                  CounterId={item.Counter_ID}
                  FamilyName={item.Family_Name}
                  onChange={() => handleRemove(item.id)}
                  edit={showEditCounterItemForm}
                />
              </li>
            ))}
          </List>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={3} xl={3}>
          <AddCounterItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default CountersTypes;
