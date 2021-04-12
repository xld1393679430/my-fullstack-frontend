import React from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import noteServer from '../../services/notes'
import { userLogoutAction } from '../../actions/userAction'

const Page = ({
    user,
}) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.setItem('loggedNoteappUser', '');
        noteServer.setToken(null);
        dispatch(userLogoutAction())
    };

    return (
      <div>
        <p>
          <span>{user.name}</span>
          <span>logged in</span>
          <Button type="link" onClick={handleLogout}>退出</Button>
        </p>
      </div>
    )
}

export default Page