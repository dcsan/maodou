ChatList = new Meteor.Collection("ChatList");

ChatList.reset = function() {
	console.log("ChatList.reset()");
	ChatList.remove({});
	var data = [
		{
			chatId: 100
		},
		{
			chatId: 101
		},
		{chatId: 102}
	]
	data.map( (elem) => {
		ChatList.insert(elem);
	})

}

if (Meteor.isServer) {
	Meteor.startup( function() {
		ChatList.reset();
		Meteor.publish("ChatList", function(opts={}) {
			console.log("subscribe ChatList", opts);
			return ChatList.find(opts);
		})
	});
}
