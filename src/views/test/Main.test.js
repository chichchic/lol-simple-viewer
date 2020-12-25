import React from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import Main from '../Main/Main';
import SearchBar from '../../components/common/SearchBar';
import TextLink from '../../components/common/TextLink';

import summonerInfo from '../../fixture/summonerInfo';

jest.mock('react-redux');
jest.mock('react-router-dom');

describe('Main', () => {
  it('render without crashing', () => {
    const component = shallow(<Main />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has TextLink', () => {
    const component = mount(<Main />);
    expect(component.exists(TextLink)).toBe(true);
  });
  it('has SearchBar', () => {
    const component = mount(<Main />);
    expect(component.exists(SearchBar)).toBe(true);
  });
});

describe('search by name', () => {
  const dispatch = jest.fn();
  const push = jest.fn();
  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useHistory.mockImplementation(() => ({
      push: push,
    }));
  });
  afterEach(() => {
    useDispatch.mockClear();
  });
  it('alert when clicked search button & input is blank', () => {
    const component = mount(<Main />);
    const searchBar = component.find(SearchBar);
    const alert = jest.spyOn(window, 'alert').mockImplementationOnce(() => {});
    searchBar.find('button').simulate('click');
    expect(alert).toBeCalledTimes(1);
  });

  it('change page when clicked search button', (done) => {
    const component = mount(<Main />);
    const searchBar = component.find(SearchBar);
    searchBar
      .find('input')
      .simulate('change', { target: { value: 'chichchic' } });
    searchBar.find('button').simulate('click');
    setImmediate(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith('/match-list');
      done();
    });
  });
});
