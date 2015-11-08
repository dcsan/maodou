var APP_ID = process.env.WECHAT_APP_ID;
var APP_SECRET = process.env.WECHAT_APP_SECRET;

var params = {app_id:APP_ID, app_secret:APP_SECRET};
var wechatApi = new WechatAPI(params);

Meteor.methods({
    'Wechat/sendMsgToUser': function(username, content) {

      // save to db
      Chatlogs.sendMessageFromServer(username, content);

      // send to wechat
      return sendMessageToUser(username, content)
    }
});
/*
* send message from server to user by username
*/
function sendMessageToUser(username, content){
  var player = Players.findOne({username: username});

  var params = {
    touser: player.openid,
    msgtype: 'text',
    text: {
      content: content
    }
  };

  wechatApi.sendMessageToUser(params)

  return 'ok';
}

function refreshToken(appId, wechatApi){

  // var result = wechatApi.getAccessToken();
  var result = wechatApi.getAccessTokenStr();
  // if(result.data != undefined){
  if(result != undefined){
    WechatTokens.saveAccessToken(appId, result, 7200);
  } else {
    console.error('get access_token error.');
  }

  // console.log(JSON.stringify(result, {indent: true}));

}


Meteor.startup(function(){
  refreshToken(APP_ID, wechatApi);
});
