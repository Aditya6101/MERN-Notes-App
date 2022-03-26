type User = {
  _id: string;
  email: string;
  name: string;
  token: string;
};

type userRegister = {
  name: string;
  email: string;
  password: string;
};

type userLogin = Pick<userRegister, 'email' | 'password'>;

type Note = {
  _id: string;
  title: string;
  desc?: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

// Type for FormData of CreateForm component
type NewNoteType = Pick<Note, 'title' | 'desc' | 'text'>;

type deleteResponseType = {
  id: string;
};
