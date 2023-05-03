import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
mutation addToCart($productId: Int!) {
  addToCart(input: { productId: $productId }) {
	total
  }
}
`;

export const GET_PRODUCTS = gql`
query getProducts {
  products { id
  title
  thumbnail }
  }
`;