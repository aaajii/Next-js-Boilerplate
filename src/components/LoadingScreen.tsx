import React from 'react';

import Card from './Card';
import Placeholder, { PLACEHOLDER_TYPE, SHADE } from './Placeholder';

const LoadingScreen = ({
  type = PLACEHOLDER_TYPE.PARAGRAPH,
  shade = SHADE.DARK,
}) => (
  <Card>
    <Placeholder type={type} shade={shade} />
  </Card>
);

export default LoadingScreen;
