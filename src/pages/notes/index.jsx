import React, { useRef } from 'react';
import { Button, Table } from 'antd'
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

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      // eslint-disable-next-line react/display-name
      render: (_, record) => (
        <Link to={`/notes/${record.id}`}>{record.content}</Link>
      )
    }
  ]

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

      <Table
      rowKey={'id'}
      columns={columns}
      dataSource={notes} ren />
  </div>
  )
};

export default Page;
