import axios from 'axios';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 10;
  const totalPages = Math.ceil(taskList.length / tasksPerPage);
  const getTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks/mytasks');
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };

  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task is empty');
      return;
    }
    try {
      const { data } = await axios.post('/api/tasks/', {
        title: newTask,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask('');
      setTaskList([{ ...data }, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const renderPageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    renderPageNumbers.push(
      <li  style={{display:'flex', padding :'5px',color:'blue'}}
        key={i}
        id={i}
        onClick={(e) => setCurrentPage(parseInt(e.target.id))}
        className={currentPage === i ? classes.active : null}
      >
     {i} 
      </li>,
    );
  }
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = taskList.slice(indexOfFirstTask, indexOfLastTask);
  return (
    <div>
      <div className={classes.topBar}>
        <button
          type="button"
          className={classes.addNew}
          onClick={addNewButtonClick}
        >
          Add New
        </button>
      </div>
      {isAddingNew && (
        <form className={classes.addNewForm} onSubmit={addNewTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
          />
          <button type="submit">Add</button>
        </form>
      )}<div className={classes.pagination} style={{cursor:'pointer'}}>
      <ul style={{display:'flex', padding :'10px'}} >{renderPageNumbers}</ul>
    </div>
      {currentTasks.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {currentTasks.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
    </div>
  );
}

export default TaskList;
