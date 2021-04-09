import React from 'react';
import { Input, Button, Form } from 'antd';

const loginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h2>Login</h2>
    <Form onFinish={handleLogin}>
      <Form.Item
        label="Username"
        name="username"
      >
        <Input
          id="username"
          type="text"
          placeholder="请输入username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
      >
        <Input
          id="password"
          type="text"
          placeholder="请输入password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Item>
      <div>
        <Button htmlType="submit">登录</Button>
      </div>
    </Form>
  </div>
);

export default loginForm;
