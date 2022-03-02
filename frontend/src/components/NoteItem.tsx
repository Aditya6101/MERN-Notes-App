import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { deleteNote } from '../features/notes/noteSlice';

import { TrashIcon } from '@heroicons/react/solid';

import Loader from '../components/Loader';
import { toast } from 'react-toastify';

type Props = {
  note: Note;
};

const getDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB'); // dd/mm/yyyy
};

const NoteItem: React.FC<Props> = ({ note }) => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, message } = useAppSelector(
    (state) => state.notes
  );

  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
    toast.success('Note deleted!');
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  return (
    <div className="max-w-xl p-2 m-4 text-left bg-gray-100 rounded-md cursor-pointer w-60">
      {!isLoading ? (
        <>
          <h3 className="mb-1 text-xl font-bold text-gray-800 truncate font-lato">
            {note.title}
          </h3>
          <h4 className="mb-1 text-base font-semibold text-gray-400 truncate font-lato">
            {note.desc ? note.desc : 'No description'}
          </h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-medium text-gray-600 font-lato">
              {getDate(note.updatedAt)}
            </span>
            <button onClick={() => handleDelete(note._id)}>
              <TrashIcon className="w-4 h-4 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
          <div className="mt-2 text-base font-semibold text-gray-700 font-lato">
            {note.text}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default NoteItem;
