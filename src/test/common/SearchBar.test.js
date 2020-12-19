import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from '../../components/common/SearchBar';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar', () => {
  it('renders without crashing', () => {
    const component = shallow(<SearchBar />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has input, button tag', () => {
    const component = mount(<SearchBar />);
    expect(component.exists('input')).toBe(true);
    expect(component.exists('button')).toBe(true);
  });
  it('clears input box on click button', async () => {
    const onClick = jest.fn();
    const component = mount(<SearchBar onClick={onClick} />);
    component.find('input').simulate('change', { target: { value: 'Hello' } });
    expect(component.find('input').props().value).toEqual('Hello');
    component.find('button').simulate('click');
    expect(component.find('input').props().value).toEqual('');
    expect(onClick).toBeCalledTimes(1);
  });
});
