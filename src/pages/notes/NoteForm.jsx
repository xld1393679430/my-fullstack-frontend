import React from 'react';

const NoteForm = ({
  inputValue,
  handleSubmit,
  handleChangeInputValue,
}) => (
  <form onSubmit={handleSubmit}>
    <input
      placeholder="请输入"
      value={inputValue}
      onChange={handleChangeInputValue}
    />
    <button type="submit">提交</button>
  </form>
);

export default NoteForm;
