var Express = require('express');
var BodyParser = require('body-parser');
var PromotionRouter= Express.Router();
var Promotion = require('../models/promotions');
var Verify = require('./verify');

PromotionRouter.use(BodyParser.json());

PromotionRouter.route('/')

	.get(Verify.verifyOrdinaryUser, function(req,res,next){
		Promotion.find({}, function(err, dishes) {
			if (err) throw err;
			res.json(dishes);
		});
	})

	.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
		Promotion.create(req.body, function(err, dish) {
			if (err) throw err;
			res.json(dish);
		});  
	})

	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
		Promotion.remove({}, function(err, resp) {
			if(err) throw err;
			res.json(resp);
		})
	});

PromotionRouter.route('/:promotionId')

	.get(Verify.verifyOrdinaryUser, function(req,res,next){
		Promotion.findById(req.params.promotionId, function(err, foundLeader) {
			if(err) throw err;
			res.json(foundLeader);
		})
	})

	.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
		Promotion.findByIdAndUpdate(req.params.promotionId, {$set: req.body},{new: true},function(err, dish) {
			if(err) throw err;
			res.json(dish);
		})
	})

	.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
		Promotion.remove(req.params.promotionId, function(err, resp) {
			if(err) throw err;
			res.json(resp);
		})
	});

module.exports = PromotionRouter;
