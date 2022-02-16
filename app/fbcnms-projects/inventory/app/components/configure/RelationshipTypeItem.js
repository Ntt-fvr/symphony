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

import type {RelationshipTypeItemQuery} from './__generated__/RelationshipTypeItemQuery.graphql';
import type {ResourceSpecifications} from './EditResourceTypeItem';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import DragIndicatorIcon from '@fbcnms/ui/icons/DragIndicatorIcon';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Select from '@symphony/design-system/components/Select/Select';
import Text from '@symphony/design-system/components/Text';
import TextInput from '@symphony/design-system/components/Input/TextInput';
import symphony from '@symphony/design-system/theme/symphony';
import {Grid} from '@material-ui/core';
import {graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';
import {useLazyLoadQuery} from 'react-relay/hooks';

const ResourceSpecificationRelationshipsQuery = graphql`
  query RelationshipTypeItemQuery {
    resourceSpecificationRelationships {
      edges {
        node {
          id
          name
          resourceSpecification {
            id
            name
          }
        }
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiExpansionPanelSummary-root:hover': {
      cursor: 'default',
    },
    marginBottom: '12px',
  },
  container: {
    '& .MuiAccordionSummary-root': {
      padding: '11px 24px 11px 36px',
    },
    align: 'center',
    '&.MuiPaper-elevation1': {
      boxShadow: '0px 1px 4px 0px rgb(0 0 0 / 17%)',
    },
    '& .MuiAccordionDetails-root': {
      padding: '0 28px 28px 28px',
    },
  },
  nameRS: {
    paddingLeft: '49px',
  },
  buttonAdd: {
    '&.MuiButtonBase-root:hover': {
      backgroundColor: 'transparent',
      color: symphony.palette.B700,
    },
  },
  titleRs: {
    margin: '5px 0px 0px 0px',
    paddingBottom: '10px',
    borderBottom: '1px solid #D2DAE7',
  },
  inputsRs: {
    padding: '20px 0px 20px 0px',
    borderBottom: '1px solid #D2DAE7',
  },
  inputNameRs: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '15px',
    },
  },
  inputName: {
    width: '1110px',
    marginLeft: '20px',
  },
  selectNameRs: {
    display: 'flex',
    '& .MuiButton-text': {
      padding: 0,
      '& .MuiButton-startIcon': {
        margin: 0,
      },
    },
  },
  specification: {
    paddingLeft: '20px',
  },
}));

type Props = $ReadOnly<{|
  dataForm: ResourceSpecifications,
|}>;

export default function RelationshipTypeItem(props: Props) {
  const {dataForm} = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const data = useLazyLoadQuery<RelationshipTypeItemQuery>(
    ResourceSpecificationRelationshipsQuery,
    {},
  );

  const filterRelationshipsById = data.resourceSpecificationRelationships.edges
    .filter(item => item.node?.resourceSpecification.id === dataForm.id)
    .map(item => item.node);

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
      {filterRelationshipsById.map((item, index) => (
        <div className={classes.root}>
          <Accordion
            className={classes.container}
            expanded={open}
            onChange={handleOpen}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Grid container item xs={12}>
                <Grid
                  item
                  xs={4}
                  container
                  justify="flex-start"
                  alignItems="center">
                  <Text key={index} useEllipsis={true} weight="bold">
                    {item?.name}
                  </Text>
                </Grid>
                <Grid
                  item
                  xs={8}
                  container
                  justify="flex-start"
                  alignItems="center">
                  <Text useEllipsis={true} weight="bold">
                    {options.length + ' Relationships'}
                  </Text>
                </Grid>
              </Grid>
            </AccordionSummary>

            <AccordionDetails>
              <Grid container item xs={12}>
                <Grid className={classes.titleRs} container>
                  <Grid className={classes.nameRS} item xs={6}>
                    <Text>Name</Text>
                  </Grid>
                  <Grid className={classes.specification} item xs={5}>
                    <Text>Specification</Text>
                  </Grid>
                  <Grid container justify="flex-end" item xs={1}>
                    <Text>Delete</Text>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  {options.map((item, index) => (
                    <Grid key={index}>
                      <Grid className={classes.inputsRs} container item xs={12}>
                        <Grid className={classes.inputNameRs} item xs={6}>
                          <DragIndicatorIcon />
                          <TextInput
                            className={classes.inputName}
                            placeholder={'Name'}
                            value={item.name}
                            key={item.id}
                          />
                        </Grid>
                        <Grid className={classes.selectNameRs} item xs={6}>
                          <FormField className={classes.inputName}>
                            <Select
                              useEllipsis={false}
                              options={options.map(location => ({
                                key: location.id,
                                label: location.name,
                                value: location.id,
                              }))}
                              size="full"
                              onChange={() => {}}
                            />
                          </FormField>
                          <Button
                            children
                            color="primary"
                            disableRipple
                            startIcon={<DeleteOutlinedIcon />}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{marginTop: '30px', marginBottom: '5px'}}>
                  <Button
                    color="primary"
                    disableRipple
                    startIcon={<AddIcon />}
                    className={classes.buttonAdd}>
                    Add Resource Specification
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </>
  );
}