const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: Category
  }
  type Category {
    id: Int!
    title: String!
  }
  type User {
    userName: String!
    token: String!
  }
  type Cart {
    total: Float
    products: [Product]
    complete: Boolean
  }
  input CartInput {
    productId: Int!
  }
  input CategoryInput {
    id: Int!
    title: String!
  }
  input ProductInput {
    productId: Int!
    title: String!
    thumbnail: String!
    price: Float
    category: CategoryInput
  }
  type Query {
    product: Product
    products(limit: Int): [Product]
    categories: [Category]
    cart: Cart
  }
  type Mutation {
    addToCart(input: CartInput!): Cart
    completeCart: Cart
    loginUser(userName: String!, password: String!): User
    addToStore(input: ProductInput!): Product
  }
`;

module.exports = typeDefs;
