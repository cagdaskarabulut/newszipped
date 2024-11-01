"use client";
import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import zIndex from "@mui/material/styles/zIndex";

const FloatingButtons = () => {
  const handleWhatsAppClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(
        `https://wa.me/${process.env.PROJECT_PHONE_NUMBER_WHATSAPP}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${process.env.PROJECT_PHONE_NUMBER_WHATSAPP}`,
        "_blank"
      );
    }
  };

  return (
    <div style={styles.container}>
      <a
        href={"tel:" + process.env.PROJECT_PHONE_NUMBER_CALL}
        style={styles.button}
      >
        <PhoneIcon style={styles.icon} />
      </a>
      <button onClick={handleWhatsAppClick} style={styles.button}>
        <WhatsAppIcon style={styles.icon} />
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: "9999",
  },
  button: {
    backgroundColor: "#25D366",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#fff",
    fontSize: "30px",
  },
};

export default FloatingButtons;
