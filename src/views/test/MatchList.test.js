import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import { useDispatch } from 'react-redux';

jest.mock('react-redux');
jest.mock('react-router-dom');

import MatchList from '../MatchList/MatchList';
import InfoBoxList from '../../components/MatchList/InfoBoxList';
describe('MatchList', () => {
  const dispatch = jest.fn();
  const push = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
  });
  afterEach(() => {
    useDispatch.mockClear();
  });
  it('render without crashing', () => {
    const component = shallow(<MatchList />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has match InfoBoxList component', () => {
    const component = mount(<MatchList />);
    expect(component.exists(InfoBoxList)).toBe(true);
  });
});
