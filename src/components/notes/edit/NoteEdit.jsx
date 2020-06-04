import React, { useState, useEffect } from 'react';
import { saveNote, getNoteById } from '../../../core/api/notes.api';
import { Redirect } from 'react-router-dom';
import './NoteEdit.css';

export function NoteEdit(props) {

    const [currentNote, setCurrentNote] = useState({title: '', content: '', authorId: '', authorName: '', date: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    console.log(props);
    useEffect(() => {
        if (props.computedMatch.params.id) {
            getNoteById(props.computedMatch.params.id).then((result) => {
                setCurrentNote(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onNoteSave = (event) => {
        event.preventDefault();
        saveNote(currentNote).then(() => { 
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
        { shouldRedirect && <Redirect to="/notes" /> }
        <div className="container-fluid note-edit-wrapper">
            <div className="row">
                <div className="col-12 col-lg-3 my-5 mx-auto">
                    <div className="card mb-3">
                        <div className="card-header">
                            <form onSubmit={onNoteSave}>
                                <div className="form-group">
                                    <label labelfor="title">Title: </label>
                                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentNote.title} />
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label labelfor="content">Content: </label>
                                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentNote.content} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status: </label>
                                    <select className="form-control" name="status" id="status" onChange={onInputChange} value={currentNote.status}>
                                        <option value="Active">Active</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="complexity">Complexity: </label>
                                    <select className="form-control" name="complexity" id="complexity" onChange={onInputChange} value={currentNote.complexity}>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <form onSubmit={onNoteSave}>
                                <div className="form-group">
                                    <button className="btn btn-success">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        </>
    )
}