
socket = io();

socket.on('mercrezik', (m)=>{
	console.log(list);
	if (list)
		list.update(m);
})
const list = ReactDOM.render(<List mercrezik={undefined} />, document.getElementById('list'));

