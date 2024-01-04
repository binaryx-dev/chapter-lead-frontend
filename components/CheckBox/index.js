import styled from "@emotion/styled";
import { Add as AddIcon, Check } from "@mui/icons-material";
import { Button as Base } from "@mui/material";

const CheckBox = ({ checked, onChange, size, isAdd }) =>{
  const Button = styled(Base)(({ theme }) => ({
    padding: theme.spacing(size == "lg" ? 3 : 2),
    marginRight: theme.spacing(2),
    minWidth: 0,
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: "50%",
    fontSize: theme.spacing(size == "lg" ? 4 : 2) + " !important",
    "&.MuiButton-contained": {
      border: "thin solid transparent",
    },
  }));

  return (
    <Button onClick={onChange} variant={(checked || isAdd) ? "contained" : "outlined"} color={checked ? "success" : "inherit"}>
      {checked ? <Check /> : <>{isAdd ? <AddIcon /> : <>&nbsp;</>}</>}
    </Button>
  );
}

export default CheckBox;