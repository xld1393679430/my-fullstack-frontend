import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import MainLayout from '../../layout/mainLayout';
import Loading from '../../components/Loading';

export const lazyComponent = (path) => {
  return Loadable({
    loader: () => import(`@/pages/${path}`),
    loading: Loading,
  });
};

export const routers = [
  {
    path: '/main/home',
    title: '首页',
    exact: true,
    component: lazyComponent('home'),
  },
  {
    path: '/main/counter',
    title: '计数页',
    exact: true,
    component: lazyComponent('counter'),
  },
  {
    path: '/main/counter2',
    title: '计数页2',
    exact: true,
    component: lazyComponent('counter2'),
  },
  {
    path: '/main/note/:id',
    title: '笔记详情',
    exact: true,
    hide: true,
    component: lazyComponent('note'),
  },
  {
    path: '/main/notes',
    title: '笔记列表',
    component: lazyComponent('notes'),
  },
  {
    path: '/main/users',
    title: '用户',
    component: lazyComponent('users'),
  },
  {
    path: '/main/login',
    title: '登录',
    exact: true,
    hide: true,
    component: lazyComponent('login'),
  },
  {
    path: '/main/',
    redirect: '/main/home',
    isRedirect: true,
    exact: true,
    hide: true,
  },
];

function Main() {
  return (
    <MainLayout>
      <Switch>
        {routers.map((item) => {
          if (item.isRedirect) {
            return <Redirect key={item.path} to={item.redirect} exact />;
          }
          return (
            <Route
              key={item.path}
              exact={item.exact}
              path={item.path}
              component={item.component}
            />
          );
        })}
      </Switch>
    </MainLayout>
  );
}

export default Main;
