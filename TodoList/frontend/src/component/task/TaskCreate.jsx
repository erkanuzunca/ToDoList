import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';

function TaskCreate({ t }) {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
  }, [taskName, taskCompleted]);

  const taskCreate = async (event) => {
    event.preventDefault();

    const newTask = {
      taskName,
      taskCompleted,
    };

    setError(undefined);

    try {
      const response = await TaskApi.taskApiCreate(newTask);
      navigate('/task/list');
    } catch (err) {
      setError(err.response.data.validationErrors);
    }
  };

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskCompletedChange = (event) => {
    setTaskCompleted(event.target.checked);
  };

  return (
    <React.Fragment>
      <form>
        <h2 className="display-3 mt-4">{t('task_name')}</h2>
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
            onChange={handleTaskNameChange}
          />
          {error && error.taskName && (
            <div className="alert alert-danger" role="alert">
              {error.taskName}
            </div>
          )}
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="task_completed"
            name="task_completed"
            checked={taskCompleted}
            onChange={handleTaskCompletedChange}
          />
          <label className="form-check-label" htmlFor="task_completed">
            {t('task_completed')}
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={taskCreate}
        >
          {t('create')}
        </button>
      </form>
    </React.Fragment>
  );
}

export default withTranslation()(TaskCreate);