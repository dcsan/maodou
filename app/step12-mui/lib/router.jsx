FlowRouter.route('/', {
  action: function(params, queryParams) {
    console.log("route> top", params);
    ReactLayout.render(TopComponent)
  }
});

FlowRouter.route('/material', {
  action: function(params, queryParams) {
    console.log("route> top", params);
    ReactLayout.render(MaterialApp)
  }
});


FlowRouter.route('/home/:username', {
  action: function(params, queryParams) {
    console.log("route> home", params);
    ReactLayout.render(
      MainLayout, {
        content: <HomeComponent username={params.username} />
      }
    )
  }
});


FlowRouter.route('/players', {
  action: function(params, queryParams) {
    ReactLayout.render(
      MainLayout, {
        content: <PlayerListComponent/>
      }
    )
  }
});


FlowRouter.route('/chatlogs/:username', {
  action: function(params, queryParams) {
    ReactLayout.render(
      MainLayout, {
        content: <ChatlogsComponent/>
      }
    )
  }
});


FlowRouter.route('/var', {
  action: function(params, queryParams) {
    ReactLayout.render(VarComponent)
  }
});
