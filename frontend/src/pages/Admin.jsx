import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import TaskList from '../components/task/TaskList';
import AllTask from '../components/task/AllTask';
function Admin() {
  return (
    <Layout>
      <Navbar />
     <h1>Admin</h1>
     <AllTask/>
    </Layout>
  );
}
export default Admin;