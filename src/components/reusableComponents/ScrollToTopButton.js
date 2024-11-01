"use client";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton } from "@material-ui/core";

const ScrollToTopButton = ({ showBelow }) => {
  const classes = useStyles();

  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton
          onClick={handleClick}
          className={classes.toTop}
          aria-label="to top"
          component="span"
        >
          <KeyboardDoubleArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 9999,
    position: "fixed",
    bottom: "8vh",
    backgroundColor: "black",
    color: "#F1F1F1",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#F1F1F1",
      backgroundColor: "black",
    },
    [theme.breakpoints.up("xs")]: {
      left: "2%",
      backgroundColor: "black",
    },
  },
}));

export default ScrollToTopButton;
