Chatlogs = new Meteor.Collection("Chatlogs");

Chatlogs.reset = function() {
	console.log("Chatlogs.reset()");
	Chatlogs.remove({});
	var data = [

		{
			username: "alpha",
			text: "log1"
		},
		{
			username: "alpha",
			text: "log two"
		},
		{
			username: "alpha",
			text: "log three"
		},

		{
			username: "beta",
			text: "log one"
		},

	]

	data.map( (elem) => {
		Chatlogs.insert(elem);
	})

}

if (Meteor.isServer) {
	Meteor.startup( function() {
		Chatlogs.reset();
		Meteor.publish("Chatlogs", function(opts={}) {
			console.log("subscribe Chatlogs", opts);
			return Chatlogs.find(opts);
		})
	});
}
