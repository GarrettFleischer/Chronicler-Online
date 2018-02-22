import LinkIcon from 'material-ui-icons/Link';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import 'brace/mode/python';
import 'brace/theme/github';
import { nodeLinkChanged } from './reducers';
import { NODE, NODE_LINK } from '../../data/datatypes';
import Align from '../Align';
import { findById } from '../../data/core';
import { getActiveProject } from '../../data/state';
import ChooseNodeDialog from '../ChooseNodeDialog';
import { setShowChooseNodeDialog } from '../../reducers/uiReducer';


// TODO handle scene links
const LinkType = ({ item, onLinkIconClicked, onChange }) => {
  let title = '';
  switch (item.type) {
    case NODE_LINK:
      title = item.node.label !== '' ? item.node.label : item.node.id;
      return (
        <div>
          <Tooltip title={title}>
            <IconButton onClick={onLinkIconClicked} color="inherit"><LinkIcon /></IconButton>
          </Tooltip>
          <ChooseNodeDialog
            handleClose={(value) => {
              onChange(item.id, value);
            }}
          />
        </div>
      );

    default:
      return <text>link component</text>;
  }
};

LinkType.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLinkIconClicked: PropTypes.func.isRequired,
};

const Link = ({ item, onLinkIconClicked, onChange }) => (
  <Align container>
    <Align center>
      <LinkType item={item} onLinkIconClicked={onLinkIconClicked} onChange={onChange} />
    </Align>
  </Align>
  );

Link.propTypes = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onLinkIconClicked: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  item: {
    ...props.item,
    node: findById(getActiveProject(state), props.item.node, NODE),
  },
});

const mapDispatchToProps = (dispatch) => ({
  onLinkIconClicked: () => {
    dispatch(setShowChooseNodeDialog(true));
  },
  onChange: (id, value) => {
    dispatch(setShowChooseNodeDialog(false));
    dispatch(nodeLinkChanged(id, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);

