'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {
        type: String,
        required: 'Don\'t you want to give this note a name?'
    },
    content: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Notes', NoteSchema);