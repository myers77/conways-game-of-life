import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'ramda';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'

import * as Actions from '../actions';
import PlayButton from './PlayButton';
import SecondaryButtons from './SecondaryButtons';
import Settings from './Settings';


const Console = () => (
  <div>
    <PlayButton />
    <SecondaryButtons />
    <Settings />
  </div>
)

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Console);
