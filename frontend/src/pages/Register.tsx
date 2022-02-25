import React, { useState } from 'react';
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.table({ name, email, password, confirmPassword });
  };

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
