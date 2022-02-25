import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, LoginIcon } from '@heroicons/react/solid';

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <h1>
          <Link to="/">📒 Notes App</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/register">
              <UserIcon style={{ height: '20px', width: '20px' }} /> Register
            </Link>
          </li>
          <li>
            <Link to="/login">
              <LoginIcon style={{ height: '20px', width: '20px' }} /> Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
