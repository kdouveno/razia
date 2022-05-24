const apis = require("./apis");
const config = require("./config");
class Mercrezik {
	constructor(){
		this.playList = [];
		this.lastPlayed = Date.now();
		this.EEoS = Date.now(); //Estimated End of Stream
		this.tbu = {}; // Timer Blocked Users
		Object.defineProperty(this, "csong", {
			get: this.getCurrentSong
		})
	}
	udpateEEoS(){
		var now = Date.now();
		this.lastPlayed = now;
		var sum = this.playList.reduce((t, o)=>{
			var out = o.song.duration.split(":");
			console.log(out[0], out[1]);
			var out = (parseInt(out[0]) * 60 + parseInt(out[1])) * 1000 + config.BETWEEN_SONG_TIMEOUT;
			return t + (o.played ? 0 : out);
		}, 0);
		console.log(sum);
		this.EEoS = now + sum;
	}
	getCurrentSong(getIndex = false) {
		var index;
		var out = this.playList.find((o, i) => {
			var test = !o.played;
			if (getIndex && test)
				index = i;
			return test;
		});
		return getIndex ? index : out;
	}
	addSong(userName, link, doubtful = false,  prio = false, err){
		var out =  {success: true, elapsedTime: Date.now() - this.tbu[userName]};
		if (this.tbu[userName])
		{
			if (out.elapsedTime < config.ZIK_TIMEOUT) {
				out.success = false;
				return out;
			}
		}
		this.tbu[userName] = Date.now();

		apis.getSong(link, (data)=>{
			var newEntry = new ListEntry(userName, link, doubtful, prio, data);
			if (prio)
				this.playList.splice(this.getCurrentSong(true), 0, newEntry);
			else
				this.playList.push(newEntry);
			io.emit('mercrezik', this);
		}, err);


		return out;
	}
	removeSong(index){
		if (typeof(index) === "number")
			this.playList.splice(index, 1);
		else if (typeof(index) === "string")
			this.playList.filter((o)=>{
				return o.song.link !== index;
			});
	}
	play(song){
		if (typeof song === "number")
			song = this.playList[song];
		if (song){
			this.udpateEEoS();
			song.played = true;
			io.emit('mercrezik', this);
		}
	}
	playNext(){
		this.play(this.getCurrentSong());
	}
}
module.exports = Mercrezik;