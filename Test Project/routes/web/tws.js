const express = require('express');
const Router = express.Router();

const Tw = require('../../models/Tw');

Router.get('/', (req, res) => {
    var error = false;

    Tw.find()
        .lean()
        .exec()
        .then(tws => {
            res.render('tws', {
                tws: tws,
                error: error
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

module.exports = Router;