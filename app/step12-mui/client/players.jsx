// http://www.material-ui.com/#/components/buttons
// const RaisedButton = require('material-ui/lib/raised-button');

const { RaisedButton } = mui;

PlayerListComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {};
	},

	getMeteorData() {
		Meteor.subscribe('Players');
		return {
			players: Players.find({}, {sort: {username: 1}}).fetch()
		}
	},

	playerList() {
		var playerList = this.data.players.map( player => {
			var url = "/chatlogs/" + player.username;
			var str =
				<div className="playerLine" key={player._id}>
					<a href={url}>{player.username}</a>
				</div>
			return str;
		})
		return playerList;
	},

	render() {
		return (
			<div>
				<h2>PlayerList</h2>
				<RaisedButton label="HELLO" primary={true}></RaisedButton>
				<ul>
					{this.playerList()}
				</ul>
			</div>
		);
	}

});
