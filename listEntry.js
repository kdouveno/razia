

class SongEntry{
	constructor(userName, link){
		this.submitTime = Date.now();
		this.userName = userName;
		this.link = link;
		this.coupDeCoeur = false;
		this.played = false;
	}
}
module.exports = SongEntry;