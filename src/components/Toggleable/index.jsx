import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const Toggleable = forwardRef(({
  buttonLabel,
  children,
}, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

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
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
