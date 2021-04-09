import { message, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import noteServer from '../../services/notes';
import loginServer from '../../services/login';
import './index.css';

const Note = ({ note: { content, important }, toggleImportant }) => (
  <li className="note">
    {content}
    <Button onClick={toggleImportant} style={{ marginLeft: 10 }}>
      {important ? 'make no important' : 'make important'}
    </Button>
  </li>
);

const Page = () => {
  const messageKey = 'messageKey';
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((item) => item.important);

  const handleSubmit = async (event) => {
    event.preventDefault();
    message.loading({ content: '添加中...', key: messageKey });
    const note = {
      content: inputValue,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    try {
      await noteServer.createNote(note);
      message.success({ content: '添加成功', key: messageKey });
      setNotes(notes.concat(note));
      setInputValue('');
    } catch (error) {
      message.error({ content: '添加失败', key: messageKey });
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
      console.log(_user, 'user');
      message.success({ content: '登录成功', key: loginMessageKey });
      setUser(_user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error, error.response, 'error---');
      message.warning({ content: `登录失败: ${error.response.data.error}`, key: loginMessageKey });
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">
          username:
          <input
            id="username"
            type="text"
            placeholder="请输入username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          password:
          <input
            id="password"
            type="text"
            placeholder="请输入password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">登录</button>
      </div>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="请输入"
        value={inputValue}
        onChange={handleChangeInputValue}
      />
      <button type="submit">提交</button>
    </form>
  );

  useEffect(() => {
    noteServer.getNotes().then((data) => setNotes(data));
  }, []);

  return (
    <div>
      <h1>notes</h1>
      { user
        ? (
          <div>
            <p>
              <strong>{user.name}</strong>
              <span> logged-in</span>
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
};

export default Page;
