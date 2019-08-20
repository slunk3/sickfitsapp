import PropTypes from 'prop-types';
import SingleItem from '../components/SingleItem';

const Item = ({ query: { id } }) => (
  <div>
    <SingleItem id={id} />
  </div>
);

Item.propTypes = {
  query: PropTypes.object.isRequired,
};

export default Item;
