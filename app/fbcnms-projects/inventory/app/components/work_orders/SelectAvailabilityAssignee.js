/*[object Object]*/

import type {WorkOrderStatus as GraphQLStatusType} from './__generated__/WorkOrderDetails_workOrder.graphql';

import type {ShortUser} from '../../common/EntUtils';

import Button from '@symphony/design-system/components/Button';
import CalendarTodayIcon from '@material-ui/core/SvgIcon';
import ExpandingPanel from '@fbcnms/ui/components/ExpandingPanel';
import FormField from '@symphony/design-system/components/FormField/FormField';
import OrganizationTypeahead from '../typeahead/OrganizationTypeahead';
import React, {useState} from 'react';
import Select from '@symphony/design-system/components/Select/Select';
import UserByAppointmentTypeahead from '../typeahead/UserByAppointmentTypeahead';
import UserTypeahead from '../typeahead/UserTypeahead';
import {DateTimePicker} from '@material-ui/pickers';
import {WorkOrder} from '../../common/WorkOrder';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  input: {
    paddingBottom: '15px',
  },
  inputFilter: {
    paddingBottom: '22px',
  },
  filterButton: {
    width: '87px',
    alignSelf: 'flex-end',
    marginTop: '30px',
  },
  calendarButton: {
    width: '132px',
    alignSelf: 'flex-end',
  },
  dense: {
    paddingTop: '9px',
    paddingBottom: '9px',
    height: '14px',
  },
}));

type Props = $ReadOnly<{|
  statusValues: Array<{|
    key: string,
    value: GraphQLStatusType,
    label: string,
  |}>,
  workOrder: WorkOrder,
  _setWorkOrderDetail: () => void,
  setAppointmentData: () => void,
|}>;

const SelectAvailabilityAssignee = (props: Props) => {
  const {
    statusValues,
    workOrder,
    _setWorkOrderDetail,
    setAppointmentData,
  } = props;

  const classes = useStyles();
  const [slotStartDate, setSlotStartDate] = useState(new Date());
  const [slotEndDate, setSlotEndDate] = useState(new Date());
  const [duration, setDuration] = useState('0');
  const [useFilters, setUseFilters] = useState(false);

  const setInfo = (label: string, user: ShortUser) => {
    _setWorkOrderDetail(label, user);
    setAppointmentData({duration, date: slotStartDate.toISOString()});
  };

  const applyFilters = () => {
    setUseFilters(true);
  };

  return (
    <ExpandingPanel title="Select availabilty assignee">
      <Button
        variant="text"
        leftIcon={CalendarTodayIcon}
        className={classes.calendarButton}>
        View Calendar
      </Button>
      {/*<SchedulingQueryRenderer />*/}
      <FormField label="Time slot start">
        <DateTimePicker
          variant="inline"
          inputVariant="outlined"
          value={slotStartDate}
          onChange={setSlotStartDate}
          className={classes.inputFilter}
        />
      </FormField>
      <FormField label="Time slot end">
        <DateTimePicker
          variant="inline"
          inputVariant="outlined"
          value={slotEndDate}
          onChange={setSlotEndDate}
          className={classes.inputFilter}
        />
      </FormField>
      <FormField label="Duration">
        <Select
          options={[
            {key: '0 hr', label: '0 hr', value: '0'},
            {key: '0.5 hr', label: '0.5 hr', value: '0.5'},
            {key: '1 hr', label: '1 hr', value: '1'},
            {key: '1.5 hr', label: '1.5 hr', value: '1.5'},
            {key: '2 hr', label: '2 hr', value: '2'},
            {key: '2.5 hr', label: '2.5 hr', value: '2.5'},
          ]}
          selectedValue={duration}
          className={classes.inputFilter}
          onChange={setDuration}
        />
      </FormField>
      <Button className={classes.filterButton} onClick={applyFilters}>
        Filter
      </Button>
      <FormField className={classes.input} label="Organization">
        <OrganizationTypeahead
          onOrganizationSelected={organization =>
            _setWorkOrderDetail('organizationFk', organization)
          }
          margin="dense"
        />
      </FormField>
      <FormField className={classes.input} label="Owner">
        <Select
          options={statusValues}
          selectedValue={workOrder.status}
          onChange={value => {}}
        />
      </FormField>
      <FormField className={classes.input} label="Assignee">
        {useFilters ? (
          <UserByAppointmentTypeahead
            onUserSelection={user => setInfo('assignedTo', user)}
            slotStartDate={slotStartDate.toISOString()}
            slotEndDate={slotEndDate.toISOString()}
            duration={duration}
            margin="dense"
          />
        ) : (
          <UserTypeahead
            onUserSelection={user => _setWorkOrderDetail('assignedTo', user)}
            margin="dense"
          />
        )}
      </FormField>
    </ExpandingPanel>
  );
};

export default SelectAvailabilityAssignee;
