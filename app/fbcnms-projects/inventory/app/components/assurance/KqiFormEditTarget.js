/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import React, {useState} from 'react';
import fbt from 'fbt';

import ConfigureTitleSubItem from './common/ConfigureTitleSubItem';
import IconButton from '@material-ui/core/IconButton'
import TextInput from '@symphony/design-system/components/Input/TextInput';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutline';
import {DARK} from '@symphony/design-system/theme/symphony';
import Button from '@material-ui/core/Button';
import Card from '@symphony/design-system/components/Card/Card';
import FormField from '@symphony/design-system/components/FormField/FormField';
import Grid from '@material-ui/core/Grid';
import Text from '@symphony/design-system/components/Text';
import {MenuItem, Select} from '@material-ui/core';

import classNames from 'classnames';

import Switch from '@symphony/design-system/components/switch/Switch';

import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: '40px',
  },
  select: {
    '& .MuiSelect-select': {
      padding: '0 0 0 9px',
    },
    border: '1px solid #D2DAE7',
    height: '36px',
    overflow: 'hidden',
    position: 'relative',
    boxSizing: 'border-box',
    minHeight: '36px',
    borderRadius: '4px',
    fontSize: '14px',
  },
  selectWarningComparator: {
    width: '25%',
    margin: '0 2rem 0 0',
  },
  formField: {
    width: 'auto',
    margin: '0 1rem 1rem 1rem',
  },
  formFieldHours: {
    margin: '0 1rem 1rem 10rem',
  },
  warningComparator: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    margin: '0 1rem 1rem 0',
  },
  contPeriods: {
    width: '97px',
  },
  periods: {
    width: '100%',
    '& .clickable': {
      width: '25px',
    },
  },
  contHours: {
    width: '60px',
  },
  hours: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 1rem 1rem 0',
  },
  activeHours: {
    width: '100%',
    '& .clickable': {
      width: '25px',
    },
    '& .inputContainer': {
      padding: '0px 7px',
    },
  },
  from: {
    margin: '0 0.5rem 0 0',
  },
  to: {
    margin: '0 0.5rem 0 0.5rem',
  },
  textInput: {
    minHeight: '36px',
  },
  textIndicator: {
    width: '25%',
  },
  option: {
    width: '111px',
    height: '36px',
    alignSelf: 'flex-end',
  },
  delete: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textTitle: {
    paddingLeft: '3rem',
  },
  sectionSelects: {
    display: 'flex',
  },
}));

type Props = $ReadOnly<{|
  returnFormEdit: () => void,
  formValues: {
    item: {
      id: string,
      name: string,
    
    },
  },
|}>;
const handleRemove = () => {
  console.log('remove');
};
const data = {
  counters: {
    edges: [
      {
        node: {
          id: '244813135872',
          name: 'contador_family_7',
          networkManagerSystem: 'hola bebe',
          externalID: '123456789',
        },
      },
      {
        node: {
          id: '244813135873',
          name: 'contador_family_8',
          networkManagerSystem: 'hola sergio',
          externalID: '987654321',
        },
      },
    ],
  },
};
const KqiFormEditTarget = (props: Props) => {
  const {returnFormEdit} = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <ConfigureTitleSubItem
            title={fbt('KQI Catalog / TINE Retainability /', '')}
            tag={''}
            className={classes.textTitle}
          />
        </Grid>
        <Grid className={classes.delete} item xs={1}>
          <IconButton>
            <DeleteOutlinedIcon
              onClick={handleRemove}
              style={{color: DARK.D300}}
            />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid xs={6}>
              <FormField>
                <Button
                  className={classes.option}
                  variant="outlined"
                  color="primary"
                  onClick={() => returnFormEdit()}>
                  Cancel
                </Button>
              </FormField>
            </Grid>
            <Grid xs={6}>
              <FormField>
                <Button
                  onClick={props.returnFormEdit}
                  className={classes.option}
                  variant="contained"
                  color="primary">
                  Save
                </Button>
              </FormField>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <FormField className={classes.formField} label="Enabled">
                  <Switch checked={checked} title={''} onChange={setChecked} />
                </FormField>
              </Grid>
              <Grid item xs={11}>
                <FormField className={classes.formField} label="Target name">
                  <TextInput className={classes.textInput} />
                </FormField>
              </Grid>
              <Grid container item xs={6}>
                <Grid item xs={6}>
                  <FormField label="Comparator" className={classes.formField}>
                    <div className={classes.warningComparator}>
                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="family">
                        {data.counters.edges.map((item, index) => (
                          <MenuItem key={index} value={item.node?.id}>
                            {item.node?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        placeholder="Number"
                        className={classes.textIndicator}
                      />
                    </div>
                  </FormField>
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    label="Warning comparator"
                    className={classes.formField}>
                    <div className={classes.warningComparator}>
                      <Select
                        className={classNames(
                          classes.select,
                          classes.selectWarningComparator,
                        )}
                        disableUnderline
                        name="family">
                        {data.counters.edges.map((item, index) => (
                          <MenuItem key={index} value={item.node?.id}>
                            {item.node?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextInput
                        placeholder="Number"
                        className={classes.textIndicator}
                      />
                    </div>
                  </FormField>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormField className={classes.formField} label="Impact">
                  <TextInput
                    className={classes.textInput}
                    type="multiline"
                    rows={3}
                  />
                </FormField>
              </Grid>
              <Grid className={classes.sectionSelects} container item xs={6}>
                <FormField className={classes.formField} label="Periods">
                  <div className={classes.contPeriods}>
                    <TextInput className={classes.periods} type="number" />
                  </div>
                </FormField>

                <FormField
                  className={classes.formField}
                  label="Allowed Varation">
                  <div className={classes.contPeriods}>
                    <TextInput className={classes.periods} type="number" />
                  </div>
                </FormField>

                <FormField
                  className={classes.formFieldHours}
                  label="Active Hours">
                  <div className={classes.hours}>
                    <Text variant="caption" className={classes.from}>
                      From
                    </Text>
                    <div className={classes.contHours}>
                      <TextInput
                        suffix={'hrs'}
                        className={classes.activeHours}
                      />
                    </div>
                    <Text variant="caption" className={classes.to}>
                      to
                    </Text>
                    <div className={classes.contHours}>
                      <TextInput
                        suffix={'hrs'}
                        className={classes.activeHours}
                      />
                    </div>
                  </div>
                </FormField>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
export default KqiFormEditTarget;
