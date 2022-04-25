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
		emitMercrezik = () => {io.emit('mercrezik', mercrezik)};
		socket.on("updateEntry", (u)=>{
			console.log(u, mercrezik);
			if (u.type === "coupDeCoeur" || u.type === "played")
				mercrezik.playList[u.index][u.type] = !mercrezik.playList[u.index][u.type];
			emitMercrezik();
		});

		emitMercrezik();
	});

	server.listen(port, () => {
		console.log(`mercrezik app listening on port ${port}`);
	});
}