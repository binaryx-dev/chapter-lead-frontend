import { useEffect, useState } from "react";
import useAPI from "../useAPI/index.js";
import { PROJECTS_URL, TASKS_URL } from "@/config/url.js";


const useProject = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const { get } = useAPI();

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
    fetchProject
  }
}

export default useProject