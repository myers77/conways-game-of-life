import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toggle from 'material-ui/Toggle';
import FontAwesome from 'react-fontawesome';

import * as Actions from '../actions';

const style = {
  width: '15%',
  margin: 'auto',
};

const linkStyle = {
  marginTop: 96,
};

const faStyle = {
  color: '#333',
};

const Settings = ({ actions }) => {
  const handleShowTrailsToggled = () => {
    actions.toggleShowTrails();
  };

  return (
  <div>
    <div style={style}>
      <Toggle label="Show trails" onToggle={handleShowTrailsToggled} />
    </div>
    <div style={linkStyle}>
      <a href="https://github.com/myers77/conways-game-of-life">
        <FontAwesome
          name="github"
          size="2x"
          style={faStyle}
        />
      </a>
    </div>
  </div>
  );
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
