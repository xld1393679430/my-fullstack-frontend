import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined, DribbbleOutlined } from '@ant-design/icons';
import Toggleable from './components/Toggleable';
import Note from './components/Note';
import LoginForm from './pages/login/LoginForm';
import NoteForm from './pages/notes/NoteForm';
import noteServer from './services/notes';
import './App.css';

import { initNoteAction, createNoteAction, toggleImportanceOfAction } from './actions/noteAction'
import { userLoginAction, userLogoutAction, userUpdateAction } from './actions/userAction'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const noteFormRef = useRef();
  const { notes, user } = useSelector(state => state)
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(true);
  const [loginVisible, setLoginVisible] = useState(false);

  let notesToShow = showAll ? notes : notes.filter((item) => item.important)
  notesToShow = [].concat(notesToShow).reverse()

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggleImportant = async (id) => {
    dispatch(toggleImportanceOfAction(id))
  };

  const createNote = async (note) => {
    dispatch(createNoteAction(note, noteFormRef))
  };

  const handleLogin = async ({ username, password }) => {
    dispatch(userLoginAction({ username, password }))
  };

  const handleLogout = () => {
    localStorage.setItem('loggedNoteappUser', '');
    noteServer.setToken(null);
    dispatch(userLogoutAction())
  };

  const loginForm = () => (
    <Toggleable buttonLabel={(
      <span>
        <DribbbleOutlined />
        <span style={{ marginLeft: 8 }}>登录</span>
      </span>
    )}
    >
      <LoginForm
        handleLogin={handleLogin}
      />
    </Toggleable>
  );

  const noteForm = () => (
    <Toggleable
      ref={noteFormRef}
      buttonLabel={(
        <span>
          <PlusOutlined />
          {' '}
          new note
        </span>
)}
    >
      <NoteForm
        createNote={createNote}
      />
    </Toggleable>
  );

  useEffect(() => {
    dispatch(initNoteAction())
  }, []);

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      dispatch(userUpdateAction(_user))
      noteServer.setToken(_user.token);
    }
  }, []);

  return (
    <div className="container">
      <h1>notes</h1>
      <div style={{ margin: '10xp 0' }}>
        {user ? (
          <div>
            <p>
              <span>{user.name}</span>
              <span>logged in</span>
              <Button type="link" onClick={handleLogout}>退出</Button>
            </p>
            {noteForm()}
          </div>
        ) : loginForm()}
      </div>
      <Button
        style={{ margin: '10px 0' }}
        onClick={handleToggleShowAll}
      >
        {showAll ? 'show important' : 'show all'}
      </Button>
      <ul>
        {
            notesToShow.map((item, index) => (
              <Note
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                note={item}
                index={index}
                toggleImportant={() => handleToggleImportant(item.id)}
              />
            ))
        }
      </ul>
    </div>
  );
}

export default App;
