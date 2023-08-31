import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TaskApi from '../../services/TaskApi';
//import axios from 'axios';

import moon from "../../img/moon.jpg";

// FUNCTION
export default function TaskView() {

  // REDIRECT
  let navigate = useNavigate();

  // STATE
  const [viewApi, setViewApi] = useState([]);
  const [id, setID] = useState(null);

  // PARAMS
  const viewID = useParams();

  // EFFECT
  useEffect(() => {
    //1.YOL (ID)
    setID(localStorage.getItem("task_view_id"));
    //CategoryApi.categoryApiFindById(localStorage.getItem("category_view_id"))
      TaskApi.taskApiFindById(viewID.id)
      //axios.get(`http://localhost:4444/category/api/v1/find/${id}`)
      //axios.get(`http://localhost:4444/category/api/v1/find/${viewID.id}`)
      .then((response) => {
        console.log(response.data);
        setViewApi(response.data)
      })
      .catch((err) => {
        console.error(err);
      });
  },[])//end effect

  return (
    <div>
      <div class="card">
        <div class="card-body text-center">
        <img src={moon} alt="" style={{maxWidth:"75%"}} />
          <h5 class="card-title"> {viewApi.id}</h5>
          <p class="card-title"> {viewApi.taskName}</p>
          <p class="card-text">  {viewApi.systemDate}</p>
        </div>
      </div>
    </div>
  )
}
