class List extends React.Component {
	constructor(props){
		super(props);
		this.state = {mercrezik: props.mercrezik};
	}

	update(mercrezik){
		this.setState({mercrezik: mercrezik});
	}
	
	render(){
		var out = "";
		if(this.state.mercrezik){
			this.state.mercrezik.getCurrentSong = getCurrentSong;

			var next = this.state.mercrezik.getCurrentSong(true);
			out = this.state.mercrezik.playList.map((o, i) => {
				return <SongEntry key={i} i={i} isNext={next == i} entry={o} />;
			});
		}
		return <div>{out}</div>
	}
	
}
function getCurrentSong(getIndex = false) {
	var index;
	var out = this.playList.find((o, i) => {
		var test = !o.played;
		if (getIndex && test)
			index = i;
		return test;
	});
	return getIndex ? index : out;
}