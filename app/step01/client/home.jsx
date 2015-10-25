HomeComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			init: "init"
		};
	},

	getMeteorData() {
		Meteor.subscribe('ChatList');

		return {
			// activeChats: ChatList.find({}).fetch(),
			activeChats: ChatList.find({}).fetch(),
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

	chatCount() {
		return ChatList.find({}).count();
	},

	myName() {
		return "my name is bob";
	},

	render() {
		if (! this.data.activeChats) {
			return <div>loading</div>
		}
		var special = FlowRouter.getParam('special');

		return <div>
		<h1>This is {this.props.username}</h1>
		<p>chatName: {this.chatName() }</p>
		<p>activeChats: {this.data.activeChats.length }</p>
		<p>init: {this.state.init }</p>
		<p>static: {this.props.static }</p>
		<p>special: {special}</p>
		<p>myName {this.myName() }</p>
		</div>
	}

});
