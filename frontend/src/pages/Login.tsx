import React, { useState } from 'react';
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.table({ email, password });
  };

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
