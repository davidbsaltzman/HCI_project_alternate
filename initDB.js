
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

  models.Group.find().exec(afterQuery);

    function afterQuery(err, group) {
      if(err) console.log(err);
      console.log(group);
      console.log("group");
    }


// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'HCI';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

// Do the initialization here

// Step 1: load the JSON data
var action_types_json = require('./action_types.json');
var users_json = require('./users.json');
var groups_json = require('./group.json');
var pastLifespans_json = require('./pastLifespans.json');
var total = 5;
var done = 0;

console.log(pastLifespans_json);
models.Lifespans
  .find()
  .remove()
  .exec(onceClearLifespans); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearLifespans(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = pastLifespans_json.length;
  for(var i=0; i<pastLifespans_json.length; i++) {
    var json = pastLifespans_json[i];
    var lifespan = new models.Lifespans(json);
    // console.log("lifesanp:"+lifespan);
    lifespan.save(function(err, action_type) {
      if(err) console.log(err);

      to_save_count--;
      console.log('lifespan: '+ to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('lifspan DONE');
        done = done+1;
        if(done==total){
          mongoose.connection.close()
        }
      }
    });
  }
}

// Step 2: Remove all existing documents
models.ActionType
  .find()
  .remove()
  .exec(onceClearActionType); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearActionType(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = action_types_json.length;
  for(var i=0; i<action_types_json.length; i++) {
    var json = action_types_json[i];
    var action_type = new models.ActionType(json);

    action_type.save(function(err, action_type) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('action type DONE');
        done = done+1;
        if(done==total){
          mongoose.connection.close()
        }
        // The script won't terminate until the 
        // connection to the database is closed
        // mongoose.connection.close()
      }
    });
  }
}

// Step 2: Remove all existing documents
models.User
  .find()
  .remove()
  .exec(onceClearUser); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearUser(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var user = new models.User(json);

    user.save(function(err, user) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('user DONE');
        done = done+1;
        if(done==total){
          mongoose.connection.close()
        }
        // The script won't terminate until the 
        // connection to the database is closed
      }
    });
  }
}

// Step 2: Remove all existing documents
models.Group
  .find()
  .remove()
  .exec(onceClearGroup); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearGroup(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = groups_json.length;
  for(var i=0; i<groups_json.length; i++) {
    var json = groups_json[i];
    var group = new models.Group(json);

    group.save(function(err, user) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('group DONE');
        done = done+1;
        if(done==total){
          mongoose.connection.close()
        }
        // The script won't terminate until the 
        // connection to the database is closed
        // mongoose.connection.close()
      }
    });
  }
}

// Step 2: Remove all existing documents
models.Action
  .find()
  .remove()
  .exec(onceClearAction); // callback to continue at

// Step 3: load the data from the JSON file
function onceClearAction(err) {
  if(err) console.log(err);
  console.log('action DONE');
  done = done+1;
  if(done==total){
    mongoose.connection.close()
  }
}

