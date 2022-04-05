
socket = io();

function List(props){
	props.mercrezik;
	var out = props.mercrezik.playList.map(o=>{
		return <SongEntry entry={o} />;
	});
	return <div>{...out}</div>
}
const list = <List mercrezik={undefined} />
ReactDOM.render(list, document.getElementById('list'));
socket.on('mercrezik', (m)=>{
	list
})
