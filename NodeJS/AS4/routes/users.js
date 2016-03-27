var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	User.find({}, function(err, users) {
		if(err) throw err;
		res.json(users);
	})
});

router.post('/register', function(req, res) {
	User.register(new User({ username : req.body.username }),
		req.body.password, function(err, user) {
			if (err) {
				return res.status(500).json({err: err});
			}
			if(req.body.firstname) {
				user.firstname = req.body.firstname;
			}
			if(req.body.lastname) {
				user.lastname = req.body.lastname;
			}
			user.save(function(err, user) {
				passport.authenticate('local')(req, res, function () {
					return res.status(200).json({status: 'Registration Successful!'});
				});
			});
			
		});
});

router.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({
				err: info
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
			
			var token = Verify.getToken(user);
			res.status(200).json({
				status: 'Login successful!',
				success: true,
				token: token
			});
		});
	})(req,res,next);
});

router.get('/logout', function(req, res) {
	req.logout();
	res.status(200).json({
		status: 'Bye!'
	});
});



router.get('/facebook', passport.authenticate('facebook'),
	function(req, res){});

router.get('/facebook/callback', function(req,res,next){
	passport.authenticate('facebook', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({
				err: info
			});
		}
		req.logIn(user, function(err) {
			if (err) {
				return res.status(500).json({
					err: 'Could not log in user'
				});
			}
				var token = Verify.getToken(user);
				res.status(200).json({
					status: 'Login successful!',
					success: true,
					token: token
			});
		});
	})(req,res,next);
});

module.exports = router;

/*
Disclaimer 
This token wont work for you
admin: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiYWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImhhc2giOiJpbml0Iiwic2FsdCI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiaGFzaCI6dHJ1ZSwic2FsdCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImFkbWluIjp0cnVlLCJfX3YiOjAsInVzZXJuYW1lIjoiYWRtaW4iLCJoYXNoIjoiZDIzOWI1ZTIxZjAxNDFiYTYxNTA3Zjg0ODQyZGRmMzU4ZjdhYjE0NTM3NGE3OGExZWJmYjk1Zjg2ZmZiYzg3ODg1ODQ4Y2Y4Y2ZmNzg0YTcwNzAzNGVlNWUxNzA1NmYxYTc3Mjc0MjFjM2NjNWU1NTEzYjRjZGVlMmRhMWJjYzZlNzYwZjZlMmJiM2QzZmQ0ZWYyNzIxM2I2ZDMzNDQ2ZjAzMmRlMmJkYTVkN2EzYjgwZjBmODFlZjZmMDM3MGU4MWRhYTJjZWNhYTg0MDQ3ZTk0YTZmNDBiOWQ0MTJlZDE5OTgzODM0N2U1YjczZTEzNDA0YTE4ZDIxYmFmOGI3ZTY2MmNmMTFiMWE1NjE5ZGRkMzQxNzYwNTA5OGMzZTUwZDUzMzhlNGFiM2JjYTFhNjg4NzRjNjM3ZTg1MDlmMmQ0MThhODNiOWEwMzM3Y2RkN2U1YmI1ZDAwMzc3NzhiZmMxYjM5MjM2Y2JlMTdkYmNjYjBhYmExN2Q5ZjQwYWFiMDQ0NDgzNWUwY2FhMDIxZTU1NTJjOWIxOGI0Y2UxMmQ0OTI4M2Y0MDk5YWQwNzhmYzg4OWJlOGU1NjQ0ZmFhYWUzNzc2MDQ0YzI2NjMxZjMyNWFjMjBlNDIzYjRlNWMxMmZjM2E0ZDk3YWVkYzNhN2RlY2IxZWJjYTcxMjdjZjAzOTQwNTE3MDI5ZjczYTE5MjdhNGUwZGY1ZGU2YzVhYmZlYmYwZjkxNjg1NzNkNzFmODVkYTI3ODVhYjI0YmJlYTAwNzZiNzA5MmUzNDNmNzJlNDY5NmRkOWNkYTFlZmFmYWZiOTlhZjQ4MzNjMzYyNjQwMTg3ODNhZmRmODI3NGRmYmVkMDQzNWY1NjgzNzBkZDUxZjg3MTZmMDYwNDQ5ZjlhMzVmN2UzNDYxMTRlOTM1Y2I5NWUxY2ExYjBmMGEzOWI4NDVjMTZiNzVlZDJhNTczNjAxM2VmYTAyYWZlZDk0ZjliZWY5ZWNiMTZjZTUxM2E0YzRlNDEyNGQ4OGEwYWRmNDgwN2FkMjcwMDk1ZjYzYzU0NGY0MTAzZTBmZDhmMjFjNTg3NzJkMmE0MWJjNmU3NWMyNzNhZDhmYmQ4NGRjZWUxYjY4YzA1YjViNzQwNjM0MjQ1NDU3MWMwODM3ZTVhNTk5MjdmNmVlZGUyM2UyOWVlZTY0OGFkNzM0ZGY4MWYyN2JlOGEzODY0ODQ0ODk0NzA5ZDE2ZTQ4MmU3ZWIwM2IxMTBkNDVkMzYwZmNmYmNiNDUwNmMyMDFlYjhiMTMyMWE0NjY1MjFlMWFlODI4ZGRhYWU0NzI5MWFmNWU2NWFkNTg2NGNkNGI0MDZkNjc2M2Y3OWVmYzY4OTZkMiIsInNhbHQiOiIyMDI3N2JiOWJjYWU0OGI1MzYzZTIxNDFhNjY1MzkxODhkMTBiMmI2ZjcwNWZhYTgwZDRkYmQxM2JmMGFkMThhIiwiX2lkIjoiNTZmMDY4NzA4NDM4MTkyYjNkNTBjZDU4In0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NTg1OTYxODEsImV4cCI6MTQ1ODU5OTc4MX0.1HFCYExwdZVEmjFkbj7GM6MLxRuMU6bWNNOMaSMxjAg
normalUser: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiYWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsImhhc2giOiJpbml0Iiwic2FsdCI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImFkbWluIjp0cnVlLCJ1c2VybmFtZSI6dHJ1ZSwiaGFzaCI6dHJ1ZSwic2FsdCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7ImFkbWluIjpmYWxzZSwiX192IjowLCJ1c2VybmFtZSI6ImFsZXgiLCJoYXNoIjoiZjg3YWFiMzE5YzAyZTFhMGRmYzMyMzRjNjY1NTFmM2ZhZTY4YzgxMzExNDI2NGNmNDllZGZlODk2N2YxOTI4NDhhOWMzNDQ3NDc3ODYxOTFiNjU0N2M0NTU5YzM5NDljZTM1MjU4ZDkyMjQ3YjU3ZDkxYmQ5OGFkNTgzZGIwYTAxZjMwMmJiY2RjMzQ4NjAyOWM5YmE2ODZlOTFmMjE4ZDk2NjNhZjc4ZDNiMGUzY2Y1NzQ2YWM0YWY3OGJlYzE5M2M3MThhMDRjYzQyYzI1Y2E5MDgyN2RmZGY1YTVkMDNkNGQzOTQwNjMwZDQ0NDFjZTBmNDU5MzU5YzNmNGRmNGM1MTY1NGZjMTEyYzMyYmVlMjc1ODcwMDZkODQzYWQ4ZTdiZTQwNzA2MTYyYWM3ZDlhZTI2ZTUwYzdkMzA4ZTdhZjc4MGU1Y2VhZThkMWY2NmJlOTg4NjJjZGNhYzQwNTBkYTg3NzQxNjRjNWRkY2RkNWZiYjdlMzhmNTQ3MTRiMGE2YjdjN2FmMGM5NTBmNzk5MmU5MDc1YWNkNjI3ODg0ZTQ1N2RjMDg4ZWE5MGZlOTgwNGMwOWE3NDk1MjdhNTMyYjA3MThhYWMzYTdiNGQ0M2JkZGFkNGYxZDM5OTQxNjk4M2FiYWY4Mzc2NTAxZDQ5M2U2NTk4ZDUyYmRjZWZlZjc4ZWM0MGNkYzY3Yjg3YjI3ZDQ2NDI4YzIzYTNiNGMzZGViZjJiNDA2YTI2NDg4YWNiN2JkNTg3MDUwOWM3ZGIwNTI2OWY2MjJkNWY4ZDU3NGY4YmIyZmQzMzg5OTk5N2RlNDEzZDQxZDljMDkwNmU4MjJlOTNhMzFjMDU2NjExMDFlMDAyM2MwOWUwYzc4MGJjYWJjYzk1ZTA3NWYxMTJmMTc4NjQ0NWY4Y2ZiOTEzNzgzY2IxNzRhYmYwOTNlMDFlYjU3ODkyNjM0NWE5MTI1NjZlNWU3NTg1NjdkYThhYTJlNzAwYTBlZTYyYmM5OGY2YTdmY2EwZDdhNGZiMGJmZGRmNDJkN2E5MzZjNTg2NzY4ZTU1ZDk2NzM0OWRkNGRkMzAwNzkzNGU0NThlNzA5M2EwMWJiYzE1MTIzMTY2MzE4MDZmZTJiZDk5NWUxMDA5NDk2MDUzOTQ0ODkwNTU5NjNkMjI4MmU0Y2U0YTVkNjNlMGVlZWVlNGNlOGZiNzUwMDZiYWQ3OTU5NzNkYTgwMjgzY2IwMWUzM2ViMjhiMmVhOTFmNmY2ZjI3YWYzNjJmNDIxNjhjYjQ2NzJkNGU1NGIwNDcxNDg0ZjAwNjgzNDBiOWJhOTZiZGZiMjgwNmNlMGIzYjNlM2ZjOGFkOTY1MGFjMDQ0N2NmMDA0NyIsInNhbHQiOiI4ZDFiNGYzMzQzOWUzMzdmZjBjNTFjZGFmNzhhMjAyNzhmZDk4MWZhY2UwZjkyMmRiYzQxMDNiY2ExYzU1NGE4IiwiX2lkIjoiNTZmMDYzZDJkMGJhMmE4ZTNjMzlkZGVhIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NTg1OTc5MzMsImV4cCI6MTQ1ODYwMTUzM30.iOBlrbfIOzpGrj3xTUuJzbHQtVaPR4jR2tglE-v0huo
*/