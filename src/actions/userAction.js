import { message } from 'antd';
import loginServer from '../services/login';
import noteServer from '../services/notes';
export const userUpdateAction = (user) => {
    return {
        type: 'UPDATE',
        data: user
    };
};

export const userLogoutAction = () => {
    return {
        type: 'LOGOUT'
    };
};

export const userLoginAction = ({ username, password }) => {
    return async dispatch => {
        const loginMessageKey = 'loginMessageKey';
        const loadingMessage = message.loading({ content: '登陆中...', key: loginMessageKey });
        try {
            const _user = await loginServer.login(username, password);
            message.success({ content: '登录成功', key: loginMessageKey });
            noteServer.setToken(_user);
            dispatch({
                type: 'LOGIN',
                data: _user
            });
        } catch (error) {
            loadingMessage();
            dispatch({
                type: 'LOGIN',
                data: null
            });
        }
    };
};