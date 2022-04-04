

class SongEntry{
	constructor(user, link){
		this.submitTime = Date.now();
		this.user = user;
		this.link = link;
		this.coupDeCoeur = false;
		this.played = false;
	}
}
module.exports = SongEntry;