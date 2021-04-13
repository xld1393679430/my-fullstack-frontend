import React, { useEffect } from 'react';
import { BackTop } from 'antd';
import noteServer from './services/notes';
import RootRouter from './router';
import MainLayout from './layout/mainLayout';
import { userUpdateAction } from './actions/userAction';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      dispatch(userUpdateAction(_user));
      noteServer.setToken(_user.token);
    }
  }, []);

  return (
    <div>
        <MainLayout >
          <BackTop />
          <RootRouter />
        </MainLayout>
    </div>
  );
}

export default App;
