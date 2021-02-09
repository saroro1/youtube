const express = require('express');
const app = express();
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res)=>{  // /check를 바꿔도 상관 없지만 바꾸면 redirect 주소를 다 바꿔야합니다
	// 만약 도메인이 https://saroro.com이면 https://saroro.com/check 가 redirect 주소
    let code = req.query.code;  // redirect한 주소에서 code query ( ?code= 뒤에 있는 값 ) 가져오기
	const AUTHURI = "https://oauth2.googleapis.com/token"  // 구글 oauth 주소
	const CLIENTID = "888232932115-r8h807clfmiabd9s31ldps2tn7rs9td6.apps.googleusercontent.com";  // 클라이언트 아이디
	const CLIENTPASS = "PcOYqMtdic-825DR6qjuiVLo"; // 클라이언트 비번
	const thisURI = "https://youtubetest.run.goorm.io/youtube"; // redirect 주소
	const CHANNELID = "UC9vz3TBChrJmYbzUo-rqfSg";
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
			let checkSub = finalResult.data.items.length ? true :false;  // 구독중이면 true 아니면 false
			if(checkSub){
				res.send("구독");
			}
			else{
				res.send("구독 아님");
			}
		}
		catch(e){
			res.redirect(301,"/error.html");  //에러 발생

		}
		
		
		
	})();  
	return;
});

app.use('/.netlify/functions/server', router);
module.exports = app;
module.exports.handler = serverless(app);
module.exports = router;


