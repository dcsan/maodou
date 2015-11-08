

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

  WechatObject.sendMessageToUser(params)

  return 'ok';
}
