import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';
import TaskCreate from './TaskCreate';

function TaskList({ t, i18n, props }) {
  let navigate = useNavigate();
  const [TaskStateApi, setTaskStateApi] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState({});
  const [filter, setFilter] = useState('all');

  const getListTask = () => {
    TaskApi.taskApiList()
      .then((response) => {
        const tasks = response.data.map(task => ({
          ...task,
          completed: task.taskCompleted,
        }));
        setTaskStateApi(tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getListTask();
  }, []);

  const setDeleteTask = (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz?")) {
      TaskApi.taskApiDeleteById(id)
        .then(() => {
          getListTask();
          navigate("/task/list");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const setUpdateTask = (data) => {
    const { id, taskName, systemDate, completed } = data;
    localStorage.setItem("task_update_id", id);
    localStorage.setItem("task_update_task_name", taskName);
    localStorage.setItem("task_update_task_date", systemDate);
    localStorage.setItem("task_update_completed", completed);
  };

  const setCreateTask = (event) => {
    event.preventDefault();
    if (!taskName) {
      setError({ taskName: "Task name is required." });
      return;
    }

    TaskApi.taskApiCreate({ taskName })
      .then(() => {
        setTaskName("");
        setError({});
        getListTask();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckboxChange = async (taskId) => {
    try {
      const updatedTask = TaskStateApi.find(task => task.id === taskId);
      updatedTask.completed = !updatedTask.completed;

      const currentTask = await TaskApi.taskApiFindById(taskId);
      
      const updatedTaskData = {
        taskName: currentTask.data.taskName,
        taskCompleted: updatedTask.completed
      };

      await TaskApi.taskApiUpdate(taskId, updatedTaskData);

      setTaskStateApi(prevState => {
        return prevState.map(task => {
          if (task.id === taskId) {
            return { ...updatedTask };
          }
          return task;
        });
      });

    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const taskApiDeleteAll = async () => {
    try {
      const response = await TaskApi.taskApiList();
      const tasks = response.data;

      for (const task of tasks) {
        await TaskApi.taskApiDeleteById(task.id);
      }

      alert('Tüm görevler başarıyla silindi.');
      getListTask(); // Tüm görevlerin yeniden alınması
    } catch (error) {
      console.error('Tüm görevler silinirken bir hata oluştu:', error);
      alert('Görevleri silerken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleDeleteCheckedTasks = async () => {
    try {
      const completedTasks = TaskStateApi.filter(task => task.completed);

      for (const task of completedTasks) {
        await TaskApi.taskApiDeleteById(task.id);
      }

      alert('Seçili tamamlanmış görevler başarıyla silindi.');
      getListTask(); // Tüm görevlerin yeniden alınması
    } catch (error) {
      console.error('Seçili tamamlanmış görevler silinirken bir hata oluştu:', error);
      alert('Seçili tamamlanmış görevleri silerken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const filterTasks = (filter) => {
    switch (filter) {
      case 'all':
        return TaskStateApi;
      case 'done':
        return TaskStateApi.filter(task => task.completed);
      case 'todo':
        return TaskStateApi.filter(task => !task.completed);
      default:
        return TaskStateApi;
    }
  };

  useEffect(() => {
    const filteredTasks = filterTasks(filter);
    setTaskStateApi(filteredTasks);
  }, [filter]);

  return (
    <React.Fragment>
      <br></br>
<h1 className="text-center display-4" style={{ fontSize: '25px', fontWeight: 'bold' }}>{t("ToDoInput")}</h1>

      <TaskCreate
        taskName={taskName}
        setTaskName={setTaskName}
        error={error}
        setCreateTask={setCreateTask}
      />

<h2 className="text-center display-4" style={{ fontSize: '25px', fontWeight: 'bold' }}>{t("ToDoList")}</h2>
<div className="d-flex justify-content-center my-4">
  <button
    type="button"
    className={`btn mx-3 w-100 ${filter === 'all' ? '' : ''}`}
    style={{ backgroundColor: '#2ca0be', color: 'white' }}
    onClick={() => getListTask()}
  >
    All
  </button>
  <button
    type="button"
    className={`btn mx-3 w-100 ${filter === 'done' ? '' : ''}`}
    style={{ backgroundColor: '#2ca0be', color: 'white' }}
    onClick={() => setFilter('done')}
  >
    Done
  </button>
  <button
    type="button"
    className={`btn mx-3 w-100 ${filter === 'todo' ? '' : ''}`}
    style={{ backgroundColor: '#2ca0be', color: 'white' }}
    onClick={() => setFilter('todo')}
  >
    Todo
  </button>
</div>




<table className="table table-hover table-responsive" style={{ padding: "7px", borderRadius: "10px", boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.1)",marginBottom: "20px"  }}>
  <tbody>
    {TaskStateApi.map((data, index) => (
      <tr  key={data.id}  >
        <td  style={data.completed ? { textDecoration: 'line-through', color: 'red' } : {}}>
          {data.taskName}
        </td>
        <td className="p-0 ">
          <input  type="checkbox" checked={data.completed} onChange={() => handleCheckboxChange(data.id)} />
        </td>
        <td className="p-0">
          <Link to={`/task/update/${data.id}`}>
            <i onClick={() => setUpdateTask(data)} className="fas fa-pencil-alt text-warning text-primary"></i>
          </Link>
        </td>
        <td className="p-0">
          <Link to={`/task/delete}`}>
            <i onClick={() => setDeleteTask(data.id)} className="fa-solid fa-trash text-danger"></i>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
 
      <div className="d-flex justify-content-center my-4">
        <button
          type="button"
          className="btn btn-danger mx-2 w-100"
          onClick={taskApiDeleteAll}
        >
          Delete All Tasks
        </button>
        <button
          type="button"
          className="btn btn-danger mx-2 w-100"
          onClick={handleDeleteCheckedTasks}
        >
          Delete Completed Tasks
        </button>
      </div>
    </React.Fragment>
  )
}

export default withTranslation()(TaskList);
