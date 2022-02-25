import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { createNote } from '../features/notes/noteSlice';

import { toast } from 'react-toastify';

const NoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    text: '',
  });

  const { title, desc, text } = formData;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useAppDispatch();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (title === '' || text === '')
      return toast.warning('Please fill in the form!');

    // todo fix this ts-ignore
    // @ts-ignore
    dispatch(createNote(formData));
    // setFormData({
    //   title: '',
    //   desc: '',
    //   text: '',
    // });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter title for the note"
          />
        </div>
        <div>
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Enter description for the note"
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={handleChange}
            placeholder="Enter text here"
          />
        </div>
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
