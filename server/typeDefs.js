const { gql } = require('apollo-server');

const typeDefs = gql`
type Cart {
	total: Float
	products: [Product]
	complete: Boolean
}

input CartInput {
	productId: Int!
}

type Category {
	id: Int!
	title: String!
}

input CategoryInput {
	id: Int!
	title: String!
}

type PaginatedProducts {
	products: [Product!]!
	nextToken: String
}

type Product {
	id: Int!
	category_id: Int
	title: String!
	description: String!
	thumbnail: String!
	price: Float
	user_id: String!
	next_token: String!
}

type User {
	userName: String!
	token: String!
}

type Mutation {
	addToCart(input: CartInput!): Cart
	completeCart: Cart
	loginUser(userName: String!, password: String!): User
	addProduct(
		id: Int!,
		category_id: Int,
		title: String!,
		description: String!,
		thumbnail: String!,
		price: Float,
		user_id: String!
	): Product
}

type Query {
	product: Product
	allUserProducts(id: String, limit: Int, nextToken: String): [Product]
	allProducts(limit: Int, nextToken: String): PaginatedProducts
	allCategories: [Category]
	cart: Cart
}

schema {
	query: Query
	mutation: Mutation
}
`;

module.exports = typeDefs;
