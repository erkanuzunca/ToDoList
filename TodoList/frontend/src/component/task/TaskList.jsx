//import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'
import TaskApi from '../../services/TaskApi';

// FUNCTION
function TaskList({ t, i18n,props}) {

  // REDIRECT
  let navigate = useNavigate();

  // STATE
  const [TaskStateApi, setTaskStateApi] = useState([]);

  // I18N

  // USEEFFECT
  useEffect(() => {
    TaskApi.taskApiList()
      .then((response) => {
        console.log(response.data);
        setTaskStateApi(response.data);
      })
      .catch((err) => { console.error(err); });

    // axios.get("http://localhost:4444/category/api/v1/list")
    //   .then((response) => {
    //     console.log(response.data);
    //     setCategoryStateApi(response.data);
    //   })
    //   .catch((err) => { console.error(err); });
  }, []);


  // LIST
  const getListTask = (() => {
    //axios.get("http://localhost:4444/category/api/v1/list")
    TaskApi.taskApiList()
      .then((response) => {
        console.log(response.data);
        setTaskStateApi(response.data);
      })
      .catch((err) => { console.error(err); });
  });

  // DELETE
  const setDeleteTask = ((id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
      //axios.delete("http://localhost:4444/category/api/v1/delete/" + id)
      TaskApi.taskApiDeleteById(id)
        .then(() => {
          getListTask();
        })
    } else {
      alert("Silinmedi.")
    }
    navigate("/task/list");
  });

  //UPDATE
  const setUpdateTask = (data) => {
    let { id, taskName, systemDate } = data;
    localStorage.setItem("task_update_id", id);
    localStorage.setItem("task_update_task_name", taskName);
    localStorage.setItem("task_update_task_date", systemDate);
  }

  //VIEW
  const setViewTask = (id) => {
    localStorage.setItem("task_view_id", id);
  }

  //RETURN
  return (
    <React.Fragment>
      <h1 className="text-center display-3">{t("task_list")} </h1>
      <Link to="/task/create" className="btn btn-primary">{t("create")}</Link>
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t("task_name")}</th>
            <th>{t("date")}</th>
            <th>{t("update")}</th>
            <th>{t("view")}</th>
            <th>{t("delete")}</th>
          </tr>
        </thead>
        <tbody>
          {
            TaskStateApi.map((data) =>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.taskName}</td>
                <td>{data.systemDate}</td>

                <td>
                  <Link to={`/task/update/${data.id}`}>
                    <i onClick={() => setUpdateTask(data)} className="fa-solid fa-pen-to-square text-primary"></i>
                  </Link>
                </td>

                <td>
                  <Link to={`/task/view/${data.id}`}>
                    <i onClick={() => setViewTask(data.id)} className="fa-solid fa-expand text-warning"></i>
                  </Link>
                </td>

                <td>
                  <Link to={`/task/delete}`}>
                    <i onClick={() => setDeleteTask(data.id)} className="fa-solid fa-trash text-danger"></i>
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  )
}

//i18n
export default withTranslation()(TaskList); 