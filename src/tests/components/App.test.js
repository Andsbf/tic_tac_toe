import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

it('Does NOT render create button', () => {
  const wrapper = shallow(<App isAdmin={false} />);

  expect(wrapper.find('Link').children().length).toEqual(2);
});

it('renders create button', () => {
  const wrapper = shallow(<App isAdmin={true} />);

  expect(wrapper.find('Link').children().length).toEqual(3);
});

it('renders link to `new_game` create button', () => {
  const wrapper = shallow(<App isAdmin={false} />);

  expect(wrapper.find({to: '/new_game'}).length).toEqual(1);
});

it('renders link to `games` create button', () => {
  const wrapper = shallow(<App isAdmin={false} />);

  expect(wrapper.find({to: '/games'}).length).toEqual(1);
});

it('renders link to `new_game` create button', () => {
  const wrapper = shallow(<App isAdmin={true} />);

  expect(wrapper.find({to: '/create_user'}).length).toEqual(1);
});

it('renders link to `new_game` create button', () => {
  const wrapper = shallow(<App isAdmin={true} />);

  expect(wrapper.find({to: '/create_user'}).length).toEqual(1);
});