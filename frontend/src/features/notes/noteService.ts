import axios from 'axios';

const API_URL = '/api/notes';

// Create a note
const createNote = async (noteData: unknown, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, noteData, config);
  console.log(response.data);

  return response.data;
};

const noteService = { createNote };

export default noteService;
