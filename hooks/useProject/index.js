import { useEffect, useState } from "react";
import useAPI from "../useAPI/index.js";
import { PROJECTS_URL, TASKS_URL } from "@/config/url.js";
import showAlert from "@/functions/showAlert.js";


const useProject = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const { get, post } = useAPI();

  const pushTask = async (task) => {
    if(task.idProject == null || task.idProject == undefined || task.idProject <= 0){
      showAlert({text: 'Error al tomar el ID del proyecto.', icon: 'error', title: 'Error'});
      return false;
    }
    else if(task.title == null || task.title == undefined || task.title == ''){
      showAlert({text: 'El título del proyecto es obligatorio', icon: 'error', title: 'Error'});
      return false;
    }
    else if(task.day == null || task.day == undefined || task.day == ''){
      showAlert({text: 'Debe asignar un dia para proyecto.', icon: 'error', title: 'Error'});
      return false;
    }

    let response = await post(TASKS_URL, task)
    if (response.status == 200) { 
      showAlert({text: 'Tarea creada correctamente.', icon: 'success', title: 'Éxito'});
      return true;
    }
    return false;
  }

  const fetchProjects = async () => {
    const response = await get(PROJECTS_URL);
    const { data } = response;
    setProjects(data);
  }

  const fetchProject = async (id) => {
    get(`${TASKS_URL}/${id}`)
      .then(response => {
        if (response.status == 200) { 
          setProject(response.data);         
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return {
    projects,
    fetchProjects,
    project,
    fetchProject,
    pushTask
  }
}

export default useProject