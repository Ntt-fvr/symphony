/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {FilterProps} from '../comparison_view/ComparisonViewTypes';

import * as React from 'react';
import {useEffect, useState} from 'react';
import MutipleSelectInput from '../comparison_view/MutipleSelectInput';
import PowerSearchFilter from '../comparison_view/PowerSearchFilter';
import {priorityValues} from '../../common/FilterTypes';
import {fetchQuery, graphql} from 'relay-runtime';
import RelayEnvironment from '../../common/RelayEnvironment';

const PowerSearcChangeRequestResourceFilterQuery = graphql`
  query PowerSearchChangeRequestResourceFilterQuery {
    resourceTypes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const PowerSearchChangeRequestResourceFilter = (props: FilterProps) => {
  const {
    value,
    onInputBlurred,
    onValueChanged,
    onRemoveFilter,
    editMode,
  } = props;

  const [valuesType, setValuesType] = useState([]);

  useEffect(() => {
    fetchQuery(
      RelayEnvironment,
      PowerSearcChangeRequestResourceFilterQuery,
      {},
    ).then(data => {
      const dataModify = data.resourceTypes.edges.map(item => {
        delete item.writable;
        return {
          ...item,
        };
      });
      dataModify.forEach(item => {
        item.key = item.node.name;
        item.value = item.node.name;
        item.label = item.node.name;
      });
      setValuesType(dataModify);
    });
  }, []);
  return (
    <PowerSearchFilter
      name="Resource Type"
      operator={value.operator}
      editMode={editMode}
      onRemoveFilter={onRemoveFilter}
      value={(value.stringSet ?? [])
        .map(
          value => valuesType.find(priority => priority.value === value)?.label,
        )
        .join(', ')}
      input={
        <MutipleSelectInput
          options={valuesType}
          onSubmit={onInputBlurred}
          onBlur={onInputBlurred}
          value={value.stringSet ?? []}
          onChange={newName =>
            onValueChanged({
              id: value.id,
              key: value.key,
              name: value.name,
              operator: value.operator,
              stringSet: newName,
            })
          }
        />
      }
    />
  );
};

export default PowerSearchChangeRequestResourceFilter;
