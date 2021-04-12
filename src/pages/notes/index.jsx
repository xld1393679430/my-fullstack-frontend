import React, { useRef } from 'react';
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Toggleable from '../../components/Toggleable'
import NoteForm from './NoteForm'
import { createNoteAction } from '../../actions/noteAction'
import './index.css';

const Page = ({
  notes,
  showAll,
  handleToggleShowAll,
}) => {
  const noteFormRef = useRef();

  const dispatch = useDispatch()

  const createNote = async (note) => {
    dispatch(createNoteAction(note, noteFormRef))
  };

  return (
    <div>
       <Toggleable
        ref={noteFormRef}
        buttonLabel={(
          <span>
            <PlusOutlined />
            <span>new note</span>
          </span>
        )}
      >
        <NoteForm
          createNote={createNote}
        />
      </Toggleable>
      <Button
          style={{ margin: '10px 0' }}
          onClick={handleToggleShowAll}
        >
          {showAll ? 'show important' : 'show all'}
      </Button>
      <ul>
          {
              notes.map((item, index) => (
                <li key={item.id}>
                  <Link to={`/notes/${item.id}`}>{item.content}</Link>
                </li>
              ))
          }
      </ul>
  </div>
  )
};

export default Page;
