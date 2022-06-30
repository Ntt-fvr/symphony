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
 import Button from '@symphony/design-system/components/Button';
 import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';
 import Text from '@symphony/design-system/components/Text';
 import symphony from '@symphony/design-system/theme/symphony';
 import {makeStyles} from '@material-ui/styles';
 import {withStyles} from '@material-ui/core/styles';
 
 const StyledTableCell = withStyles(() => ({
   head: {
     backgroundColor: 'white',
     color: symphony.palette.D500,
   },
 }))(TableCell);
 
 const StyledTableRow = withStyles(() => ({
   root: {
     '&:nth-of-type(odd)': {
       backgroundColor: '#F5F7FC',
     },
   },
 }))(TableRow);
 
 const useStyles = makeStyles(() => ({
   root: {
     width: '100%',
     boxShadow: symphony.shadows.DP2,
     marginBottom: '20px',
   },
   container: {
     maxHeight: '100%',
   },
 }));
 
 type Values = {
   resource: string,
   parameter: string,
   currentValue: string,
   newValue: string,
 };
 
 export type Props = $ReadOnly<{|
   className?: string,
   valuesTable: Array<Values>,
 |}>;
 
 const TableResource = (props: Props) => {
   const {valuesTable} = props;
   const classes = useStyles();
 
   return (
     <div className={classes.root}>
       <TableContainer className={classes.container}>
         <Table stickyHeader aria-label="sticky table">
           <TableHead>
             <TableRow>
               <StyledTableCell>Resource</StyledTableCell>
               <StyledTableCell>Parameter</StyledTableCell>
               {/* <StyledTableCell>Current value</StyledTableCell> */}
               <StyledTableCell>New value</StyledTableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {valuesTable?.map((item, index) => (
               <StyledTableRow key={index}>
                 <TableCell>
                   <Button variant="text">
                     <Text
                       useEllipsis={true}
                       variant={'subtitle1'}
                       weight={'medium'}
                       color={'primary'}>
                       {item.resources}
                     </Text>
                   </Button>
                 </TableCell>
                 <TableCell>{item.parameter}</TableCell>
                 <TableCell>{item.newValue}</TableCell>
               </StyledTableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
   );
 };
 export {TableResource};
 