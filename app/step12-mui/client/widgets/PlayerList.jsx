// <AutoComplete
//   fullWidth={true}
//   floatingLabelText = 'showAllItems'
//   showAllItems = {true}
//   animated = {false}
//   dataSource = {['12345', '23456', '34567']} />

const { AutoComplete } = mui;

PlayerListComponent = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState() {
    return {};
  },

  getMeteorData() {
    var handle = Meteor.subscribe('Players');
    return {
      players: Players.find({}, {sort: {username: 1}}).fetch(),
      playerList: ['one', 'two', 'three'],
      ready: handle.ready()
    };
  },

  playerList() {
    var playerList = this.data.players.map( player => {
      var url = '/chatlogs/' + player.username;
      var str = (
        <div className='playerLine' key={player._id}>
          <a href={url}>{player.username}</a>
        </div>
      );
      return str;
    });
    return playerList;
  },

  render() {
    if (!this.data.ready) {
      return (
        <div>Loading</div>
      );
    }
    // else

    return (
      <div>
        <AutoComplete
          dataSource={this.data.playerList}
        />
      </div>
    );
  }

});
