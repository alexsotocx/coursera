var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/conFusion';
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log("Connected correctly to server");

	var collection = db.collection("dishes");
	collection.insertOne({name: "Uthapizza", description: "text"}, function(err, result) {
		assert.equal(err, null);
		console.log("After the insert: ", result.ops);

		collection.find({}).toArray(function(err, docs) {
			assert.equal(err, null);
			console.log("found: ", docs);
			db.dropCollection("dishes", function(err, result) {
				assert.equal(err, null);
				db.close();
			})

		});

	});


});