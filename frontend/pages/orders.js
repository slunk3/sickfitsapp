import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import Orders from '../components/Orders';

const OrdersPage = ({ query }) => (
  <div>
    <PleaseSignIn>
      <Orders />
    </PleaseSignIn>
  </div>
);

OrdersPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default OrdersPage;
