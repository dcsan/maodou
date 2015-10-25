

ChatlogComponent = React.createClass({

	render() {
		return <div>
			Username: {this.props.myname}
			<AvatarComponent color="red" />
			<AvatarComponent color="blue" />
		</div>;
	}

});
