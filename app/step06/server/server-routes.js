Picker.route('/api/:username', function(params, req, res, next) {
	console.log("api")
	var blob = {
			name: params.username,
			val: 1
		};
		// res.end(post.content);
		// res.send(post);
	// Chatlogs.insert();
	res.end(JSON.stringify(blob, {indent: true}) );

});
