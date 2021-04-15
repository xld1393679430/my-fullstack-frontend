import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
const Page = () => {
    const { user } = useSelector(state => state);

    return (
      <div>
        <p>
          {
            user && user.name ? (
              <span>{user.name}</span>
            ) : (
              <Button type="default">当前已退出请重新登录</Button>
            )
          }
        </p>
      </div>
    );
};

export default Page;