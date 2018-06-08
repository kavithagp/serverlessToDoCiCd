var assert = require('assert');
var request = require('request');
var fs = require('fs');

describe('Create, Delete', function() {
	this.timeout(5000);
    it('should create a new Todo, & delete it', function(done) {
		// Build and log the path
		var path = "https://" + process.env.TODOS_ENDPOINT + "/todos";

		// Fetch the comparison payload
		require.extensions['.txt'] = function (module, filename) {
		    module.exports = fs.readFileSync(filename, 'utf8');
		};
		var desiredPayload = require("./data/newTodo1.json");

		// Create the new todo
		var options = {'url' : path, 'form': JSON.stringify(desiredPayload)};
 		request.post(options, function (err, res, body){ 
			if(err){
				throw new Error("Create call failed: " + err);
			}
			assert.equal(200, res.statusCode, "Create Status Code != 200 (" + res.statusCode + ")");
			var todo = JSON.parse(res.body);
			// Now delete the todo
			var deletePath = path + "/" + todo.id;
			request.del(deletePath, function (err, res, body){ 
				if(err){
					throw new Error("Delete call failed: " + err);
				}
				assert.equal(200, res.statusCode, "Delete Status Code != 200 (" + res.statusCode + ")"); 
				done();   
		  	});		
  		});
    });
});