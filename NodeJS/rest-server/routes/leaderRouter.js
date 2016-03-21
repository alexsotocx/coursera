var Express = require('express');
var BodyParser = require('body-parser');
var LeaderRouter= Express.Router();
var Leaders = require('../models/leadership');

LeaderRouter.use(BodyParser.json());

LeaderRouter.route('/')

	.get(function(req,res,next){
		Leaders.find({}, function(err, dishes) {
			if (err) throw err;
			res.json(dishes);
		});
	})

	.post(function(req, res, next){
		Leaders.create(req.body, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});  
	})

	.delete(function(req, res, next){
		Leaders.remove({}, function(err, resp) {
			if(err) throw err;
			res.json(resp);
		})
	});

LeaderRouter.route('/:leaderId')

	.get(function(req,res,next){
		Leaders.findById(req.params.leaderId, function(err, foundLeader) {
			if(err) throw err;
			res.json(foundLeader);
		})
	})

	.put(function(req, res, next){
		Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body},{new: true},function(err, dish) {
			if(err) throw err;
			res.json(dish);
		})
	})

	.delete(function(req, res, next){
		Leaders.remove(req.params.leaderId, function(err, resp) {
			if(err) throw err;
			res.json(resp);
		})
	});

module.exports = LeaderRouter;
