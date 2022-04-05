module.exports = () => {
	const opts = {
		identity: {
			username: "isordee",
			password: "oauth:jpugwzevxrgur74pfiiuazgj6f5oze"
		},
		channels: [
			"isordeee"
		]
	};

	// Create a client with our options
	const client = new tmi.client(opts);

	// Register our event handlers (defined below)
	client.on('message', onMessageHandler);
	client.on('connected', onConnectedHandler);

	// Connect to Twitch:
	client.connect();

	
	// Called every time a message comes in
	function onMessageHandler(target, context, msg, self) {
		if (self) return; // Ignore messages from the bot

		// Remove whitespace from chat message
		var cmdArgs = msg.split(" ").filter((s) => { return s !== "" });
		var argCount = cmdArgs.length - 1;
		const commandName = cmdArgs[0];

		// If the command is known, let's execute it
		if (commandName === '!dice') {
			const num = rollDice();
			client.say(target, `You rolled a ${num}`);
			console.log(`* Executed ${commandName} command`);
		} else if (commandName === "!zik") {
			if (argCount == 1 || argCount == 2) {
				var q = cmdArgs[2] === "questionnable";
				var out = mercrezik.addSong(context.username, cmdArgs[1], q);
				if (out.success){
					client.say(target, `merci ${target} pour ton ajout${q ? "questionnable" : ""}`);
				} else {
					var remainingTime = mercrezik.individualTimeout - out.elapsedTime;
					if (remainingTime < 0)
						client.say(target, $`Désolé ${target}, mais il tu dois attendre ${remainingTime / 1000} pour pouvoir reposter un son :'(`);
					else
						client.say(target, `Ce message ne devrait jamais s'afficher xD`);
				}
			}
		} else if (commandName === "!next") {
			var csong = getCurrentSong();
			if (csong) {
				open(csong.link);
				csong.played = true;
			}
		} else if (commandName === "!coeur") {
			var csong = getCurrentSong();
			if (csong) {
				csong.coupDeCoeur = true;
			}
		} else if (commandName === "!list") {

		} else
			console.log(`* Unknown command ${commandName}`);
	}

	// Function called when the "dice" command is issued
	function rollDice() {
		const sides = 6;
		return Math.floor(Math.random() * sides) + 1;
	}

	// Called every time the bot connects to Twitch chat
	function onConnectedHandler(addr, port) {
		console.log(`* Connected to ${addr}:${port}`);
	}
}