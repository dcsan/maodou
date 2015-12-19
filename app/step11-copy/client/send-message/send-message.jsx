AdminSendMessageComponent = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {
      username: FlowRouter.getParam('username'),
      content:'you can input something',
    };
  },

  getMeteorData: function() {
    var username = this.state.username;
    console.log('>>> getMeteorData');
    Meteor.subscribe('Chatlogs', {'usernameTo': username});
    return {
      chatlogs: Chatlogs.find({'usernameTo': username}, {sort:{createdAt:-1}}).fetch()
    }
  },

  chatLog: function() {
      if (!this.data.chatlogs) { return; }

      var loglines = this.data.chatlogs.map( chatline => {
        var klass = chatline.output ? "chatout" : "chatline";
        var str =
          <div style = {{color:'width'}} key={chatline._id} >
            from: {chatline.usernameFrom} / {chatline.text} 
          </div>
        return str;
      })
      return loglines;
    },

  onSubmitBtnSubmit: function(e){
    console.log("on onSubmitBtnSubmit1");

    var content = ReactDOM.findDOMNode(this.refs.content).value.trim()

    console.log("on onSubmitBtnSubmit2");

    Meteor.call("Wechat/sendMsgToUser", this.state.username, content, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        console.log("result", result);
      }
    });

  },

  render() {

    if (!this.data.chatlogs) {
      return <div>loading</div>
    };
    return (
        <div className="main-container l-container">
          <h3 className="bar header text-center">发送消息</h3>
          <div>
            <strong>send to: </strong>{this.state.username}
          </div>
          <div>
            <strong>content:</strong>
            <textarea style = {{width: '100%',height:'8rem', marginBottom: '1.5rem', color:'black'}}
              ref="content" defaultValue = {this.state.content}>
            </textarea>
          </div>
          <div className="text-center">
            <button onClick={this.onSubmitBtnSubmit}>send message</button>
          </div>
          <h4>Chatlog</h4>
          <div>
            {this.chatLog()}
          </div>
        </div>

    );
  }
});
