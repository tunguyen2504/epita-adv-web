  
const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Tw = require('../../models/Tw');
const testMiddleware = require('../../middlewares/test');

var tws = [];

Router.get('/', testMiddleware, (req, res) => {
    // res.status(200).send('GET Tws');
    res.status(200).json(tws);
})

Router.get('/:twId', (req, res) => {
    twId = req.params.twId;

    tw = tws.filter((tw) => {
        return tw.id == twId;
    });

    // res.status(200).send('GET Tw Id: ' + twId);
    res.status(200).json(tw);
})

Router.post('/', (req, res) => {
    console.log(req.body.message);
    
    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })

        tw.save()
            .then(tw => {
							console.log("save->then")
              res.status(200).send(tw);
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.status(500).json({error: "Please put some values"});    
    }
})

Router.delete('/:twId', (req, res) => {
    twId = req.params.twId;

    tws = tws.filter((tw) => {
        return tw.id != twId;
    })

    res.status(200).json(tws);
})

Router.patch('/:twId', (req, res) => {
    twId = req.params.twId;
    message = req.body.message;

    tws.filter((tw) => {
        if (tw.id == twId) {
            tw.message = message
        }
    });

    res.status(200).json(tws);
})

module.exports = Router;