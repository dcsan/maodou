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

if (Meteor.isServer) {
	Meteor.startup( function() {
		Players.reset();
		Meteor.publish("Players", function(opts={}) {
			console.log("subscribe Players", opts);
			return Players.find(opts);
		})
	});
}
