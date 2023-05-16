const { AuthenticationError } = require('apollo-server');
const faker = require('faker');
const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const _ = require('lodash');
const { initialProd, initialCategories } = require('./products');


const jwtSecret = '34%%##@#FGFKFL';

const isTokenValid = token => {
	const bearerToken = token.split(' ');

	if (bearerToken) {
		return JsonWebToken.verify(bearerToken[1], jwtSecret, error => {
			if (error) {
				return false;
			}

			return true;
		});
	}

	return false;
};

const mockCategory = () => ({
	id: faker.random.number,
	title: faker.commerce.department,
});

const mockProduct = (id = false) => ({
	id: id || faker.random.number,
	title: faker.commerce.productName,
	thumbnail: faker.image.imageUrl(
		400,
		400,
		faker.random.arrayElement(['fashion', 'transport', 'technics', 'food']),
	),
	price: faker.commerce.price(),
	category: mockCategory(),
});

let cart = {
	total: 0,
	products: [],
	complete: false,
};

let products = []


if (products.length === 0) {
	products = initialProd
}

const resolvers = {
	Query: {
		product: () => mockProduct(),
		products: () => {
			return products;
		},
		categories: () => {
			return initialCategories
		},
		cart: () => cart,
	},
	Mutation: {
		addToCart: (parent, args) => {

			const id = args.input.productId;
			const product = _.find(products, { id })

			cart = {
				...cart,
				total: cart.total + 1,
				products: [...cart.products, product],
			};

			return cart;
		},
		completeCart: (_, { }, { token }) => {
			const isValid = token ? isTokenValid(token) : false;

			if (isValid) {
				cart = {
					...cart,
					complete: true,
				};

				return cart;
			}
			throw new AuthenticationError(
				'Please provide (valid) authentication details',
			);
		},
		loginUser: (parent, args) => {
			let isValid;

			const userName = args.username
			const password = args.password
			const user = {
				userName: userName,
				password: password
			};

			if (args.userName === user.userName) {
				isValid = Bcrypt.compareSync(password, user.password);
			}

			if (isValid) {
				const token = JsonWebToken.sign({ user: user.userName }, jwtSecret, {
					expiresIn: 3600,
				});
				return {
					userName,
					token,
				};
			}
			throw new AuthenticationError(
				'Please provide (valid) authentication details',
			);
		},
		addToStore: (parent, args) => {
			const newProd = args.input

			newProd.id = faker.random.number

			products.push(newProd)

			return newProd;
		}
	},
};

module.exports = resolvers;
