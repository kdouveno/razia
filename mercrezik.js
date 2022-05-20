const apis = require("./apis");

class Mercrezik {
	constructor(){
		this.individualTimeout = 5000;
		this.playList = [];
		this.tbu = {}; // Timer Blocked Users
		Object.defineProperty(this, "csong", {
			get: this.getCurrentSong
		})
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
			if (out.elapsedTime < this.individualTimeout) {
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
	playNext(){
		var csong = this.getCurrentSong();
		if (csong) {
			open(csong.song.link);
			csong.played = true;
		}
		io.emit('mercrezik', mercrezik);
	}
}
module.exports = Mercrezik;