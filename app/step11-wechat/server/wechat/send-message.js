

Meteor.methods({
    'Wechat/sendMsgToUser': function(username, content) {
      // save to db
      Chatlogs.sendMessageFromServer(username, content);
      // send to wechat
      return sendMessageToUser(username, content)
    },

    'Wechat/sendNews': function(username, content) {
      return sendNews(username, content);
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

  WechatObject.sendMessageToUser(params);

  return 'ok';
}

function sendNews(nickname, content) {
  var player = Players.findOne({nickname: nickname});

  var params = {
        "touser":player.openid,
        "msgtype":"news",
        "news":{
            "articles": [
             {
                 "title":"Happy Day",
                 "description":"Is Really A Happy Day",
                 "url":"URL",
                 "picurl": player.headimgurl
             },
             {
                 "title":"Happy Day",
                 "description":"Is Really A Happy Day",
                 "url":"URL",
                 "picurl":"PIC_URL"
             }
             ]
        }
    }
    WechatObject.sendMessageToUser(params);

}
