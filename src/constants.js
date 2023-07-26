import gql from 'graphql-tag';

export const ADD_TO_CART = gql`
mutation addToCart($productId: Int!) {
  addToCart(input: { productId: $productId }) {
	total
  }
}
`;

export const ADD_PRODUCT = gql`
mutation addProduct(
  $id: Int!,
  $category_id: Int,
  $title: String!,
  $description: String!,
  $thumbnail: String!,
  $user_id: String!,
  $price: Float
  ) {
    addProduct(input: { 
      id: $id,
      category_id: $category_id,
      title: $title,
      description: $description,
      thumbnail: $thumbnail,
      user_id: $user_id,
      price: $price
    }) {
      title
  }
}
`;

export const GET_PRODUCTS = gql`
query allProducts($limit: Int, nextToken: String) {
  allProducts($limit: $limit, nextToken: $nextToken) { id
  title
  description
  thumbnail
  price
  user_id
  category_id
}
  }
`;

export const GET_USER_PRODUCTS = gql`
query allUserProducts($id: String, $limit: Int, $nextToken: String) {
  allUserProducts(id: $id, limit: $limit, nextToken: $nextToken) { id
  title
  description
  thumbnail
  price
  user_id
}
  }
`;

export const GET_CATEGORIES = gql`
query getCategories {
  categories { id
  title }
  }
`;

export const GET_CART = gql`
  query getCart {
    cart {
      total
      products {
        id
        title
        thumbnail
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation loginUser(
  $username: String,
  $password: String
) {
  loginUser(username: $username, password: $password)
  {
    username,
    token
  }
}
`;