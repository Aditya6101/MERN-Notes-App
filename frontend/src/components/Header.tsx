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
    <header>
      <div>
        <h1>
          <Link to="/">📒 Notes App</Link>
        </h1>
      </div>
      <nav>
        <ul>
          {user ? (
            <li>
              <button onClick={handleLogout}>
                <LogoutIcon style={{ height: '20px', width: '20px' }} /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">
                  <UserIcon style={{ height: '20px', width: '20px' }} />{' '}
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <LoginIcon style={{ height: '20px', width: '20px' }} /> Login
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
