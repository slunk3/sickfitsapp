require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies (JWT)
// TODO use express midlleware to populate current user

server.start({
	cors: {
		credentials: true,
		origin: process.env.FRONTEND_URL,

	}
}, deets => {
	console.log('====================================');
	console.log(`Server is now running on http://localhose:${deets.port}`);
	console.log('====================================');
})
