import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getNodeName } from '../../data/core';
import { FINISH, makeLink, makeNode } from '../../data/datatypes';
// import { setShowChooseNodeDialog } from '../../reducers/uiReducer';
import { getActiveProject } from '../../data/state';
import { sceneAddNode } from '../../pages/Scene/reducers';
import { setChooseNodeDialogValue, setShowChooseNodeDialog } from '../../reducers/uiReducer';


const nodeItem = (node, value, setValue) => (
  <ListItem
    key={node.id}
    button
    dense
    onClick={() => {
      setValue(node.id);
    }}
  >
    <ListItemText inset primary={getNodeName(node)} />
    <Checkbox checked={node.id === value} />
  </ListItem>
);

const ChooseNodeDialog = ({ open, scenes, value, setValue, onAddClick, onClose, handleClose }) => (
  <Dialog
    open={open}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">Choose Node</DialogTitle>
    <DialogContent>
      <List>
        {scenes.map((scene) => (
          <div key={scene.id}>
            <ListItem>
              <ListItemText primary={scene.name} />
              <IconButton onClick={() => onAddClick(scene.id)}><AddIcon /></IconButton>
            </ListItem>
            <List component="div" disablePadding>
              {scene.nodes.map((node) => nodeItem(node, value, setValue))}
            </List>
          </div>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button
        onClick={() => {
          onClose();
          handleClose(value);
        }}
        color="primary"
      >
        Select
      </Button>
    </DialogActions>
  </Dialog>
);

ChooseNodeDialog.propTypes = {
  // PropTypeId is used in mapStateToProps
// eslint-disable-next-line react/no-unused-prop-types
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string,
  scenes: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
};

ChooseNodeDialog.defaultProps = {
  value: undefined,
};

const mapStateToProps = (state, props) => ({
  open: state.ui.link.showChooseNodeDialog === props.id,
  value: state.ui.link.chooseNodeDialogValue,
  scenes: (getActiveProject(state)).scenes,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (value) => {
    dispatch(setChooseNodeDialogValue(value));
  },
  onClose: () => {
    dispatch(setShowChooseNodeDialog(''));
  },
  onAddClick: (sceneId) => {
    const node = makeNode('', [], makeLink(FINISH));
    dispatch(sceneAddNode(sceneId, node));
    dispatch(setChooseNodeDialogValue(node.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseNodeDialog);
