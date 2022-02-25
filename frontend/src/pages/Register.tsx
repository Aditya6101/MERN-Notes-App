import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import { UserIcon } from '@heroicons/react/solid';

type formData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [formData, setFormData] = useState<formData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (confirmPassword !== password)
      return toast.error('Passwords do not match!');
    else {
      const userData = {
        name,
        email,
        password,
      };
      // todo resolve this
      // @ts-ignore
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) navigate('/');

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <pre>Loading...</pre>;

  return (
    <section>
      <div>
        <h3>
          <UserIcon style={{ height: '20px', width: '20px' }} /> Register
        </h3>
        <h4>Please create an account</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="c-password">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter confirm password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
