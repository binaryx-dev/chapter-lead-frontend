
import { Alert, Box, Button, Card, CardContent, alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import styled from "@emotion/styled";

export const Task = styled(Card)(({ theme, middle = false }) => ({
  minHeight: middle ? "58vh" : "60vh",
  borderRadius: theme.spacing(7),
  marginBottom: theme.spacing(middle ? 7 : 2),
  overflow: middle ? "visible" : "hidden",
  '& .MuiCardContent-root': {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignContent: "flex-start", 
    minHeight: "inherit",
    padding: 0,
    paddingTop: theme.spacing(2),
  }
}));

export const TaskContainer = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: 0,
  },
}));

export const TaskContent = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

export const TaskTitle = styled(TaskContent)(({ theme }) => ({
  overflow: "hidden"
}));

export const TaskButton = styled(Box)(({ theme, middle = false, small = false }) => ({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "flex-end",
  alignContent: "flex-end",
  justifyContent: middle ? "center" : "space-between",
  padding: 0,
  paddingBottom: theme.spacing(1.5),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  "& .MuiButton-root": {
    position: "relative",
    top: middle ? theme.spacing(5) : 0,
    padding: theme.spacing(small ? 2 : 4),
    borderRadius: "50%",
    fontSize: theme.spacing(4),
    "&.MuiButton-contained": middle ? {
      backgroundColor: alpha("#fff", .9) + " !important",
      boxShadow: theme.shadows[3],
      "&:hover": {
        backgroundColor: alpha(grey[300], .9) + " !important",
      }
    } : {}
  },    
}));

export const AddButton = styled(Button)(({ theme, whiteBack = false }) => ({
  backgroundColor: alpha("#fff", 0.6),
  color: grey[400],
  '&:hover':{
    backgroundColor: alpha(grey[400], 0.6),
    color: "#fff",
  }
}));

export const MoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(grey[300], 0.3),
  borderColor: grey[300],
  color: "#fff",
  borderWidth: 1,
  '&:hover':{
    borderColor: grey[300],
    backgroundColor: 'transparent'
  }
}));

export const EmptyTask = styled((props) => <Alert severity="info" {...props} />)(({ theme }) => ({
  display: "flex",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  margin: theme.spacing(3),
  borderRadius: theme.spacing(8),
  justifyContent: "flex-start",
  alignItems: "flex-start",
  fontSize:"1.2rem",
  "& .MuiAlert-icon": {
    fontSize:"2rem",
  }
}));

export const TaskCard = styled(Card)(({ theme }) => ({
  width: "100%",
  borderRadius: theme.spacing(7),
  marginBottom: theme.spacing(2),
  overflow: "hidden",
  '& .MuiCardContent-root': {
    display: "flex",
    flexDirection: "column", 
    justifyContent: "space-between", 
    alignContent: "flex-start", 
    minHeight: "inherit",
  }
}));