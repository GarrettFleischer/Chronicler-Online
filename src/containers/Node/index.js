import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Component from '../../components/component';
import SortableList from '../../components/draggableList';
import { nodeComponentsSorted } from './reducers';
import makeSelectNode from './selectors';


class Node extends PureComponent { // eslint-disable-line react/prefer-stateless-function

  onSortEnd(oldIndex, newIndex) {
    this.props.onSortEnd(this.props.node.id, oldIndex, newIndex);
  }


  render() {
    const { node } = this.props;

    if (node === null) {
      return <Redirect to="/404" />;
    }

    const components = node.components.map((item) => <Component item={item} />);

    return (
      <SortableList
        items={components}
        onSortEnd={({ oldIndex, newIndex }) => {
          this.onSortEnd(oldIndex, newIndex);
        }}
      />
    );
  }


}


Node.propTypes = {
  // @see makeMapStateToProps
  // eslint-disable-next-line react/no-unused-prop-types
  match: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  onSortEnd: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const selectNode = makeSelectNode();
  return (state, props) => ({ node: selectNode(state, parseInt(props.match.params.id, 10)) });
};

const mapDispatchToProps = (dispatch) => ({
  onSortEnd: (id, oldIndex, newIndex) => {
    dispatch(nodeComponentsSorted(id, oldIndex, newIndex));
  },
});


export default connect(makeMapStateToProps, mapDispatchToProps)(Node);