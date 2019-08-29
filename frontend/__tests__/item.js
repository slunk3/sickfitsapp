import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Movie',
  price: 5000,
  description: 'This is a really cool movie',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  // it('renders the image properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);

  //   const img = wrapper.find('img');
  //   expect(img.props.src).toBe(fakeItem.img);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });

  // it('renders and displays properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const priceTag = wrapper.find('PriceTag');
  //   expect(priceTag.children().text()).toBe('$5');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  // });

  // it('renders out the buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const buttonList = wrapper.find('.buttonList');
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('Link').exists()).toBeTruthy();
  //   expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
  //   expect(buttonList.find('AddToCart').exists()).toBeTruthy();
  //   console.log(wrapper.debug());
  // });
});
