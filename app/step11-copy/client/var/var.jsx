rvar = new ReactiveVar();
rvar.set({blob:"start"})

Fix = {};

var favoriteFood = "apples";
var favoriteFoodDep = new Deps.Dependency;

Fix.getFavoriteFood = function () {
  console.log("getFavoriteFood");
  favoriteFoodDep.depend();
  return favoriteFood;
};

Fix.setFavoriteFood = function (newValue) {
  console.log("setFavoriteFood", newValue);
  favoriteFood = newValue;
  favoriteFoodDep.changed();
};

handle = Tracker.autorun(function () {
  console.log("Your favorite food is " + Fix.getFavoriteFood());
  // favoriteFoodDep.depend();
  console.log("deps autorun");
});

// Fix.getFavoriteFood();

// "apples"


VarComponent = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      blob: "A",
      rvar: rvar.get()
    };
  },

  // getInitialState() {
  //   return {
  //     blob: "A",
  //     rvar: rvar
  //   };
  // },

  render: function() {
    return <div>
      blob: {this.data.blob}
      <br/>
      rvar: {this.data.rvar}
    </div>
  }

});
