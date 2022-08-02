/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

 import Button from '@symphony/design-system/components/Button';
 import ButtonFlowStatus from './common/ButtonFlowStatus';
 import CloseIcon from '@material-ui/icons/Close';
 import ConfigureTitle from './common/ConfigureTitle';
 import Dialog from '@material-ui/core/Dialog';
 import DialogActions from '@material-ui/core/DialogActions';
 import DialogContent from '@material-ui/core/DialogContent';
 import IconButton from '@material-ui/core/IconButton';
 import InfoIcon from '@material-ui/icons/Info';
 import Menu from '@material-ui/core/Menu';
 import MenuItem from '@material-ui/core/MenuItem';
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 import Paper from '@material-ui/core/Paper';
 import PowerSearchBar from '../power_search/PowerSearchBar';
 import React, {useCallback, useEffect, useMemo, useState} from 'react';
 import RelayEnvironment from '../../common/RelayEnvironment';
 import Table from '@symphony/design-system/components/Table/Table';
 import UpdateFlowInstanceMutation from '../../mutations/UpdateFlowInstance';
 import fbt from 'fbt';
 import symphony from '@symphony/design-system/theme/symphony';
 import useLocationTypes from '../comparison_view/hooks/locationTypesHook';
 import useMediaQuery from '@material-ui/core/useMediaQuery';
 import {FlowInstanceSearchConfig} from './FlowInstanceSearchConfig';
 import {Grid, Typography} from '@material-ui/core';
 import {InventoryAPIUrls} from '../../common/InventoryAPI';
 import {fetchQuery, graphql} from 'relay-runtime';
 import {getInitialFilterValue} from '../comparison_view/FilterUtils';
 import {makeStyles} from '@material-ui/core/styles';
 import {FlowStatus} from './common/FlowStatusEnums';
 import moment from 'moment';
 
 const toPascalCase = name => {
   return name?.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
     return g1.toUpperCase() + g2.toLowerCase();
   });
 };
 
 const flows = graphql`
   query OperationQuery {
     flowInstances {
       edges {
         node {
           id
           status
           startDate
           incompletion_reason
           template {
             name
           }
           bssCode
           serviceInstanceCode
         }
       }
     }
   }
 `;
 
 const flowsFilter = graphql`
   query OperationFilterQuery($filterBy: [FlowInstanceFilterInput!]) {
     flowInstances(filterBy: $filterBy) {
       edges {
         node {
           id
           status
           startDate
           incompletion_reason
           template {
             name
           }
           bssCode
           serviceInstanceCode
         }
       }
     }
   }
 `;
 
 const useStyles = makeStyles(theme => ({
   root: {
     '& > *': {
       margin: theme.spacing(1),
     },
 
     flexGrow: '0',
     padding: '30px',
     margin: '0',
     borderRadius: 25,
   },
 
   bar: {
     display: 'flex',
     flexDirection: 'row',
     boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
   },
   flowInstanceView: {
     height: '100%',
   },
   titleCounter: {
     margin: '0 0 30px 0',
   },
   powerSearchBarWrapper: {
     paddingRight: '8px',
   },
   powerSearchBar: {
     borderRadius: '8px',
   },
   searchResults: {
     flexGrow: 1,
     paddingTop: '8px',
   },
   searchBar: {
     display: 'flex',
     flexDirection: 'row',
     boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
     borderRadius: '5px',
   },
   backgroundWhite: {
     backgroundColor: 'white',
   },
   searchArea: {
     backgroundColor: symphony.palette.D10,
   },
   rounded: {
     borderRadius: '5px',
   },
   table: {
     width: 'auto',
   },
   closeButton: {
     position: 'absolute',
     right: theme.spacing(1),
     marginBottom: '80px',
     marginLeft: '20px',
   },
   root1: {
     '& > *': {
       margin: theme.spacing(1),
     },
   },
   cancelButton: {
     border: '1.5px solid #2196f3',
     width: '84px',
     height: '36px',
     borderRadius: 5,
     color: '#2196f3',
   },
   dialogAction: {
     marginBottom: '55px',
     marginRight: '47px',
   },
   root2: {
     flexGrow: 1,
     overflow: 'hidden',
     padding: theme.spacing(0, 3),
   },
   paper: {
     maxWidth: 600,
     margin: `${theme.spacing(1)}px auto`,
     padding: theme.spacing(2),
     backgroundColor: '#e3f2fd',
     border: '1.5px solid #2196f3',
   },
   typeText: {
     fontWeight: 600,
   },
 }));
 
 const tableColumns = [
   {
     key: 'id',
     title: 'ID Instance',
     getSortingValue: row => row.id,
     render: row => (
       <Button
         variant="text"
         onClick={() => window.open(InventoryAPIUrls.flowinstance(row.id))}
         tooltip={row.id ?? ''}>
         {row.id}
       </Button>
     ),
   },
   {
     key: 'status',
     title: 'Status',
     render: row => (
       <ButtonFlowStatus className={row.status} skin={toPascalCase(row.status)}>
         {row.status}
       </ButtonFlowStatus>
     ),
   },
   {
     key: 'template',
     title: 'Flow Template',
     render: row => row.template.name ?? '',
     tooltip: row => row.template.name ?? '',
   },
   {
     key: 'createdDate',
     title: 'Created Date',
     render: row => moment(row.startDate).format('MM/DD/YY-HH:MM:SS')?? '',
     tooltip: row => row.startDate ?? '',
   },
   {
     key: 'author',
     title: 'Author',
     render: row => row.author ?? '',
     tooltip: row => row.author ?? '',
   },
   {
     key: 'error',
     title: 'Error',
     render: row => row.incompletion_reason ?? '',
     tooltip: row => row.error ?? '',
   },
 ];

 export const PROJECTS_PAGE_SIZE = 5;
 
 const Operation = () => {
   const classes = useStyles();
   const [datarows, setDatarows] = useState([]);
   const [open, setOpen] = React.useState(false);
   const [filters, setFilters] = React.useState([]);
   const [selectedFlow, setSelectedFlow] = React.useState(null);
 
   const locationTypesFilterConfigs = useLocationTypes();
 
   const filterConfigs = useMemo(
     () =>
       FlowInstanceSearchConfig.map(ent => ent.filters)
         .reduce(
           (allFilters, currentFilter) => allFilters.concat(currentFilter),
           [],
         )
         .concat(locationTypesFilterConfigs ?? []),
     [locationTypesFilterConfigs],
   );
   const updte = (pt, e) => ({
     ...pt,
     options: e,
   });
 
   useEffect(() => {
     isCompleted();
   }, []);
 
   const isCompleted = useCallback(() => {
     fetchQuery(RelayEnvironment, flows, {}).then(data => {
       setDatarows(
         data.flowInstances.edges.map(item => {
           return {...item.node, options: false};
         }),
       );
     });
   }, [setDatarows]);
 
   const filterFlows = filterData =>
     fetchQuery(RelayEnvironment, flowsFilter, {
       filterBy: filterData.map(filterItem => {
         return {
           filterType: filterItem.name.toUpperCase(),
           operator: filterItem.operator.toUpperCase(),
           stringSet: filterItem.name.toLowerCase().includes('status')
             ? filterItem.stringSet
             : null,
           idSet: filterItem.name.toLowerCase().includes('type')
             ? filterItem.idSet
             : null,
           stringValue:
             filterItem.name.toLowerCase().includes('bss_code') ||
             filterItem.name.toLowerCase().includes('service_code')
               ? filterItem.stringValue
               : null,
         };
       }),
     }).then(data => {
       setDatarows(
         data.flowInstances.edges.map(item => {
           return {...item.node, options: false};
         }),
       );
     });
 
   const handleTaggle = (e, id) => {
     const index = datarows.findIndex(i => i.id == id);
     setDatarows([
       ...datarows.slice(0, index),
       updte(datarows[index], e),
       ...datarows.slice(index + 1),
     ]);
   };
 
   const handleclose = id => {
     const index = datarows.findIndex(i => i.id == id);
     setDatarows([
       ...datarows.slice(0, index),
       updte(datarows[index], null),
       ...datarows.slice(index + 1),
     ]);
   };
 
   const handleClickOpen = () => {
     setOpen(true);
   };
 
   const handleClose = () => {
     setSelectedFlow(null);
     setOpen(false);
   };
 
   const onFiltersChanged = data => {
     setFilters(data);
     filterFlows(data);
   };
 
   const updateFlow = inputData => {
     const variables = {
       input: {
         id: inputData.id ?? selectedFlow,
         status: inputData.status,
       },
     };
     UpdateFlowInstanceMutation(variables, {
       onCompleted: () => {
         isCompleted();
       },
     });
   };
 
   return (
     <Grid className={classes.root} container spacing={0}>
       <Grid
         className={classes.titleCounter}
         container
         justify={'space-between'}
         item
         xs={12}>
         <ConfigureTitle
           title={fbt('Operation', 'Flow instances header')}
           subtitle={fbt('Instances Flow', 'Instances Flow subheader')}
         />
       </Grid>
       <Grid item xs={12}>
         <div className={classes.searchArea}>
           <div className={classes.searchBar}>
             <PowerSearchBar
               filterValues={filters}
               className={classes.rounded}
               placeholder="Filter flow instances"
               getSelectedFilter={filterConfig =>
                 getInitialFilterValue(
                   filterConfig.key,
                   filterConfig.name,
                   filterConfig.defaultOperator,
                   null,
                 )
               }
               onFiltersChanged={filterData => {
                 onFiltersChanged(filterData);
               }}
               filterConfigs={filterConfigs}
               searchConfig={FlowInstanceSearchConfig}
               entity={'SERVICE'}
               exportPath={'/operation'}
             />
           </div>
         </div>
       </Grid>
       <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
         <Table
           data={datarows}
           className={classes.table}
           columns={[
             ...tableColumns,
             {
               key: 'quickActions',
               title: `${fbt('Actions', '')}`,
               width: 80,
               render: row =>
                 (
                   <>
                     <IconButton
                       aria-label={row.id}
                       color="secondary"
                       onClick={e => handleTaggle(e.currentTarget, row.id)}
                       disabled={
                         row.status != FlowStatus.paused &&
                         row.status != FlowStatus.running &&
                         row.status != FlowStatus.failing
                       }>
                       <MoreVertIcon />
                     </IconButton>
 
                     <Menu
                       id={row.id}
                       anchorEl={row.options}
                       keepMounted
                       open={Boolean(row.options)}
                       onClose={() => handleclose(row.id)}>
                       <MenuItem
                         onClick={e => {
                           e.preventDefault();
                           handleclose(row.id);
                           setSelectedFlow(row.id);
                           updateFlow({
                             status:
                               e.target.textContent == 'Pause'
                                 ? FlowStatus.paused
                                 : FlowStatus.running,
                             id: row.id,
                           });
                         }}>
                         {row.status === FlowStatus.paused
                           ? 'Resume'
                           : row.status === FlowStatus.running
                           ? 'Pause'
                           : 'Retry'}
                       </MenuItem>
                       <MenuItem
                         onClick={e => {
                           e.preventDefault();
                           handleClickOpen();
                           setSelectedFlow(row.id);
                           handleclose(row.id);
                         }}>
                         {'Cancel'}
                       </MenuItem>
                     </Menu>
                   </>
                 ) ?? '',
             },
           ]}
           paginationSettings={{
             loadNext: onCompleted => {
               loadNext(PROJECTS_PAGE_SIZE, {
                 onComplete: () => onCompleted && onCompleted(),
               });
             },
             pageSize: PROJECTS_PAGE_SIZE,
             totalRowsCount: datarows.length,
           }}
         />
       </Grid>
       <div>
         <Dialog
           fullScreen={false}
           open={open}
           onClose={handleClose}
           aria-labelledby="responsive-dialog-title">
           <DialogContent>
             <IconButton
               aria-label="close"
               className={classes.closeButton}
               onClick={handleClose}>
               <CloseIcon />
             </IconButton>
             <br />
 
             <div className={classes.root}>
               <Paper className={classes.paper}>
                 <Grid container wrap="nowrap" spacing={2}>
                   <Grid item>
                     <InfoIcon />
                   </Grid>
                   <Grid item xs>
                     <Typography>
                       <Typography className={classes.typeText}>
                         Cancel flow
                       </Typography>
                       This action is irreversible, the flow will go into a
                       "Cancelled" state and cannot be executed again.
                     </Typography>
                   </Grid>
                 </Grid>
               </Paper>
             </div>
           </DialogContent>
           <DialogActions className={classes.dialogAction}>
             <div className={classes.root1}>
               <Button
                 variant="outlined"
                 className={classes.cancelButton}
                 onClick={handleClose}>
                 <Typography>Cancel</Typography>
               </Button>
             </div>
             <div>
               <Button
                 variant="contained"
                 color="primary"
                 className={classes.margin}
                 onClick={() => {
                   handleClose();
                   updateFlow({status: FlowStatus.canceled});
                 }}>
                 Continue
               </Button>
             </div>
           </DialogActions>
         </Dialog>
       </div>
     </Grid>
   );
 };
 
 export default Operation;
 