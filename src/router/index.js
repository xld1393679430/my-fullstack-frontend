import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { Spin } from 'antd';
import Loadable from 'react-loadable';

const Loading = function () {
    return <Spin />
}

const lazyComponent = (path) => {
    return Loadable({
        loader: () => import(`../pages/${path}`),
        loading: Loading,
    })
}

export const routers = [
    {
        path: '/',
        title: '首页',
        exact: true,
        component: lazyComponent('home'),
    }, {
        path: '/counter',
        title: '计数页',
        component: lazyComponent('counter'),
    }, {
        path: '/counter2',
        title: '计数页2',
        component: lazyComponent('counter2'),
    }, {
        path: '/note/:id',
        title: '笔记详情',
        hide: true,
        component: lazyComponent('note'),
    }, {
        path: '/notes',
        title: '笔记列表',
        component: lazyComponent('notes'),
    }, {
        path: '/users',
        title: '用户',
        component: lazyComponent('users'),
    }, {
        path: '/login',
        title: '登录',
        component: lazyComponent('login'),
    },
]

function RootRouter() {
    return (
        <Switch>
            {
                routers.map(item => {
                    return (
                        <Route
                            exact={item.exact}
                            key={item.path}
                            path={item.path}
                            component={item.component}
                        />
                    )
                })
            }

        </Switch>
    )
}
export default RootRouter