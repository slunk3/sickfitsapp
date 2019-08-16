import PropTypes from 'prop-types';
import ResetPage from '../components/Reset';

const Sell = ({ query: { resetToken } }) => (
  <div>
    <ResetPage resetToken={resetToken} />
  </div>
);

Sell.propTypes = {
  query: PropTypes.object.isRequired,
};

export default Sell;
