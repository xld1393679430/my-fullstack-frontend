import { message } from 'antd';
import noteServer from '../services/notes';

export const initNoteAction = (notes) => {
    return async (dispatch) => {
        const notes = await noteServer.getNotes();
        dispatch({
            type: 'INIT_NOTE',
            data: notes
        })
    }
}
export const createNoteAction = (note, noteFormRef) => {
    return async dispatch => {
        const addNoteMessageKey = 'addNoteMessageKey';
        message.loading({ content: '添加中...', key: addNoteMessageKey });
        try {
            const _note = await noteServer.createNote(note);
            message.success({ content: '添加成功', key: addNoteMessageKey });
            dispatch({
                type: 'NEW_NOTE',
                data: _note
            })
            noteFormRef.current.toggleVisibility();
        } catch (error) {
            message.error({ content: '添加失败', key: addNoteMessageKey });
        }
    }
}

export const toggleImportanceOfAction = (id) => {
    return async (dispatch, getState) => {
        const { notes } = getState()
        const note = notes.find((item) => item.id === id);
        const changedNote = { ...note, important: !note.important };
        const data = await noteServer.updateNote(id, changedNote);
        const _notes = notes.map(item => (item.id === id ? data : item))
        dispatch({
            type: 'TOGGLE_IMPORTANCE',
            data: _notes,
        })
    }
}