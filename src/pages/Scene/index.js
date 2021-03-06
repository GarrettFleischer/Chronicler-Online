import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import Flowchart from '../../components/Flowchart';
import ItemList from '../../components/ItemList';
import RequireAuth from '../../components/RequireAuth';
import TabView, { makeTab } from '../../components/TabView';
import Variable from '../../components/Variable';
import { addVariable } from '../../components/Variable/reducers';
import { findById } from '../../data/core';
import { getActiveProject } from '../../data/state';


const onNodeClicked = (history) => (node) => {
  history.push(`/node/${node}`);
};

// TODO use intl
const Scene = ({ scene, history, onAddVariable }) => {
  if (scene === null)
    return <Redirect to="/404" />;

  return (
    <RequireAuth>
      <TabView
        id={scene.id}
        tabs={[
          makeTab('Scene', <Flowchart scene={scene} onNodeClicked={onNodeClicked(history)} highlightNode={'D'} />),
          makeTab('Variables', (
            <ItemList id={scene.id} handleAdd={onAddVariable(scene.id)}>
              {scene.variables.map((variable) => (
                <Variable key={variable.id} variable={variable} />
            ))}
            </ItemList>
        )),
        ]}
      />
    </RequireAuth>
  );
};

Scene.propTypes = {
  scene: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onAddVariable: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  scene: findById(getActiveProject(state), props.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  onAddVariable: (id) => () => {
    dispatch(addVariable(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Scene));
