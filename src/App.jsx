import React, { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import noteServer from './services/notes';
import Note from './pages/note'
import Notes from './pages/notes';
import Users from './pages/users'
import Login from './pages/login'
import Home from './pages/home'
import './App.css';

import { initNoteAction, toggleImportanceOfAction } from './actions/noteAction';
import { userUpdateAction } from './actions/userAction';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const { notes, user } = useSelector(state => state)
  const dispatch = useDispatch()
  const [showAll, setShowAll] = useState(true);

  let notesToShow = showAll ? notes : notes.filter((item) => item.important)
  notesToShow = [].concat(notesToShow).reverse()

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggleImportant = async (id) => {
    dispatch(toggleImportanceOfAction(id))
  };

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      dispatch(userUpdateAction(_user))
      noteServer.setToken(_user.token);
    }

    dispatch(initNoteAction())
  }, []);

  return (
    <div className="container">
      <div>
        <Link className='block' to='/'>home</Link>
        <Link className='block' to='/notes'>notes</Link>
        <Link className='block' to='/users'>users</Link>
      </div>

      <Switch>
         <Route path='/notes/:id'>
          <Note />
        </Route>
        <Route path='/notes'>
          <Notes
            notes={notesToShow}
            showAll={showAll}
            handleToggleShowAll={handleToggleShowAll}
            handleToggleImportant={handleToggleImportant}
          />
        </Route>
        <Route path="/users">
          {user ? <Users user={user} /> : <Redirect to='login' /> }
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
            <Home />
        </Route>
      </Switch>

      <div>
        <br />
        <em>Note app, Department of Computer Science 2021</em>
      </div>
    </div>
  );
}

export default App;
