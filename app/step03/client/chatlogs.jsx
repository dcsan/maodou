ChatlogsComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {};
	},

	getMeteorData() {
		var username = FlowRouter.getParam('username');
		Meteor.subscribe('Chatlogs', {username: username});
		Meteor.subscribe('Players', {username: username});
		return {
			chatlog: Chatlogs.find({username: username}).fetch(),
			player: Players.findOne({username:username}),
			username: username
		}
	},

	Chatlog() {
		return <div>Chatlog</div>
	},

	render() {
		// var username = FlowRouter.getParam('username');
		console.log("player:", this.data.player);
		return <div>
			<h2>username: {this.data.username}</h2>
			<p>player._id: {this.data.player._id}</p>
			<h2>Chatlog</h2>
			<ul>
				{this.Chatlog()}
			</ul>
		</div>
	}

});
