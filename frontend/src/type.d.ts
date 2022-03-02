type User = {
  _id: string;
  email: string;
  name: string;
  token: string;
};

type userResigter = {
  name: string;
  email: string;
  password: string;
};

type userLogin = {
  email: string;
  password: string;
};

type Note = {
  _id: string;
  title: string;
  desc?: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

// Type for FormData of CreateForm component
type NewNoteType = {
  title: string;
  desc: string;
  text: string;
};

type deleteResponseType = {
  id: string;
};
