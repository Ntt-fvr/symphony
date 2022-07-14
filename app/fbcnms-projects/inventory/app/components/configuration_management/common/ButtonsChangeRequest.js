/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */
 import Button from '@material-ui/core/Button';
 import React from 'react';
 import {Grid} from '@material-ui/core';
 import {makeStyles} from '@material-ui/styles';
 import Select from '@symphony/design-system/components/Select/Select';
 import {uploadFileNifi} from '../../FileUpload/FileUploadUtilsNifi';
 import shortid from 'shortid';
 import {csvToArray, csvToHeader, ValidateHeader} from '../csvToArray';
 import SnackbarItem from '@fbcnms/ui/components/SnackbarItem';
 import {useEnqueueSnackbar} from '@fbcnms/ui/hooks/useSnackbar';
 const useStyles = makeStyles(() => ({
   root: {
     flexGrow: '0',
     margin: '0',
   },
 }));
 const valuesNF = [
   {
     key: 'enrichment-data',
     value: 'enrichment-data',
     label: 'enrichment-data',
   },
   {
     key: 'nf-initial-parameters',
     value: 'nf-initial-parameters',
     label: 'nf-initial-parameters',
   },
 ];
 const headerCSV = ['resources', 'parameter', 'newValue'];
 export type MouseEventHandler = (
   SyntheticMouseEvent<HTMLElement>,
 ) => void | Promise<void>;
 export type ButtonVariant = 'contained' | 'outlined';
 export type ButtonColor = 'default' | 'inherit' | 'primary' | 'secondary';
 export type Props = $ReadOnly<{|
   className?: string,
   onClickBulk?: ?MouseEventHandler,
   onClickNf?: ?MouseEventHandler,
   disabled?: boolean,
   color?: ButtonColor,
   variant?: ButtonVariant,
 |}>;
 const ButtonsChangeRequest = (props: Props) => {
   const {
     className,
     disabled,
     onClickBulk,
     onClickNf,
     color = 'primary',
     variant = 'contained',
   } = props;
   const classes = useStyles();
   const enqueueSnackbar = useEnqueueSnackbar();
   const messageStatusFile = (message, variant) => {
     enqueueSnackbar(message, {
       children: key => (
         <SnackbarItem id={key} message={message} variant={variant} />
       ),
     });
   };
   const fileValidate = value => {
     const input = document.createElement('input');
     input.type = 'file';
     input.accept = '.csv';
     input.onchange = e => {
       const file = e.target.files[0];
       const fileId = shortid.generate();
       if (value == 'enrichment-data') {
         const blob = file.slice(0, file.size, file.type);
         const renameFile = new File([blob], `nifi-${file.name}`, {
           type: file.type,
         });
         const uploadFile = uploadFileNifi(fileId, renameFile);
         if (uploadFile) {
           messageStatusFile('File successfully loaded', 'success');
         } else {
           messageStatusFile('Error loading file', 'error');
         }
       } else {
         const reader = new FileReader();
         reader.onload = function (e) {
           const text = e.target.result;
           if (ValidateHeader(text, ',', headerCSV)) {
             onClickBulk(csvToArray(text), file.name);
           } else {
             messageStatusFile('Invalid file header', 'error');
           }
         };
         reader.readAsText(file);
       }
     };
     input.click();
   };
   return (
     <Grid className={classes.root}>
       <Select
         options={valuesNF}
         onChange={value => fileValidate(value)}
         label="NF Initial Configuration"
       />
       <Button
         onClick={onClickBulk}
         disabled={disabled}
         style={{padding: '10px 16px', margin: '0 0 0 20px'}}
         variant={variant}
         color={color}
         onClick={() => fileValidate('')}>
         Create bulk request
       </Button>
     </Grid>
   );
 };
 export default ButtonsChangeRequest;