const express = require('express');
const app = express();
const axios = require('axios');


app.use(express.static('source')); //source 파일 안에 있는걸 정적으로 사용 ./index.html 등 접근 가능


app.get('/check', (req, res)=>{
    let code = req.query.code;
	
	
	
	const AUTHURI = "https://oauth2.googleapis.com/token"
	
	
	
	const CLIENTID = "YOUR_ID";
	const CLIENTPASS = "YOUR_SECRET";
	const thisURI = "YOUR_REDIRECTURI";
	const CHANNELID = "FINDCHANNELID";
	
	
	

	
	
	const FINALURI = "https://content-youtube.googleapis.com/youtube/v3/subscriptions";
	(async ()=>{
		try{
			let data = {
			"client_id" : CLIENTID,
			"client_secret" : CLIENTPASS,
			"grant_type" : "authorization_code",
			"code"  : code,
			"redirect_uri" : thisURI
		}
			let header = {"Content-Type": "application/x-www-form-urlencoded"}
			let result =  await axios({
  				method: 'post',
  				url: AUTHURI,
  				params: data,
				headers : header
			});
			
			let token = result.data.token_type+" "+result.data.access_token


			let finalResult =  await axios({
  				method: 'get',
  				url: "https://content-youtube.googleapis.com/youtube/v3/subscriptions",
  				params: {
					
					"part" : "id",
					"mine" : true,
					"forChannelId" : CHANNELID
				},
				headers : {"Authorization" : token}
			}); 
			let checkSubscript = finalResult.data.items.length ? ture :false;
			if(!check){
				res.redirect()
			
			}
			
			
			
			
			
			
		}
		catch(e){
			res.redirect(301,"/error.html");

		}
		
		
		
	})();  
	return;
});





app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});