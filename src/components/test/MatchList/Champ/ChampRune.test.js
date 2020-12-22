import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import ChampRune from '../../../MatchList/Champ/ChampRune';
import ImgComponent from '../../../common/ImgComponent';

describe('ChampRune', () => {
  const props = {
    firstRuneNum: 7200,
    secondRuneNum: 7200,
  };
  let component;
  beforeEach(() => {
    component = shallow(<ChampRune {...props} />);
  });
  it('render without crashing', () => {
    expect(component.debug()).toMatchSnapshot();
  });
  it('has 2 img tags', () => {
    expect(component.find(ImgComponent)).toHaveLength(2);
  });
});
