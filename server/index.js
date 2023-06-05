const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./test.db', (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
});


const resolvers = require('./resolvers.js');
const typeDefs = require('./typeDefs.js');

const app = express();
app.use(cors());

app.get('/users', (req, res) => {
	const sql = `SELECT * FROM users`;
	let string = ''

	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message)
		} else
			rows.forEach((row) => {
				console.log('row', row)
				string += row.first_name
			})
		return res.send(string)
	})
})

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, connection }) => ({
		token: req ? req.headers.authorization : connection.context.authorization,
	}),
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
	console.log('Apollo Server on http://localhost:4000/graphql');
});
