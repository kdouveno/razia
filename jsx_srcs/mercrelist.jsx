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
			var i = 0;
			out = this.state.mercrezik.playList.map(o => {
				return <SongEntry key={i} i={i++} entry={o} />;
			});
		}
		return <div>{out}</div>
	}
	
}