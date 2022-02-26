import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

import SubmitButton from '../components/SubmitButton';

import { toast } from 'react-toastify';

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
    <section
      className="pt-20 flex flex-col items-center
      text-center"
    >
      <div>
        <h3 className="mb-4 text-2xl font-lato font-bold text-gray-800">
          Log In
        </h3>
        <h4 className="mb-4 text-base font-lato font-bold text-gray-600">
          Please login into your account
        </h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-80 mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="email"
            value={email}
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-80 mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800
            placeholder:font-lato"
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <p className="text-left text-sm font-lato font-bold text-gray-500">
          Don't Have an Account?{' '}
          <Link
            className="text-gray-700 underline hover:text-gray-900"
            to="/register"
          >
            Register.
          </Link>
        </p>
        <SubmitButton text="login" />
      </form>
    </section>
  );
};

export default Login;
