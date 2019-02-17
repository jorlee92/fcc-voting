var express = require('express');
var router = express.Router();
var Poll = require('../models/poll')
/* GET polls. (Most recent 20) */
router.get('/', function(req, res, next) {
	Poll.find({})
	.sort({'created': -1})
	.limit(20)
	.then(polls => {
		res.json(polls)
	})
});

router.post('/', function(req, res, next) {
	// Users should post to /poll/ with name, pictureURL, and options
	Poll.create({
		name: req.body.name,
		creatorId: req.user._id,
		pictureURL: req.body.pictureURL,
		created: new Date(),
		options: [],
	})
	.then(poll => res.json(poll))
	.catch(err => res.send(err))
})

router.get('/:pollID', function(req, res, next){
	let providedID = req.params.pollID;
	Poll.findOne({"_id": providedID })
	.then(result => res.json(result))
	.catch(err => res.send(err))
})

router.post('/:pollID/options', function(req, res, next){
	let name = req.body.name;
	let image = req.body.imageURL;
	let providedID = req.params.pollID;
	Poll.findOne({"_id": providedID})
	.then(result => {
		result.options.push({
			name: name,
			votes: 0,
			image: image,
		})
		result.save();
		res.json(result);
	})
	.catch(err => res.send(err))
})



module.exports = router;
