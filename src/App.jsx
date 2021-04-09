import React, { useState, useEffect, useRef } from 'react';
import { message, Button } from 'antd';
import { PlusOutlined, DribbbleOutlined } from '@ant-design/icons';
import Toggleable from './components/Toggleable';
import Note from './components/Note';
import LoginForm from './pages/login/LoginForm';
import NoteForm from './pages/notes/NoteForm';
import loginServer from './services/login';
import noteServer from './services/notes';
import './App.css';

function App() {
  const noteFormRef = useRef();
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((item) => item.important);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggleImportant = async (id) => {
    const note = notes.find((item) => item.id === id);
    const changedNote = { ...note, important: !note.important };
    const data = await noteServer.updateNote(id, changedNote);
    setNotes(notes.map((item) => (item.id === id ? data : item)));
  };

  const createNote = async (note) => {
    const addNoteMessageKey = 'addNoteMessageKey';
    message.loading({ content: '添加中...', key: addNoteMessageKey });
    try {
      await noteServer.createNote(note);
      message.success({ content: '添加成功', key: addNoteMessageKey });
      setNotes(notes.concat(note));
      console.log(noteFormRef.current, 'noteFormRef.current');
      noteFormRef.current.toggleVisibility();
    } catch (error) {
      message.error({ content: '添加失败', key: addNoteMessageKey });
    }
  };

  const handleLogin = async ({ username, password }) => {
    console.log(username, password, 'handleLogin');
    const loginMessageKey = 'loginMessageKey';
    message.loading({ content: '登陆中...', key: loginMessageKey });
    try {
      const _user = await loginServer.login(username, password);
      message.success({ content: '登录成功', key: loginMessageKey });
      localStorage.setItem('loggedNoteappUser', JSON.stringify(_user));
      noteServer.setToken(_user.token);
      setUser(_user);
    } catch (error) {
      console.log(error, error.response, 'error---');
      message.warning({ content: `登录失败: ${error.response.data.error}`, key: loginMessageKey });
    }
  };

  const handleLogout = () => {
    localStorage.setItem('loggedNoteappUser', '');
    noteServer.setToken(null);
    setUser(null);
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
    noteServer.getNotes().then((data) => setNotes(data));
  }, []);

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      setUser(_user);
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
