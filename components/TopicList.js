// import { unsubscribe } from 'diagnostics_channel';
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
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
import { db } from "../utils/firebase";

const TopicList = () => {
  const [topicList, setTopicList] = useState([]);
  const timestamp = Date.now(); // This would be the timestamp you want to format

  useEffect(() => {
    const collectionRef = collection(db, "newszipped-topics");
// console.log(collectionRef);
    const q = query(collectionRef);
    // console.log(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);

      setTopicList(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {/* <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.content}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Autocomplete
        multiple
        id="tags-standard"
        options={topicList}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Topics"
          />
        )}
      />

      {/* {messages.map(message => <div key={message.id}>{message.content}</div>)} */}
    </div>
  );
};

export default TopicList;
