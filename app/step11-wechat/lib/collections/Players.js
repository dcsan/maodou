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
  return {username: "testuser"};
}

Players.create = function(options) {
  console.log("Players.create", options)
  var p = Players.findOne({openid: options.openid});
  if (p) {
    console.log("already exists");
    return;
  }

  // else create
  var playerInfo = Players.getPlayerInfo(options.openid);
  var options = {
    username: playerInfo.username,
    openid: options.openid
  }
  Players.insert(options);
  console.log("new player", options);
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
