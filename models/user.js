let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let findOrCreate = require('mongoose-find-or-create')
let UserSchema = new Schema({
    name: String,
    email: String,
    googleId: String,
})

UserSchema.plugin(findOrCreate);

let User = mongoose.model('User', UserSchema);
module.exports = User;