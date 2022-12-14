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
import ModalDelete from './ModalDelete';
import ModalSteper from './ModalSteper';
import React, {useCallback, useEffect, useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ResourcePropertiesCard from './ResourcePropertiesCard';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import symphony from '@symphony/design-system/theme/symphony';
import {camelCase, startCase} from 'lodash';
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
  container: {
    maxHeight: 440,
    margin: '10px 0',
  },
}));
const ResourceCardListQuery = graphql`
  query ResourceCardQuery {
    queryResource {
      id
      name
      isDeleted
      resourceSpecification
      locatedIn
      isDeleted
      lifecycleStatus
      administrativeSubStatus
      planningSubStatus
      usageSubStatus
      operationalSubStatus
      belongsTo {
        id
      }
    }
    resourceTypes {
      edges {
        node {
          id
          name
          resourceSpecification {
            id
            name
            resourcePropertyTypes {
              id
              name
              type
              stringValue
              intValue
              booleanValue
              floatValue
              latitudeValue
              longitudeValue
              rangeFromValue
              rangeToValue
              isMandatory
              isInstanceProperty
            }
            resourceSpecificationRelationship {
              id
              name
              resourceSpecification {
                id
              }
            }
          }
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
  const [openDelete, setOpenDelete] = useState(false);
  const [infoResource, setInfoResource] = useState({});

  useEffect(() => {
    isCompleted();
  }, []);

  const isCompleted = useCallback(() => {
    fetchQuery(RelayEnvironment, ResourceCardListQuery, {}).then(data => {
      setResourceTypes(data);
    });
  }, [setResourceTypes]);
  const editResource = resources => {
    onEditResource(setDataEdit(resources));
  };
  const nameResourceType = new Map(
    resourceTypes?.resourceSpecifications?.edges.map(data => [
      data.node.id,
      data.node.resourceType.name,
    ]),
  );
  const nameSpecification = new Map(
    resourceTypes?.resourceSpecifications?.edges.map(data => [
      data.node.id,
      data.node.name,
    ]),
  );
  const resourceId = resourceTypes?.queryResource?.map(data => ({
    items: [
      {
        id: data.resourceSpecification,
        idResource: data.id,
        nameResource: data.name,
        locationId: data.locatedIn,
        belongsTo: data.belongsTo,
        status: data.lifecycleStatus,
      },
    ],
  }));
  const mapResources = ({items, ...rest}) => ({
    ...rest,
    data: items?.map(data =>
      (nameResourceType.has(data.id), nameSpecification.has(data.id))
        ? {
            ...data,
            nameResourceType: nameResourceType.get(data.id),
            nameSpecification: nameSpecification.get(data.id),
          }
        : data,
    ),
  });
  const newArrayDataForm = resourceId
    ?.map(mapResources)
    ?.filter(
      data =>
        data.data[0].locationId === selectedLocationId &&
        !data.data[0].belongsTo &&
        data.data[0].status !== 'RETIRING',
    );
  switch (mode) {
    case 'add':
      return (
        <AddEditResourceInLocation
          dataformModal={selectedResourceType}
          selectedLocationId={selectedLocationId}
          isCompleted={isCompleted}
          closeFormAddEdit={onCancel}
          mode="add"
        />
      );
    case 'edit':
      return (
        <AddEditResourceInLocation
          dataformModal={dataEdit}
          selectedLocationId={selectedLocationId}
          isCompleted={isCompleted}
          closeFormAddEdit={onCancel}
          mode="edit"
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
            {!newArrayDataForm?.length ? null : (
              <CardContent>
                <TableContainer className={classes.container}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableTitle}>
                          Name
                        </TableCell>
                        <TableCell className={classes.tableTitle}>
                          Specification
                        </TableCell>
                        <TableCell className={classes.tableTitle}>
                          Type
                        </TableCell>
                        <TableCell className={classes.tableTitle}>
                          Lifecycle Status
                        </TableCell>
                        <TableCell className={classes.tableTitle}>
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newArrayDataForm?.flatMap((item, index) => (
                        <TableRow hover key={index}>
                          <TableCell>
                            <Button
                              variant="text"
                              onClick={() =>
                                onResourceSelected(item.data[0].idResource)
                              }>
                              <Typography>
                                {item.data[0].nameResource}
                              </Typography>
                            </Button>
                          </TableCell>
                          <TableCell>
                            {item.data[0].nameSpecification}
                          </TableCell>
                          <TableCell>{item.data[0].nameResourceType}</TableCell>
                          <TableCell>
                            {startCase(camelCase(item?.data[0]?.status))}
                          </TableCell>
                          <TableCell>
                            <IconButton>
                              <DeleteOutlinedIcon
                                style={{color: symphony.palette.B600}}
                                onClick={() => {
                                  setOpenDelete(true);
                                  setInfoResource(item.data[0]);
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            )}
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
          {openDelete && (
            <ModalDelete
              openModal={openDelete}
              onClose={() => setOpenDelete(false)}
              infoResource={infoResource}
              isCompleted={isCompleted}
            />
          )}
        </div>
      );
  }
};
export default ResourceCard;
