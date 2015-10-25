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
			chatlogs: Chatlogs.find({username: username}).fetch(),
			player: Players.findOne({username:username}),
			username: username
		}
	},

	Chatlog() {
		if (!this.data.chatlogs) { return; }

		var loglines = this.data.chatlogs.map( chatline => {
			var str =
				<div className="chatline" key={chatline._id} >
					{chatline.text}
				</div>
			return str;
		})
		return loglines;
	},

	render() {
		// var username = FlowRouter.getParam('username');
		if (! this.data.player) {
			return <div>loading</div>
		};

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
