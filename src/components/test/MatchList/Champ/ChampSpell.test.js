import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import ChampSpell from '../../../MatchList/Champ/ChampSpell';

describe('ChampSpell', () => {
  let component;
  beforeEach(() => {
    component = shallow(<ChampSpell firstSpellNum={4} secondSpellNum={32} />);
  });
  it('render without crashing', () => {
    expect(component.debug()).toMatchSnapshot();
  });
});
