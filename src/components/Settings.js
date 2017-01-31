import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle';

import * as Actions from '../actions';

const style = {
  width: '30%',
  margin: 'auto',
}

const linkStyle = {
  marginTop: 96,
}

const Settings = ({ actions, }) => {
  const handleShowTrailsToggled = () => {
    actions.toggleShowTrails();
  }

  return (
  <div>
    <div style={style}>
      <Toggle label="Show trails" onToggle={handleShowTrailsToggled} />
    </div>
    <div style={linkStyle}>
      <a href='https://github.com/myers77/conways-game-of-life'>
        Source code
      </a>
    </div>
  </div>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
