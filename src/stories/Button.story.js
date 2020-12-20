import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/common/Button';

storiesOf('Button', module)
  .add('default button', () => <Button />)
  .add('set label "submit"', () => <Button label="submit" />);
