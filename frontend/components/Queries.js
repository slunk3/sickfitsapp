import gql from 'graphql-tag';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items (first: $first, skip: $skip, orderBy: createdAt_DESC){
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export { ALL_ITEMS_QUERY };
