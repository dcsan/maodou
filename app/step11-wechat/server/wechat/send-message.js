

Meteor.methods({

    'Wechat/sendMsgToUser': function(username, content) {
      // save to db
      Chatlogs.sendMessageFromServer(username, content);
      // send to wechat
      return sendMessageToUser(username, content)
    },

    // refactor to use openid
    // 'Wechat/sendNews': function(username, content) {
    //   return sendNews(username, content);
    // },

    'wc/news': function(openid, content) {
      return sendNews(openid, content);
    },

    'wc/text': function(openid, content) {
      return sendText(openid, content);
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

function sendSomething(openid, content) {
  if (content.match(/news/)) {
    return sendNews(openid, content)
  }

  if (content.match(/text/)) {
    return sendText(openid, content)
  }

  // default
  return sendText(openid, content)

}


function sendText(openid, content){
  var player = Players.findOne({openid: openid});

  var params = {
    touser: openid,
    msgtype: 'text',
    text: {
      content: content
    }
  };
  WechatObject.sendMessageToUser(params);
  params.text = content;
  params.username = player.username;
  Chatlogs.insert(params);
  return 'ok';
}

function sendNews(openid, content) {
  var player = Players.findOne({openid: openid});
  var title = "News for " + player.nickname;
  var description = content;
  var url = process.env.APP_DOMAIN + "/chatlogs/" + player.nickname;
  var params = {
        "touser":player.openid,
        "msgtype":"news",
        "news":{
            "articles": [
             {
                 "title": title,
                 "description": description,
                  "url": url,
                 "picurl": player.headimgurl
             },
            //  {
            //      "title":"Happy Day",
            //      "description":"Is Really A Happy Day",
            //      "url":"URL",
            //      "picurl":"PIC_URL"
            //  }
           ]
        }
    }
    WechatObject.sendMessageToUser(params);

    // FIXME - update all for consistency
    params.username = player.username;
    params.text = description;
    Chatlogs.insert(params);

}
