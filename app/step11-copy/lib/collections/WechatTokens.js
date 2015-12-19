WechatTokens = new Meteor.Collection("WechatTokens");

WechatTokens.reset = function() {
  WechatTokens.remove({});
}


WechatTokens.saveAccessToken = function(appId, accessToken, expiresIn) {

  // expiresIn = 10; // for test expiresIn immediately

  var currentTime = Math.floor(new Date().getTime() / 1000);

  WechatTokens.upsert({appId: appId}, {$set:
    { appId:appId,
      accessToken: accessToken,
      getTokenAt: currentTime,
      expiresIn: expiresIn,
      expiresAt: currentTime + expiresIn,
      createdAt: new Date(),
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup( function() {
    WechatTokens.reset();
  });
}
