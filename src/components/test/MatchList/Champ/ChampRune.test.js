import React from 'react';

import { useSelector } from 'react-redux';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import ChampRune from '../../../MatchList/Champ/ChampRune';
import ImgComponent from '../../../common/ImgComponent';

jest.mock('react-redux');

const props = {
  firstRuneNum: 1,
  secondRuneNum: 1,
};

describe('ChampRune', () => {
  let component;
  beforeEach(() => {
    useSelector.mockImplementation(() => [
      { id: 1, icon: 'test', name: 'test', slots: [] },
    ]);
    component = shallow(<ChampRune {...props} />);
  });
  it('render without crashing', () => {
    expect(component.debug()).toMatchSnapshot();
  });
  it('has 2 img tags', () => {
    expect(component.find(ImgComponent)).toHaveLength(2);
  });
});

describe('fail to get rune Json', () => {
  let component;
  beforeEach(() => {
    useSelector.mockImplementation(() => false);
    component = shallow(<ChampRune {...props} />);
  });
  it('rend text "loading"', () => {
    expect(component.text()).toEqual('loading');
  });
});
