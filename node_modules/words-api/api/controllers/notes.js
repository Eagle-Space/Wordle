'use strict';

const chalk = require('chalk');
const mongoose = require('mongoose');

const isDev = require('../../utils').isDev;

const Note = mongoose.model('Notes');

exports.createNote = (req, res) => {
    let newNote = new Note(req.body);

    newNote.save((err, note) => {
        if (err) {
            if (isDev()) {
                console.log(chalk.red(err));
            }

            res.send(err);
        }

        if (note && isDev()) {
            console.log(chalk.green(`Note ${note._id} created successfully`));
            console.log(chalk.white(note));
        }

        res.json(note);
    });
};

exports.deleteNote = (req, res) => {
    Note.remove({
        _id: req.params.noteId
    }, (err, note) => {
        if (err) {
            if (isDev()) {
                console.log(chalk.red(err));
            }

            res.send(err);
        }

        if (isDev()) {
            console.log(chalk.green(`Note ${req.params.noteId} successfully deleted`));
            console.log(chalk.white(note));
        }

        res.json({
            message: `Note ${req.params.noteId} successfully deleted`,
            noteId: req.params.noteId,
        });
    })
}

exports.listNotes = (req, res) => {
    Note.find({}, (err, note) => {
        if (err) {
            if (isDev()) {
                console.log(chalk.red(err));
            }
            res.send(err);
        }

        if (isDev()) {
            console.log(chalk.green('Notes retrieved successfully'));
            console.log(chalk.white(note));
        }

        res.json(note);
    });
};

exports.readNote = (req, res) => {
    Note.findById(req.params.noteId, (err, note) => {
        if (err) {
            if (isDev()) {
                console.log(chalk.red(err));
            }

            res.send(err);
        }

        if (isDev()) {
            console.log(chalk.green(`Note ${req.params.noteId} found`));
            console.log(chalk.white(note));
        }

        res.json(note);
    });
}

exports.updateNote = (req, res) => {
    Note.findOneAndUpdate({ _id: req.params.noteId }, req.body, { new: true }, (err, note) => {
        if (err) {
            if (isDev()) {
                console.log(chalk.red(err));
            }

            res.send(err)
        }

        if (isDev()) {
            console.log(chalk.green(`Note ${req.params.noteId} found`));
            console.log(chalk.white(note));
        }

        res.json(note);
    })
}
