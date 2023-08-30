import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskApi from '../../services/TaskApi';
import moon from "../../img/moon.jpg";

export default function TaskView() {
  const navigate = useNavigate();
  const [viewTask, setViewTask] = useState({});
  const { taskId } = useParams();

  useEffect(() => {
    TaskApi.taskApiFindById(taskId)
      .then((response) => {
        setViewTask(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  return (
    <div>
      <div className="card">
        <div className="card-body text-center">
          <img src={moon} alt="" style={{ maxWidth: "75%" }} />
          <h5 className="card-title">{viewTask.taskId}</h5>
          <p className="card-title">{viewTask.taskName}</p>
          <p className="card-text">{viewTask.taskCompleted ? "Completed" : "Not Completed"}</p>
        </div>
      </div>
    </div>
  );
}