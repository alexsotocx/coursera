// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Favorites = new Schema({
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	dishes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Dish'
	}]
	}, {
		timestamps: true
	}
);


// the schema is useless so far
// we need to create a model using it
var Dish = mongoose.model('Favorite',Favorites);

// make this available to our Node applications
module.exports = Dish;
