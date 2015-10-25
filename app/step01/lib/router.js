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
