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
		console.log("chatlogs:", this.data.chatlog);
		// var clogCount = this.data.chatlog.length;
		// return <div>clogCount: {clogCount}</div>
		var clogs = this.data.chatlog.map( line => {
			return <div>
				{line.text}
			</div>
		})
		return clogs;
	},

	render() {
		if (!this.data.player) {
			console.log("not ready");
			return <div>loading</div>
		} else {
			console.log("ready");
		}
		// var username = FlowRouter.getParam('username');
		console.log("player:", this.data.player);
		return <div>
			<h2>username: {this.data.username}</h2>
			<p>player._id: {this.data.player._id}</p>
			<h2>Chatlog</h2>
			{/* blah */}
			<ul>
				<li>chatlog line 1</li>
				{this.Chatlog()}
			</ul>
		</div>
	}

});
