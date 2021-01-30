const CLIENTID = "YOUR_ID";
const REDIRECT = "YOUR_SECRET";


const SCOPE = "https://www.googleapis.com/auth/youtube"


const callBackURI =`https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENTID}&redirect_uri=${REDIRECT}&response_type=code&scope=${SCOPE}&access_type=offline`

let checkAuth = function(){
	let win = window.open(callBackURI );
	
}

