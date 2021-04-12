import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  Link,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import noteServer from './services/notes';
import Note from './pages/note'
import Notes from './pages/notes';
import Users from './pages/users'
import Login from './pages/login'
import Home from './pages/home'
import Count from './pages/counter'
import Count2 from './pages/counter2'
import './App.css';

import { initNoteAction, toggleImportanceOfAction } from './actions/noteAction';
import { userUpdateAction } from './actions/userAction';
import { useSelector, useDispatch } from 'react-redux';

const { Header, Content, Footer } = Layout;

function App() {
  const { notes, user } = useSelector(state => state)
  const dispatch = useDispatch()
  const { location: { pathname } }= useHistory();
  const [showAll, setShowAll] = useState(true);
  const [currentKey, setCurrentKey] = useState('')

  let notesToShow = showAll ? notes : notes.filter((item) => item.important)
  notesToShow = [].concat(notesToShow).reverse()

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleToggleImportant = async (id) => {
    dispatch(toggleImportanceOfAction(id))
  };

  useEffect(() => {
    setCurrentKey(pathname)

    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');
    if (loggedNoteappUser) {
      const _user = JSON.parse(loggedNoteappUser);
      dispatch(userUpdateAction(_user))
      noteServer.setToken(_user.token);
    }
    dispatch(initNoteAction())
  }, []);

  console.log(currentKey, 'currentKey')
  return (
    <div className="container">
      <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[currentKey]}
              onClick={(event) => setCurrentKey(event.key)}
            >
              <Menu.Item key="/">
              <Link className='block' to='/'>home</Link>
              </Menu.Item>
              <Menu.Item key="/notes">
              <Link className='block' to='/notes'>notes</Link>
              </Menu.Item>
              <Menu.Item key="/users">
              <Link className='block' to='/users'>users</Link>
              </Menu.Item>
              <Menu.Item key="/count">
              <Link className='block' to='/count'>count</Link>
              </Menu.Item>
              <Menu.Item key="/count2">
              <Link className='block' to='/count2'>count2</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Switch>
                <Route path='/count'>
                  <Count />
                </Route>
                <Route path='/count2'>
                  <Count2 />
                </Route>
                <Route path='/notes/:id'>
                  <Note />
                </Route>
                <Route path='/notes'>
                  <Notes
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
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </div>
  );
}

export default App;
