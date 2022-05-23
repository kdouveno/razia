class SongEntry extends React.Component {
	constructor(props){
		super(props);

		this.coupDeCoeur = this.coupDeCoeur.bind(this);
		this.played = this.played.bind(this);
		this.removeSong = this.removeSong.bind(this);
		console.log(props.entry);
	}
	dateToYtDuration(date){
		date = new Date(date);
		var s = "" + date.getSeconds();
		var m = "" + date.getMinutes();
		if (s.length == 1) s = "0" + s;
		return m+':'+s;
	}
	coupDeCoeur() {
		socket.emit("updateEntry", {type: "coupDeCoeur", index: this.props.i});
	}
	played() {
		socket.emit("updateEntry", {type: "played", index: this.props.i});
	}
	removeSong() {
		socket.emit("updateEntry", {type: "remove", index: this.props.i});
		var date = new Date(0);
		date.getse
	}
	render() {
		var entry = this.props.entry;
		var submitTime = new Date(entry.submitTime);
		if((submitTime.getMinutes() + "").length == 1)
			submitTime = submitTime.getHours() + "h0"+submitTime.getMinutes();
		else
			submitTime = submitTime.getHours() + "h"+submitTime.getMinutes();
		return <div className={"song_entry"} id={this.props.isNext ? "nextSong" : ""}>
			<div>
				<div className="link">
					<a href={entry.song.link} target="_blank">{entry.song.title}</a>
				</div>
				<div className="poster">
					{"posté par "}
					<span>{entry.userName}</span>
					{" à "}
					<span>{submitTime}</span>
				</div>
			</div>
			<div className="interactions">
				<div className="duration">{entry.song.duration}</div>
				<div onClick={this.coupDeCoeur} className={entry.coupDeCoeur ? "checked" : ""}>♥</div>
				<div onClick={this.removeSong}>del</div>
				<div onClick={this.played} className={"played " + (entry.played ? "checked" : "")}>►</div>
				<div>═</div>
			</div>
		</div>
	}
	// {`${entry.song.link}, ${entry.userName}, ${entry.submitTime}`}
	
}