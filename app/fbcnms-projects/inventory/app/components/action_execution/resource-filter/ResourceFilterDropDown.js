/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import Autosuggest from 'react-autosuggest';
import React, {useRef, useState} from 'react';
import RelayEnvironment from '../../../common/RelayEnvironment';
import emptyFunction from '@fbcnms/util/emptyFunction';
import symphony from '@fbcnms/ui/theme/symphony';
import {Grid} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import {debounce} from 'lodash';
import {fetchQuery, graphql} from 'relay-runtime';
import {makeStyles, useTheme} from '@material-ui/styles';

const autoSuggestStyles = theme => ({
  container: {
    position: 'relative',
  },
  input: {
    width: '100%',
    padding: '0px',
    ...symphony.typography.subtitle1,
    color: theme.typography.subtitle1.color,
  },
  suggestionsContainer: {
    display: 'none',
  },
  suggestionsContainerOpen: {
    backgroundColor: theme.palette.common.white,
    borderRadius: '2px',
    display: 'block',
    ...symphony.typography.subtitle1,
    position: 'fixed',
    boxShadow: theme.shadows[2],
    zIndex: 5,
    transition: 'top 100ms ease-out 0s',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    color: symphony.palette.D900,
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionHighlighted: {
    backgroundColor: symphony.palette.background,
  },
});

const resourceTypesQuery = graphql`
  query ResourceFilterDropDownQuery($filterBy: [ResourceTypeFilterInput!]) {
    resourceTypes(filterBy: $filterBy) {
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

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    paddingTop: '5px',
  },
  root: {
    padding: '5px',
  },
  suggestionRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  suggestionType: {
    marginLeft: theme.spacing(),
    lineHeight: '20px',
  },
  outlinedInput: {
    '&&': {
      backgroundColor: 'blue',
      color: theme.palette.text.primary,
    },
  },
  smallSuggest: {
    paddingTop: '9px',
    paddingBottom: '9px',
    paddingLeft: '14px',
    paddingRight: '14px',
    height: '14px',
  },
  searchBar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
    padding: '5px',
    backgroundColor: 'white',
  },
  searchArea: {
    margin: '5px 0 20px 0',
    backgroundColor: symphony.palette.D10,
    borderRadius: '5px',
  },
  iconButton: {
    cursor: 'pointer',
    '&& :hover': {
      color: 'red',
    },
  },
  selectField: {
    width: '100%',
  },
}));

type Props = $ReadOnly<{|
  onEntitySelected: () => void,
|}>;
export default function ResourceFilterDropDown(props: Props) {
  const {onEntitySelected} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [resourceSpecs, setResourceSpecs] = useState([]);
  const SEARCH_DEBOUNCE_TIMEOUT_MS = 200;
  const _debounceFetchSuggestions = debounce(
    (searchTerm: string) => fetchNewSuggestions(searchTerm),
    SEARCH_DEBOUNCE_TIMEOUT_MS,
    {
      trailing: true,
      leading: true,
    },
  );
  const inputContainer = useRef(null);
  const fetchNewSuggestions = (searchTerm: string) => {
    fetchQuery(RelayEnvironment, resourceTypesQuery, {
      filterBy: [
        {
          filterType: 'NAME',
          operator: 'CONTAINS',
          stringValue: searchTerm,
        },
      ],
    }).then(response => {
      if (!response || !response.resourceTypes) {
        return;
      }

      const mapToSuggestion = (node): ?DashboardSuggestion => {
        return {
          entityId: node.id,
          name: node.name,
          resourceSpecification: node.resourceSpecification,
        };
      };
      const suggestions: Array<DashboardSuggestion> = (
        response.resourceTypes.edges?.map(edge => {
          if (edge.node == null) {
            return null;
          }
          return mapToSuggestion(edge.node);
        }) ?? []
      ).filter(Boolean);
      setSuggestions(suggestions);
    });
  };
  const onSuggestionsFetchRequested = searchTerm => {
    _debounceFetchSuggestions(searchTerm);
  };
  return (
    <div className={classes.container}>
      <Grid className={classes.root} container direction="row" spacing={1}>
        <Grid item xs={resourceSpecs?.length > 0 ? 6 : null}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={searchTerm =>
              onSuggestionsFetchRequested(searchTerm.value)
            }
            getSuggestionValue={(suggestion: DashboardSuggestion) =>
              suggestion.name
            }
            renderSuggestion={(suggestion: DashboardSuggestion) =>
              suggestion.name
            }
            theme={autoSuggestStyles(theme)}
            onSuggestionsClearRequested={emptyFunction}
            onSuggestionSelected={(e, data) => {
              e.preventDefault();
              const suggestion: DashboardSuggestion = data.suggestion;
              setSearchValue(suggestion.name);
              setResourceSpecs(suggestion.resourceSpecification);
            }}
            renderInputComponent={inputProps => (
              <div ref={inputContainer}>
                <TextField
                  placeholder="Filter Resource Type"
                  id="search-tool"
                  variant="outlined"
                  {...inputProps}
                />
              </div>
            )}
            inputProps={{
              style: {},
              required: false,
              value: searchValue,
              onChange: (_e, {newValue}) => setSearchValue(newValue),
            }}
          />
        </Grid>
        {resourceSpecs?.length > 0 ? (
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-select-parameter"
              select
              className={classes.selectField}
              placeholder="Select Parameter"
              name="family"
              variant="outlined"
              onChange={e => {
                e.preventDefault();
                onEntitySelected(e.target.value);
              }}>
              {resourceSpecs?.map(spec => (
                <MenuItem key={spec.id} value={spec.id}>
                  {spec.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}
