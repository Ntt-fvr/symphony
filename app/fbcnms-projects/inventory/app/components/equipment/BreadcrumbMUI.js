/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

 import type {Equipment} from '../../common/Equipment';
 import type {TextVariant} from '@symphony/design-system/theme/symphony';
 import type {WithStyles} from '@material-ui/core';
 
 import Breadcrumbs from '@material-ui/core/Breadcrumbs';
 //import Breadcrumbs from './Breadcrumbs';
 import React from 'react';
 import Text from '@symphony/design-system/components/Text';
 import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
 import {createFragmentContainer, graphql} from 'react-relay';
 import {withStyles} from '@material-ui/core/styles';
 import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
 

 import nullthrows from '@fbcnms/util/nullthrows';
 

 function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

 const styles = theme => ({
   breadcrumbs: {
     display:'contents', //'flex',
     alignItems:'center', //'flex-start',
   },
   position: {
     display: 'flex',
     marginLeft: '4px',
   },
   positionName: {
     fontSize: theme.typography.pxToRem(13),
   },
   equipmentType: {
     fontSize: theme.typography.pxToRem(13),
     marginRight: '4px',
   },
   equipmentSubtext: {
     display:'contents', //'flex',
     alignItems: 'center',
   },
   seperator: {
     lineHeight: '16px',
   },
   Link:{
    'font-size':'20px',
    color: '#8895AD',
    '&:hover':{
      color: '#3984FF'
    }
   },
   hover: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
    cursor: 'pointer',
  },
  Typography:{
    'font-size':'20px',
  
  }

 });
 
 type Props = {|
   equipment: Equipment,
   onParentLocationClicked?: (locationId: string) => void,
   onEquipmentClicked?: (equipmentId: string) => void,
   size?: 'default' | 'small' | 'large',
   showSelfEquipment: boolean,
   textClassName?: string,
   variant?: TextVariant,
 |} & WithStyles<typeof styles>;
 
 const EquipmentBreadcrumbsMUI = (props: Props) => {
   const {
     classes,
     equipment,
     onEquipmentClicked,
     onParentLocationClicked,
     size,
     showSelfEquipment,
     textClassName,
     variant,
   } = props;
 
   const positionSubText = pos => (
     <div className={classes.equipmentSubtext}>
       <Text className={classes.equipmentType}>
         {pos.parentEquipment.equipmentType.name}
       </Text>
       <Text className={classes.seperator} variant="body2">
         &#8226;
       </Text>
       <div className={classes.position}>
         <Text className={classes.positionName}>{pos.definition.name}</Text>
       </div>
     </div>
   );
 
   const onLocationClickedCallback = locationId => {
     ServerLogger.info(LogEvents.EQUIPMENT_CARD_LOCATION_BREADCRUMB_CLICKED, {
       locationId,
     });
     onParentLocationClicked && onParentLocationClicked(locationId);
   };
   const onEquipmentClickedCallback = id => {
     ServerLogger.info(LogEvents.EQUIPMENT_CARD_EQUIPMENT_BREADCRUMB_CLICKED, {
       equipmentId: id,
     });
     onEquipmentClicked && onEquipmentClicked(id);
   };
   const breadcrumbs = [
     ...(equipment.locationHierarchy ?? []).map(l => ({
       id: l.id,
       name: l.name,
       subtext: size === 'small' ? null : l.locationType.name,
       ...(onParentLocationClicked && {
         onClick: () => onLocationClickedCallback(l.id),
       }),
     })),
     ...(equipment.positionHierarchy ?? []).map(pos => ({
       id: pos.id,
       name: nullthrows(pos.parentEquipment).name,
       subtext: size === 'small' ? null : positionSubText(pos),
       ...(onEquipmentClicked && {
         onClick: () =>
           onEquipmentClickedCallback(nullthrows(pos.parentEquipment).id),
       }),
     })),
     ...(showSelfEquipment
       ? [
           {
             id: equipment.id,
             name: equipment.name,
             subtext: size === 'small' ? null : equipment.equipmentType.name,
             ...(onEquipmentClicked && {
               onClick: () => onEquipmentClickedCallback(equipment.id),
             }),
           },
         ]
       : []),
   ];
   console.log("mensaje");
   //console.log(breadcrumbs);
   //console.log(breadcrumbs[1].name);
   console.log(breadcrumbs[1]);
   console.log(breadcrumbs[1].onClick);
   return (
    
      <>
      <Breadcrumbs maxItems={5} aria-label="breadcrumb">
          { breadcrumbs.length===0 ? (
        <h3>No equipments</h3>
       ):(
         breadcrumbs.slice(0,breadcrumbs.length-1).map((el, index)=>(
         
         
         <Tooltip 
          arrow
          interactive
          placement="top"
         title={
          <Text variant="caption" color="light">
          {/*{el.name}<br/>*/}
          {el.subtext}
        </Text>
          }>
        
          <Link color="inherit" underline="none" href="#" onClick={el.onClick} className={classes.Link}> {el.name}</Link>      
          </Tooltip>
            ))         
         )}
              
              <Tooltip 
          arrow
          interactive
          placement="top"
         title={
          <Text variant="caption" color="light">
          {/*{el.name}<br/>*/}
          {breadcrumbs[breadcrumbs.length-1].subtext}
        </Text>
          }>
        
        <Typography color="textPrimary" style={{'font-size':'20px'}}>{breadcrumbs[breadcrumbs.length-1].name}</Typography> 
        </Tooltip>
    
        </Breadcrumbs>
        </>
   );
 }
 
 EquipmentBreadcrumbsMUI.defaultProps = {
   size: 'default',
   showSelfEquipment: true,
 };
 
 export default withStyles(styles)(
   createFragmentContainer(EquipmentBreadcrumbsMUI, {
     equipment: graphql`
       fragment EquipmentBreadcrumbs_equipment on Equipment {
         id
         name
         equipmentType {
           id
           name
         }
         locationHierarchy {
           id
           name
           locationType {
             name
           }
         }
         positionHierarchy {
           id
           definition {
             id
             name
             visibleLabel
           }
           parentEquipment {
             id
             name
             equipmentType {
               id
               name
             }
           }
         }
       }
     `,
   }),
 );
 