import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { ALL_ITEMS_QUERY } from './Queries';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // mmanually update the cache on the client so it matches server
    // 1. read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data);
    //  2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    const { id, children } = this.props;
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this?')) {
                deleteItem().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {children}
          </button>
        )}
      </Mutation>
    );
  }
}

DeleteItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default DeleteItem;
