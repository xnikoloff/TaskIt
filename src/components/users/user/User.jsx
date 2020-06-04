import React, { Component } from 'react';
import { getUserById } from '../../../core/api/users.api';
import { UserCard } from './../user-card/UserCard';
import {NoteCard} from '../../notes/note-card/NoteCard';
import { getNotesByAuthorId, getNoteById } from '../../../core/api/notes.api';
import {    deleteNote } from '../../../core/api/notes.api';

export class User extends Component {

    constructor(props) {
        super(props);

        this.state =  {
            user: {},
            notes: []
        };
    }

    componentDidMount() {
        console.log(this.props);
        getUserById(this.props.computedMatch.params.id).then((response) => {
            this.setState({
                user: response.data
            });
        });

        getNotesByAuthorId(this.props.computedMatch.params.id).then((notes) => {
            this.setState({
                notes
            });
        });

        
    }

    onDelete = (id) => {
        deleteNote(id).then(() => {
            const allNotes = this.state.notes;
            const newNotes = allNotes.filter(note => note.id !== id);
            this.setState({
                notes: newNotes
            });
        });
    };

    render() {
        return (
            <div className="container-fluid single-user">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <UserCard user={this.state.user} />
                    </div>
                    <div className="col-12 col-lg-8">
                        {this.state.notes.map(note => <NoteCard note={note} key={note.id} onDeleteClick={this.onDelete}></NoteCard>)}
                    </div>
                </div>
            </div>
        )
    }
}
