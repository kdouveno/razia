const https = require("https");
const YT_API_KEY = "AIzaSyDIDFfuUpaikIsfATdOkaW3VMI3RZ0SwOs";

function queryobj(obj) {
	if (typeof obj !== "object")
		return "";

	return Object.entries(obj).reduce((t, o) => {
		return `${t}${o[0]}=${o[1]}&`
	}, "$");
}




const apis = {
	yt_key: YT_API_KEY,
	getYoutubeVideo(id, succ, err){
		https.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YT_API_KEY}
		&part=snippet,contentDetails&fields=items(id,snippet(title,channelTitle),contentDetails/duration)`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => data += chunk);
			resp.on('end', ()=>succ(data));
		}).on("error", err);
	},
	youtubeParser(url){
		if (!url.match(/youtu\.?be/))
			return false;
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
		var match = url.match(regExp);
		return (match&&match[7].length==11)? match[7] : false;
	},
	youtubeTimeParser(ytTime){
		var out = ytTime.match(/PT([0-9]*)M?([0-9]*)S/);
		console.log(out);
		out[1] = out[1] ?? 0;
		if(out[2].length == 1)
			out[2] = "0" + out[2];
		return out[1] + ":" + out[2];
	},
	getSong(url, succ, err = (err)=>{
		console.log(err);
		throw err;
	}){
		var id;

		if (id = this.youtubeParser(url)) {
			this.getYoutubeVideo(id, (data)=>{
				data = JSON.parse(data).items[0];

				succ({
					title: data.snippet.title,
					channel: data.snippet.channelTitle,
					duration: this.youtubeTimeParser(data.contentDetails.duration)
				})
			}, err);
		}
		else
			console.log("provided url isn't supported");
	}
}
module.exports = apis;