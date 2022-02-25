import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import { LoginIcon } from '@heroicons/react/solid';

type formData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<formData>({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
    if (email === '' || password === '')
      return toast.error('Please fill in the form!');
    else {
      const userData = {
        email,
        password,
      };
      // todo resolve this
      // @ts-ignore
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) {
      toast.success('Registered successfully!');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <pre>Loading...</pre>;

  return (
    <section>
      <div>
        <h3>
          <LoginIcon style={{ height: '20px', width: '20px' }} /> Log In
        </h3>
        <h4>Please login into your account</h4>
      </div>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
