var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

TopComponent = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('Special', {username: 'alpha'});

    players = Players.find({}).fetch();
    var blob = {};
    players.map( p => {
      blob[p] = Chatlogs.find({username: p.username})
    })
    console.log(blob);
    return {
      blob: blob,
      players: players
    }
  },

  render: function() {

    if (! this.data.players) {
      return <div>loading</div>
    };

    console.log("data.blob", this.data.blob);

    return <div>
    <h1>MaoDou demo</h1>
      <ul>
        <li>
          <a href='/players'>/players</a>

          <ReactCSSTransitionGroup transitionName="tile" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300} >

            <div className='bigbox'>
              hello 1
            </div>
            <div className='bigbox'>
              hello 2
            </div>

          </ReactCSSTransitionGroup>

        </li>
      </ul>
    </div>
  }

});
