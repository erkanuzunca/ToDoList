import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';

function TaskUpdate({ t }) {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [id, setId] = useState(null);

  const { taskId } = useParams();

  useEffect(() => {
    setId(taskId);

    TaskApi.taskApiFindById(taskId)
      .then((response) => {
        const taskData = response.data;
        setTaskName(taskData.taskName);
        setTaskCompleted(taskData.taskCompleted);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    const updatedTask = {
      taskName,
      taskCompleted,
    };

    try {
      const response = await TaskApi.taskApiUpdate(id, updatedTask);
      if (response.status === 200) {
        navigate('/task/list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <form>
        <h2 className="display-3 mt-4">{t('task_update')}</h2>
        <div className="form-group">
          <span>{t('task_name')}</span>
          <input
            type="text"
            className="form-control"
            placeholder={t('task_name')}
            required={true}
            autoFocus={true}
            id="task_name"
            name="task_name"
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="task_completed"
            name="task_completed"
            checked={taskCompleted}
            onChange={(event) => setTaskCompleted(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="task_completed">
            {t('task_completed')}
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleUpdateTask}
        >
          {t('update')}
        </button>
      </form>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </React.Fragment>
  );
}

export default withTranslation()(TaskUpdate);