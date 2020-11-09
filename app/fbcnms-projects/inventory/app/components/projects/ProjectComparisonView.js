/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import useRouter from '@fbcnms/ui/hooks/useRouter';

import type {FilterConfig} from '../comparison_view/ComparisonViewTypes';

import AddProjectCard from './AddProjectCard';
import AddProjectDialog from './AddProjectDialog';
import Button from '@symphony/design-system/components/Button';
import ErrorBoundary from '@fbcnms/ui/components/ErrorBoundary/ErrorBoundary';
import FormActionWithPermissions from '../../common/FormActionWithPermissions';
import InventoryView, {DisplayOptions} from '../InventoryViewContainer';
import PowerSearchBar from '../power_search/PowerSearchBar';
import ProjectCard from './ProjectCard';
import ProjectComparisonViewQueryRenderer from './ProjectComparisonViewQueryRenderer';
import React, {useMemo, useState} from 'react';
import fbt from 'fbt';
import useLocationTypes from '../comparison_view/hooks/locationTypesHook';
import {LogEvents, ServerLogger} from '../../common/LoggingUtils';
import {ProjectSearchConfig} from './ProjectsSearchConfig';
import {extractEntityIdFromUrl} from '../../common/RouterUtils';
import {getInitialFilterValue} from '../comparison_view/FilterUtils';
import {makeStyles} from '@material-ui/styles';

const QUERY_LIMIT = 1000;

const useStyles = makeStyles(() => ({
  projectComparisonView: {
    height: '100%',
  },
  powerSearchBarWrapper: {
    paddingRight: '8px',
  },
  powerSearchBar: {
    borderRadius: '8px',
  },
}));

const ProjectComparisonView = () => {
  const [filters, setFilters] = useState([]);
  const [dialogKey, setDialogKey] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {match, history, location} = useRouter();
  const [resultsDisplayMode, setResultsDisplayMode] = useState(
    DisplayOptions.table,
  );
  const classes = useStyles();

  const selectedProjectTypeId = useMemo(
    () => extractEntityIdFromUrl('projectType', location.search),
    [location.search],
  );

  const selectedProjectCardId = useMemo(
    () => extractEntityIdFromUrl('project', location.search),
    [location.search],
  );

  const locationTypesFilterConfigs = useLocationTypes();

  const filterConfigs = useMemo(
    () =>
      ProjectSearchConfig.map(ent => ent.filters)
        .reduce(
          (allFilters, currentFilter) => allFilters.concat(currentFilter),
          [],
        )
        .concat(locationTypesFilterConfigs ?? []),
    [locationTypesFilterConfigs],
  );

  function navigateToProject(selectedProjectCardId: ?string) {
    history.push(
      match.url +
        (selectedProjectCardId ? `?project=${selectedProjectCardId}` : ''),
    );
  }

  function navigateToAddProject(selectedProjectTypeId: ?string) {
    history.push(
      match.url +
        (selectedProjectTypeId ? `?projectType=${selectedProjectTypeId}` : ''),
    );
  }

  const createProjectButton = (
    <FormActionWithPermissions
      permissions={{
        entity: 'project',
        action: 'create',
        ignoreTypes: true,
      }}>
      <Button
        onClick={() => {
          setDialogOpen(true);
          setDialogKey(dialogKey + 1);
          ServerLogger.info(LogEvents.ADD_PROJECT_BUTTON_CLICKED);
        }}>
        <fbt desc="">Create Project</fbt>
      </Button>
    </FormActionWithPermissions>
  );

  if (selectedProjectTypeId != null) {
    return (
      <ErrorBoundary>
        <AddProjectCard projectTypeId={selectedProjectTypeId} />
      </ErrorBoundary>
    );
  }
  if (selectedProjectCardId != null) {
    return (
      <ErrorBoundary>
        <ProjectCard
          projectId={selectedProjectCardId}
          onProjectRemoved={() => navigateToProject(null)}
        />
      </ErrorBoundary>
    );
  }
  const header = {
    title: fbt('Projects', 'Projects header'),
    subtitle: fbt(
      'Manage and create new projects, which include multiple work orders.',
      'Projects subheader',
    ),
    searchBar: (
      <div className={classes.powerSearchBarWrapper}>
        <PowerSearchBar
          placeholder="Filter projects"
          className={classes.powerSearchBar}
          filterConfigs={filterConfigs}
          searchConfig={ProjectSearchConfig}
          filterValues={filters}
          getSelectedFilter={(filterConfig: FilterConfig) =>
            getInitialFilterValue(
              filterConfig.key,
              filterConfig.name,
              filterConfig.defaultOperator,
              null,
            )
          }
          onFiltersChanged={filters => setFilters(filters)}
        />
      </div>
    ),
    actionButtons: [createProjectButton],
  };
  return (
    <ErrorBoundary>
      <InventoryView
        header={header}
        className={classes.projectComparisonView}
        onViewToggleClicked={setResultsDisplayMode}
        permissions={{
          entity: 'project',
        }}>
        <ProjectComparisonViewQueryRenderer
          limit={QUERY_LIMIT}
          filters={filters}
          onProjectSelected={selectedProjectCardId =>
            navigateToProject(selectedProjectCardId)
          }
          displayMode={
            resultsDisplayMode === DisplayOptions.map
              ? DisplayOptions.map
              : DisplayOptions.table
          }
          createProjectButton={createProjectButton}
        />
        <AddProjectDialog
          key={`new_project_${dialogKey}`}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onProjectTypeSelected={typeId => {
            navigateToAddProject(typeId);
            setDialogOpen(false);
          }}
        />
      </InventoryView>
    </ErrorBoundary>
  );
};

export default ProjectComparisonView;
