import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import lifecycle from 'react-pure-lifecycle';
import { setTabViewValue } from '../../reducers/uiReducer';
import { PropTypeId } from '../../data/datatypes';

export const makeTab = (label, component) => ({ label, component });

const TabView = ({ onTabChange, ui, setValue, id, tabs }) => (
  <Paper style={{ padding: '10px' }}>
    <Tabs
      value={ui.value[id] || 0}
      onChange={setValue(id, onTabChange)}
      indicatorColor="primary"
      centered
    >
      {tabs.map((tab) => <Tab key={tab.label} label={tab.label} />)}
    </Tabs>
    <div style={{ paddingTop: 8 * 3 }}>
      {tabs[ui.value[id]] && tabs[ui.value[id]].component}
    </div>
  </Paper>
);

TabView.propTypes = {
  ui: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypeId.isRequired,
  tabs: PropTypes.array.isRequired,
// used in componentWillMount
// eslint-disable-next-line react/no-unused-prop-types
  defaultTab: PropTypes.number,
  onTabChange: PropTypes.func,
};

TabView.defaultProps = {
  defaultTab: 0,
  onTabChange: undefined,
};

const methods = {
  componentWillMount: ({ id, defaultTab, setValue }) => {
    setValue(id)(null, defaultTab);
  },
};

const mapStateToProps = (state) => ({
  ui: state.ui.tabView,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (id, onTabChange) => (event, value) => {
    dispatch(setTabViewValue(id, value));
    if (onTabChange) onTabChange(value);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(methods)(TabView));
