module.exports = () =>
{
	// const express = require('express');
	// const app = express();
	// const port = 3000;

	const express = require('express');
	const app = express();
	const http = require('http');
	const server = http.createServer(app);
	const port = 3000;
	const { Server } = require("socket.io");
	io = new Server(server);

	app.use(express.static('html_server/public'));
	
	io.on('connection', (socket) => {
		emitMercrezik = () => {
			socket.emit('mercrezik', mercrezik);
		};

		emitMercrezik();
	});

	server.listen(port, () => {
		console.log(`mercrezik app listening on port ${port}`);
	});
}