class SongEntry extends React.Component {
	constructor(props){
		super(props);

		this.coupDeCoeur = this.coupDeCoeur.bind(this);
		this.played = this.played.bind(this);
		console.log(props.entry);
	}
	coupDeCoeur() {
		socket.emit("updateEntry", {type: "coupDeCoeur", index: this.props.i});
	}
	played() {
		socket.emit("updateEntry", {type: "played", index: this.props.i});
	}
	render() {
		var entry = this.props.entry;
		var submitTime = new Date(entry.submitTime);
		return <div className="song_entry">
			<div>
				<div className="link">
					<a href={entry.song.link}>{entry.song.title}</a>
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
				<div>del</div>
				<div onClick={this.played} className={entry.played ? "checked" : ""}>►</div>
				<div>═</div>
			</div>
		</div>
	}
	// {`${entry.song.link}, ${entry.userName}, ${entry.submitTime}`}
}