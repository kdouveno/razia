

class ListEntry{
	constructor(userName, link, doubtful, prio, data){
		this.submitTime = Date.now();
		this.userName = userName;
		this.song = {link: link};
		Object.assign(this.song, data);
		this.coupDeCoeur = false;
		this.doubtful = doubtful;
		this.played = false;
		this.prio = prio;
	}
}
module.exports = ListEntry;