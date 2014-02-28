
/*
* GET home page.
*/

exports.view = function(req, res){
  var models = require('../models');

  console.log("click on index");
  models.User.find({'id':1}, function(err, doc) {
    if(doc!=null && doc.length > 0){
      var expLifeSpan = doc[0].ExpLifeSpan;
      var curAge = doc[0].age;

      var models = require('../models');
      models.Lifespans.find({}).sort({date: -1}).exec(function(err,docs){
        var lastLifeSpan = docs[0];
        var lastDate = lastLifeSpan.date;
        var curDate = new Date();
        var timeDiff = Math.abs(curDate.getTime() - lastDate.getTime());
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 

        // console.log(lastDate);
        // console.log('diffdays:'+diffDays);
        var lifespan = lastLifeSpan.lifespan;

        for(var i = 0; i < diffDays; i++) {
          var date = new Date(curDate.getTime() - 1000 * 3600 * 24 * (diffDays-1-i));
          var curLifeSpan = Math.ceil(Math.pow(0.7, i+1) * (lifespan - 50)) + 50;
          console.log("curlifespan:"+curLifeSpan);
          var newLifeSpan = new models.Lifespans({'id':1, 'date':date, 'lifespan': curLifeSpan});
          newLifeSpan.save();
        }
        lifespan = Math.ceil(Math.pow(0.7, diffDays) * (lifespan - 50)) + 50;
        res.render('index', {
          'expLifeSpan': lifespan,
          'curAge': curAge
        });
      });

    } else {
      console.log(doc);
      console.log("insert again");
      users.insert({id:1, name:"test user", ExpLifeSpan:70, age:23});
      res.render('index', {
       'expLifeSpan': 70,
       'curAge': 23
     });
    }
  });
};
