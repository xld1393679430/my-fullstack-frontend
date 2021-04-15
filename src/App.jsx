import React, { useEffect } from 'react';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { lazyComponent } from '@/pages/main';
import Main from '@/pages/main';
import './App.css';

function App() {
  const history = useHistory();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const loggedNoteappUser = localStorage.getItem('loggedNoteappUser');    if (!loggedNoteappUser) {
      history.replace('/login');
      message.warn('登录信息失效， 请重重登录');
      return;
    }
  }, []);

  return (
    <Switch>
      <Redirect from="/" to={user ? '/main/' : '/login'} exact={true} />
      <Route path={'/main'} component={Main} />
      <Route path={'/login'} exact={true} component={lazyComponent('login')} />
    </Switch>
  );
}

export default App;
