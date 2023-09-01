import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';
import TaskCreate from './TaskCreate';

function TaskList({ t, i18n, props }) {
  let navigate = useNavigate();
  const [TaskStateApi, setTaskStateApi] = useState([]);
  const [taskName, setTaskName] = useState(""); // Declare taskName state
  const [error, setError] = useState({}); // Declare error state


  

  useEffect(() => {
    // Görevleri API'den çekme
    TaskApi.taskApiList()
      .then((response) => {
        const tasks = response.data.map(task => ({
          ...task,
          completed: task.taskCompleted, // Görev tamamlandı mı?
        }));
        setTaskStateApi(tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  
    // Tamamlanmış görevleri depodan geri yükleme
    const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
    setTaskStateApi(prevState => {
      return prevState.map(task => {
        if (storedCompletedTasks[task.id] !== undefined) {
          task.completed = storedCompletedTasks[task.id];
        }
        return task;
      });
    });
  }, []);


  
  // useEffect(() => {
  //   TaskApi.taskApiList()
  //     .then((response) => {
  //       console.log(response.data);
  //       setTaskStateApi(response.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  const getListTask = () => {
    TaskApi.taskApiList()
      .then((response) => {
        console.log(response.data);
        setTaskStateApi(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    const { id, taskName, systemDate,completed } = data;
    localStorage.setItem("task_update_id", id);
    localStorage.setItem("task_update_task_name", taskName);
    localStorage.setItem("task_update_task_date", systemDate);
    localStorage.setItem("task_update_completed", completed);

    
  };

  const setViewTask = (id) => {
    localStorage.setItem("task_view_id", id);
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

//LOCALDE TUT



  






//CHECKHED





const handleCheckboxChange = async (taskId) => {
  try {
    const updatedTask = TaskStateApi.find(task => task.id === taskId);
    updatedTask.completed = !updatedTask.completed;

    // Task name değerini güncellemek için önce mevcut veriyi al
    const currentTask = await TaskApi.taskApiFindById(taskId);
    
    // Güncellenmiş görevi oluştur ve API'ye gönder
    const updatedTaskData = {
      taskName: currentTask.data.taskName, // Mevcut taskName değerini al
      taskCompleted: updatedTask.completed
    };

    await TaskApi.taskApiUpdate(taskId, updatedTaskData);

    // Yerel durumu güncelle
    setTaskStateApi(prevState => {
      return prevState.map(task => {
        if (task.id === taskId) {
          return { ...updatedTask }; // Güncellenmiş görevi döndür
        }
        return task;
      });
    });

    // ... Diğer işlemler
  } catch (error) {
    console.error("Error updating task:", error);
  }
};
// Sayfa yüklendiğinde tamamlanmış görevleri geri yükleme işlemi
useEffect(() => {
  // Depolama işlemi
  const storedCompletedTasks = JSON.parse(localStorage.getItem("completedTasks")) || {};
  
  // TaskStateApi'yi güncelle
  setTaskStateApi(prevState => {
    return prevState.map(task => {
      if (storedCompletedTasks[task.id] !== undefined) {
        task.completed = storedCompletedTasks[task.id];
      }
      return task;
    });
  });
}, []);

// const handleCheckboxChange = (taskId) => {
//   setTaskStateApi(prevState => {
//     return prevState.map(task => {
//       if (task.id === taskId) {
//         return { ...task, completed: !task.completed };
//       }
//       return task;
//     });
//   });
// };



//DELETE ALL TASKS
const taskApiDeleteAll = async () => {
  try {
    // Tüm görevleri listeleme işlemi
    const response = await TaskApi.taskApiList();
    const tasks = response.data;

    // Tüm görevleri sırayla silme işlemi
    for (const task of tasks) {
      await TaskApi.taskApiDeleteById(task.id);
    }

    // Silme işlemi başarılı olduysa 
    alert('Tüm görevler başarıyla silindi.');
    window.location.reload();
  } catch (error) {
    console.error('Tüm görevler silinirken bir hata oluştu:', error);
    // Hata durumunda kullanıcıya bir hata mesajı
    alert('Görevleri silerken bir hata oluştu. Lütfen tekrar deneyin.');
  }
};


//COMPLETED TASK DELETE
const handleDeleteCheckedTasks = async () => {
  try {
    // Tamamlanmış görevleri filtreleme işlemi
    const completedTasks = TaskStateApi.filter(task => task.completed);

    // Tamamlanmış görevleri sırayla silme işlemi
    for (const task of completedTasks) {
      await TaskApi.taskApiDeleteById(task.id);
    }

    // Silme işlemi başarılı olduysa 
    alert('Seçili tamamlanmış görevler başarıyla silindi.');

    // Sayfayı yeniden yükle
    window.location.reload();
  } catch (error) {
    console.error('Seçili tamamlanmış görevler silinirken bir hata oluştu:', error);
    // Hata durumunda kullanıcıya bir hata mesajı 
    alert('Seçili tamamlanmış görevleri silerken bir hata oluştu. Lütfen tekrar deneyin.');
  }
};





  return (
    <React.Fragment>
      <h1 className="text-center display-3">{t("Todo Input")} </h1>

      <TaskCreate
        taskName={taskName}
        setTaskName={setTaskName}
        error={error}
        setCreateTask={setCreateTask}
      />

      <table className="table table-striped table-hover table-responsive">
        <thead>
          {/* Table headers */}
        </thead>
        <tbody>
          {TaskStateApi.map((data) => (
            <tr key={data.id}>
              {/* Table rows */}
            </tr>
          ))}
        </tbody>
      </table>
    
      
      <table className="table table-striped table-hover table-responsive">
    
        <tbody>
          {
              TaskStateApi.map((data) =>
              <tr key={data.id}>
                
                <td style={data.completed ? { textDecoration: 'line-through', color: 'red' } : {}}>{data.taskName}</td>
                
                <td className="p-0"><input type="checkbox" checked={data.completed} onChange={() => handleCheckboxChange(data.id)} /></td>
 


                

        

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
            )
          }
        </tbody>
        
      </table>
 
      <div className="d-flex justify-content-center my-4">
  <button
    type="button"
    className="btn btn-danger mx-3 w-100"
    onClick={taskApiDeleteAll}
  >
    Delete All Tasks
  </button>
  <button
    type="button"
    className="btn btn-danger mx-3 w-100"
    onClick={handleDeleteCheckedTasks}
  >
    Delete Completed Tasks
  </button>
</div>

      <br></br> <br></br> <br></br>
    </React.Fragment>
  )
}

//i18n
export default withTranslation()(TaskList); 