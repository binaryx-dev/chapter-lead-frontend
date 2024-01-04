'use client'
import BaseLayout from "@/components/BaseLayout/index.js"
import { TaskButton, TaskCard } from "@/components/Task/index.js"
import { Box, Button, CardContent, Grid, TextField, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react";
import CircleButton from "@/components/CircleButton/index.js";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import NotificationAddIcon from '@mui/icons-material/NotificationAddOutlined';
import AddIcon from '@mui/icons-material/Add';
import {  useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation.js";
import useProject from "@/hooks/useProject/index.js";

const CreateContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  width: "100%",
}));

const Container = styled(Box)(({ theme, horizontal = false }) => ({
  display: horizontal ? "block" : "flex", 
  marginBottom: horizontal ? 0 : theme.spacing(2),
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
  overflowX: horizontal ? "scroll" : "hidden",
  "& .MuiBox-root": {
    width: horizontal ? "fit-content" : "auto",
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(4),
  marginButton: 0,
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  paddingTop: 0,
  "& .MuiButton-root":{
    padding: theme.spacing(1),
    fontSize: "1.3rem"
  }
}));

const TaskAdding = () => {
  const { idproject } = useParams();
  const theme = useTheme();
  const refContent = useRef(null);
  const router = useRouter();
  const { projects, fetchProjects } = useProject();
  const [checked, setChecked] = useState(0);

  const handleCheck = (id = 0) => {
    setChecked(id);
    router.replace(`/tasks/${id}/adding`);
  }

  useEffect(() => {
    const elemento = refContent.current;
    elemento.addEventListener("wheel", (evento) => {
      evento.preventDefault();
      if (evento.deltaY > 0) {
        elemento.scrollLeft += 100;
      } else {
        elemento.scrollLeft -= 100;
      }
    });
    fetchProjects();
  }, []);

  useEffect(() => {
    if (idproject) {
      setChecked(idproject);
    }
  }, [idproject]);

  return (
    <BaseLayout>
      <CreateContainer>
        <TaskCard elevation={0}>
          <CardContent>
            <CircleButton variant="outlined" sx={{marginLeft: theme.spacing(1)}} onClick={() => router.push(`/tasks/${idproject}`)}>
              <CloseIcon fontSize="inherit" />
            </CircleButton>
            <Title variant='h3'>New Task</Title>
            <Container>
              <Button variant="contained" color="secondary" size="large" sx={{marginRight: theme.spacing(1)}}>Today</Button>
              <Button variant="outlined" color="primary" size="large" sx={{marginRight: theme.spacing(1)}}>Tomorrow</Button>
            </Container>
            <Container>
              <CircleButton variant="outlined" whiteBack onClick={() => router.push("/")}>
                <MoreTimeIcon fontSize="inherit" />
              </CircleButton>
              <CircleButton variant="outlined" whiteBack onClick={() => router.push("/")}>
                <NotificationAddIcon fontSize="inherit" />
              </CircleButton>
            </Container>
            <Container sx={{marginTop: theme.spacing(3)}}>
              <Typography variant="h6" color={"grey"}>PROJECTS</Typography>
            </Container>
            <Container ref={refContent} horizontal>
              <Container >
                <CircleButton variant={checked == 0 ? "contained" : "outlined"} color={checked == 0 ? "secondary" : "primary"} onClick={() => handleCheck()} small>
                  <AddIcon fontSize="inherit" />
                </CircleButton>
                {projects?.map((project) => (
                  <Button
                    variant={checked == project.id ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    onClick={() => handleCheck(project.id)}
                    sx={{
                      marginRight: theme.spacing(1),
                      background: checked == project.id 
                        ? `linear-gradient(-45deg, ${project.colorTasks[0]}, ${project.colorTasks[1]}, ${project.colorTasks[2]})` 
                        : "transparent",
                    }}>
                    {project.name}
                  </Button>
                ))}
              </Container>
            </Container>
            <Container sx={{marginTop: theme.spacing(3)}}>
              <Typography variant="h6" color={"grey"}>TITLE</Typography>
            </Container>
            <Container sx={{paddingLeft: theme.spacing(4)}}>
              <TextField fullWidth variant="outlined" placeholder="Enter a title" />
            </Container>
            <Container sx={{paddingLeft: theme.spacing(4)}}>
              <TextField fullWidth variant="outlined" placeholder="Enter a description" />
            </Container>
          </CardContent>
        </TaskCard>
        <ActionContainer>
          <Button variant="contained" color="secondary" size="large" fullWidth>Create</Button>
        </ActionContainer>
      </CreateContainer>
    </BaseLayout>
  )
}

export default TaskAdding