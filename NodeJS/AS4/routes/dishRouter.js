var Express = require('express');
var BodyParser = require('body-parser');
var DishRouter= Express.Router();
var Dishes = require('../models/dishes');
var Verify = require('./verify');
DishRouter.use(BodyParser.json());

DishRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req,res,next){
	Dishes.find({})
		.populate('comments.postedBy')
		.exec(function(err, dishes) {
		if (err) throw err;
		res.json(dishes);
	});
})

.post(Verify.verifyAdmin, function(req, res, next){
	Dishes.create(req.body, function(err, dish) {
		if (err) throw err;
		res.json(dish);
	});  
})

.delete(Verify.verifyAdmin, function(req, res, next){
	Dishes.remove({}, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
});

DishRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)
.get(function(req,res,next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, foundDish) {
		if(err) throw err;
		res.json(foundDish);
	})
})

.put(Verify.verifyAdmin, function(req, res, next){
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body},{new: true},function(err, dish) {
		if(err) throw err;
		res.json(dish);
	})
})

.delete(Verify.verifyAdmin, function(req, res, next){
	Dishes.remove(req.params.dishId, function(err, resp) {
		if(err) throw err;
		res.json(resp);
	})
});

DishRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)
.get(function (req, res, next) {
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function (err, dish) {
		if (err) throw err;
		res.json(dish.comments);
	});
})

.post(function (req, res, next) {
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function (err, dish) {
		if (err) throw err;
		req.body.postedBy = req.decoded._doc._id;
		dish.comments.push(req.body);
		dish.save(function (err, dish) {
			if (err) throw err;
			console.log('Updated Comments!');
			res.json(dish);
		});
	});
})

.delete(Verify.verifyAdmin, function (req, res, next) {
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
.all(Verify.verifyOrdinaryUser)
.get(function (req, res, next) {
	Dishes.findById(req.params.dishId)
	.populate('comments.postedBy')
	.exec(function (err, dish) {
		if (err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
})

.put(function (req, res, next) {
		// We delete the existing commment and insert the updated
		// comment as a new comment
		Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function (err, dish) {
			if (err) throw err;
			if (!req.decoded._doc.admin && dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
				var err = new Error('You are not authorized to perform this operation!');
				err.status = 403;
				return next(err);
			}
			dish.comments.id(req.params.commentId).remove();
			req.body.postedBy = req.decoded._doc._id;
			dish.comments.push(req.body);
			dish.save(function (err, dish) {
				if (err) throw err;
				console.log('Updated Comments!');
				res.json(dish);
			});
	});
	})

.delete(Verify.verifyAdmin, function (req, res, next) {
	Dishes.findById(req.params.dishId)
	.populate('comments.postedBy')
	.exec(function (err, dish) {
		if (!req.decoded._doc.admin && dish.comments.id(req.params.commentId).postedBy != req.decoded._doc._id) {
			var err = new Error('You are not authorized to perform this operation!');
			err.status = 403;
			return next(err);
		}
		dish.comments.id(req.params.commentId).remove();

		dish.save(function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});
});
module.exports = DishRouter;
