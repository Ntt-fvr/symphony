/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

import * as React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import CardHeader from '@symphony/design-system/components/Card/CardHeader';
import Checkbox from '@symphony/design-system/components/Checkbox/Checkbox';
import DialogInformation from './DialogInformation';
import DialogSelectDate from './DialogSelectDate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import PowerSearchBar from '../power_search/PowerSearchBar';
import Radio from '@material-ui/core/Radio';
import Text from '@symphony/design-system/components/Text';
import {CircleIndicator} from './CircleIndicator';
import {SimpleChangeRequest} from './SimpleChangeRequest';
import {TableConfigurationParameters} from './TableConfigurationParameters';
import {TimeLine} from './TimeLine';
import {makeStyles} from '@material-ui/styles';
import {useState} from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: '0',
    margin: '0',
    padding: '20px 0 30px 0 ',
  },
  timeLineContainer: {
    margin: '20px 0 0 0',
  },
  cardTable: {
    margin: '20px 0 0 0',
  },
  cardContainer: {
    padding: '0px',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.1)',
  },
  searchBar: {
    flexGrow: 1,
  },
  searchInput: {
    border: '1px solid #E5E5E5',
    borderRadius: '4px',
  },
  containerCheck: {
    display: 'flex',
    padding: '25px 0 0 0 ',
  },
  checkRadio: {
    display: 'flex',
    alignItems: 'center',
  },
  checkSquare: {
    display: 'flex',
    justifyContent: 'end',
  },
  pendingChange: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filter: {
    borderRadius: '4px',
    margin: '13px',
  },
  inputFilter: {
    border: '0',
  },
}));

type Props = $ReadOnly<{||}>;

const Configuration = (props: Props) => {
  const {cmVersion, resource} = props;
  const [filters, setFilters] = useState([]);
  const [checkedCurrentChange, setCheckedCurrentChange] = useState(false);
  const [checkedPreviousChange, setCheckedPreviousChange] = useState(false);
  const [isDialogInformation, setIsDialogInformation] = useState(false);
  const [isDialogSelectDate, setIsDialogSelectDate] = useState(false);
  const [checked, setChecked] = useState(true);
  const [openSimpleChangeRequest, setOpenSimpleChangeRequest] = useState(false);
  const [configurationParameters, setConfigurationParameters] = useState([]);
  const [currentVersion, setCurrentVersion] = useState([]);
  const [AllVersion, setAllCMVersion] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const classes = useStyles();

  const handleClickOpenInformation = () => {
    setIsDialogInformation(!isDialogInformation);
  };
  const handleClickOpenSelectDate = () => {
    setIsDialogSelectDate(prev => !prev);
  };
  const handleSimpleChangeRequest = () => {
    setOpenSimpleChangeRequest(prevStateSCR => !prevStateSCR);
  };
  if (openSimpleChangeRequest) {
    return (
      <SimpleChangeRequest
        cmVersion={cmVersion}
        resource={resource}
        handleSimpleChangeRequest={handleSimpleChangeRequest}
      />
    );
  }

  const valueSearchFilter = ({target}) => {
    setSearchFilter(target.value);
  };

  const CMSelected = (CMSelected, currentVersion, allVersion) => {
    setConfigurationParameters(CMSelected);
    setCurrentVersion(currentVersion);
    setAllCMVersion(allVersion);
  };

  return (
    <Grid className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        item
        xs={12}>
        <Grid className={classes.pendingChange} item sm={12} md={3} lg={4}>
          <Text
            variant={'body2'}
            weight={'medium'}
            useEllipsis={true}
            style={{padding: '0 10px 0 0'}}>
            Pending requests:
          </Text>
          <CircleIndicator>2</CircleIndicator>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={2}
          item
          sm={12}
          md={9}
          lg={8}>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={handleClickOpenInformation}>
              <Text useEllipsis={true} color={'primary'}>
                Sync Parameters
              </Text>
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={handleClickOpenSelectDate}>
              <Text useEllipsis={true} color={'primary'}>
                {' '}
                Rollback
              </Text>
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              onClick={handleSimpleChangeRequest}>
              <Text useEllipsis={true} color={'primary'}>
                Request Change
              </Text>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.timeLineContainer} item md={12}>
        <TimeLine CMSelected={CMSelected} />
      </Grid>
      <Grid className={classes.cardTable} item xs={12}>
        <Card className={classes.cardContainer}>
          <CardHeader>Configuration parameters</CardHeader>
          <Grid item xs={12}>
            <div className={classes.bar}>
              <div className={classes.searchBar}>
                <div className={classes.filter}>
                  <input
                    name="searchFilter"
                    onChange={valueSearchFilter}
                    placeholder="Filter..."
                    className={classes.inputFilter}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} className={classes.containerCheck}>
            <Grid item xs={6} className={classes.checkRadio}>
              <Text
                style={{padding: '0 10px 0 0'}}
                color={'primary'}
                useEllipsis={true}>
                Compare with:
              </Text>
              <FormControlLabel
                onChange={() => {
                  setCheckedPreviousChange(!checkedPreviousChange);
                  setCheckedCurrentChange(false);
                }}
                checked={checkedPreviousChange}
                value="approved"
                control={<Radio color="primary" />}
                label="Previous change"
              />
              <FormControlLabel
                onChange={() => {
                  setCheckedCurrentChange(!checkedCurrentChange);
                  setCheckedPreviousChange(false);
                }}
                checked={checkedCurrentChange}
                value="approval"
                control={<Radio color="primary" />}
                label="Current Change"
              />
            </Grid>
            <Grid item xs={6} className={classes.checkSquare}>
              <Checkbox
                onChange={selection =>
                  setChecked(selection === 'checked' ? true : false)
                }
                checked={checked}
                title={'See only changed parameters'}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <br></br>
            <TableConfigurationParameters
              ConfigurationParameters={configurationParameters}
              setComparationCurrent={checkedCurrentChange}
              setComparationPrevious={checkedPreviousChange}
              setOnlyValuesChanged={checked}
              setCurrentVersion={currentVersion}
              setAllVersion={AllVersion}
              setSearchFilter={searchFilter}
            />
          </Grid>
        </Card>
      </Grid>
      {isDialogInformation && (
        <DialogInformation onClose={handleClickOpenInformation} />
      )}
      {isDialogSelectDate && (
        <DialogSelectDate
          isDialogSelectDate={isDialogSelectDate}
          onClose={handleClickOpenSelectDate}
        />
      )}
    </Grid>
  );
};

export {Configuration};
