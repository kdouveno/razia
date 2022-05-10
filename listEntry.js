

class ListEntry{
	constructor(userName, link, doubtful, data){
		this.submitTime = Date.now();
		this.userName = userName;
		this.song = {link: link};
		Ojbect.assign(this.song, data);
		this.coupDeCoeur = false;
		this.doubtful = doubtful;
		this.played = false;
	}
}
module.exports = ListEntry;