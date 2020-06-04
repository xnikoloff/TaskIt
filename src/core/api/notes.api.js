import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = 'http://localhost:3005'

export const NotesStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

export const NoteComplexity = {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard"
}

export async function getAllNotes(searchParam) {
    const allNotes = (await axios.get(`${apiUrl}/notes`)).data;

    if(!searchParam){
        return allNotes;
    }

    else{
        return allNotes.filter(note => note.title.toLowerCase().includes(searchParam.toLowerCase()) || 
        note.content.toLowerCase().includes(searchParam.toLowerCase()));
    }
}

export function getNoteById(id) {
    return axios.get(`${apiUrl}/notes/${id}`);
}

export async function getNotesByAuthorId(authorId, searchParam){
    const allNotes = await getAllNotes(searchParam);
    return allNotes.filter(note => note.authorId === authorId)
}

export function getMyNotes(searchParam){
    const loggedUser = getLoggedUser().id;
    return getNotesByAuthorId(loggedUser, searchParam);
}

export function saveNote(noteData) {
    const loggedUser = getLoggedUser();

    if (noteData.id) {
        return axios.put(`${apiUrl}/notes/${noteData.id}`, noteData);
    }

    noteData.authorId = loggedUser.id;
    noteData.authorName = loggedUser.name;
    noteData.date = new Date();

    if(!noteData.status){
        noteData.status = NotesStatus.Active;
    }

    if(!noteData.comlexity){
        noteData.comlexity = NoteComplexity.Easy;
    }

    return axios.post(`${apiUrl}/notes`, noteData);
}

export function deleteNote(id){
    return axios.delete(`${apiUrl}/notes/${id}`);
}

export async function deleteAuthorNote(authorId){
    const notes = await getNotesByAuthorId(authorId);

    notes.forEach(note => {
        deleteNote(note.id);
    });
}