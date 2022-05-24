
socket = io();

socket.on('mercrezik', (m)=>{
	var EEoS = new Date(m.EEoS);
	var minutes = EEoS.getMinutes()+"";
	if (minutes.length == 1)
		minutes = " " + minutes;
	document.getElementById("EEoS").innerHTML = EEoS.getHours() + ":" + minutes;
	if (list)
		list.update(m);
})
const list = ReactDOM.render(<List mercrezik={undefined} />, document.getElementById('list'));
function playNext(){
	var e = document.getElementById("nextSong");
	e.querySelector("a").click();
}

