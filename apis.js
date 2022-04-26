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
	getSong(url, succ, err){
		var id;
		
		if (id = this.youtubeParser(url))
			this.getYoutubeVideo(id, succ, err);
		else
			console.log("provided url isn't supported");
	}
}
module.exports = apis;