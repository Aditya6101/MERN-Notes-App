import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

import SubmitButton from '../components/SubmitButton';

import { toast } from 'react-toastify';

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
      <h3 className="mb-4 text-2xl font-lato font-bold text-gray-800">
        Register
      </h3>
      <h4 className="mb-4 text-base font-lato font-bold text-gray-600">
        Please create an account
      </h4>

      <form className="w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="text"
            value={name}
            name="name"
            id="name"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
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
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="password"
            value={password}
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-2 text-left text-base font-lato font-bold text-gray-800"
            htmlFor="c-password"
          >
            Confirm Password
          </label>
          <input
            className="mb-4 p-1 border-2 border-gray-600 rounded-md font-lato text-sm font-medium  text-gray-800 placeholder:font-lato"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter confirm password"
            onChange={handleChange}
          />
        </div>
        <p className="text-left text-sm font-lato font-bold text-gray-500">
          Already have an account?{' '}
          <Link
            className="text-gray-700 underline hover:text-gray-900"
            to="/login"
          >
            Login.
          </Link>
        </p>
        <SubmitButton text="register" />
      </form>
    </section>
  );
};

export default Register;
