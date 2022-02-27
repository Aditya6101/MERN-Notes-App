import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getNotes, reset, deleteNote } from '../features/notes/noteSlice';

import NoteForm from '../components/NoteForm';

import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [btnText, setBtnText] = useState('Add Note');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useAppSelector(
    (state) => state.notes
  );

  const handleClick = () => {
    setBtnText(showAddNote ? 'Add Note' : 'Cancel');
    setShowAddNote((prev) => !prev);
  };

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
    return <pre>Loading...</pre>;
  }

  return (
    <section
      className="pt-20 flex flex-col items-center
    text-center"
    >
      <div>
        <h1 className="mb-4 text-2xl font-lato font-bold text-gray-800">
          Welcome
        </h1>
        <button
          className="w-full mt-4  py-1 bg-black font-lato font-semibold text-base text-white capitalize rounded-md hover:bg-gray-800"
          onClick={handleClick}
        >
          {btnText}
        </button>
      </div>

      {showAddNote ? (
        <NoteForm />
      ) : notes.length > 0 ? (
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
    </section>
  );
};

export default Dashboard;
