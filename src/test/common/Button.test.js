import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import Button from '../../components/common/Button';
describe('Button', () => {
  it('renders without crashing', () => {
    const component = shallow(<Button />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has button tag', () => {
    const component = mount(<Button />);
    expect(component.exists('button')).toBe(true);
  });
  it('has default label', () => {
    const component = mount(<Button />);
    expect(component.text()).toBe('click');
  });
  it('click event connect with onClick prop', () => {
    const onClick = jest.fn();
    const component = mount(<Button onClick={onClick} />);
    component.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
