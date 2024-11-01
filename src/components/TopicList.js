"use client";
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

const TopicList = ({
  label,
  topicList,
  setTopicList,
  isRefreshingTopicList,
  setIsRefreshingTopicList,
  isSingleSelection,
  activeStyle,
  activeInputStyle,
}) => {
  const [allTopicList, setAllTopicList] = useState([]);
  // const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    fetch("/api/topic/list")
      .then((res) => res.json())
      .then((data) => {
        setAllTopicList(data?.topic_list.rows);
      });
    setIsRefreshingTopicList(false);
  }, []);

  useEffect(() => {
    fetch("/api/topic/list")
      .then((res) => res.json())
      .then((data) => {
        setAllTopicList(data?.topic_list.rows);
        setIsRefreshingTopicList(false);
      });
    setIsRefreshingTopicList(false);
  }, [isRefreshingTopicList, setIsRefreshingTopicList, topicList]);

  return (
    // <div>
    //   {isSingleSelection && (
    //     <Autocomplete
    //       freeSolo
    //       disableClearable
    //       style={activeStyle}
    //       id="tags-standard"
    //       options={allTopicList}
    //       getOptionLabel={(option) => option?.name}
    //       onChange={(event, newValue) => {
    //         setTopicList(newValue);
    //       }}
    //       renderInput={(params) => (
    //         <TextField {...params} style={activeInputStyle} label={label} />
    //       )}
    //     />
    //   )}
    //   {!isSingleSelection && (
    //     <Autocomplete
    //       multiple
    //       style={activeStyle}
    //       id="tags-standard"
    //       options={allTopicList}
    //       getOptionLabel={(option) => option?.name}
    //       onChange={(event, newValue) => {
    //         setTopicList(newValue);
    //       }}
    //       renderInput={(params) => (
    //         <TextField {...params} style={activeInputStyle} label={label} />
    //       )}
    //     />
    //   )}
    // </div>

    <div>
      {isSingleSelection && (
        <Autocomplete
          freeSolo
          disableClearable
          style={activeStyle}
          id="tags-standard"
          options={allTopicList}
          getOptionLabel={(option) => option?.name || ""}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={topicList.length > 0 ? topicList[0] : null}
          onChange={(event, newValue) => {
            setTopicList(newValue ? [{ name: newValue.name }] : []);
          }}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
      {!isSingleSelection && (
        <Autocomplete
          multiple
          style={activeStyle}
          id="tags-standard"
          options={allTopicList}
          getOptionLabel={(option) => option?.name || ""}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={topicList}
          onChange={(event, newValue) => {
            setTopicList(newValue.map((item) => ({ name: item.name })));
          }}
          renderInput={(params) => (
            <TextField {...params} style={activeInputStyle} label={label} />
          )}
        />
      )}
    </div>
  );
};

export default TopicList;
