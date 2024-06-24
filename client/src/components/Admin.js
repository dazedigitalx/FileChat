// client/src/components/Admin.js
import React from 'react';
import { Link } from 'react-router-dom'; // Ensure correct import syntax
import Users from './Users'; // Adjust import path if necessary

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;