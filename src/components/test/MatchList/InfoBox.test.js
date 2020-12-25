import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import InfoBox from '../../MatchList/InfoBox';

describe('InfoBox', () => {
  it('render without crashing', () => {
    const component = shallow(<InfoBox />);
    expect(component.debug()).toMatchSnapshot();
  });
});
