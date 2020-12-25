import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import InfoBoxList from '../../MatchList/InfoBoxList';
import InfoBox from '../../MatchList/InfoBox';

describe('InfoBoxList', () => {
  it('render without crashing', () => {
    const component = shallow(<InfoBoxList />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has match InfoBox component', () => {
    const component = mount(<InfoBoxList />);
    expect(component.exists(InfoBox)).toBe(true);
  });
});
