import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import { fakeUser } from '../lib/testUtils';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        email: me.email,
        name: me.name,
        password: 'nick',
      },
    },
    result: {
      data: {
        signup: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },
  // current user query mock
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: { me },
    },
  },
];

function type(wrapper, name, value) {
  wrapper.find(`input[name="${name}"]`).simulate('change', {
    target: { name, value },
  });
}

describe('<SignUp/>', () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );

    expect(toJSON(wrapper.find('form'))).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <SignUp />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    type(wrapper, 'email', me.email);
    type(wrapper, 'name', me.name);
    type(wrapper, 'password', 'nick');
    wrapper.update();
    wrapper.find('form').simulate('submit');
    await wait();
    // query the user out of the apollo client
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});
