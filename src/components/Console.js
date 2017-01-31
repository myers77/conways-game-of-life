import React from 'react';

import PlayButton from './PlayButton';
import SecondaryButtons from './SecondaryButtons';
import Settings from './Settings';

const secondaryButtonsStyle = {
  'marginBottom': 64,
}

const Console = () => (
  <div>
    <PlayButton />
    <SecondaryButtons style={secondaryButtonsStyle}/>
    <Settings />
  </div>
)

export default Console
