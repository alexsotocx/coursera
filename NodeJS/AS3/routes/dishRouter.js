var Express = require('express');
var BodyParser = require('body-parser');
var DishRouter= Express.Router();
var Dishes = require('../models/dishes');
var Verify = require('./verify');
DishRouter.use(BodyParser.json());

DishRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
	Dishes.find({}, function(err, dishes) {
		if (err) throw err;
		res.json(dishes);
	});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.create(req.body, function(err, dish) {
		if (err) throw err;
		res.json(dish);
	});  
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.remove({}, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
});

DishRouter.route('/:dishId')

.get(Verify.verifyOrdinaryUser, function(req,res,next){
	Dishes.findById(req.params.dishId, function(err, foundDish) {
		if(err) throw err;
		res.json(foundDish);
	})
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body},{new: true},function(err, dish) {
		if(err) throw err;
		res.json(dish);
	})
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
	Dishes.remove(req.params.dishId, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
});

DishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Dishes.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;
		res.json(dish.comments);
	});
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Dishes.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;
		dish.comments.push(req.body);
		dish.save(function (err, dish) {
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Dishes.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;
		for (var i = (dish.comments.length - 1); i >= 0; i--) {
			dish.comments.id(dish.comments[i]._id).remove();
		}
		dish.save(function (err, result) {
			if (err) throw err;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Deleted all comments!');
		});
	});
});

DishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
	Dishes.findById(req.params.dishId, function (err, dish) {
		if (err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
		// We delete the existing commment and insert the updated
		// comment as a new comment
		Dishes.findById(req.params.dishId, function (err, dish) {
			if (err) throw err;
			dish.comments.id(req.params.commentId).remove();
			dish.comments.push(req.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				res.json(dish);
			});
		});
	})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
	Dishes.findById(req.params.dishId, function (err, dish) {
		dish.comments.id(req.params.commentId).remove();
		dish.save(function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});
});
module.exports = DishRouter;
