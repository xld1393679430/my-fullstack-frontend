import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';

const loginForm = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <h2>Login</h2>
      <Form onFinish={() => {
        setUsername('');
        setPassword('');
        handleLogin({ username, password });
      }}
      >
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
            onChange={(event) => setUsername(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Item>
        <div>
          <Button htmlType="submit">登录</Button>
        </div>
      </Form>
    </div>
  );
};

export default loginForm;
