
Meteor.methods({
	addChat(blob) {
		// // Make sure the user is logged in before inserting a task
		// if (! Meteor.userId()) {
		//   throw new Meteor.Error("not-authorized");
		// }
		Chatlogs.insert(blob);
	}
});
