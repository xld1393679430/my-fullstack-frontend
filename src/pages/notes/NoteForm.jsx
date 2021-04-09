import React, { useState } from 'react';
import { message, Button, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import noteServer from '../../services/notes';

const NoteForm = ({
  createNote,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const note = {
      content: inputValue,
      important: Math.random() < 0.5,
    };
    createNote(note);
    setInputValue('');
  };

  const handleChangeInputValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        style={{ maxWidth: 420 }}
        size="middle"
        placeholder="请输入"
        value={inputValue}
        addonAfter={(
          <Button
            style={{ height: 30 }}
            htmlType="submit"
            type="text"
            icon={<CheckOutlined />}
          >
            提交
          </Button>
)}
        onChange={handleChangeInputValue}
      />
    </form>
  );
};

export default NoteForm;
