import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import TextLink from '../../common/TextLink';

const mockUseHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockUseHistoryPush,
  }),
}));

describe('TextLink', () => {
  const initialProps = {
    label: 'home',
    url: '/',
  };
  it('renders without crashing', () => {
    const component = shallow(<TextLink {...initialProps} />);
    expect(component.debug()).toMatchSnapshot();
  });
  it('has Button tag', () => {
    const component = mount(<TextLink {...initialProps} />);
    expect(component.exists('button')).toBe(true);
  });
  it('can set label', () => {
    const component = mount(<TextLink label="test" url="/" />);
    expect(component.text()).toBe('test');
  });
  it('applies default styles', () => {
    const component = renderer
      .create(<TextLink label="test" url="/" />)
      .toJSON();
    expect(component).toHaveStyleRule('font-size', 'inherit');
  });
  it('applies styles according to passed props', () => {
    const component = renderer
      .create(<TextLink label="test" url="/" fontSize="2rem" />)
      .toJSON();
    expect(component).toHaveStyleRule('font-size', '2rem');
  });
  it('change url on click component', () => {
    const component = mount(<TextLink {...initialProps} />);
    component.simulate('click');
    expect(mockUseHistoryPush).toHaveBeenCalledWith('/');
    expect(mockUseHistoryPush).toHaveBeenCalledTimes(1);
  });
});
