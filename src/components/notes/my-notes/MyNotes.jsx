import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getMyNotes } from '../../../core/api/notes.api';
import { NoteCard } from '../note-card/NoteCard';

export function MyNotes(props){
    const [userNotes, setUserNotes] = useState([]);

    useEffect(() => {
        const searchParam = props.location.search.split('=')[1];
        getMyNotes(searchParam).then((notes) => {
            setUserNotes(notes);
        });
    }, [props.location.search]);

    return(
        <div className="container-fluid notes-list-wrapper">
            <div className="row notes-row">
                {userNotes.map(note => <NoteCard note={note} key={note.id}/>)} 
            </div>
        </div>
    );
}

export default MyNotes;