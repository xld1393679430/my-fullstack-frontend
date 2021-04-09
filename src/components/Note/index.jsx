import React from 'react';
import { Button } from 'antd';

const Note = ({ note: { content, important }, toggleImportant }) => (
  <li className="note">
    {content}
    <Button onClick={toggleImportant} style={{ marginLeft: 10 }}>
      {important ? 'make no important' : 'make important'}
    </Button>
  </li>
);

export default Note;
