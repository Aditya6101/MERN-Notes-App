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

  useEffect(() => {
    if (isError) {
      console.log(message);
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  return (
    <div className="w-60 max-w-xl m-4 p-2 bg-gray-100 text-left rounded-md cursor-pointer">
      {!isLoading ? (
        <>
          <h3 className="mb-1 text-xl font-lato font-bold text-gray-800 truncate">
            {note.title}
          </h3>
          <h4 className="mb-1 text-base font-lato font-semibold text-gray-400 truncate">
            {note.desc ? note.desc : 'No description'}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-base font-lato font-medium text-gray-600">
              {getDate(note.updatedAt)}
            </span>
            <button onClick={() => dispatch(deleteNote(note._id))}>
              <TrashIcon className="w-4 h-4 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default NoteItem;
