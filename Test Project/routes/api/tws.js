const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Tw = require('../../models/Tw');
const testMiddleware = require('../../middlewares/test');

var tws = [];

Router.get('/', testMiddleware, async (req, res) => {
	try {
		tws = await Tw.find();
		if (tws && tws.length > 0) {
			res.status(200).json(tws);
		} else {
			res.status(404).json({ "message": "No Twit found." });
		}
	} catch (err) {
		res.status(500).json({ error: err })
	}
})

Router.get('/:twId', async (req, res) => {
	twId = req.params.twId;

	try {
		const tw = await Tw.findById(twId);

		if (tw) {
			res.status(200).json(tw);
		} else {
			res.status(404).json({ "message": "No Twit found." })
		}
	} catch (err) {
		res.status(500).json({ error: err })
	}
})

Router.post('/saveTw', (req, res) => {
	console.log(req.body.message);

	if (req.body.message && req.body.message != "") {
		const tw = new Tw({
			_id: new mongoose.Types.ObjectId(),
			message: req.body.message
		})

		tw.save()
			.then(tw => {
				res.redirect('/tws');
			})
			.catch(err => {
				res.status(500).json({ error: err });
			})
	} else {
		res.status(500).json({ error: "Please put some values" });
	}
})

Router.delete('/:twId', (req, res) => {
	twId = req.params.twId;

	Tw.remove({
		_id: twId
	}, (err) => {
		if (err) {
			res.status(500).json({ error: err })
		} else {
			res.status(200).json({ "message": "Twit has been deleted." });
		}
	})
})

Router.patch('/:twId', async (req, res) => {
	twId = req.params.twId;
	newMessage = req.body.message;

	try {
		const tw = await Tw.findByIdAndUpdate(
			twId,
			{
				message: newMessage
			},
			{
				new: true
			}
		)
		if (tw) {
			res.status(200).json(tw);
		} else {
			res.status(404).json({ "message": "No Twit found." })
		}
	} catch (err) {
		res.status(500).json({ error: err })
	}
})

module.exports = Router;
