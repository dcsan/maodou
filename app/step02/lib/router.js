FlowRouter.route('/', {
	action: function(params, queryParams) {
		console.log("route> top", params);
		ReactLayout.render(TopComponent)
	}
});


FlowRouter.route('/home/:username', {
	action: function(params, queryParams) {
		console.log("route> home", params);
		ReactLayout.render(HomeComponent, {username: params.username})
	}
});


FlowRouter.route('/players', {
	action: function(params, queryParams) {
		ReactLayout.render(PlayerListComponent)
	}
});

FlowRouter.route('/players/:username', {
	action: function(params, queryParams) {
		ReactLayout.render(ChatlogComponent,
			{
				myname: params.username
			})
	}
});
