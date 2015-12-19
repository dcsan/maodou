// composite publication

if (Meteor.isServer) {
  Meteor.startup( function() {
    Meteor.publish("Special", function(opts={}) {
      var players = Players.find(opts);
      var chats = Chatlogs.find(opts);
      var res = [players, chats];
      return res;
    })
  });
}
