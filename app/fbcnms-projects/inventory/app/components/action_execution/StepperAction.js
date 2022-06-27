/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import ActionPickerScheduled from './ActionPickerScheduled';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import PowerSearchBar from '../power_search/PowerSearchBar';
import React, {useState} from 'react';
import RelayEnvironment from '../../common/RelayEnvironment';
import ResourceFilterDropDown from './resource-filter/ResourceFilterDropDown';
import Table from '@symphony/design-system/components/Table/Table';
import Text from '@symphony/design-system/components/Text';
import TextField from '@material-ui/core/TextField';
import symphony from '@symphony/design-system/theme/symphony';
import {Checkbox} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {ResourceCriteriaConfig} from './resource-filter/ResourceCriteriaConfig';
import {StepToStep} from './StepToStep';
import {fetchQuery, graphql} from 'relay-runtime';
import {getSelectedFilter} from '../comparison_view/FilterUtils';
import {makeStyles} from '@material-ui/styles';

import {useValidation} from '../assurance/common/useValidation';

const useStyles = makeStyles(() => ({
  root: {},
  CardContiner: {
    padding: '0',
  },
  titleCard: {
    color: symphony.palette.D400,
    paddingBottom: '16px',
  },
  subTitle: {
    color: symphony.palette.D400,
  },
  formField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.D200,
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: symphony.palette.B600,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -3px) scale(0.85)',
    },
    '& .MuiFormControl-root': {
      marginBottom: '36px',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: symphony.palette.B600,
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
  option: {
    width: '75px',
    height: '36px',
    marginLeft: '24px',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 43, 0.15)',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  backgroundWhite: {
    backgroundColor: 'white',
  },
  searchArea: {
    backgroundColor: symphony.palette.D10,
  },
  selectField: {
    width: '200px',
    '& .MuiSelect-selectMenu ': {
      height: '16px',
    },
  },
  tableInside: {
    height: '280px',
  },
}));

const queryResource = graphql`
  query StepperActionQuery($filter: ResourceFilter) {
    queryResource(filter: $filter) {
      id
      locatedIn
      resourceSpecification
      name
    }
  }
`;

const queryActionTemplate = graphql`
  query StepperActionTemplateQuery($filter: ActionTemplateFilter) {
    queryActionTemplate(filter: $filter) {
      id
      name
    }
  }
`;
type Props = $ReadOnly<{|
  open?: boolean,
  onClose?: () => void,
  names?: [],
  closeForm?: () => void,
  returnSheduledAction?: () => void,
  resourceSpecs?: [],
|}>;

const tableColumns = [
  {
    key: 'location',
    title: 'Location',
    getSortingValue: row => row.location,
    render: row => (
      <Button color="primary" variant="text" tooltip={row.location ?? ''}>
        {row?.locatedIn}
      </Button>
    ),
  },
];

const StepperAction = (props: Props) => {
  const {returnSheduledAction, closeForm, names, resourceSpecs} = props;

  const activeStep = 1;
  const [selectedSpecification, setSelectedSpecification] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [resourceData, setResourceData] = useState([]);
  const [actionTemplates, setActionTemplates] = useState([]);
  const [filters, setFiltes] = useState([]);
  const [selectedAction, setSelectedAction] = useState();
  const [checkedResource, setCheckedResource] = useState([]);
  const [openActionPickerScheduled, setOpenActionPickerScheduled] = useState(
    true,
  );

  const validationName = useValidation(name, names, 'Action');

  const handleConfirmDate = () => {
    setOpenActionPickerScheduled(prevStatePicker => !prevStatePicker);
  };
  const filterConfigs = ResourceCriteriaConfig.map(ent => ent.filters).reduce(
    (allFilters, currentFilter) => allFilters.concat(currentFilter),
    [],
  );
  const onFiltersChanged = data => {
    setFiltes(data);
    updateTableData(selectedSpecification, data);
  };

  const updateTableData = (specification, filtersData) => {
    fetchQuery(RelayEnvironment, queryResource, {
      filter: {
        resourceSpecification: {
          eq: specification,
        },
        id:
          filtersData?.filter(item => item.key == 'id')?.length > 0
            ? filtersData
                ?.filter(item => item.key == 'id')
                .map(i => i.name.join())
            : null,
        name:
          filtersData?.filter(item => item.key == 'name')?.length > 0
            ? {
                in: filtersData
                  ?.filter(item => item.key == 'name')
                  .map(i => i.name.join()),
              }
            : null,
      },
    }).then(data => {
      setResourceData(
        data.queryResource.map(item => {
          return {
            ...item,
            selected: false,
          };
        }),
      );
    });
    fetchQuery(RelayEnvironment, queryActionTemplate, {
      filter: {
        resourceSpecifications: {
          eq: specification,
        },
      },
    }).then(data => {
      setActionTemplates(data.queryActionTemplate);
    });
  };

  const handleSpecification = (type, spec) => {
    setSelectedSpecification(spec);
    updateTableData(spec, filters);
  };

  const handleChecked = (id, value) => {
    const index = resourceData.findIndex(item => item.id == id);
    if (value) {
      setCheckedResource([
        {id: resourceData?.find(item => item.id == id).id},
        ...checkedResource,
      ]);
    } else {
      setCheckedResource(checkedResource?.filter(item => item.id != id));
    }
    setResourceData([
      ...resourceData.slice(0, index),
      {
        ...resourceData[index],
        selected: value,
      },
      ...resourceData.slice(index + 1),
    ]);
  };

  const handleCheckedAll = value => {
    if (value) {
      setCheckedResource(
        resourceData.map(item => {
          return {id: item?.id};
        }),
      );
    } else {
      setCheckedResource([]);
    }
    setResourceData(
      resourceData.map(item => {
        return {
          ...item,
          selected: value,
        };
      }),
    );
  };

  const classes = useStyles();

  const formData = () => {
    return {
      name,
      description,
      status: 'ACTIVED',
      resources: checkedResource,
      actionTemplate: {
        id: selectedAction,
        name: actionTemplates.find(template => template.id == selectedAction)
          .name,
      },
    };
  };

  const handleDisabled = () => {
    return !(
      name &&
      description &&
      checkedResource?.length > 0 &&
      selectedAction &&
      !names.includes(name)
    );
  };

  return (
    <div>
      <Grid item xs={12}>
        <Card className={classes.CardContiner}>
          <Grid
            style={{
              marginBottom: '22px',
              borderBottom: '1px solid',
              color: symphony.palette.D100,
            }}
            container
            justify={'center'}>
            <StepToStep activeStep={activeStep} />
          </Grid>
          {openActionPickerScheduled ? (
            <div>
              <Grid style={{marginBottom: '26px'}} container direction="column">
                <Text className={classes.titleCard} variant="h6" weight="bold">
                  Define the behavior of the action
                </Text>
                <Text className={classes.subTitle} variant="subtitle2">
                  Use the filter to find resources to apply the actions
                </Text>
              </Grid>
              <Grid
                style={{
                  paddingBottom: '19px',
                  marginBottom: '30px',
                  borderBottom: '1px solid',
                  color: symphony.palette.D100,
                }}
                container
                direction="row"
                spacing={3}>
                <Grid item xs={5}>
                  <TextField
                    {...validationName}
                    className={classes.formField}
                    required
                    label="Name"
                    fullWidth
                    name="name"
                    autoComplete="off"
                    variant="outlined"
                    value={name}
                    onChange={({target}) => {
                      setName(target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    className={classes.formField}
                    required
                    label="Description"
                    fullWidth
                    name="description"
                    autoComplete="off"
                    variant="outlined"
                    value={description}
                    onChange={({target}) => setDescription(target.value)}
                  />
                </Grid>
              </Grid>
              <Grid style={{marginBottom: '40px'}} item xs={12}>
                <div className={classes.searchArea}>
                  <div className={classes.searchBar}>
                    <Grid div className={classes.backgroundWhite}>
                      <ResourceFilterDropDown
                        onEntitySelected={(type, spec) =>
                          handleSpecification(type, spec)
                        }
                      />
                    </Grid>
                    <Divider orientation="vertical" />
                    <PowerSearchBar
                      filterValues={filters}
                      placeholder="Filter Resource Type"
                      getSelectedFilter={filterConfig =>
                        getSelectedFilter(filterConfig, [])
                      }
                      onFiltersChanged={onFiltersChanged}
                      filterConfigs={filterConfigs}
                      searchConfig={ResourceCriteriaConfig}
                      entity={'SERVICE'}
                      resourceSpecification={selectedSpecification}
                    />
                  </div>
                </div>
              </Grid>
              <Grid
                style={{marginBottom: '20px'}}
                container
                justify="space-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={resourceData.length == checkedResource.length}
                      inputProps={{'aria-label': 'secondary checkbox'}}
                      onChange={({target}) => handleCheckedAll(target.checked)}
                    />
                  }
                  label="Select All"
                />
                <TextField
                  required
                  id="outlined-select-family"
                  select
                  className={classes.selectField}
                  label="Action"
                  name="family"
                  value={selectedAction ?? ''}
                  variant="outlined"
                  onChange={({target}) => {
                    setSelectedAction(target.value);
                  }}>
                  {actionTemplates?.map(template => (
                    <MenuItem key={template?.id} value={template?.id}>
                      {template?.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} style={{margin: '20px 0 20px 0'}}>
                <Table
                  className={classes.tableInside}
                  data={resourceData}
                  columns={[
                    {
                      key: 'id',
                      title: 'ID',
                      getSortingValue: row => row.id,
                      render: row => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={row.selected}
                              color="primary"
                              inputProps={{'aria-label': 'secondary checkbox'}}
                              onChange={event =>
                                handleChecked(row.id, event.target.checked)
                              }
                            />
                          }
                          label={<Button color="primary">{row.id}</Button>}
                        />
                      ),
                    },
                    ...tableColumns,
                  ]}
                />
              </Grid>
              <Grid container justify="flex-end">
                <Button
                  className={classes.option}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    returnSheduledAction();
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleConfirmDate();
                  }}
                  className={classes.option}
                  variant="contained"
                  disabled={handleDisabled()}
                  color="primary">
                  Next
                </Button>
              </Grid>
            </div>
          ) : (
            <ActionPickerScheduled
              goBack={handleConfirmDate}
              formData={formData()}
              nameValid={!names.includes(name)}
              closeForm={closeForm}
              resourceSpec={
                resourceSpecs.find(item => item.id == selectedSpecification)
                  .name
              }
            />
          )}
        </Card>
      </Grid>
    </div>
  );
};

export default StepperAction;
