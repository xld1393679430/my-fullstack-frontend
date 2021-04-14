import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Page = () => {
    const history = useHistory();
    const { user } = useSelector(state => state);
    const handleNavigateToLogin = () => {
        history.push('/login');
    };

    return (
      <div>
        <p>
          {
            user && user.name ? (
              <span>{user?.name}</span>
            ) : (
              <Button type="default" onClick={handleNavigateToLogin}>当前已退出请重新登录</Button>
            )
          }
        </p>
      </div>
    );
};

export default Page;