var models = require('../models');
    
/*
 * GET log page.
 */

exports.view = function(req, res){
    var rawLifespans = []

	models.Lifespans
	.find()
	.sort({date: 1})
	.exec(storeLifespans);

	function storeLifespans(err, lifespans) {
        rawLifespans = lifespans;
	  	// res.render('activity', {"rawLifespans": lifespans});
	}

    models.Group.find().exec(processGroups);

    function processGroups(err, group) {
        if(err) console.log(err);
        var output = [];
        var groupCount = 0;
        var count = group.length;
        for(var i=0; i<count; i++) {
            var groupjson = group[i];
            output.push({'name':groupjson.name, 'numCategories':0, 'numActionsLogged':0});
// get name, # actions, all the actions and dates these have done
          // models.Action.find()
          // actionHistory: 
          
            models.ActionType.find({"group_name":groupjson.name}).exec(processActionType);

            function processActionType(err, items) {
                if(err) console.log(err);
                // console.log('processActionType');
                var totalLogged = 0;
                var numToProcess = 0;
                var numProcessed = 0;

                for(var j=0; j<items.length; j++) {

                    numToProcess = numToProcess + 1;
                    models.Action.find({"id":items[j].id}).sort({date: 1}).exec(processLoggedActions);

                    function processLoggedActions(err, actions) {

                        if(err) console.log(err);

                        totalLogged = totalLogged + actions.length;

                        // console.log('tot ' + totalLogged + 'processLoggedActions: ' + actions );

                        numProcessed = numProcessed + 1;
                    }

                    // itemArr.push({"name": items[j].name, "id":items[j].id, "value": "1", "done_today":"0"});
                }
                // while(numProcessed != numToProcess) {}

                setTimeout(function(){

                if(items.length!=0){
                  for(var k=0; k<output.length; k++){
                    if(output[k].name == items[0].group_name) {
                      output[k].numCategories=items.length;
                      output[k].numActionsLogged = totalLogged;
                    }
                  }
                }

                groupCount = groupCount + 1;
                if(groupCount==count){
                  // data['groups'] = output;
                  console.log("output:");
                  console.log(output);
                  res.render('activity',{"rawLifespans": rawLifespans, "groupData": output});
                }
            },100);
            }
        }
    }
};
