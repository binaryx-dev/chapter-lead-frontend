import styled from "@emotion/styled";
import { LinearProgress, emphasize } from "@mui/material";
import React from "react";

const VerticalProgress = ({ value, width = 12, height = 80, color = "primary", variant="determinate" }) => {
  const barColor = (color, theme) => {
    if (color === "primary") return theme.palette.primary.main;
    if (color === "secondary") return theme.palette.secondary.main;
    return color;
  }

  const Progress = styled("div")(({ theme }) => ({
    overflow: "hidden",
    width,
    height,
    borderRadius: 6,
    marginRight: theme.spacing(2),
    "& .MuiLinearProgress-root": {
      height: width,
      borderRadius: 0,
      width: height,
      rotate: "90deg",
      left: width / 2,
      top: (width / 2) * -1,
      transformOrigin: "left",
      backgroundColor: emphasize(barColor(color), 0.3),
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: barColor(color, theme),
      borderRadius: width / 2,
      "& .MuiLinearProgress-bar": {
        backgroundColor: barColor(color, theme)
      },
    }
  }));

  return (
    <Progress>
      <LinearProgress {...{variant}} value={200 - value} />
  </Progress>
  );
}

export default VerticalProgress;