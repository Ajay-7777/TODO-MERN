import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

import classes from './AuthForm.module.scss';

function Register() {
  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
    };
    try {
      await axios.post('/api/auth/register', user);
      toast.success('Registered successfully');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Full Name:
          <input name="name" type="text" placeholder="Full Name" required />
        </label>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <br/>
        </label>
        <label htmlFor="phone">
          Phone:
          <input name="phone" type="tel" placeholder="Phone"  required />
        </label>
        <br />
        <label htmlFor='role'>
          Role:
          <select name="role" required>
            <option value="">Select a role</option>
            <option value='0'>Admin</option>
            <option value="1">Client</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
