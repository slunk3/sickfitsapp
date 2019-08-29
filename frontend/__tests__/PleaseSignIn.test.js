import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import PleaseSignIn from '../components/PleaseSignIn';
import { fakeUser } from '../lib/testUtils';
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

describe('<PleaseSignIn />', () => {
  it('renders the sign in dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <PleaseSignIn />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Please sign in before continuing');
    const SignIn = wrapper.find('SignIn');
    expect(SignIn.exists()).toBe(true);
  });

  it('renders the child comoponent when the user is signed in', async () => {
    const Hey = () => <p>Hey</p>;
    const wrapper = mount(
      <MockedProvider mocks={signInMocks}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(wrapper.contains(<Hey />)).toBe(true);
  });
});
