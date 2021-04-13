import React, { useEffect } from 'react';
import noteServer from './services/notes';
import RootRouter from './router';
import MainLayout from './layout/mainLayout';
import './App.css';


import { initNoteAction, toggleImportanceOfAction } from './actions/noteAction';
import { userUpdateAction } from './actions/userAction';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  const handleToggleImportant = async (id) => {
    dispatch(toggleImportanceOfAction(id));
  };

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      dispatch(userUpdateAction(_user));
      noteServer.setToken(_user.token);
    }
    dispatch(initNoteAction());
  }, []);

  return (
    <div>
        <MainLayout >
          <RootRouter />
        </MainLayout>
    </div>
  );
}

export default App;
