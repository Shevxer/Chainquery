import React, { useState } from "react";
import Tiptap from "./Tiptap";
import { v4 as uuidv4 } from "uuid";

const NotePicker = ({ content, setContent }) => {
  // const [content, setContent] = useState("<p>Hello World! 🌎️</p>");
  const handleContentChange = (reason) => {
    setContent(reason);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: content,
    };
    console.log(data);
    // console.log("content : " + content);
  };
  // console.log("content : " + content);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full grid place-items-center mb-10"
    >
      <Tiptap
        content={content}
        onChange={(newContent) => handleContentChange(newContent)}
      />
    </form>
  );
};

export default NotePicker;
