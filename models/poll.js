let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-find-or-create')


let pollOptionSchema = new Schema({
    name: String,
    votes: Number,
    image: String,
})


let PollSchema = new Schema({
    name: String,
    creatorId: String,
    pictureURL: String,
    created: Date,
    options: [pollOptionSchema],
})

let Poll = mongoose.model('Poll', PollSchema);
module.exports = Poll;