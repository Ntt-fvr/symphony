/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{paddingTop: 55}}>
      {value === index && (
        <Box py={4} px={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiButtonBase-root.Mui-disabled': {
      display: 'none',
    },
    '& .MuiTab-root': {
      minWidth: 44,
      fontSize: 12,
      textTransform: 'capitalize',
      padding: '0px 8px',
      minHeight: 55,
    },
    '& .MuiTabs-root': {
      position: 'fixed',
      backgroundColor: theme.palette.common.white + '!important',
      width: '100%',
      zIndex: 2,
    },
    '& .MuiTab-textColorPrimary': {
      color: theme.palette.secondary.dark,
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}));

const TansScrollable = ({tabs, scrollable}) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        variant={scrollable ? 'scrollable' : 'standard'}
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons={scrollable ? 'auto' : 'off'}
        aria-label="scrollable auto tabs example">
        {tabs.map(({label, index}) => {
          return <Tab key={index} label={label} {...a11yProps(index)} />;
        })}
      </Tabs>
      {tabs.map(({index, view}) => {
        return (
          <TabPanel key={index} value={activeTab} index={index}>
            {view}
          </TabPanel>
        );
      })}
    </div>
  );
};

export default TansScrollable;
