import React, { useState, useEffect } from 'react';
import { message, Button } from 'antd';
import Toggleable from './components/Toggleable';
import Note from './components/Note';
import LoginForm from './pages/login/loginForm';
import NoteForm from './pages/notes/NoteForm';
import loginServer from './services/login';
import noteServer from './services/notes';
import './App.css';

function App() {
  const addNoteMessageKey = 'addNoteMessageKey';
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((item) => item.important);

  const handleSubmit = async (event) => {
    event.preventDefault();
    message.loading({ content: '添加中...', key: addNoteMessageKey });
    const note = {
      content: inputValue,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    try {
      await noteServer.createNote(note);
      message.success({ content: '添加成功', key: addNoteMessageKey });
      setNotes(notes.concat(note));
      setInputValue('');
    } catch (error) {
      message.error({ content: '添加失败', key: addNoteMessageKey });
    }
  };

  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggleImportant = async (id) => {
    const note = notes.find((item) => item.id === id);
    const changedNote = { ...note, important: !note.important };
    const data = await noteServer.updateNote(id, changedNote);
    setNotes(notes.map((item) => (item.id === id ? data : item)));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password, 'handleLogin');
    const loginMessageKey = 'loginMessageKey';
    message.loading({ content: '登陆中...', key: loginMessageKey });
    try {
      const _user = await loginServer.login(username, password);
      message.success({ content: '登录成功', key: loginMessageKey });
      localStorage.setItem('loggedNoteappUser', JSON.stringify(_user));
      noteServer.setToken(_user.token);
      setUser(_user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error, error.response, 'error---');
      message.warning({ content: `登录失败: ${error.response.data.error}`, key: loginMessageKey });
    }
  };

  const loginForm = () => (
    <Toggleable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Toggleable>
  );

  const noteForm = () => (
    <Toggleable buttonLabel="new note">
      <NoteForm
        inputValue={inputValue}
        handleSubmit={handleSubmit}
        handleChangeInputValue={handleChangeInputValue}
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
    <div>
      <h1>notes</h1>
      {user
        ? (
          <div>
            <p>
              <span>{user.name}</span>
              <span>logged in</span>
            </p>
            {noteForm()}
          </div>
        )
        : loginForm()}
      <hr />
      <Button onClick={handleToggleShowAll}>
        {showAll ? 'show important' : 'show all'}
      </Button>
      <ul>
        {
            notesToShow.map((item, index) => (
              <Note
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                note={item}
                toggleImportant={() => handleToggleImportant(item.id)}
              />
            ))
        }
      </ul>
    </div>
  );
}

export default App;
