import React, { useEffect, useState } from "react";
import TopicList from "../components/TopicList";
import TextField from "@mui/material/TextField";
import { replaceStringForUrlFormat } from "../utils/StringUtils";
import UploadFile from "../components/toolComponents/UploadFile";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  function handleTitleChange(value){
    console.log(value);
    setTitle(value);
    setUrl(replaceStringForUrlFormat(value));
  }

  const onSubmit = async () => {
    setSuccessMessage("");
    setIsRequiredFieldsError(false);
    if (
      message.name == "" ||
      message.phonenumber == "" ||
      message.content == "" ||
      !validateEmail(message.email)
    ) {
      setIsRequiredFieldsError(true);
      return;
    }

    fetch("/api/message-add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: message.name,
        email: message.email,
        phonenumber: message.phonenumber,
        content: message.content,
      }),
    }) //message
      .then((res) => res.json())
      .then((data) => {
        setMessage({ name: "", email: "", phonenumber: "", content: "" });
        setSuccessMessage("Mesajınız başarıyla gönderildi");
      });
  };
  
  return (
    <div>
      <h1>Welcome Admin, </h1>
      <br />

      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={title}
        onChange={(event) => handleTitleChange(event.target.value)}
      />

      <TopicList />

      <UploadFile url={url} />
    </div>
  );
};

export default AdminPanel;
