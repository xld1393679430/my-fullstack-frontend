import React, { useState } from 'react';
import { Button } from 'antd';

const Toggleable = ({
  buttonLabel,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button style={{ marginTop: 10 }} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
};

export default Toggleable;
