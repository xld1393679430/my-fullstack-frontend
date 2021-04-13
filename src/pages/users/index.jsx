import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import noteServer from '../../services/notes';
import { userLogoutAction } from '../../actions/userAction';

const Page = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const handleLogout = () => {
        localStorage.setItem('loggedNoteappUser', '');
        noteServer.setToken(null);
        dispatch(userLogoutAction());
    };

    return (
      <div>
        <p>
          <span>{user.name}</span>
          <span>logged in</span>
          <Button type="link" onClick={handleLogout}>退出</Button>
        </p>
      </div>
    );
};

export default Page;