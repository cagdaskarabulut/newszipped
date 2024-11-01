"use client";

import { useEffect, useRef } from "react";

const FocusContent = ({ children }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return <div ref={contentRef}>{children}</div>;
};

export default FocusContent;
