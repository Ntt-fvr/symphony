/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import type {AutomationFlowsList_flows} from './__generated__/AutomationFlowsList_flows.graphql';

import * as React from 'react';
import {useState, useMemo} from 'react';
import AutomationFlowCard from './AutomationFlowCard';
import {createFragmentContainer, graphql} from 'react-relay';
import {makeStyles} from '@material-ui/styles';
import {
  buildPropertyFilterConfigs,
  getSelectedFilter,
} from '../../../comparison_view/FilterUtils';

import useLocationTypes from '../../../comparison_view/hooks/locationTypesHook';
import usePropertyFilters from '../../../comparison_view/hooks/propertiesHook';
import {AutomationFlowsSearchConfig} from '../../AutomationFlowsSearchConfig';
import PowerSearchBar from '../../../power_search/PowerSearchBar';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  filter: {
    width: '100%',
  },
  flowsList: {
    width: '100%',
    display: 'grid',
    gridGap: '16px',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

type Props = $ReadOnly<{|
  flows: AutomationFlowsList_flows,
|}>;

function AutomationFlowsList(props: Props) {
  const {flows} = props;
  const classes = useStyles();
  const [filters, setFilters] = useState([]);
  const [flowsAutomation, setFlowsAutomation] = useState(flows);

  const locationTypesFilterConfigs = useLocationTypes();
  const possibleProperties = usePropertyFilters('queryAutomationFlows');
  const projectPropertiesFilterConfigs = buildPropertyFilterConfigs(
    possibleProperties,
  );

  const filterConfigs = useMemo(
    () =>
      AutomationFlowsSearchConfig.map(ent => ent.filters)
        .reduce(
          (allFilters, currentFilter) => allFilters.concat(currentFilter),
          [],
        )
        .concat(locationTypesFilterConfigs ?? [])
        .concat(projectPropertiesFilterConfigs ?? []),
    [locationTypesFilterConfigs, projectPropertiesFilterConfigs],
  );

  const filterData = filters => {
    const arrayFilters = [];
    const data = {};
    const dataModify = flows.map(item => {
      delete item.writable;
      return {
        ...item,
      };
    });

    const filterRepeat = filters.filter(
      item => item.name === filters[filters.length - 1].name,
    );

    const filtersWithoutRepeating = filters.filter(
      item => item.name !== filters[filters.length - 1].name,
    );

    if (filterRepeat.length == 2) {
      filtersWithoutRepeating.push(filterRepeat[1]);
    }

    dataModify.map(function (filter) {
      filter.authorId = filter.author.id;
      filter.creationDate = moment(filter.creationDate).format('YYYY-MM-DD');
    });

    filters.map(function (filter) {
      if (filter.name == 'authorId') {
        data[filter.name] = item => filter.idSet.includes(item[filter.name]);
      } else {
        data[filter.name] = item =>
          filter.stringSet.includes(item[filter.name]);
      }

      arrayFilters.push(data[filter.name]);
    });
    const result = dataModify.filter(item => arrayFilters.every(f => f(item)));

    const arrayFilterSelected =
      filterRepeat.length == 2 ? filtersWithoutRepeating : filters;

    setFlowsAutomation(result);
    setFilters(arrayFilterSelected);
  };

  return flows.length > 0 ? (
    <div className={classes.filter}>
      <div className={classes.filter}>
        <PowerSearchBar
          placeholder="Filter"
          filterConfigs={filterConfigs}
          filterValues={filters}
          searchConfig={AutomationFlowsSearchConfig}
          exportPath={'/automation_flow'}
          entity={'AUTOMATION_FLOW'}
          onFiltersChanged={filters => {
            filterData(filters);
          }}
          getSelectedFilter={(filterConfig: FilterConfig) =>
            getSelectedFilter(filterConfig, possibleProperties ?? [])
          }
        />
      </div>
      <br></br>
      <div className={classes.flowsList}>
        {flowsAutomation.map(flow => (
          <AutomationFlowCard key={flow.id} flow={flow} />
        ))}
      </div>
    </div>
  ) : null;
}

export default createFragmentContainer(AutomationFlowsList, {
  flows: graphql`
    fragment AutomationFlowsList_flows on Flow @relay(plural: true) {
      id
      name
      description
      status
      newInstancesPolicy
      draft {
        id
        sameAsFlow
      }
      creationDate
      updateTime
      author {
        id
        firstName
        email
      }
      runningInstances
      failedInstances
      ...AutomationFlowCard_flow
    }
  `,
});
