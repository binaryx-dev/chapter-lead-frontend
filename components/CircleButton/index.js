import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

const CircleButton = styled(Button)(({ theme, small }) => ({
  marginRight: theme.spacing(1),
  width: small ? 48 : 64,
  height: small ? 48 : 64,
  minWidth: small ? 48 : 64,
  fontSize: "1.8rem",
  borderRadius: "50%",  
  "&:hover": {
    backgroundColor: grey[300],
    border: "thin solid " + grey[500],
    color: grey[500],
  }
}));

export default CircleButton;