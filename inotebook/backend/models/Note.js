const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        requried: true
    },
    description:{
        type: String,
        requried: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Note', NoteSchema);