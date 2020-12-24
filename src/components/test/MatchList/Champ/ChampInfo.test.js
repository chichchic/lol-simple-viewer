import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import ChampInfo from '../../../MatchList/Champ/ChampInfo';

describe('ChampInfo', () => {
  it('render without crashing', () => {
    const component = shallow(<ChampInfo />);
    expect(component.debug()).toMatchSnapshot();
  });
});
