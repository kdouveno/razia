class SongEntry extends React.component {
	constructor(props){
		this.props = props.entry;
	}
	render() {
		return <div>{`${this.props.link}, ${this.props.userName}, ${this.props.submitTime}`}</div>
	}
}