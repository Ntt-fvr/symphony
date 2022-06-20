/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import PowerSearchFilter from '../../comparison_view/PowerSearchFilter';
import React, {useEffect, useState} from 'react';
import RelayEnvironment from '../../../common/RelayEnvironment';
import Tokenizer from '@fbcnms/ui/components/Tokenizer';
import {fetchQuery, graphql} from 'relay-runtime';

const resourceQuery = graphql`
  query ResourcePowerSearchFilterQuery($filter: ResourceFilter) {
    queryResource(filter: $filter) {
      id
      name
      locatedIn
    }
  }
`;

const ResourcePowerSearchFilter = props => {
  const {
    config,
    value,
    onInputBlurred,
    onValueChanged,
    onRemoveFilter,
    editMode,
    resourceSpecification,
  } = props;
  const [searchEntries, setSearchEntries] = useState([]);
  const [selectedResource, setSelectedResource] = useState([]);

  const fetchResources = searchTerm =>
    fetchQuery(RelayEnvironment, resourceQuery, {
      filter: {
        resourceSpecification: {
          eq: resourceSpecification,
        },
        id: config.label.toLocaleLowerCase() == 'id' ? searchTerm : null,
        name:
          config.label.toLocaleLowerCase() == 'name'
            ? {
                in: [...selectedResource.map(res => res.label), searchTerm],
              }
            : null,
      },
    }).then(data => {
      setSearchEntries(data.queryResource ?? []);
    });

  useEffect(() => {
    value.idSet
      ?.filter(id => !selectedResource.find(l => l.id == id))
      .map(id =>
        fetchQuery(RelayEnvironment, resourceQuery, {id: id}).then(response =>
          setSelectedResource([
            ...selectedResource,
            {
              id: response.queryResource[0].id,
              label: response.queryResource[0].name,
            },
          ]),
        ),
      );
  }, [selectedResource, value.idSet]);

  return (
    <PowerSearchFilter
      name={config.label}
      operator={value.operator}
      editMode={editMode}
      value={selectedResource?.map(resource => resource.label).join(', ')}
      onRemoveFilter={onRemoveFilter}
      input={
        <Tokenizer
          searchSource="Options"
          tokens={selectedResource}
          onEntriesRequested={searchTerm => {
            fetchResources(searchTerm);
          }}
          searchEntries={searchEntries
            .filter(
              resource =>
                !selectedResource.find(node => node.id == resource.id),
            )
            .map(resource => ({
              id: resource.id,
              label: resource.name,
            }))}
          onBlur={onInputBlurred}
          onChange={newEntries => {
            setSelectedResource(newEntries);
            onValueChanged({
              id: value.id,
              key: value.key,
              name: value.name,
              operator: value.operator,
              idSet: newEntries.map(entry => entry.id),
              searchResult: searchEntries,
            });
          }}
        />
      }
    />
  );
};

export default ResourcePowerSearchFilter;
