import React, { useEffect } from 'react';
import { DribbbleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Toggleable from '../../components/Toggleable';
import LoginForm from './LoginForm';
import { userLoginAction } from '../../actions/userAction';
import LoginLayout from '../../layout/loginLayout';

const Page = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(state => state);

  const handleLogin = async ({ username, password }) => {
    dispatch(userLoginAction({ username, password }));
  };

  useEffect(() => {
    if (user) {
      history.push('/main/users');
    }
  }, [user]);

  return (
    <LoginLayout>
      <Toggleable
        buttonLabel={
          <span>
            <DribbbleOutlined />
            <span style={{ marginLeft: 8 }}>登录</span>
          </span>
        }
      >
        <LoginForm handleLogin={handleLogin} />
      </Toggleable>
    </LoginLayout>
  );
};

export default Page;
