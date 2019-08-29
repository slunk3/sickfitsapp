import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Nav from '../components/Nav';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CURRENT_USER_QUERY } from '../components/User';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } },
  },
];

const signInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
];

describe('<Nav/>', () => {
  it('render a minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('renders full nav when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    // expect(toJSON(nav)).toMatchSnapshot();
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain('Sign Out');
  });

  it('renders the amount of items in the cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signInMocks}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    const count = nav.find('div.count');
    expect(toJSON(count)).toMatchSnapshot();
  });
});
