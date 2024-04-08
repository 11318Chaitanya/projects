const express = require('express');
const router = express.Router();
const Note = require("../models/Note")
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require("express-validator");


//Route1: Get all the Note using : GET /api/Note/fetchallnote. Login is required
router.get('/fetchallnotes',fetchuser ,async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id}); 
        res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

// Route 2: Add note using : POST /api/addnote. Login is required
router.post('/addnote',fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
] ,async (req, res)=>{

    try{
        const {title, description, tag} = req.body;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);


    }catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

//Route3: Update a existing note using : PUT /api/Note/updatenote. Login is required
router.put('/updatenote/:id',fetchuser ,async (req, res)=>{
    const {title, description, tag} = req.body;
    try{
    // create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag}; 

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id); // will give back the id 
    if(!note){res.status(404).send("Not found")};

    //allow updation if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true}); // {new: true} : means mongoose should return the updated document if it is false than it means that mongoose should return the document before updation
    res.json({note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route4: Delete a existing note using : DELETE /api/Note/deletenote. Login is required
router.delete('/deletenote/:id',fetchuser ,async (req, res)=>{
    try{
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id); // will give back the id 
    if(!note){res.status(404).send("Not found")};

    //allow deletion if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }    

    note = await Note.findByIdAndDelete(req.params.id); // {new: true} : means mongoose should return the updated document if it is false than it means that mongoose should return the document before updation
    res.json({"Success":"Note has been deleted successfully", note:note});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;