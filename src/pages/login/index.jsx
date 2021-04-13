import React from 'react';
import { DribbbleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Toggleable from '../../components/Toggleable';
import LoginForm from './LoginForm';
import { userLoginAction } from '../../actions/userAction';

const Page = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogin = async ({ username, password }) => {
        await dispatch(userLoginAction({ username, password }));
        history.replace('/users');
    };
    return (
        <Toggleable
            buttonLabel={(
                <span>
                    <DribbbleOutlined />
                    <span style={{ marginLeft: 8 }}>登录</span>
                </span>
            )}
            >
            <LoginForm
                handleLogin={handleLogin}
            />
        </Toggleable>
    );
};

export default Page;