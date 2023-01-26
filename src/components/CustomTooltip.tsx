import React from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const CustomTooltip = (props: TooltipProps) => {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
};
