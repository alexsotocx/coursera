var Express = require('express');
var BodyParser = require('body-parser');
var FavoriteRouter= Express.Router();
var Favorites = require('../models/favorites');
var Verify = require('./verify');
FavoriteRouter.use(BodyParser.json());

FavoriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
	.get(function(req, res, next) {
		Favorites.findOne({postedBy: req.decoded._doc._id})
			.populate('dishes')
			.populate('postedBy')
			.exec(function(err, favorites) {
				if(err) throw err;
				res.json(favorites);
			})
	})
	.post(function(req, res, next) {
		Favorites.findOne({postedBy: req.decoded._doc._id})
			.exec(function(err, favorites) {
				if(err) throw err;
				if(!favorites){
					favorites = new Favorites();
					favorites.dishes = [];
				}
				favorites.postedBy = req.decoded._doc._id;
				favorites.dishes.push(req.body._id);
				favorites.save(function(err, favorites) {
					if(err) throw err;
					res.json(favorites);
				})
			})
	})
	.delete(function(req, res, next) {
		Favorites.findOneAndRemove({postedBy: req.decoded._doc._id}, function(err, favorites) {
				if(err) throw err;
				res.json(favorites)
			})
	});

FavoriteRouter.route('/:dishId')
.all(Verify.verifyOrdinaryUser)
.delete(function(req, res, next) {
	Favorites.findOne({postedBy: req.decoded._doc._id})
		.exec(function(err, favorites) {
			if(err) throw err;
			if(favorites) {
				favorites.dishes = favorites.dishes.filter(function(dish) {
					return dish != req.params.dishId;
				})
				if(favorites.dishes.length == 0) {
					favorites.remove(function(err, favorites) {
						res.json(favorites);
					})
				} else {
					favorites.save(function(err, favorites) {
						if(err) throw err;
						res.json(favorites);
					})
				}
			}			
		});
})
module.exports = FavoriteRouter;