import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';

function TaskList({ t }) {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = async () => {
    try {
      const response = await TaskApi.taskApiList();
      setTaskList(response);
    } catch (error) {
      console.error('Error fetching task list:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskApi.taskApiDeleteById(id);
        fetchTaskList();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-center display-3">{t('task_list')}</h1>
      <Link to="/task/create" className="btn btn-primary">
        {t('create')}
      </Link>
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('task_name')}</th>
            <th>{t('task_completed')}</th>
            <th>{t('update')}</th>
            <th>{t('delete')}</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task) => (
            <tr key={task.taskId}>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>{task.taskCompleted ? 'Completed' : 'Pending'}</td>
              <td>
                <Link to={`/task/update/${task.taskId}`}>
                  <i className="fa-solid fa-pen-to-square text-primary"></i>
                </Link>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash text-danger"
                  onClick={() => handleDeleteTask(task.taskId)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default withTranslation()(TaskList);