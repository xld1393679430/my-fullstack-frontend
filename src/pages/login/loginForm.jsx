import React from 'react';

const loginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">
          username:
          <input
            id="username"
            type="text"
            placeholder="请输入username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          password:
          <input
            id="password"
            type="text"
            placeholder="请输入password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>
      <div>
        <button type="submit">登录</button>
      </div>
    </form>
  </div>
);

export default loginForm;
