// REACT
import React, { useEffect, useState } from 'react'

// LANGUAGE
import { withTranslation } from 'react-i18next'

// ROUTER 
import { useNavigate } from 'react-router-dom'

// API
import TaskApi from '../../services/TaskApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';

library.add(faBook); // Eklemek istediğiniz ikonları burada ekleyin

// FUNCTION
function TaskCreate({ t }) {

  // REDIRECT
  const navigate = useNavigate();

  // STATE
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState();

  // Dinleyiciler 
  // categoryName her hangi bir değişiklik olduğunda error silinsin
  useEffect(() => {
    setError(undefined)
  }, [taskName]);


  // CREATE






  const taskCreate = async (event) => {
    // Browser'ın post için durmasını istiyorum
    event.preventDefault();
    navigate("/task/list");
    // Category object
    const newTask = {
      taskName
    }
    console.log(newTask);
  
    setError(undefined);
  
    // API
    try {
      const response = await TaskApi.taskApiCreate(newTask);
      // Veri girişi başarılı oldu, şimdi sayfayı yenileyin
      window.location.reload();
    } catch (err) {
      setError(err.response.data.validationErrors);
    }
  }


  // CHANGE
  const taskOnChange = (event) => {
    const { name, value } = event.target;
    //console.log(`${name} => ${value}`);

    // onChange
    setTaskName(value)
  }


  // RETURN
  return (
    <React.Fragment>
<div className="form-container" style={{ padding: "7px", borderRadius: "10px", marginRight: "2px", border: "0.5px solid rgba(0, 0, 0, 0.1)" }}>
  <form>
    <h2 className="display-3 mt-4">{t('')}</h2>
    <div className="form-group d-flex align-items-center">
      <span style={{ backgroundColor: "#2ca0be", padding: "7px", borderRadius: "1px", marginRight: "0px" }}>
        <FontAwesomeIcon icon="book" style={{ color: "white" }} />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={t('New Todo')}
        required={true}
        autoFocus={true}
        id="task_data"
        name="task_data"
        onChange={taskOnChange}
      />
    </div>
    <button
      type='submit'
      className="btn btn-primary mt-3 text-center ml-auto btn-block"
      style={{
        backgroundColor: '#2ca0be',
        color: 'white',
        width: "100%",
        fontSize: "1rem",
        borderRadius: "1px",
        padding: "7px",
        marginTop: "10px",
        border: "none", // Butonun çerçevesini kaldırır
        outline: "none", // Odak çerçevesini kaldırır
        borderRadius: "5px"
        
      }}
      disabled={!true}
      onClick={taskCreate}
    >
      {t('Add new task')}
    </button>
   
  </form>
  <br></br>
</div>
      <br />
    </React.Fragment>
  ) //end return
} //end fucntion

// i18n wrapper
export default withTranslation()(TaskCreate)