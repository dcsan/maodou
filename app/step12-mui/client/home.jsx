HomeComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {};
	},

	getMeteorData() {
		Meteor.subscribe('ChatList');

		return {
			activeChats: ChatList.find({}).fetch()
		}
	},

	chatRows() {
		var rows = this.data.logs.map( row => {
			return <div className='chatrow'>{row.t}</div>
		})
		return rows;
	},

	chatName() {
		return "starter chat";
	},

	render() {
		return <div>
		<h1>This is {this.props.username}</h1>
		<p>chatName: {this.chatName() }</p>
		</div>
	}

});
