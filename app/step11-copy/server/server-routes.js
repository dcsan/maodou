Picker.route('/chatin/:username/:text', function(params, req, res, next) {
	console.log("api")
	var blob = {
			name: params.username,
			text: params.text
		};

		// res.end(post.content);
		// res.send(post);
	res.end(JSON.stringify(blob, {indent: true}) );

});
