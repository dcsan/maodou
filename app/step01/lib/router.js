FlowRouter.route('/', {
	action: function(params, queryParams) {
		console.log("route> top", params);
		ReactLayout.render(TopComponent)
	}
});


FlowRouter.route('/home/:username/:special?', {
	action: function(params, queryParams) {
		console.log("route> home", params);
		ReactLayout.render(HomeComponent, {
			static: "static",
			username: params.username
		})
	}
});
