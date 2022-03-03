import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout, reset } from '../features/auth/authSlice';
import IconButton from './IconButton';

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
    <header className="flex items-center justify-between w-screen px-8 py-2 mx-auto border-b-2 lg:px-12">
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
              <>
                <IconButton
                  onClick={handleLogout}
                  icon={<LogoutIcon className="w-6 h-6" />}
                  text="logout"
                />
              </>
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
                    icon={<LoginIcon className="w-6 h-6" />}
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
