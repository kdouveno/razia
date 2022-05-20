class SongEntry extends React.Component {
	constructor(props){
		super(props);

		this.coupDeCoeur = this.coupDeCoeur.bind(this);
		this.played = this.played.bind(this);
		this.removeSong = this.removeSong.bind(this);
		console.log(props.entry);
	}
	coupDeCoeur() {
		socket.emit("updateEntry", {type: "coupDeCoeur", index: this.props.i});
	}
	played() {
		socket.emit("updateEntry", {type: "played", index: this.props.i});
	}
	removeSong() {
		socket.emit("updateEntry", {type: "remove", index: this.props.i});
	}
	render() {
		var entry = this.props.entry;
		var submitTime = new Date(entry.submitTime);
		return <div className={"song_entry"} id={this.props.isNext ? "nextSong" : ""}>
			<div>
				<div className="link">
					<a href={entry.song.link} target="_blank">{entry.song.title}</a>
				</div>
				<div className="poster">
					{"posté par "}
					<span>{entry.userName}</span>
					{" à "}
					<span>{(submitTime.getHours() + "h" + submitTime.getMinutes())}</span>
				</div>
			</div>
			<div className="interactions">
				<div onClick={this.coupDeCoeur} className={entry.coupDeCoeur ? "checked" : ""}>♥</div>
				<div onClick={this.removeSong}>del</div>
				<div onClick={this.played} className={"played " + (entry.played ? "checked" : "")}>►</div>
				<div>═</div>
			</div>
		</div>
	}
	// {`${entry.song.link}, ${entry.userName}, ${entry.submitTime}`}
}