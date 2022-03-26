import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { createNote } from '../features/notes/noteSlice';

import SubmitButton from './SubmitButton';

import { toast } from 'react-toastify';

type Props = {
  showFormFunc: React.Dispatch<React.SetStateAction<boolean>>;
};

const NoteForm: React.FC<Props> = ({ showFormFunc }) => {
  const [formData, setFormData] = useState<NewNoteType>({
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
    showFormFunc(false);

    if (!title || !text) return toast.warning('Please fill in the form!');

    dispatch(createNote(formData));
    toast.success('Note created!');
  };

  return (
    <div className="overflow-x-hidden">
      <form className="w-96" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-2 text-base font-bold text-left text-gray-800 font-lato"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="p-1 mb-4 text-sm font-medium text-gray-800 border-2 border-gray-600 rounded-md font-lato placeholder:font-lato"
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
            className="mb-2 text-base font-bold text-left text-gray-800 font-lato"
            htmlFor="desc"
          >
            Description
          </label>
          <input
            className="p-1 mb-4 text-sm font-medium text-gray-800 border-2 border-gray-600 rounded-md font-lato placeholder:font-lato"
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
            className="mb-2 text-base font-bold text-left text-gray-800 font-lato"
            htmlFor="text"
          >
            Text
          </label>
          <textarea
            className="p-1 mb-4 text-sm font-medium text-gray-800 border-2 border-gray-600 rounded-md font-lato placeholder:font-lato"
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
