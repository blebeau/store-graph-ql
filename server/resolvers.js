const { AuthenticationError } = require('apollo-server');
const faker = require('faker');
const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const _ = require('lodash');
const { initialProd, initialCategories } = require('./products');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		return console.error(err.message)
	}
})

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

let cart = {
	total: 0,
	products: [],
	complete: false,
};

let prods = []
const getProducts = () => db.all("SELECT * FROM products;", function (err, rows) {
	if (err) {
		console.log('err', err)
	}

	rows.forEach((row) => prods.push(row))

})

let sql = ''
const products = getProducts() || []

const resolvers = {
	Query: {
		products: () => {
			return prods;
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

			products.push(newProd)

			sql = `INSERT INTO products(
				category_id,
				title,
				description,
				thumbnail,
				price,
				user_id) VALUES (?,?,?,?,?,?)`;

			db.run(sql, [newProd.category_id, newProd.title, newProd.description, newProd.thumbnail, newProd.price, newProd.user_id], (err) => {
				if (err) {
					return console.error(err.message)
				}
				const cursor = db.cursor()

				newProd.id = cursor.lastrowid
			})

			return newProd;
		}
	},
};

module.exports = resolvers;
