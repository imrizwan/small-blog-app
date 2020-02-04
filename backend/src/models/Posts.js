const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    user: { 
        type: String, 
        required: true
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
    }
});

module.exports = Posts = mongoose.model('posts', postsSchema);