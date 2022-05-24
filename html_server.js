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
			if (u.type.match(/(coupDeCoeur)|(played)/))
				mercrezik.playList[u.index][u.type] = !mercrezik.playList[u.index][u.type];
			else if (u.type === "remove")
				mercrezik.removeSong(u.index);
			else if (u.type === "play")
				mercrezik.play(u.index);
			emitMercrezik();
		});

		emitMercrezik();
	});

	server.listen(port, () => {
		console.log(`mercrezik app listening on port ${port}`);
	});
}