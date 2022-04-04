const tmi = require('tmi.js');
const ListEntry = require('./listEntry.js');
const open = require('open');

// Define configuration options
const opts = {
  identity: {
    username: "isordee",
    password: "oauth:jpugwzevxrgur74pfiiuazgj6f5oze"
  },
  channels: [
    "isordeee"
  ]
};
const individualTimeout = 5;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var playList = [];
var timerBlocked = {};
var getCurrentSong = function(){
	var out = playList.find((o)=>{
		return !o.played;
	});
	return out;
}
// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
	if (self) return; // Ignore messages from the bot

	  // Remove whitespace from chat message
	var cmdArgs = msg.split(" ").filter((s)=>{return s !== ""});
	const commandName = cmdArgs[0];

	// If the command is known, let's execute it
	if (commandName === '!dice') {
		const num = rollDice();
		client.say(target, `You rolled a ${num}`);
		console.log(`* Executed ${commandName} command`);
	} else if (commandName === "!zik") {
		console.log((Date.now() - timerBlocked[context.username]) / 1000);
		if (timerBlocked[context.username] && (Date.now() - timerBlocked[context.username]) / 1000 < individualTimeout){
			console.log("sauce");
			client.say(target, "calme toi");
			return ;
		}
		if (cmdArgs.length == 2){
			timerBlocked[context.username] = Date.now();
			playList.push(new ListEntry(context.username, cmdArgs[1]));
		}
	} else if (commandName === "!next") {
		var csong = getCurrentSong();
		if (csong){
			open(csong.link);
			csong.played = true;
		}
	} else if (commandName === "!coeur") {
		var csong = getCurrentSong();
		if (csong){
			csong.coupDeCoeur = true;
		}
	} else 
		console.log(`* Unknown command ${commandName}`);
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}