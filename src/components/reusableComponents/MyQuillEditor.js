import React, { useEffect, useState } from "react";
// const { useQuill } = require('react-quilljs');
import MyQuillEditorInsertHtmlButton from "./MyQuillEditorInsertHtmlButton";

export default function MyQuillEditor({ quill, quillRef,activeStyle, showInsertHtmlButton }) {
  // const { quill, quillRef } = useQuill(); //dışarıdan alıyoruz bu parametreyi
  // useEffect(() => {
  //   if (quill) quill.setText("123");
  // });

  return (
    <>
      {showInsertHtmlButton && (<MyQuillEditorInsertHtmlButton quill={quill} />)} 

      <div style={activeStyle}>
        <div ref={quillRef} />
      </div>
    </>
  );
}
