import * as React from 'react';
import { shallow } from 'enzyme';
import * as renderer from 'react-test-renderer';
import SingleItem from '../singleItem.component';

describe('Hello, Enzyme!', () => {
  const item = {
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'Rick Sanchez',
  };

  it('renders', () => {
    const wrapper = shallow(<SingleItem
      img={item.image}
      name={item.name}
      status={item.status}
    />);
    expect(wrapper.find('img')).toHaveLength(1);
  });

  it('renders snapshots, too', () => {
    const wrapper = renderer.create(<SingleItem name={item.name} status={item.status} img={item.image}/>)
    expect(wrapper).toMatchSnapshot()
  })
})
