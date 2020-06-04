import React from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css';
import { deleteNote, NotesStatus, NoteComplexity } from '../../../core/api/notes.api';
import { getLoggedUser } from '../../../core/api/users.api';


export function NoteCard({ note, onDeleteClick }) {

    const loggedUser = getLoggedUser();
    let noteClasByStatus = "card mb-3 ";
    let noteClassByComplexity = "card-header ";
    
     //switch status
    switch(note.status){
        case NotesStatus.Active: noteClasByStatus += "border-primary"; break;  
        case NotesStatus.Pending: noteClasByStatus += "border-secondary"; break;
        case NotesStatus.Done: noteClasByStatus += "border-success"; break;
        default: noteClasByStatus += "border-primary";
    } 

    //switch complexity
    switch(note.complexity){
        case NoteComplexity.Easy: noteClassByComplexity += "bg-success"; break;  
        case NoteComplexity.Medium: noteClassByComplexity += "bg-primary"; break;
        case NoteComplexity.Hard: noteClassByComplexity += "bg-secondary"; break;
        default: noteClassByComplexity += "bg-success";
    }
    
    return (
        <div className="col-12 col-lg-3 my-5">
            <div className={noteClasByStatus}>
                <div className={noteClassByComplexity}>
                    <h4 className="py-2 mb-2">{note.title}</h4>
                    <hr/>
                    { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link to={`/notes/edit/${note.id}`} >Edit</Link>}
                    { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <button className="btn btn-danger" onClick={() => onDeleteClick(note.id)}>Delete</button>}
                </div>
                <div className="card-body">
                    <p className="card-text">{note.content}</p>
                </div>
                <div className="card-footer">
                    <p>Author: {note.authorName}</p>
                    <p>Created on: {note.date}</p>
                </div>
            </div>
        </div>
    
    )
}