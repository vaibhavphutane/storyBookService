const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
       type: String,
       required: true 
    },
   name: {
       type: String
   },
    image: {
        type: String
    }
});

// create collection and scehma 

module.exports = mongoose.model('users', UserSchema);
