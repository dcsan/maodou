var AnimationGroup = React.addons.CSSTransitionGroup;

TopComponent = React.createClass({

  render: function() {
    return <div>
    <h1>MaoDou demo</h1>
      <ul>
        <li>
          <a href='/players'>/players</a>

          <AnimationGroup transitionName="example" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={300} >

            <div className='bigbox'>
              hello 1
            </div>
            <div className='bigbox'>
              hello 2
            </div>

          </AnimationGroup>

        </li>
      </ul>
    </div>
  }

});
