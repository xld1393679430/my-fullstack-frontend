import React, { useState, useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Toggleable from '../../components/Toggleable';
import NoteForm from './NoteForm';
import { createNoteAction, initNoteAction } from '../../actions/noteAction';
import './index.css';

const Page = () => {
  const { notes, user } = useSelector((state) => state);
  const noteFormRef = useRef();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(true);

  let notesToShow = showAll ? notes : notes.filter((item) => item.important);
  notesToShow = [].concat(notesToShow).reverse();

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const createNote = async (note) => {
    dispatch(createNoteAction(note, noteFormRef));
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      // eslint-disable-next-line react/display-name
      render: (_, record) => (
        <Link to={`/main/note/${record.id}`}>{record.content}</Link>
      ),
    },
  ];

  useEffect(() => {
    dispatch(initNoteAction());
  }, []);

  return (
    <div>
      {user && (
        <Toggleable
          ref={noteFormRef}
          buttonLabel={
            <span>
              <PlusOutlined />
              <span>new note</span>
            </span>
          }
        >
          <NoteForm createNote={createNote} />
        </Toggleable>
      )}
      <Button style={{ margin: '10px 0' }} onClick={handleToggleShowAll}>
        {showAll ? 'show important' : 'show all'}
      </Button>

      <Table rowKey={'id'} columns={columns} dataSource={notes} />
    </div>
  );
};

export default Page;
