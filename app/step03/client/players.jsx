PlayerListComponent = React.createClass({

	mixins: [ReactMeteorData],

	getInitialState() {
		return {};
		// blah
	},

	getMeteorData() {
		Meteor.subscribe('Players');
		return {
			players: Players.find({}).fetch()
		}
	},

	playerList() {
		var playerList = this.data.players.map( player => {
			var url = "/chatlogs/" + player.username;
			var str =
				<div className="playerLine">
					<span style={{color:'red'}} key={player.key}>
						*** <a href={url}>{player.username}</a>
					</span>
				</div>
			return str;
		})
		return playerList;
	},

	render() {
		return <div>
			<h2>PlayerList</h2>
			<ul>
				{this.playerList()}
			</ul>
		</div>
	}

});
