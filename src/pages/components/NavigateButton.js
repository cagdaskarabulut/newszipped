"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const NavigateButton = ({ title, target }) => {
  const router = useRouter();

  async function goToTarget() {
    router.push(target);
  }

  return (
    <Button variant="contained" type="submit" onClick={() => goToTarget()}>
      {title}
    </Button>
  );
};

export default NavigateButton;
