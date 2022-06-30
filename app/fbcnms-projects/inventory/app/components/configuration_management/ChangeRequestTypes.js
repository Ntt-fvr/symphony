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
 import ButtonAlarmStatus from './common/ButtonAlarmStatus';
 import ButtonsChangeRequest from './common/ButtonsChangeRequest';
 import ConfigureTitle from './common/ConfigureTitle';
 import PowerSearchBar from '../power_search/PowerSearchBar';
 import React, {useEffect, useState} from 'react';
 import RelayEnvironment from '../../common/RelayEnvironment';
 import Table from '@symphony/design-system/components/Table/Table';
 import fbt from 'fbt';
 import useLocationTypes from '../comparison_view/hooks/locationTypesHook';
 import usePropertyFilters from '../comparison_view/hooks/propertiesHook';
 import {ChangeRequestByBulk} from './ChangeRequestByBulk';
 import {ChangeRequestDetails} from './ChangeRequestDetails';
 import {ChangeRequestSearchConfig} from './ChangeRequestSearchConfig';
 import {CircleIndicator} from '../resource_instance/CircleIndicator';
 import {Grid} from '@material-ui/core';
 import {
   buildPropertyFilterConfigs,
   getSelectedFilter,
 } from '../comparison_view/FilterUtils';
 import {fetchQuery, graphql} from 'relay-runtime';
 import {makeStyles} from '@material-ui/styles';
 import {useMemo} from 'react';
 
 export const PROJECTS_PAGE_SIZE = 10;
 const useStyles = makeStyles(() => ({
   root: {
     flexGrow: '0',
     padding: '30px',
     margin: '0',
   },
   titleCounter: {
     margin: '0 0 30px 0',
     display: 'flex',
     justifyContent: 'space-between',
   },
   bar: {
     display: 'flex',
     flexDirection: 'row',
     boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
   },
   searchBar: {
     flexGrow: 1,
   },
 }));
 
 const ChangeRequestTypesQuery = graphql`
   query ChangeRequestTypesQuery(
     $filterBy: [ResourceSpecificationFilterInput!]
   ) {
     queryChangeRequest {
       id
       items {
         id
         resource {
           id
           resourceSpecification
         }
       }
       source
       status
       createTime
       updateTime
     }
     resourceSpecifications(filterBy: $filterBy) {
       edges {
         node {
           id
           name
           resourceType {
             id
             name
           }
         }
       }
     }
   }
 `;
 
 const stringCapitalizeFisrt = string => {
   const convertString = string.toLowerCase();
   return convertString.charAt(0).toUpperCase() + convertString.slice(1);
 };
 
 const countResources = items => {
   const hash = {};
   const itemsNotRepeated = items.filter(item =>
     hash[item.resource.id] ? false : (hash[item.resource.id] = true),
   );
 
   return itemsNotRepeated.length;
 };
 
 export type Props = $ReadOnly<{||}>;
 
 const ChangeRequestTypes = () => {
   const [filters, setFilters] = useState([]);
   const [openDetails, setOpenDetails] = useState(false);
   const [dataRow, setDataRow] = useState('');
   const [openBulkRequest, setOpenBulkRequest] = useState(false);
   const [changeRequestInitial, setChangeRequestInitial] = useState([]);
   const [changeRequest, setChangeRequest] = useState([]);
   const [infoCSV, setinfoCSV] = useState([]);
   const [nameFile, setNameFile] = useState('');
   const classes = useStyles();
 
   const locationTypesFilterConfigs = useLocationTypes();
   const possibleProperties = usePropertyFilters('queryChangeRequest');
   const projectPropertiesFilterConfigs = buildPropertyFilterConfigs(
     possibleProperties,
   );
 
   const filterConfigs = useMemo(
     () =>
       ChangeRequestSearchConfig.map(ent => ent.filters)
         .reduce(
           (allFilters, currentFilter) => allFilters.concat(currentFilter),
           [],
         )
         .concat(locationTypesFilterConfigs ?? [])
         .concat(projectPropertiesFilterConfigs ?? []),
     [locationTypesFilterConfigs, projectPropertiesFilterConfigs],
   );
 
   useEffect(() => {
     dataListInitial();
   }, []);
 
   const dataListInitial = () => {
     fetchQuery(RelayEnvironment, ChangeRequestTypesQuery, {
       filterBy: [
         {
           filterType: 'ID',
           operator: 'IS_ONE_OF',
           idSet: [],
         },
       ],
     }).then(data => {
       const dataModify = data.queryChangeRequest.map(item => {
         delete item.writable;
         return {
           ...item,
         };
       });
       dataModify.forEach(item => {
         delete item.writable;
         fetchQuery(RelayEnvironment, ChangeRequestTypesQuery, {
           filterBy: [
             {
               filterType: 'ID',
               operator: 'IS_ONE_OF',
               idSet: [item.items[0].resource.resourceSpecification],
             },
           ],
         }).then(datas => {
           item.type =
             datas.resourceSpecifications.edges[0].node.resourceType.name;
         });
         setChangeRequestInitial(dataModify);
         setChangeRequest(dataModify);
       });
     });
   };
 
   const formatDate = date => {
     const dateConvert = new Date(date);
     return dateConvert.toLocaleDateString();
   };
 
   const tableColumns = [
     {
       key: 'creation date',
       title: 'Creation date',
       render: row => formatDate(row.createTime) ?? '',
       tooltip: row => formatDate(row.createTime) ?? '',
     },
     {
       key: 'last modification date',
       title: `${fbt('Last modification date', '')}`,
       render: row => formatDate(row.updateTime) ?? '',
       tooltip: row => formatDate(row.updateTime) ?? '',
     },
     {
       key: 'resource type',
       title: `${fbt('Resource type', '')}`,
       render: row => row.type ?? '',
       tooltip: row => row.type ?? '',
     },
     {
       key: 'change source',
       title: `${fbt('Change source', '')}`,
       render: row => row.source ?? '',
       tooltip: row => row.source ?? '',
     },
     {
       key: 'affected resources',
       title: `${fbt('Affected resources', '')}`,
       render: row => (
         <CircleIndicator>{countResources(row.items)}</CircleIndicator>
       ),
       tooltip: row => countResources(row.items) ?? '',
     },
     {
       key: 'status',
       title: `${fbt('Status', '')}`,
       render: row => (
         <ButtonAlarmStatus skin={row.status}>
           {stringCapitalizeFisrt(row.status)}
         </ButtonAlarmStatus>
       ),
       tooltip: row => row.status ?? '',
     },
   ];
 
   const showInfo = data => {
     setDataRow(data);
   };
   const handleOpenDetails = () => {
     setOpenDetails(prevStateDetails => !prevStateDetails);
   };
   const bulk = (infoCSV, nameFile) => {
     setOpenBulkRequest(prevStateBulk => !prevStateBulk);
     setinfoCSV(infoCSV);
     setNameFile(nameFile);
   };
   if (openDetails) {
     return (
       <ChangeRequestDetails idChangeRequest={dataRow} setOpenDetails={setOpenDetails} />
     );
   }
   if (openBulkRequest) {
     return (
       <ChangeRequestByBulk
         onClick={() => {
           setOpenBulkRequest(prevStateBulk => !prevStateBulk);
           dataListInitial();
         }}
         infoCSV={infoCSV}
         nameFile={nameFile}
       />
     );
   }
 
   const filterData = filters => {
     const arrayFilters = [];
     const data = {};
 
     filters.map(function (filter) {
       data[filter.name] = item => filter.stringSet.includes(item[filter.name]);
       arrayFilters.push(data[filter.name]);
     });
 
     const result = changeRequestInitial.filter(item =>
       arrayFilters.every(f => f(item)),
     );
 
     setChangeRequest(result);
     setFilters(filters);
   };
 
   return (
     <Grid className={classes.root} container spacing={0}>
       <Grid className={classes.titleCounter} item xs={12}>
         <ConfigureTitle
           title={fbt('Change Request', '')}
           subtitle={fbt(
             'Find and manage change request and their details',
             '  ',
           )}
         />
         <ButtonsChangeRequest onClickBulk={bulk} />
       </Grid>
       <Grid item xs={12}>
         <div className={classes.bar}>
           <div className={classes.searchBar}>
             <PowerSearchBar
               placeholder="Filter"
               getSelectedFilter={filters => setFilters(filters)}
               filterConfigs={filterConfigs}
               filterValues={filters}
               searchConfig={ChangeRequestSearchConfig}
               exportPath={'/change_request_types'}
               entity={'CHANGE_REQUEST'}
               onFiltersChanged={filters => {
                 filterData(filters);
               }}
               getSelectedFilter={(filterConfig: FilterConfig) =>
                 getSelectedFilter(filterConfig, possibleProperties ?? [])
               }
             />
           </div>
         </div>
       </Grid>
       <Grid item xs={12} style={{margin: '20px 0 0 0'}}>
         <Table
           data={changeRequest}
           columns={[
             {
               key: 'changeId',
               title: 'Change ID',
               getSortingValue: row => row.id,
               render: row => (
                 <Button
                   onClick={() => {
                     handleOpenDetails();
                     showInfo(row.id);
                   }}
                   variant="text"
                   tooltip={row.id ?? ''}>
                   {row.id}
                 </Button>
               ),
             },
             ...tableColumns,
           ]}
           paginationSettings={{
             loadNext: onCompleted => {
               loadNext(PROJECTS_PAGE_SIZE, {
                 onComplete: () => onCompleted && onCompleted(),
               });
             },
             pageSize: PROJECTS_PAGE_SIZE,
             totalRowsCount: changeRequest.length,
           }}
         />
       </Grid>
     </Grid>
   );
 };
 
 export {ChangeRequestTypes};
 