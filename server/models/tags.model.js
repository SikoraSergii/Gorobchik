const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    type: {type: String},
    names: [{ type: String }]
})

const Tags = module.exports = mongoose.model('Tags', TagsSchema);

module.exports.updateTags = function (tagType, tagNames, callback) {
    Tags.findOne({ 'type': tagType }, (err, tagObject) => {
        if (err) throw err;
        if (!tagObject) {
            tagObject = new Tags
            tagObject.type = tagType;
        } 
        tagObject.names = tagNames;
        tagObject.save(callback)
    })
}

module.exports.getTags = function (tagType, callback) {
    Tags.findOne({ 'type': tagType }, (err, tagObject) => {
        if (err) throw err;
        if (!tagObject) {
            callback('Object not found', false)
        } else {
            callback(null, tagObject.names)
        }
    })
}