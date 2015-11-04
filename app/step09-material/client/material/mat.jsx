//app.jsx
injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    DatePicker,
    IconButton,
    NavigationClose,
    // IconMenu,
    // MoreVertIcon,
    // MenuItem
} = MUI;

var { ThemeManager, LightRawTheme } = Styles;

MaterialApp = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    // getChildContext() {
    //
    //     return {
    //         muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    //     };
    // },

    getChildContext() {
      return {
        muiTheme: ThemeManager(LightRawTheme)
      };
    },

    render: function () {
        return (
            <AppCanvas>
                <AppBar
                  title="Title"
                  iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                  iconElementRight={<IconButton><NavigationClose /></IconButton>}
                />

                <div style={{padding: '80px',}}>
                    <RaisedButton primary={true} label="Tap"/>
                    <br/>
                    <DatePicker hintText="Portrait Dialog"/>
                    <br/>
                    <DatePicker
                        hintText="Landscape Dialog"
                        mode="landscape"/>
                </div>
            </AppCanvas>
        );
    }
});

// if (Meteor.isClient) {
//     Meteor.startup(() => {
//         ReactDOM.render(<App/>, document.getElementById('react-root'));
//     });
// }
