MainLayout = React.createClass({
	render() {
		return <div>
			<header>
				<a href="/">top</a> |&nbsp;
				<a href="/players">players</a>
			</header>
			<main>
				{this.props.content}
			</main>
			<footer>
				<hr size='1' />
			</footer>
		</div>
	}
});
