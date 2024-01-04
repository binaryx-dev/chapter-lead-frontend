'use client'
import BaseLayout from "@/components/BaseLayout";
import { AddButton, EmptyTask, MoreButton, Task, TaskButton, TaskContainer, TaskContent, TaskTitle } from "@/components/Task/index.js";
import NoSrr from "@/components/Utils/NoSrr";
import VerticalProgress from "@/components/VerticalProgress";
import AuthContext from "@/contexts/AuthContext";
import percent from "@/functions/percent.js";
import useProject from "@/hooks/useProject";
import styled from "@emotion/styled";
import { MoreHoriz } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import { Alert, Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/navigation.js";
import { useContext, useEffect } from "react";

const AvatarContainer = styled(Box)(() => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "end",
  justifyContent: "center",
  flexDirection: "column",
  padding: 1,
  "& .MuiAvatar-root": {
    width: 96,
    height: 96,
    margin: 1,
  }
}));

const TitleBar = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(6),
}));

export const StartApp = () => {
  const { projects, fetchProjects } = useProject();
  const { profile } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <BaseLayout>
      <TitleBar>
        <Box sx={{ flexGrow: 4 }}>
          <Typography variant="h6">Hello, {profile?.name} {profile?.lastname}</Typography>
          <Typography variant="h3" color={"text.primary"} gutterBottom><b>Your<br />Projects ({projects?.length ?? 0})</b></Typography>
        </Box>
        <AvatarContainer>
          <Avatar src={profile?.picture} />
        </AvatarContainer>
      </TitleBar>
      <NoSrr>
        {(projects?.length ?? 0) == 0 && (
          <EmptyTask>No se encontraron proyectos!</EmptyTask>
        )}
        {projects?.map((project) => (
          <Task key={`projects-${project.id}`} sx={{
            background: `linear-gradient(-45deg, ${project.colorTasks[0]}, ${project.colorTasks[1]}, ${project.colorTasks[2]})`
          }}>
            <TaskContainer>
              <TaskTitle>
                <Typography gutterBottom variant="h2" color={"white"}>
                  <b>{project.name}</b>
                </Typography>
              </TaskTitle>
              <TaskContent>
                <VerticalProgress width={18} value={percent(project.finishTasks, project.totalTasks)} color={grey[50]} />
                <Box>
                  <Typography variant="h4" color={"white"}><b>{`${project.finishTasks}/${project.totalTasks}`}</b></Typography>
                  <Typography variant="subtitle1" color={"white"}>tasks</Typography>
                </Box>
              </TaskContent>
              <TaskButton>
                <MoreButton variant="outlined" onClick={() => console.log("Este componente está bloqueado")}>
                  <MoreHoriz fontSize="inherit" />
                </MoreButton>
                <AddButton variant="contained" onClick={() => router.push(`/tasks/${project.id}`)}>
                  <AddIcon fontSize="inherit" />
                </AddButton>
              </TaskButton>
            </TaskContainer>
          </Task>
        ))}
      </NoSrr>
    </BaseLayout>
  )
}

export default StartApp