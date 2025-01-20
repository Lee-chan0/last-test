import Quill from "quill";
import 'quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FileUpload from "../FileUpload/FileUpload";

const BoardContainer = styled.div`
  padding : 0 24px;

`;

const BoardToQuill = styled.div`
  height: 500px;
`;

function Board() {
  const quillRef = useRef(null); // quill에디터가 생성될 DOM엘리먼트를 참조
  const [content, setContent] = useState("");


  useEffect(() => {
    const quillInstance = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"]
        ]
      }
    })

    quillInstance.on("text-change", () => {
      setContent(quillInstance.root.innerHTML); //html로 저장
    })
  }, []);


  return (
    <BoardContainer>
      <BoardToQuill ref={quillRef} style={{ borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', marginBottom: '24px' }} />
      <FileUpload />
    </BoardContainer>
  )
}

export default Board;