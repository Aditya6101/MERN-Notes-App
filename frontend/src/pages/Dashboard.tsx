import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getNotes, reset } from '../features/notes/noteSlice';

import NoteForm from '../components/NoteForm';
import Loader from '../components/Loader';
import NoteList from '../components/NoteList';

import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
  const [showAddNote, setShowAddNote] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useAppSelector(
    (state) => state.notes
  );

  const handleClick = () => {
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

  if (isLoading) return <Loader />;

  return (
    <section className="flex flex-col items-center pt-8 text-center">
      <div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800 font-lato">
          Welcome {user?.name}
        </h1>
        <button
          className="w-full py-1 mt-4 text-base font-semibold text-white capitalize bg-black rounded-md font-lato hover:bg-gray-800"
          onClick={handleClick}
        >
          {showAddNote ? 'View Notes' : 'Add Note'}
        </button>
      </div>

      {showAddNote ? (
        <NoteForm showFormFunc={setShowAddNote} />
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <h3 className="mt-4 text-base font-bold text-gray-600 font-lato">
          You don't have any notes yet.
        </h3>
      )}
    </section>
  );
};

export default Dashboard;
