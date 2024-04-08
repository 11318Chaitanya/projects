import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "http://localhost:5000";
   const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    //get notes
    const getNote = async ()=>{
      // api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json(); 
      console.log(json);
      setNotes(json);  
    }

    // Add a note
    const addNote = async (title, description, tag)=>{

      // api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const note = await response.json(); 
      console.log(note);
      props.showAlert("Note added successfully","success");
      setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async(id)=>{
      //api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json(); 
      console.log(json);
      props.showAlert("Note deleted successfully","success");

      const newNotes = notes.filter(note=>{
        return note._id !== id;
      })
      setNotes(newNotes);
    }
    // Edit a note
    const editNote = async (id, title, description, tag)=>{

      // api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const json = await response.json(); 
        console.log(json);
        props.showAlert("Note updated successfully","success");

        let newNotes = JSON.parse(JSON.stringify(notes)); // creates a deep copy of the notes object
        for(let i=0; i<newNotes.length; i++){
          const element = newNotes[i];
          if(element._id === id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;