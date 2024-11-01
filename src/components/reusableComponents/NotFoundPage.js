"use client"
import React from "react";
import styles from "../../styles/common.scss";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className={styles.PanelContainerStyle}>
      <Container maxWidth="lg" style={{display:"flex",flexDirection: "column",justifyContent:"center"}}>
        <h1 style={{ textAlign: "center" }}>
          404 - This page could not be found.
        </h1>
      </Container>
      <Container maxWidth="xs" style={{display:"flex",flexDirection: "column",justifyContent:"center"}}>
        <Button variant="contained" onClick={() => router.push("/")}>Back to Main Page</Button>
      </Container>
    </div>
  );
};

export default NotFoundPage;
