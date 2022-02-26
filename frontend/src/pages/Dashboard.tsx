import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getNotes, reset, deleteNote } from '../features/notes/noteSlice';

import NoteForm from '../components/NoteForm';

import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useAppSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
    if (!user) {
      navigate('/login');
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, user, isError, message]);

  if (isLoading) {
    return <pre>Loading</pre>;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <NoteForm />
      {notes.length > 0 ? (
        <div>
          {notes.map((note) => (
            <div key={note._id}>
              <pre>{note.title}</pre>
              <button onClick={() => dispatch(deleteNote(note._id))}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h3>No notes</h3>
      )}
    </div>
  );
};

export default Dashboard;
