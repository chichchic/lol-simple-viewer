import React from 'react';

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

import ImgComponent from '../../common/ImgComponent.jsx';
describe('ImgComponent', () => {
  let component;
  const props = {
    src:
      'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg',
    alt: 'Aatrox',
    className: 'test',
  };
  beforeEach(() => {
    component = shallow(<ImgComponent {...props} />);
  });

  it('renders without crashing', () => {
    expect(component.debug()).toMatchSnapshot();
  });
  it('render an img', () => {
    expect(component.find('img').prop('src')).toEqual(props.src);
  });
});
