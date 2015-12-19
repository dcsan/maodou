/* global PlayersPage:true */

// http://www.material-ui.com/#/components/buttons
// const RaisedButton = require('material-ui/lib/raised-button');

const { RaisedButton } = mui;

PlayersPage = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div>
        <h2>PlayerList</h2>
        <RaisedButton label="HELLO" primary={true} />
        <PlayerListComponent />
      </div>
    );
  }

});
