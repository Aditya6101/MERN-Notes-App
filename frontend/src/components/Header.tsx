import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, reset } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import { UserIcon, LoginIcon, LogoutIcon } from '@heroicons/react/solid';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <header className="w-screen lg:px-12  mx-auto  py-2 px-8 border-b-2 flex items-center justify-between">
      <div>
        <h1>
          <Link to="/" className="text-xl font-bold font-lato">
            📒 Notes App
          </Link>
        </h1>
      </div>
      <nav>
        <ul className="flex items-center justify-between">
          {user ? (
            <li>
              <button onClick={handleLogout}>
                <IconButton
                  icon={<LogoutIcon className="w-6 h-6" />}
                  text="register"
                />
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">
                  <IconButton
                    icon={<UserIcon className="w-6 h-6" />}
                    text="register"
                  />
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <IconButton
                    icon={<LoginIcon className="w-6 h-6 rotate-180" />}
                    text="login"
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

type iconButtonProps = {
  icon: React.ReactNode;
  text: string;
};

const IconButton: React.FC<iconButtonProps> = ({ icon, text }) => {
  return (
    <button
      className="ml-2  flex items-center justify-between capitalize
    text-sm font-lato  font-semibold text-gray-900  hover:text-gray-700 focus:outline-none focus:shadow-outline"
    >
      {icon} {text}
    </button>
  );
};
