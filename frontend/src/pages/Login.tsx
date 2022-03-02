import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

import SubmitButton from '../components/SubmitButton';
import Loader from '../components/Loader';

import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [formData, setFormData] = useState<userLogin>({
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
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) {
      toast.success('Logged in successfully!');
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) return <Loader />;

  return (
    <section className="flex flex-col items-center pt-20 text-center">
      <h3 className="mb-4 text-2xl font-bold text-gray-800 font-lato">
        Log In
      </h3>
      <h4 className="mb-4 text-base font-bold text-gray-600 font-lato">
        Please login into your account
      </h4>

      <form className="w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-2 text-base font-bold text-left text-gray-800 font-lato"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="p-1 mb-4 text-sm font-medium text-gray-800 border-2 border-gray-600 rounded-md font-lato placeholder:font-lato"
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
            className="mb-2 text-base font-bold text-left text-gray-800 font-lato"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="p-1 mb-4 text-sm font-medium text-gray-800 border-2 border-gray-600 rounded-md font-lato placeholder:font-lato"
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <p className="text-sm font-bold text-left text-gray-500 font-lato">
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
