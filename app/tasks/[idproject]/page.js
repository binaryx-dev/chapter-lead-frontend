'use client'
import BaseLayout from "@/components/BaseLayout/index.js";
import CheckBox from "@/components/CheckBox/index.js";
import { AddButton, EmptyTask, Task, TaskButton, TaskContainer, TaskContent, TaskTitle } from "@/components/Task/index.js";
import VerticalProgress from "@/components/VerticalProgress/index.js";
import percent from "@/functions/percent.js";
import useProject from "@/hooks/useProject/index.js";
import styled from "@emotion/styled";
import { Add as AddIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useParams, useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TasksList = styled(List)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const TasksForProjectPage = () => {
  const router = useRouter();
  const { idproject } = useParams();
  const { project, fetchProject } = useProject();
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [finishTasks, setFinishTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  const handleCheck = (id) => {
    let newTasks = tasks.map(task => {
      if (task.id == id) {
        task.checked = !task.checked;
        task.idStatus = task.checked ? 1 : 0;
        setFinishTasks(task.checked ? finishTasks + 1 : finishTasks - 1);
      }      
      return task;
    });
    setTasks(newTasks);
  }

  useEffect(() => {
    if (idproject) {
      fetchProject(idproject);
    }
  }, []);

  useEffect(() => {
    if(project?.tasks != null) {
      let tasks = project.tasks;
      tasks = tasks.map(task => ({...task, checked: task.idStatus == 0 ? false : true}));
      setTasks(tasks.reverse());
      setFinishTasks(project.finishTasks);
      setTotalTasks(project.totalTasks);
      setLoading(false)
    }
  }, [project]);

  return loading 
    ? <BaseLayout>
        <EmptyTask icon={false}>
          <CircularProgress color="info" />
          <Typography component="span" variant="h6" sx={{position: "relative", top: -10}}>&nbsp;&nbsp;&nbsp;Cargando...</Typography>
        </EmptyTask>
      </BaseLayout>
    : <BaseLayout>
        {(!project) && (
          <EmptyTask severity="warning">Ups... Proyecto no encontrado!!!</EmptyTask>
        )}
        {(project) && (
          <Task key={`projects-${project.id}`} middle="true" sx={{
            background: `linear-gradient(-45deg, ${project.colorTasks[0]}, ${project.colorTasks[1]}, ${project.colorTasks[2]})`
          }}>
            <TaskContainer>
              <TaskButton small="true">
                <AddButton variant="contained" onClick={() => router.push("/")}>
                  <ArrowBackIosIcon fontSize="inherit" />
                </AddButton>
                <AddButton variant="contained" onClick={() => console.log("Este componente está bloqueado")}>
                  <MoreHorizIcon fontSize="inherit" />
                </AddButton>
              </TaskButton>
              <TaskTitle>
                <Typography gutterBottom variant="h2" color={"white"}>
                  <b>{project.name}</b>
                </Typography>
              </TaskTitle>
              <TaskContent>
                <VerticalProgress width={18} value={percent(finishTasks, totalTasks)} color={grey[50]} />
                <Box>
                  <Typography variant="h4" color={"white"}><b>{`${finishTasks}/${totalTasks}`}</b></Typography>
                  <Typography variant="subtitle1" color={"white"}>tasks</Typography>
                </Box>
              </TaskContent>
              <TaskButton middle="true">
                <AddButton variant="contained" onClick={() => router.push(`/tasks/${idproject}/adding`)}>
                  <AddIcon fontSize="inherit" />
                </AddButton>
              </TaskButton>
            </TaskContainer>
          </Task>
        )}        
        {tasks?.length == 0 && (
          <EmptyTask>No se encontraron tareas!</EmptyTask>
        )}
        <TasksList>
          {tasks.filter(task => task.idStatus == 0).map((task) => (
            <ListItem key={`task-${task.id}`}>
              <ListItemAvatar>
                <CheckBox onChange={() => handleCheck(task.id)} checked={task.checked} size='lg' />
              </ListItemAvatar>
              <ListItemText primary={task.title} />
            </ListItem>
          ))}
          {tasks?.filter(task => task.idStatus == 0).length > 0 && (
            <Accordion
              expanded={expanded}  
              elevation={0} 
              onChange={() => setExpanded(!expanded)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}>
                <Typography>Completed</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {tasks.filter(task => task.idStatus == 1).map((task) => (
                    <ListItem key={`task-${task.id}`}>
                      <ListItemAvatar>
                        <CheckBox onChange={() => handleCheck(task.id)} checked={task.checked} size='lg' />
                      </ListItemAvatar>
                      <ListItemText primary={task.title} sx={{textDecoration: "line-through", color: grey[400]}} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </TasksList>
      </BaseLayout>
}

export default TasksForProjectPage;