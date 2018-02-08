import Card, { CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';

import 'brace/mode/python';
import 'brace/theme/github';
import { textComponentChanged } from './reducers';

const Reorder = ({ item }) => (
  <Card>
    <CardContent>
      <div>{item.text}</div>
    </CardContent>
  </Card>
);

Reorder.propTypes = {
  item: PropTypes.object.isRequired,
};


function Text({ item, reorder, onChange }) {
  if (reorder)
    return <Reorder item={item} />;

  return (
    <Card>
      <CardContent>
        <AceEditor
          onChange={(text) => {
            onChange(item.id, text);
          }}
          value={item.text}
          mode="python"
          theme="github"
          name={item.id}
          editorProps={{ $blockScrolling: true }}
          height="200px"
        />
      </CardContent>
    </Card>
  );
}

Text.propTypes = {
  item: PropTypes.object.isRequired,
  reorder: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onChange: (id, text) => {
    dispatch(textComponentChanged(id, text));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Text);

