import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllNotes, deleteNote } from './../../../core/api/notes.api';
import { NoteCard } from '../note-card/NoteCard';
import '../note-card/NoteCard.css'

export function NotesList(props) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getAllNotes(searchParam).then((result) => {
            setNotes(result);
        });
    }, [props.location.search])

    const onDelete = (id) => {
        deleteNote(id).then(() => {
            setNotes((prevState) =>{
                return prevState.filter(note => note.id !== id);
            });
        });
    };
    
    return (
        <div className="container-fluid notes-list-wrapper">
            <div className="row notes-row">
                { notes.map(note => <NoteCard note={note} key={note.id} onDeleteClick={onDelete} /> )}
            </div>
            
        </div>
    );
}