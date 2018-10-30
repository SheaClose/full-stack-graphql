import { gql } from "apollo-boost";

export let GET_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      color
    }
  }
`;
