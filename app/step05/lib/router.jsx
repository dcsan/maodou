FlowRouter.route('/', {
	action: function(params, queryParams) {
		console.log("route> top", params);
		ReactLayout.render(TopComponent)
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
				content: <PlayerListComponent/>,
				logo: <LogoComponent/>
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
