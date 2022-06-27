/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import AddEditResourceInLocation from './AddEditResourceInLocation';
import Button from '@symphony/design-system/components/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import ModalSteper from './ModalSteper';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ResourcePropertiesCard from './ResourcePropertiesCard';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import symphony from '@symphony/design-system/theme/symphony';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '20px',
    '& .MuiCardHeader-root': {
      padding: 0,
    },
  },
  cardHeader: {
    '& .MuiCardHeader-action': {
      margin: 0,
    },
    '& .MuiCardHeader-title': {
      fontSize: '20px',
    },
  },
  tableTitle: {
    fontSize: '1rem',
    color: theme.palette.primary.main,
  },
}));

const ResourceCardListQuery = graphql`
  query ResourceCardQuery {
    queryResource {
      id
      name
      locatedIn
      resourceSpecification
      lifecycleStatus
      typePlanningSubStatus
      planningSubStatus
      usageSubStatus
      operationalSubStatus
    }
    resourceTypes {
      edges {
        node {
          id
          name
        }
      }
    }
    resourceSpecifications {
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

type Props = $ReadOnly<{|
  mode?: string,
  onAddResource: (selectedResourceType: {}) => void,
  onEditResource: void => void,
  onResourceSelected: (selectedResourceId: string) => void,
  onCancel: () => void,
  selectedResourceType: {},
  selectedLocationId: ?string,
  selectedResourceId: ?string,
|}>;

const ResourceCard = (props: Props) => {
  const {
    mode,
    onAddResource,
    onEditResource,
    onResourceSelected,
    selectedResourceType,
    onCancel,
    selectedLocationId,
    selectedResourceId,
  } = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [resourceTypes, setResourceTypes] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, ResourceCardListQuery, {}).then(data => {
      setResourceTypes(data);
    });
  }, [setResourceTypes]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  const filterDataById = resourceTypes?.queryResource?.filter(
    item => item.locatedIn === selectedLocationId,
  );

  const editResource = resources => {
    onEditResource(setDataEdit(resources));
  };

  switch (mode) {
    case 'add':
      return (
        <AddEditResourceInLocation
          dataformModal={selectedResourceType}
          selectedLocationId={selectedLocationId}
          isCompleted={isCompleted}
          closeFormAddEdit={onCancel}
        />
      );
    case 'edit':
      return (
        <AddEditResourceInLocation
          dataformModal={dataEdit}
          selectedLocationId={selectedLocationId}
          isCompleted={isCompleted}
          closeFormAddEdit={onCancel}
        />
      );
    case 'show':
      return (
        <ResourcePropertiesCard
          selectedResourceId={selectedResourceId}
          onAddResourceSlot={onAddResource}
          onEditResource={editResource}
          dataListStepper={resourceTypes}
        />
      );
    default:
      return (
        <div className={classes.root}>
          <Card>
            <CardHeader
              className={classes.cardHeader}
              title="Resources"
              action={
                <Button
                  onClick={() => {
                    onAddResource;
                    setOpenDialog(true);
                  }}>
                  Add Resource
                </Button>
              }
            />
            <CardContent>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableTitle}>Name</TableCell>
                      <TableCell className={classes.tableTitle}>
                        Specification
                      </TableCell>
                      <TableCell className={classes.tableTitle}>Type</TableCell>
                      <TableCell className={classes.tableTitle}>
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filterDataById
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((item, index) => (
                        <TableRow tabIndex={-1} key={index}>
                          <TableCell>
                            <Button
                              variant="text"
                              onClick={() => onResourceSelected(item.id)}>
                              <Typography>{item.name}</Typography>
                            </Button>
                          </TableCell>
                          <TableCell>specificationFalse</TableCell>
                          <TableCell>TypeFalse</TableCell>
                          <TableCell>
                            <IconButton>
                              <DeleteOutlinedIcon
                                style={{color: symphony.palette.B600}}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={!filterDataById ? 0 : filterDataById?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
          {openDialog && (
            <ModalSteper
              openModal={openDialog}
              onClose={() => setOpenDialog(false)}
              dataListStepper={resourceTypes}
              saveModal={onAddResource}
              titleSteps={['Resource type', 'Resource specification']}
            />
          )}
        </div>
      );
  }
};

export default ResourceCard;
