"use client";
import { Divider } from "@mui/material";
import { format } from "date-fns";
import styles from "./CommentItem.module.scss";

const CommentItem = ({ comment, isMobile }) => {
  return (
    <>
        <br />
        <b>{comment?.user_name}</b>
        {isMobile ? (<br />) : (<span> - </span>)}
        <span className={styles.SpanStyle}>
          {format(comment?.create_date, "dd/MM/yyyy hh:mm")}
        </span>
        <p dangerouslySetInnerHTML={{ __html: comment?.comment }}></p>
      <Divider />
    </>
  );
};

export default CommentItem;
