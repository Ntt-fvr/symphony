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

const stateInitial = {
  data: {
    counters: {
      edges: [
        {
          node: {
            id: '244813135872',
            name: 'contador_family_7',
            networkManagerSystem: 'hola bebe',
            externalID: '123456789',
          },
        },
        {
          node: {
            id: '244813135873',
            name: 'contador_family_8',
            networkManagerSystem: 'hola sergio',
            externalID: '987654321',
          },
        },
        {
          node: {
            id: '244813135874',
            name: 'contador_family_9',
            networkManagerSystem: 'hola sebastian',
            externalID: '987654322131',
          },
        },
        {
          node: {
            id: '244813135875',
            name: 'contador_family_10',
            networkManagerSystem: 'hola gabriel',
            externalID: '9876543213123',
          },
        },
      ],
    },
  },
};

const CountersTypes = () => {
  const classes = useStyles();

  const [state, setState] = useState(stateInitial);

  const [showAddEditCard, setShowAddEditCard] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const point = state.data.counters.edges;

  const handleRemove = id => {
    const newList = point.filter(item => item.node.id !== id);
    setState(newList);
  };

  const showEditCounterItemForm = (
    id,
    name,
    vendor,
    network,
    counterId,
    familyName,
  ) => {
    ServerLogger.info(LogEvents.EDIT_COUNTER_ITEM_CLICKED);
    setShowAddEditCard(true);
    setDataEdit({
      Id: id,
      Name: name,
      VendorName: vendor,
      NetworkManagerSystem: network,
      CounterID: counterId,
      FamilyName: familyName,
    });
  };

  const hideEditCounterItemForm = () => {
    setShowAddEditCard(false);
  };

  if (showAddEditCard) {
    return (
      <EditCounterItemForm
        formValues={dataEdit}
        onClose={hideEditCounterItemForm}
      />
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item s={12} sm={12} lg={12} xl={12}>
          <Text variant="h5">Cards Container</Text>
        </Grid>
        <Grid className={classes.paper} item xs={12} sm={12} lg={9} xl={9}>
          <List disablePadding="true">
            {point.map(item => (
              <li className={classes.listCarCounter} key={item.node.id}>
                <CounterTypeItem
                  CounterName={item.node.name}
                  NetworkManagerSystem={item.node.networkManagerSystem}
                  VendorName={item.node.name}
                  CounterId={item.node.externalID}
                  FamilyName={item.node.networkManagerSystem}
                  onChange={() => handleRemove(item.node.id)}
                  edit={() =>
                    showEditCounterItemForm(
                      item.node.id,
                      item.node.name,
                      item.node.name,
                      item.node.networkManagerSystem,
                      item.node.externalID,
                      item.node.networkManagerSystem,
                    )
                  }
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
