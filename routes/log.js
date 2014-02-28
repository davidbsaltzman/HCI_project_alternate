
/*
 * GET log page.
 */
 var groups = require('../groups.json');

 exports.view = function(req, res){
  console.log('clicked on log');
  var models = require('../models');
  models.User.find({'id':1}, function(err, doc) {

    var expLifeSpan = doc[0].ExpLifeSpan;
    var curAge = doc[0].age;
    data = [];
    data['curAge'] = curAge;
    var models = require('../models');
    models.Lifespans.find({}).sort({date: -1}).exec(function(err,docs){
      var lastLifeSpan = docs[0];
      data['expLifeSpan'] = lastLifeSpan.lifespan;

      models.Group.find().exec(afterQuery);

      function afterQuery(err, group) {
        if(err) console.log(err);
        var output = [];
        var groupCount = 0;
        var count = group.length;
        for(var i=0; i<count; i++) {
          var json = group[i];
          output.push({'name':json.name, 'id':json.id, "value": "0", 'items':[]});
          models.ActionType.find({"group_id":json.id}).exec(afterQueryAction);
          function afterQueryAction(err, items) {
            if(err) console.log(err);
            var itemArr = [];
            for(var j=0; j<items.length; j++) {
              itemArr.push({"name": items[j].name, "id":items[j].id, "value": "1", "done_today":"0"});
            }
            if(items.length!=0){
              for(var k=0; k<output.length; k++){
                if(output[k].id == items[0].group_id) {
                  output[k].items=itemArr;
                }
              }
            }
            groupCount = groupCount + 1;

            if(groupCount==count){
              data['groups'] = output;
              console.log(data);
              res.render('log',data);
            }
          }
        }
      }
    });
  });
};



exports.update = function(req, res) {
  var lifespan = req.body.value;
  console.log('life span'+lifespan);
  var models = require('../models');
  models.Lifespans.find({}).sort({date: -1}).exec(function(err,docs){
    var lastID = docs[0]._id;
    data['expLifeSpan'] = docs[0].lifespan;
    console.log(lastID);
    models.Lifespans.update({'_id':lastID}, {'lifespan':lifespan}).exec(afterQuery);
    function afterQuery(err, lifespans) {
      if(err) console.log(err);
      console.log("success");
      res.send(0);
    }
  });

}