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

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DragIndicatorIcon from '@fbcnms/ui/icons/DragIndicatorIcon';
import EnumPropertyValueInput from '../form/EnumPropertyValueInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import {Grid, MenuItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '20px',
  },
  container: {
    '& .MuiAccordionSummary-root': {
      padding: '5px 24px',
    },
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
    '& .MuiAccordionDetails-root': {
      padding: '0 28px 28px 28px',
    },
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#B8C2D3',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3984FF',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.75)',
    },
    '& .MuiFormControl-root': {
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3984FF',
      },
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: '7px',
      paddingBottom: '7px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
    },
    '& label': {
      fontSize: '14px',
      lineHeight: '8px',
    },
  },
  dragIndicatorIcon: {
    cursor: 'grab',
    '&&': {
      fontSize: '15px',
    },
  },
}));

type Props = $ReadOnly<{|
  nameForm: string,
|}>;

export default function RelationshipTypeItem(props: Props) {
  const {nameForm} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleOpen(event) {
    event.stopPropagation();
    setOpen(!open);
  }

  const options = [
    {id: '1', name: 'one'},
    {id: '2', name: 'two'},
    {id: '3', name: 'three'},
    {id: '4', name: 'four'},
    {id: '5', name: 'five'},
    {id: '6', name: 'six'},
  ];

  return (
    <>
      <div className={classes.root}>
        <Accordion
          className={classes.container}
          expanded={open}
          onChange={handleOpen}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Grid item xs={12}>
              <Text color="primary" useEllipsis={true} weight="bold">
                {nameForm} Definitions: {options.length + ' Relationships'}
              </Text>
            </Grid>
          </AccordionSummary>

          <AccordionDetails>
            <Grid item container xs>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {nameForm === 'Cards' ? null : (
                      <TableCell>
                        {nameForm} {nameForm === 'Vlan' ? 'Type' : 'Name'}
                      </TableCell>
                    )}
                    <TableCell>{nameForm} Specification</TableCell>
                    {nameForm === 'Vlan' && <TableCell>Quantity</TableCell>}
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell
                      style={{minWidth: '35px', width: '35px'}}
                      size="small"
                      padding="none"
                      component="div">
                      <div>
                        <DragIndicatorIcon
                          className={classes.dragIndicatorIcon}
                        />
                      </div>
                    </TableCell>
                    {nameForm === 'Cards' ? null : (
                      <TableCell>
                        <form className={classes.formField} autoComplete="off">
                          <TextField
                            label={nameForm}
                            variant="outlined"
                            name="name"
                            fullWidth
                          />
                        </form>
                      </TableCell>
                    )}
                    <TableCell>
                      {nameForm !== 'Cards' ? (
                        <form className={classes.formField} autoComplete="off">
                          <TextField
                            required
                            select
                            label={'Select ' + nameForm + ' Specifications'}
                            variant="outlined"
                            name={nameForm + 'specification'}
                            defaultValue=""
                            fullWidth>
                            {options.map((item, index) => (
                              <MenuItem key={index} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </form>
                      ) : (
                        <EnumPropertyValueInput
                          property={'property'}
                          onChange={'onChange'}
                          disabled={false}
                        />
                      )}
                    </TableCell>
                    {nameForm === 'Vlan' && (
                      <TableCell>
                        <form className={classes.formField} autoComplete="off">
                          <TextField
                            required
                            select
                            label={'Select ' + nameForm + ' Specifications'}
                            variant="outlined"
                            name={nameForm + 'specification'}
                            defaultValue=""
                            fullWidth>
                            {options.map((item, index) => (
                              <MenuItem key={index} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </form>
                      </TableCell>
                    )}
                    <TableCell>
                      <IconButton color="primary">
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Grid item xs={12} style={{marginTop: '8px'}}>
                <Button color="primary" disableRipple startIcon={<AddIcon />}>
                  Add Relationships
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
