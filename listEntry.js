

class ListEntry{
	constructor(userName, link, doubtful, data){
		this.submitTime = Date.now();
		this.userName = userName;
		this.song = {link: link};
		Object.assign(this.song, data);
		this.coupDeCoeur = false;
		this.doubtful = doubtful;
		this.played = false;
	}
}
module.exports = ListEntry;