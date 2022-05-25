import React, {useState} from 'react';
import withInventoryErrorBoundary from '../../common/withInventoryErrorBoundary';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormActionWithPermissions from '../../common/FormActionWithPermissions';
import Button from '@symphony/design-system/components/Button';
import {makeStyles} from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Text from '@symphony/design-system/components/Text';
import AddContractCard from './AddContractCard';
import fbt from 'fbt';
import IconButton from '@symphony/design-system/components/IconButton';
import {EditIcon} from '@symphony/design-system/icons';
import InventoryView from '../InventoryViewContainer';
import {Grid} from '@material-ui/core';
import {DARK} from '@symphony/design-system/theme/symphony';
import ButtonStatus from '../assurance/common/ButtonStatus';

const tableData = [];

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '10px',
    minWidth: '100%',
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

  titleAccordion :{
    borderBottom: '1px solid #f3f3f3',
  },
  itemAccordion: {
    paddingBottom: '12px',
  },
  titles: {
    marginRight: '0.8rem',
  },
  detailsRoot: {
    margin: '1.3rem -0.3rem 1.3rem 0.7rem'
  },
  editIcon: {
    color: DARK.D300,
  }
}));

const ContractsTypes = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [showAddCard, setShowAddCard] = useState(false);
  function handleOpen(event) {
    event.stopPropagation();
    setOpen(!open);
  }

  const showAddContractTypeCard = (woType: ?WorkOrderTypeNode) => {
    setShowAddCard(true);
  };

  if (showAddCard) {
    return (
      <div className={classes.paper}>
        <AddContractCard />
      </div>
    );
  }

  return (
    <InventoryView
      header={{
        title: <fbt desc="">Contracts</fbt>,
        subtitle: (
          <fbt desc="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </fbt>
        ),
        actionButtons: [
          <FormActionWithPermissions
            permissions={{
              entity: 'contractTemplate',
              action: 'create',
            }}>
            <Button onClick={() => showAddContractTypeCard(null)}>
              <fbt desc="">Add Contract</fbt>
            </Button>
          </FormActionWithPermissions>,
        ],
      }}
      permissions={{
        entity: 'workorderTemplate',
      }}>
      <div className={classes.root}>
        <Accordion className={classes.container}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.titleAccordion}>
            <Grid container>
              <Grid item xs={5} justify="start">
                <Text useEllipsis={true} color="primary" weight="bold">
                  Contract Name
                </Text>
              </Grid>

              <Grid item xs={4} justify={'center'}>
                <Text useEllipsis={true} weight="Bold">
                  Telefonica del Perú
                </Text>
              </Grid>
              <Grid item xs={3} container justify="flex-end">
                <Grid item xs={3}>
                  <ButtonStatus status='active'>Active</ButtonStatus>
                </Grid>
                <Grid item xs={1}>
                  <IconButton icon={EditIcon} color={'inherit'} />
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.detailsRoot}>  
            <Grid
              container
              spacing={3}>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  External ID:
                </Text>
                <Text variant={'body2'} weight="regular">
                  R-413132
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Effective Date:
                </Text>
                <Text variant={'body2'} weight="regular">
                  01-05-2022
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Expiration Date:
                </Text>
                <Text variant={'body2'} weight="regular">
                  12-08-2022
                </Text>
              </Grid>
              <Grid item xs={8} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Description:
                </Text>
                <Text variant={'body2'} weight="regular">
                  Amet minim mollit non deserunt ullamco est sit aliqua.
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Category:
                </Text>
                <Text variant={'body2'} weight="regular">
                  Planta Interna
                </Text>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.container}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.titleAccordion}>
            <Grid container>
              <Grid item xs={5} justify="start">
                <Text useEllipsis={true} color="primary" weight="bold">
                  Contract Name
                </Text>
              </Grid>

              <Grid item xs={4} justify={'center'}>
                <Text useEllipsis={true} weight="Bold">
                  Telefonica del Perú
                </Text>
              </Grid>

              <Grid item xs={3} container justify="flex-end">
                <Grid item xs={3}>
                  <ButtonStatus status='expired'>Expired</ButtonStatus>
                </Grid>
                <Grid item xs={1}>
                  <IconButton icon={EditIcon} color={'inherit'} />
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails className={classes.detailsRoot}>
            
            <Grid
              container
              spacing={3}>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  External ID:
                </Text>
                <Text variant={'body2'} weight="regular">
                  R-413132
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Effective Date:
                </Text>
                <Text variant={'body2'} weight="regular">
                  01-05-2022
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Expiration Date:
                </Text>
                <Text variant={'body2'} weight="regular">
                  12-08-2022
                </Text>
              </Grid>
              <Grid item xs={8} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Description:
                </Text>
                <Text variant={'body2'} weight="regular">
                  Amet minim mollit non deserunt ullamco est sit aliqua.
                </Text>
              </Grid>
              <Grid item xs={4} className={classes.itemAccordion}>
                <Text
                  className={classes.titles}
                  variant={'body2'}
                  weight="bold">
                  Category:
                </Text>
                <Text variant={'body2'} weight="regular">
                  Planta Interna
                </Text>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </InventoryView>
  );
};

export default withInventoryErrorBoundary(ContractsTypes);
