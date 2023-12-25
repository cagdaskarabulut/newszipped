import React, { useEffect, useState } from "react";
import TopicList from "../components/TopicList";

const AdminPanel = () => {
  return (
    <div>
      <h1>Welcome Admin, </h1>
      <br />
      <TopicList />
    </div>
  );
};

export default AdminPanel;
