const CLIENTID = "888232932115-r8h807clfmiabd9s31ldps2tn7rs9td6.apps.googleusercontent.com";  //클라이언트 아이디
const REDIRECT = "https://youtubetest.run.goorm.io/youtube";  //리다이렉트 비번


const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";


const callBackURI =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENTID}&redirect_uri=${REDIRECT}&response_type=code&scope=${SCOPE}&access_type=offline`

let checkAuth = function(){
	let win = window.open(callBackURI );
	
}

