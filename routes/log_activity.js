 
exports.add = function(request, res) {
 	console.log("log_activity");
 	var actions = request.body.selections.split(",");
 	var lifeExp = request.body.lifeExp;

	var models = require('../models');

	var total = actions.length;
	var count = 0;
    var time = new Date().getTime();
 	for (i=0;i<actions.length;++i) {
 		var newAction= new models.Action({"id": actions[i], "user_id": 1, "date": time});
  		newAction.save(afterSaving);
  		function afterSaving(err, results) {
    		if(err) console.log(err);
    		console.log('saved action');
    		count = count+1;
    		if(count == total)
    			res.send("done");
  		}
    }
}