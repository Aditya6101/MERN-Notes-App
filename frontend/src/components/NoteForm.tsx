import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { createNote } from '../features/notes/noteSlice';

import SubmitButton from './SubmitButton';

import { toast } from 'react-toastify';

const NoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    text: '',
  });

  const { title, desc, text } = formData;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
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
    <div className="overflow-x-hidden">
      <form className="w-96" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChange}
            placeholder="Enter title for the note"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="desc"
          >
            Description
          </label>
          <input
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="text"
            name="desc"
            id="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Enter description for the note"
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="text"
          >
            Text
          </label>
          <textarea
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            name="text"
            id="text"
            value={text}
            onChange={handleChange}
            rows={10}
            cols={30}
            placeholder="Enter text here"
          ></textarea>
        </div>
        <SubmitButton text="create note" />
      </form>
    </div>
  );
};

export default NoteForm;
