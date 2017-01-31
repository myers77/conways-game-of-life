import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox';

import * as Actions from '../actions';

const Settings = ({ actions, }) => {

  const handleShowTrailsChecked = () => {
    actions.toggleShowTrails();
  }

  return (
    <Checkbox
      label="Show trails"
      onCheck={handleShowTrailsChecked}
    />
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
