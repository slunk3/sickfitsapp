import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    // manualy call the mutatuib once we have the stripe token
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };

  render() {
    const { children } = this.props;
    return (
      <User>
        {({ data: { me }, loading }) => {
          if (loading) return null;
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calcTotalPrice(me.cart)}
                  name="Sick Fits"
                  description={`Order of ${totalItems(me.cart)} items`}
                  image={
                    me.cart.length && me.cart[0].item && me.cart[0].item.image
                  }
                  stripeKey="pk_test_CVUETAErNztINQm3pc4KsXfL00dYoeZziY"
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

TakeMyMoney.propTypes = {
  children: PropTypes.object,
};

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
