Chatlogs = new Meteor.Collection("Chatlogs");

Chatlogs.reset = function() {
  console.log("Chatlogs.reset()");
  Chatlogs.remove({});
  var data = [

    {
      usernameTo: "alpha",
      text: "log1",
      usernameFrom: "server",
      createdAt: new Date(),
    },
    {
      usernameTo: "alpha",
      text: "log two",
      usernameFrom: "server",
      createdAt: new Date(),
    },
    {
      usernameTo: "alpha",
      text: "log three",
      usernameFrom: "server",
      createdAt: new Date(),
    },
    {
      usernameTo: "beta",
      text: "log one",
      usernameFrom: "server",
      createdAt: new Date(),
    },

  ]

  data.map( (elem) => {
    Chatlogs.insert(elem);
  })

}


if (Meteor.isServer) {
  Meteor.startup( function() {
    Chatlogs.reset();
    Meteor.publish("Chatlogs", function(opts={}) {
      console.log("subscribe Chatlogs", opts);
      return Chatlogs.find(opts);
    })
  });
}



Chatlogs.sendMessageFromServer = function(usernameTo, text){
    Chatlogs.insert({
      usernameTo: usernameTo,
      text: text,
      usernameFrom: "server",
      createdAt: new Date(),
    });
}
