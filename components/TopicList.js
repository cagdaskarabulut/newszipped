import React, { useEffect, useState } from "react";

import {
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const TopicList = () => {
  const [topicList, setTopicList] = useState([]);
  const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    fetch("/api/topic_list")
      .then((res) => res.json())
      .then((data) => {
        setTopicList(data?.topic_list.rows);
      });
  }, []);

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={topicList}
        getOptionLabel={(option) => option?.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Topics"
          />
        )}
      />
      
    </div>
  );
};

export default TopicList;
