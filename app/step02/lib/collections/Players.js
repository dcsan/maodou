Players = new Meteor.Collection("Players");

Players.reset = function() {
	console.log("Players.reset()");
	Players.remove({});

	for (var x=0; x<10;x++) {
		var username = "player_" + x;
		Players.insert(
			{username: username}
		);
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
