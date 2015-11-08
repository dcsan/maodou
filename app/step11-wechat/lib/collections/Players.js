Players = new Meteor.Collection("Players");

Players.reset = function() {
  console.log("Players.reset()");
  Players.remove({});

  var names = ["alpha", "beta", "charles", "david", "eric"];

  names.map( username => {
    Players.insert(
      {username: username}
    );
  })

}

Players.getPlayerInfo = function(openid) {
  // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
}

Players.create = function(options) {

  var p = Players.find({openid: options.openid});
  if (!p) {
    var playerInfo = Players.getPlayerInfo(options.openid);
    Players.insert({
      username: playerInfo.username,
      openid: options.openid
    })

  }

}

if (Meteor.isServer) {
  Meteor.startup( function() {
    Players.reset();
    Meteor.publish("Players", function(opts={}) {
      console.log("subscribe Players", opts);
      return Players.find(opts);
    })
  });
}
