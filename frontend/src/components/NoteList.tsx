import React from 'react';

import NoteItem from './NoteItem';

type Props = {
  notes: Array<Note>;
};

const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center">
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;
