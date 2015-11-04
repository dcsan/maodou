ChatlogsComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {};
	},

	getMeteorData() {
		var username = FlowRouter.getParam('username');
		Meteor.subscribe('Chatlogs', {'username': username});
		Meteor.subscribe('Players', {username: username});
		return {
			chatlogs: Chatlogs.find({'username': username}).fetch(),
			player: Players.findOne({username:username}),
			username: username
		}
	},

	chatLog() {
		if (!this.data.chatlogs) { return; }

		var loglines = this.data.chatlogs.map( chatline => {
			var klass = chatline.output ? "chatout" : "chatline";
			var str =
				<div className={klass} key={chatline._id} >
					{chatline.text}
				</div>
			return str;
		})
		return loglines;
	},

	sendChat(event) {
		event.preventDefault();

		// Find the text field via the React ref
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		var blob = {
			text: text,
			username: this.data.username,
			output: true,
			createdAt: new Date()
		};
		Meteor.call("addChat", blob);

		// Clear form
		React.findDOMNode(this.refs.textInput).value = "";
	},


	chatInputBox() {
		return(
			<form className="chatbox" onSubmit={this.sendChat} >
				<input
					type="text"
					ref="textInput"
					placeholder="response" />
			</form>
		)
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
				{this.chatLog()}
			</ul>
			{this.chatInputBox() }
		</div>
	}

});
