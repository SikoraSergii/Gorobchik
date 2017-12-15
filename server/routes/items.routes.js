const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const Tags = require('../models/tags.model');

router.post('/getTags', (req, res) => {
    console.log('Here')
    if (!req.body.tagType) {
        res.json({succsses: false, msg: 'No tag type'})
    } else {
        Tags.getTags(req.body.tagType, (err, tagNames) => {
            if (err) res.json({ succsses: false, err: err })
            else res.json({ succsses: true, data: tagNames })
        })
    }
})
router.post('/updateTags', (req, res) => {
    if (!req.body.tagType || !req.body.tagNames) {
        res.json({ succsses: false, msg: 'Not enough info' })
    } else if (req.body.tagType !== 'items' || req.body.tagType !== 'comlects' ) {
        res.json({ succsses: false, msg: 'Not correct info' })
    } else {
        Tags.addTag(req.body.tagType, req.body.tagNames, (err) => {
            if (err) res.json({ succsses: false, err: err })
            else res.json({ succsses: true})
        })
    }
})


module.exports = router